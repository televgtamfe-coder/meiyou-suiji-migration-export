import {
  IciqAssessmentLeakageType,
  IciqAssessmentResultLevel,
  IciqAssessmentResultTone,
  iciqAssessmentDisclaimer,
  iciqAssessmentResultCopy,
  iciqAssessmentResultTitle,
} from './iciqAssessmentContent';
import { IciqAssessmentAnswers, createEmptyIciqAssessmentAnswers } from './iciqAssessmentState';

export type IciqAssessmentResultSummary = {
  title: string;
  score: number;
  level: IciqAssessmentResultLevel;
  levelLabel: string;
  summary: string;
  advice: string;
  disclaimer: string;
  leakageType: IciqAssessmentLeakageType;
  leakageTypeLabel: string;
  typeInsight: string;
  urgentFlags: string[];
  retestFeedback: {
    label: string;
    summary: string;
    delta: number;
  } | null;
  tone: IciqAssessmentResultTone;
};

function getScore(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getLevel(score: number): IciqAssessmentResultLevel {
  if (score === 0) {
    return 'none';
  }

  if (score <= 5) {
    return 'mild';
  }

  if (score <= 12) {
    return 'moderate';
  }

  if (score <= 18) {
    return 'severe';
  }

  return 'very-severe';
}

function getLeakageType(answers: IciqAssessmentAnswers): IciqAssessmentLeakageType {
  const triggers = answers.iciqLeakTriggers.filter((item) => item !== 'none');
  const hasStress = triggers.includes('cough') || triggers.includes('exercise');
  const hasUrge = triggers.includes('toilet');
  const hasOtherTrigger = triggers.some(
    (item) => item !== 'cough' && item !== 'exercise' && item !== 'toilet',
  );

  if (getScore(answers.iciqLeakFrequency) === 0 && getScore(answers.iciqLeakAmount) === 0 && getScore(answers.iciqImpact) === 0) {
    return 'none';
  }

  if (!hasOtherTrigger && hasStress && hasUrge) {
    return 'mixed';
  }

  if (!hasOtherTrigger && hasStress && !hasUrge) {
    return 'stress';
  }

  if (!hasOtherTrigger && hasUrge && triggers.length === 1) {
    return 'urge';
  }

  return 'other';
}

function getLeakageTypeLabel(type: IciqAssessmentLeakageType) {
  if (type === 'none') {
    return '暂未见明显漏尿类型线索';
  }

  if (type === 'stress') {
    return '更像压力性漏尿线索';
  }

  if (type === 'urge') {
    return '更像急迫性漏尿线索';
  }

  if (type === 'mixed') {
    return '更像混合性漏尿线索';
  }

  return '存在其他漏尿线索';
}

function getTypeInsight(answers: IciqAssessmentAnswers, leakageType: IciqAssessmentLeakageType) {
  const triggers = answers.iciqLeakTriggers;
  const hasPersistentTrigger = triggers.includes('no-reason') || triggers.includes('always');

  if (leakageType === 'mixed') {
    return '你的表现可能同时包含压力性和急迫性漏尿线索，这在围绝经期女性中较常见。';
  }

  if (leakageType === 'stress') {
    return '你的表现更像压力性漏尿线索，常见于咳嗽、打喷嚏或跑跳等腹压增加时。';
  }

  if (leakageType === 'urge') {
    return '你的表现更像急迫性漏尿线索，常见于尿意来得急、来不及到厕所时。';
  }

  if (hasPersistentTrigger) {
    return '你的症状提示持续性影响更明显，建议尽快进行专业评估。';
  }

  return '建议继续观察更常见的触发场景，并在需要时进一步评估尿失禁类型。';
}

function getUrgentFlags(answers: IciqAssessmentAnswers) {
  const flags: string[] = [];

  if (answers.iciqLeakTriggers.includes('no-reason')) {
    flags.push('无明显原因就漏尿');
  }

  if (answers.iciqLeakTriggers.includes('always')) {
    flags.push('一直有漏尿');
  }

  return flags;
}

function getTotalScore(answers: IciqAssessmentAnswers) {
  return (
    getScore(answers.iciqLeakFrequency) +
    getScore(answers.iciqLeakAmount) +
    getScore(answers.iciqImpact)
  );
}

function getRetestFeedback(score: number, previousAnswers?: IciqAssessmentAnswers | null) {
  if (!previousAnswers) {
    return null;
  }

  const previousScore = getTotalScore(previousAnswers);
  const delta = score - previousScore;

  if (delta <= -4) {
    return {
      label: '较明显改善',
      summary: '和上次相比，你的症状评分已有明显下降，说明当前困扰在减轻，建议继续保持现有干预节奏。',
      delta,
    };
  }

  if (delta <= -1) {
    return {
      label: '轻度改善',
      summary: '和上次相比，你的症状有一定改善，但变化幅度还不算大，建议继续观察接下来几周的变化。',
      delta,
    };
  }

  if (delta >= 2) {
    return {
      label: '可能加重',
      summary: '和上次相比，你的漏尿症状有加重趋势，建议回顾近期诱因，并考虑尽快进行专业评估。',
      delta,
    };
  }

  return {
    label: '基本稳定',
    summary: '和上次相比，你的症状整体较稳定；如果已经开始干预，通常还需要更多时间继续观察。',
    delta,
  };
}

export function createIciqAssessmentAnswers(
  overrides: Partial<IciqAssessmentAnswers> = {},
) {
  return createEmptyIciqAssessmentAnswers({
    iciqLeakFrequency: '0',
    iciqLeakAmount: '0',
    iciqImpact: '0',
    iciqLeakTriggers: [],
    ...overrides,
  });
}

export function getIciqAssessmentResultSummary(
  answers: IciqAssessmentAnswers,
  previousAnswers?: IciqAssessmentAnswers | null,
): IciqAssessmentResultSummary {
  const score = getTotalScore(answers);
  const level = getLevel(score);
  const copy = iciqAssessmentResultCopy[level];
  const leakageType = getLeakageType(answers);
  const urgentFlags = getUrgentFlags(answers);

  return {
    title: iciqAssessmentResultTitle,
    score,
    level,
    levelLabel: copy.levelLabel,
    summary: copy.summary,
    advice: copy.advice,
    disclaimer: iciqAssessmentDisclaimer,
    leakageType,
    leakageTypeLabel: getLeakageTypeLabel(leakageType),
    typeInsight: getTypeInsight(answers, leakageType),
    urgentFlags,
    retestFeedback: getRetestFeedback(score, previousAnswers),
    tone: copy.tone,
  };
}
