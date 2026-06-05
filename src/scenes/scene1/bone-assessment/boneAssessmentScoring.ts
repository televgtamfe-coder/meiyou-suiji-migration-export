import {
  BoneAssessmentFieldKey,
  boneAssessmentBoneRiskStepAFields,
  boneAssessmentBoneRiskStepBFields,
  boneAssessmentIofBandCopy,
  boneAssessmentIofKeyAlertFields,
  boneAssessmentKeyAlertCopy,
  boneAssessmentKeyAlertDetailCopy,
  boneAssessmentVitaminDBmiImprovementCopy,
  boneAssessmentVitaminDBmiKeyFactorCopy,
  boneAssessmentVitaminDDisclaimer,
  boneAssessmentVitaminDEscalationFields,
  boneAssessmentVitaminDGroupSummaryCopy,
  boneAssessmentVitaminDImprovementCopy,
  boneAssessmentVitaminDImprovementPriority,
  boneAssessmentVitaminDKeyFactorCopy,
} from './boneAssessmentContent';
import { BoneAssessmentAnswers, createEmptyBoneAssessmentAnswers } from './boneAssessmentState';

export type BoneAssessmentOstaLevel = 'low' | 'medium' | 'high';
export type BoneAssessmentVitaminDLevel = 'low' | 'medium' | 'high';

type BoneAssessmentResultTone = 'green' | 'pink' | 'orange';
type BoneAssessmentIofBand = '0' | '1-2' | '3-4' | '5+';

const boneAssessmentVitaminDLifestyleFields = [
  'vdSunExposureUnder20Min',
  'vdStrictSunProtection',
  'vdMostlyIndoor',
  'vdDietLack',
] as const satisfies readonly BoneAssessmentFieldKey[];

const boneAssessmentVitaminDBaselineFields = [
  'vdDigestiveAbsorptionIssue',
  'vdDarkSkin',
] as const satisfies readonly BoneAssessmentFieldKey[];

const boneAssessmentVitaminDSymptomFields = [
  'vdBoneMuscleDiscomfort',
  'vdLegCramp',
  'vdFatigueMoodAnxiety',
  'vdBrittleNails',
] as const satisfies readonly BoneAssessmentFieldKey[];

export type BoneAssessmentResultSummary = {
  derived: {
    age: number | null;
    heightCm: number | null;
    weightKg: number | null;
    bmi: number | null;
    ageAbove40: boolean;
    bmiBelow19: boolean;
    bmiAbove28: boolean;
  };
  osta: {
    index: number;
    level: BoneAssessmentOstaLevel;
    label: string;
  };
  iof: {
    positiveCount: number;
    band: BoneAssessmentIofBand;
    label: string;
    keyAlerts: string[];
    keyAlertDetails: string[];
  };
  vitaminD: {
    positiveCount: number;
    level: BoneAssessmentVitaminDLevel;
    label: string;
    keyFactors: string[];
    highlightedFactors: string[];
    groupSummary: string;
    summary: string;
    detail: string;
    improvementTips: string[];
    disclaimer: string;
  };
  mainResult: {
    title: string;
    label: string;
    insightTitle: string;
    summary: string;
    actionLabel: string;
    note: string;
    tone: BoneAssessmentResultTone;
  };
};

function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function hasPositiveAnswer(answers: BoneAssessmentAnswers, field: BoneAssessmentFieldKey) {
  return answers[field] === 'yes';
}

function getOstaLevel(index: number): BoneAssessmentOstaLevel {
  if (index < -4) {
    return 'high';
  }

  if (index <= -1) {
    return 'medium';
  }

  return 'low';
}

function getOstaLabel(level: BoneAssessmentOstaLevel) {
  if (level === 'high') {
    return '高风险';
  }

  if (level === 'medium') {
    return '中风险';
  }

  return '低风险';
}

function getIofBand(positiveCount: number): BoneAssessmentIofBand {
  if (positiveCount >= 5) {
    return '5+';
  }

  if (positiveCount >= 3) {
    return '3-4';
  }

  if (positiveCount >= 1) {
    return '1-2';
  }

  return '0';
}

function getIofLabel(band: BoneAssessmentIofBand) {
  if (band === '5+') {
    return '建议尽快做专业评估';
  }

  if (band === '3-4') {
    return '风险因素较多';
  }

  if (band === '1-2') {
    return '已有部分风险因素';
  }

  return '当前未见明显骨健康风险信号';
}

function getVitaminDLevel(positiveCount: number, hasEscalationSignal: boolean): BoneAssessmentVitaminDLevel {
  if (hasEscalationSignal || positiveCount >= 8) {
    return 'high';
  }

  if (positiveCount >= 4) {
    return 'medium';
  }

  return 'low';
}

function getVitaminDLabel(level: BoneAssessmentVitaminDLevel) {
  if (level === 'high') {
    return '高风险';
  }

  if (level === 'medium') {
    return '中风险';
  }

  return '低风险';
}

function createUniqueStringList(items: (string | undefined)[]) {
  return items.filter((item): item is string => Boolean(item)).filter((item, index, list) => list.indexOf(item) === index);
}

function joinBoneAssessmentLabels(items: string[]) {
  return items.join('、');
}

function getBoneAssessmentVitaminDKeyFactors(answers: BoneAssessmentAnswers, bmiAbove28: boolean) {
  const factors = boneAssessmentVitaminDImprovementPriority
    .filter((field) => hasPositiveAnswer(answers, field))
    .map((field) => boneAssessmentVitaminDKeyFactorCopy[field]);

  if (bmiAbove28) {
    factors.push(boneAssessmentVitaminDBmiKeyFactorCopy);
  }

  return createUniqueStringList(factors);
}

function getBoneAssessmentImprovementTips(answers: BoneAssessmentAnswers, bmiAbove28: boolean) {
  const tips = boneAssessmentVitaminDImprovementPriority
    .filter((field) => hasPositiveAnswer(answers, field))
    .map((field) => boneAssessmentVitaminDImprovementCopy[field]);

  if (bmiAbove28) {
    tips.push(boneAssessmentVitaminDBmiImprovementCopy);
  }

  return createUniqueStringList(tips);
}

function getBoneAssessmentVitaminDGroupLabels(answers: BoneAssessmentAnswers, bmiAbove28: boolean) {
  const groupLabels: string[] = [];

  if (
    hasPositiveAnswer(answers, 'vdSunExposureUnder20Min') ||
    hasPositiveAnswer(answers, 'vdStrictSunProtection') ||
    hasPositiveAnswer(answers, 'vdMostlyIndoor')
  ) {
    groupLabels.push('阳光与户外暴露');
  }

  if (hasPositiveAnswer(answers, 'vdDietLack')) {
    groupLabels.push('饮食来源');
  }

  if (bmiAbove28) {
    groupLabels.push('体重状态');
  }

  if (hasPositiveAnswer(answers, 'vdDigestiveAbsorptionIssue')) {
    groupLabels.push('吸收功能');
  }

  if (hasPositiveAnswer(answers, 'vdDarkSkin')) {
    groupLabels.push('皮肤特征');
  }

  if (boneAssessmentVitaminDSymptomFields.some((field) => hasPositiveAnswer(answers, field))) {
    groupLabels.push('身体提示信号');
  }

  return groupLabels;
}

function getBoneAssessmentVitaminDGroupSummary(answers: BoneAssessmentAnswers, bmiAbove28: boolean) {
  const lifestyleCount = boneAssessmentVitaminDLifestyleFields.filter((field) => hasPositiveAnswer(answers, field)).length;
  const baselineCount =
    boneAssessmentVitaminDBaselineFields.filter((field) => hasPositiveAnswer(answers, field)).length + (bmiAbove28 ? 1 : 0);
  const symptomCount = boneAssessmentVitaminDSymptomFields.filter((field) => hasPositiveAnswer(answers, field)).length;

  if (symptomCount > 0 && symptomCount >= lifestyleCount && symptomCount >= baselineCount) {
    return boneAssessmentVitaminDGroupSummaryCopy.symptom;
  }

  if (lifestyleCount > 0 && lifestyleCount >= baselineCount) {
    return boneAssessmentVitaminDGroupSummaryCopy.lifestyle;
  }

  if (baselineCount > 0) {
    return boneAssessmentVitaminDGroupSummaryCopy.baseline;
  }

  return boneAssessmentVitaminDGroupSummaryCopy.generic;
}

function getBoneAssessmentVitaminDHighlightedFactors(answers: BoneAssessmentAnswers, bmiAbove28: boolean) {
  const prioritizedFactors = [
    hasPositiveAnswer(answers, 'vdBoneMuscleDiscomfort') ? boneAssessmentVitaminDKeyFactorCopy.vdBoneMuscleDiscomfort : undefined,
    hasPositiveAnswer(answers, 'vdLegCramp') ? boneAssessmentVitaminDKeyFactorCopy.vdLegCramp : undefined,
    hasPositiveAnswer(answers, 'vdDigestiveAbsorptionIssue')
      ? boneAssessmentVitaminDKeyFactorCopy.vdDigestiveAbsorptionIssue
      : undefined,
    bmiAbove28 ? boneAssessmentVitaminDBmiKeyFactorCopy : undefined,
    hasPositiveAnswer(answers, 'vdSunExposureUnder20Min') ? boneAssessmentVitaminDKeyFactorCopy.vdSunExposureUnder20Min : undefined,
    hasPositiveAnswer(answers, 'vdDietLack') ? boneAssessmentVitaminDKeyFactorCopy.vdDietLack : undefined,
    hasPositiveAnswer(answers, 'vdFatigueMoodAnxiety') ? boneAssessmentVitaminDKeyFactorCopy.vdFatigueMoodAnxiety : undefined,
  ];

  return createUniqueStringList(prioritizedFactors).slice(0, 2);
}

function getBoneAssessmentVitaminDNarrative(
  level: BoneAssessmentVitaminDLevel,
  positiveCount: number,
  groupLabels: string[],
  highlightedFactors: string[],
) {
  if (level === 'high') {
    const highlightedText = highlightedFactors.length > 0 ? `，尤其在“${joinBoneAssessmentLabels(highlightedFactors)}”方面风险较突出` : '';

    return {
      summary: `您本次维生素D缺乏风险筛查中，共有 ${positiveCount} 项回答“是”，目前属于高风险。`,
      detail: `这提示您存在较高的维生素D缺乏可能${highlightedText}。建议尽快进行血清 25(OH)D3 检测，并结合医生或营养师建议评估是否需要补充维生素D。若同时伴有持续骨骼肌肉疼痛、反复腿抽筋、乏力明显或消化吸收问题，应优先就医。`,
    };
  }

  if (level === 'medium') {
    const groupText = groupLabels.length > 0 ? joinBoneAssessmentLabels(groupLabels) : '生活方式与基础因素';

    return {
      summary: `您本次维生素D缺乏风险筛查中，共有 ${positiveCount} 项回答“是”，目前属于中风险。`,
      detail: `这说明您存在一定的维生素D不足倾向，主要风险因素集中在：${groupText}。建议优先改善相关因素，并在1-3个月后复评。如近期已出现肌肉酸痛、腿部抽筋、疲劳明显等表现，建议结合血清 25(OH)D3 检测进一步确认。`,
    };
  }

  return {
    summary: `您本次维生素D缺乏风险筛查中，共有 ${positiveCount} 项回答“是”，目前属于低风险。`,
    detail:
      positiveCount > 0
        ? '这提示您当前维生素D缺乏的可能性相对较低，但仍存在可改善因素。建议优先从日晒、户外活动和饮食结构入手优化，维持当前较低风险状态。'
        : '这提示您当前维生素D缺乏的可能性相对较低。建议继续保持现有生活方式，并重点关注后续日晒、饮食和户外活动的稳定性。',
  };
}

function getBoneAssessmentMainResult(
  iofBand: BoneAssessmentIofBand,
  hasKeyAlert: boolean,
): BoneAssessmentResultSummary['mainResult'] {
  const effectiveBand: BoneAssessmentIofBand = hasKeyAlert ? '5+' : iofBand;
  const bandCopy = boneAssessmentIofBandCopy[effectiveBand];

  return {
    title: 'OSTA + IOF 骨质疏松风险判定',
    label: getIofLabel(effectiveBand),
    insightTitle: bandCopy.title,
    summary: bandCopy.summary,
    actionLabel: bandCopy.actionLabel,
    note: bandCopy.note,
    tone: bandCopy.tone as BoneAssessmentResultTone,
  };
}

export function createBoneAssessmentAnswers(overrides: Partial<BoneAssessmentAnswers> = {}) {
  return createEmptyBoneAssessmentAnswers(overrides);
}

export function createSampleBoneAssessmentAnswers() {
  return createBoneAssessmentAnswers({
    age: '52',
    heightCm: '160',
    weightKg: '48',
    boneParentOsteoporosisOrFragilityFracture: 'yes',
    boneExerciseUnder30Min: 'yes',
    vdSunExposureUnder20Min: 'yes',
    vdBoneMuscleDiscomfort: 'yes',
  });
}

export function getBoneAssessmentResultSummary(answers: BoneAssessmentAnswers): BoneAssessmentResultSummary {
  const age = parseNumber(answers.age);
  const heightCm = parseNumber(answers.heightCm);
  const weightKg = parseNumber(answers.weightKg);
  const bmi =
    heightCm && weightKg ? Number((weightKg / ((heightCm / 100) * (heightCm / 100))).toFixed(1)) : null;
  const ageAbove40 = age !== null && age > 40;
  const bmiBelow19 = bmi !== null && bmi < 19;
  const bmiAbove28 = bmi !== null && bmi > 28;
  const ostaIndex = age !== null && weightKg !== null ? Number(((weightKg - age) * 0.2).toFixed(1)) : 0;
  const ostaLevel = getOstaLevel(ostaIndex);

  const iofExplicitPositiveCount = [
    ...boneAssessmentBoneRiskStepAFields,
    ...boneAssessmentBoneRiskStepBFields,
  ].filter((field) => hasPositiveAnswer(answers, field)).length;
  const iofPositiveCount = iofExplicitPositiveCount + (ageAbove40 ? 1 : 0) + (bmiBelow19 ? 1 : 0);
  const iofBand = getIofBand(iofPositiveCount);
  const keyAlertFields = boneAssessmentIofKeyAlertFields.filter((field) => hasPositiveAnswer(answers, field));
  const keyAlerts = keyAlertFields.map((field) => boneAssessmentKeyAlertCopy[field]);
  const keyAlertDetails = keyAlertFields.map((field) => boneAssessmentKeyAlertDetailCopy[field]);

  const vitaminDPositiveCount =
    boneAssessmentVitaminDImprovementPriority.filter((field) => hasPositiveAnswer(answers, field)).length +
    (bmiAbove28 ? 1 : 0);
  const hasVitaminDEscalationSignal = boneAssessmentVitaminDEscalationFields.some((field) =>
    hasPositiveAnswer(answers, field)
  );
  const vitaminDLevel = getVitaminDLevel(vitaminDPositiveCount, hasVitaminDEscalationSignal);
  const vitaminDKeyFactors = getBoneAssessmentVitaminDKeyFactors(answers, bmiAbove28);
  const vitaminDImprovementTips = getBoneAssessmentImprovementTips(answers, bmiAbove28);
  const vitaminDGroupLabels = getBoneAssessmentVitaminDGroupLabels(answers, bmiAbove28);
  const vitaminDGroupSummary = getBoneAssessmentVitaminDGroupSummary(answers, bmiAbove28);
  const vitaminDHighlightedFactors = getBoneAssessmentVitaminDHighlightedFactors(answers, bmiAbove28);
  const vitaminDNarrative = getBoneAssessmentVitaminDNarrative(
    vitaminDLevel,
    vitaminDPositiveCount,
    vitaminDGroupLabels,
    vitaminDHighlightedFactors,
  );
  const mainResult = getBoneAssessmentMainResult(iofBand, keyAlertDetails.length > 0);

  return {
    derived: {
      age,
      heightCm,
      weightKg,
      bmi,
      ageAbove40,
      bmiBelow19,
      bmiAbove28,
    },
    osta: {
      index: ostaIndex,
      level: ostaLevel,
      label: getOstaLabel(ostaLevel),
    },
    iof: {
      positiveCount: iofPositiveCount,
      band: iofBand,
      label: getIofLabel(iofBand),
      keyAlerts,
      keyAlertDetails,
    },
    vitaminD: {
      positiveCount: vitaminDPositiveCount,
      level: vitaminDLevel,
      label: getVitaminDLabel(vitaminDLevel),
      keyFactors: vitaminDKeyFactors,
      highlightedFactors: vitaminDHighlightedFactors,
      groupSummary: vitaminDGroupSummary,
      summary: vitaminDNarrative.summary,
      detail: vitaminDNarrative.detail,
      improvementTips: vitaminDImprovementTips,
      disclaimer: boneAssessmentVitaminDDisclaimer,
    },
    mainResult,
  };
}
