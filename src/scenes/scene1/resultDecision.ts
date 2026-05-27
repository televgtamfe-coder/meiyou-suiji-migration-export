import type { AssessmentAnswers } from './assessmentState';
import type { KmiScoreDetail } from './kmiScoring';

type DecisionTone = 'soft' | 'warn' | 'alert';

export type ResultDecisionCard = {
  title: string;
  label: string;
  summary: string;
  tone: DecisionTone;
};

export type ResultDecisionDetail = {
  title: string;
  label: string;
  summary: string;
  rationale: string;
  actions: string[];
  tone: DecisionTone;
};

export type ResultDecisionSummary = {
  boneHealth: ResultDecisionDetail;
  exercise: ResultDecisionDetail;
};

export function getResultDecisionSummary(
  answers: AssessmentAnswers,
  kmiDetails: KmiScoreDetail[]
): ResultDecisionSummary {
  return {
    boneHealth: getBoneHealthDecision(answers, kmiDetails),
    exercise: getExerciseDecision(answers, kmiDetails),
  };
}

export function getBoneHealthDecision(
  answers: AssessmentAnswers,
  kmiDetails: KmiScoreDetail[]
): ResultDecisionDetail {
  const age = getAgeFromBirthDate(answers.birthDate);
  const weightKg = toNumber(answers.weightKg);
  const bmi = calculateBmi(answers.heightCm, answers.weightKg);
  const osta = age !== null && weightKg !== null ? Number(((weightKg - age) * 0.2).toFixed(1)) : null;
  const jointPainSeverity = getSeverity(kmiDetails, 'kmiJointPain');
  const fatigueSeverity = getSeverity(kmiDetails, 'kmiFatigue');
  const moodSeverity = Math.max(
    getSeverity(kmiDetails, 'kmiMelancholia'),
    getSeverity(kmiDetails, 'kmiNervousness')
  );

  let boneRiskRank = rankOstaRisk(osta);
  const boneReasons: string[] = [];

  if (osta !== null) {
    boneReasons.push(`OSTA 指数 ${osta}`);
  }

  if (age !== null && age >= 40) {
    boneReasons.push('年龄已进入骨量变化更需关注的阶段');
  }

  if (bmi !== null && bmi < 19) {
    boneRiskRank = Math.max(boneRiskRank, 1);
    boneReasons.push('BMI 偏低，属于骨量流失的加重因素');
  }

  if (answers.ovarianFailure === 'yes') {
    boneRiskRank = Math.max(boneRiskRank, answers.hormoneReplacementTherapy === 'no' ? 2 : 1);
    boneReasons.push('存在卵巢功能异常史');
  }

  if (answers.surgeryHistory === 'ovary') {
    boneRiskRank = Math.max(boneRiskRank, answers.hormoneReplacementTherapy === 'no' ? 2 : 1);
    boneReasons.push('存在卵巢切除史');
  }

  if (jointPainSeverity >= 2) {
    boneRiskRank = Math.max(boneRiskRank, 1);
    boneReasons.push('已有中度及以上骨关节、肌肉痛');
  }

  const vitaminDProxyScore =
    (bmi !== null && bmi >= 28 ? 1 : 0) +
    (jointPainSeverity >= 1 ? 1 : 0) +
    (fatigueSeverity >= 1 ? 1 : 0) +
    (moodSeverity >= 1 ? 1 : 0);

  const vitaminDRiskRank = vitaminDProxyScore >= 3 ? 2 : vitaminDProxyScore >= 2 ? 1 : 0;
  const vitaminDLabel = getRiskLabel(vitaminDRiskRank);
  const boneLabel = getRiskLabel(boneRiskRank);
  const tone = getRiskTone(Math.max(boneRiskRank, vitaminDRiskRank));

  const summary =
    boneRiskRank >= 2 || vitaminDRiskRank >= 2
      ? `当前结果提示骨健康或维生素D风险偏高，建议尽快补齐筛查并与医生确认是否需要进一步检查。`
      : boneRiskRank >= 1 || vitaminDRiskRank >= 1
        ? `当前结果提示存在骨健康或维生素D方面的早期风险，适合尽快开始生活方式干预并补充基础筛查。`
        : `现有信息下骨健康与维生素D风险初筛偏低，建议继续保持并定期复查。`;

  const rationale = `骨质疏松初筛参考 OSTA 与现有特殊情况；维生素D缺乏风险仅基于已填写的 BMI、疲乏、骨关节不适和情绪线索进行初筛。骨健康 ${boneLabel}，维生素D风险 ${vitaminDLabel}。${boneReasons.join('；')}。`;

  const actions =
    Math.max(boneRiskRank, vitaminDRiskRank) >= 2
      ? [
          '建议尽快到骨质疏松门诊或内分泌科评估，优先考虑 DXA 骨密度与 25(OH)D 检测。',
          '先从钙 1000-1200mg / 天与维生素D3 2000IU / 天的方向做基础管理，并按医生建议调整。',
        ]
      : Math.max(boneRiskRank, vitaminDRiskRank) >= 1
        ? [
            '建议把补钙、补充维生素D与日晒纳入日常，维生素D3 可参考 800-1000IU / 天。',
            '结合步行、抗阻和力量训练，每半年复查一次骨健康相关指标。',
          ]
        : [
            '继续保持规律运动、均衡饮食和基础日晒，每年体检时关注骨密度与维生素D。',
            '若后续出现持续骨痛、乏力或夜间抽筋，再升级为专项筛查。',
          ];

  return {
    title: '骨健康与维生素D风险',
    label: `骨健康 ${boneLabel} / 维生素D ${vitaminDLabel}`,
    summary,
    rationale,
    actions,
    tone,
  };
}

export function getExerciseDecision(
  answers: AssessmentAnswers,
  kmiDetails: KmiScoreDetail[]
): ResultDecisionDetail {
  const vertigoSeverity = getSeverity(kmiDetails, 'kmiVertigo');
  const palpitationsSeverity = getSeverity(kmiDetails, 'kmiPalpitations');
  const jointPainSeverity = getSeverity(kmiDetails, 'kmiJointPain');
  const headacheSeverity = getSeverity(kmiDetails, 'kmiHeadache');

  let rank = 0;
  const reasons: string[] = [];

  if (palpitationsSeverity >= 2) {
    rank = 2;
    reasons.push('存在中度及以上心悸/胸闷线索');
  } else if (palpitationsSeverity >= 1) {
    rank = Math.max(rank, 1);
    reasons.push('存在轻度心悸线索');
  }

  if (vertigoSeverity >= 2) {
    rank = 2;
    reasons.push('存在中度及以上眩晕线索');
  } else if (vertigoSeverity >= 1) {
    rank = Math.max(rank, 1);
    reasons.push('存在轻度眩晕线索');
  }

  if (jointPainSeverity >= 3) {
    rank = 2;
    reasons.push('骨关节疼痛已接近功能受限');
  } else if (jointPainSeverity >= 1) {
    rank = Math.max(rank, 1);
    reasons.push('已有骨关节、肌肉不适');
  }

  if (headacheSeverity >= 2) {
    rank = Math.max(rank, 1);
    reasons.push('头痛在运动前需要额外留意');
  }

  if (answers.surgeryHistory === 'ovary' || answers.ovarianFailure === 'yes') {
    rank = Math.max(rank, 1);
    reasons.push('存在需要更稳妥管理的特殊生理背景');
  }

  const label =
    rank >= 2 ? '红灯：建议先医学评估' : rank === 1 ? '黄灯：建议低强度起步' : '绿灯：可循序渐进运动';

  const summary =
    rank >= 2
      ? '当前不建议直接开始高强度训练，建议先完成医学评估，再决定运动强度。'
      : rank === 1
        ? '可以开始温和运动，但建议从低到中等强度起步，并观察症状在运动中的变化。'
        : '当前未见明显运动禁忌信号，可以逐步增加中等强度体力活动。';

  const rationale =
    reasons.length > 0
      ? `运动能力判断参考 PAR-Q+ 的红黄绿灯思路，当前主要依据为：${reasons.join('；')}。`
      : '运动能力判断参考 PAR-Q+ 的红黄绿灯思路，当前未见明显需要暂停运动的线索。';

  const actions =
    rank >= 2
      ? [
          '先暂停高强度有氧、爆发类和负重冲击训练，优先到门诊确认是否存在运动禁忌。',
          '就医前可保留舒缓拉伸、慢走和呼吸放松，但运动中若胸闷、明显眩晕或心慌加重应立即停止。',
        ]
      : rank === 1
        ? [
            '建议先从快走、瑜伽、太极、轻力量训练开始，每周累计 150 分钟以内，分次完成。',
            '若运动后出现心慌、头晕、关节痛加重或恢复变慢，应先降低强度并考虑进一步评估。',
          ]
        : [
            '可以按每周 150 分钟中等强度有氧 + 2-3 次抗阻训练的方向循序渐进开始。',
            '保持热身、拉伸和补水，后续如出现心悸、眩晕或疼痛再重新评估运动方案。',
          ];

  return {
    title: '运动能力初筛',
    label,
    summary,
    rationale,
    actions,
    tone: rank >= 2 ? 'alert' : rank === 1 ? 'warn' : 'soft',
  };
}

function getAgeFromBirthDate(birthDate: string): number | null {
  if (!birthDate) {
    return null;
  }

  const parsed = new Date(birthDate);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const now = new Date();
  let age = now.getFullYear() - parsed.getFullYear();
  const monthOffset = now.getMonth() - parsed.getMonth();

  if (monthOffset < 0 || (monthOffset === 0 && now.getDate() < parsed.getDate())) {
    age -= 1;
  }

  return Math.max(0, age);
}

function calculateBmi(heightCmValue: string, weightKgValue: string): number | null {
  const heightCm = toNumber(heightCmValue);
  const weightKg = toNumber(weightKgValue);

  if (heightCm === null || weightKg === null || heightCm <= 0) {
    return null;
  }

  return Number((weightKg / ((heightCm / 100) * (heightCm / 100))).toFixed(1));
}

function toNumber(value: string): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function rankOstaRisk(osta: number | null): number {
  if (osta === null) {
    return 0;
  }

  if (osta < -4) {
    return 2;
  }

  if (osta <= -1) {
    return 1;
  }

  return 0;
}

function getSeverity(kmiDetails: KmiScoreDetail[], field: KmiScoreDetail['field']): number {
  return kmiDetails.find((item) => item.field === field)?.severity ?? 0;
}

function getRiskLabel(rank: number): string {
  if (rank >= 2) {
    return '高风险';
  }

  if (rank === 1) {
    return '中风险';
  }

  return '低风险';
}

function getRiskTone(rank: number): DecisionTone {
  if (rank >= 2) {
    return 'alert';
  }

  if (rank === 1) {
    return 'warn';
  }

  return 'soft';
}
