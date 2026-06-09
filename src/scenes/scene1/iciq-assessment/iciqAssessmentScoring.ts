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
  const triggers = answers.iciqLeakTriggers;
  const hasStress = triggers.includes('cough') || triggers.includes('exercise');
  const hasUrge = triggers.includes('toilet');

  if (getScore(answers.iciqLeakFrequency) === 0 && getScore(answers.iciqLeakAmount) === 0 && getScore(answers.iciqImpact) === 0) {
    return 'none';
  }

  if (hasStress && hasUrge) {
    return 'mixed';
  }

  if (hasStress) {
    return 'stress';
  }

  if (hasUrge) {
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
): IciqAssessmentResultSummary {
  const score =
    getScore(answers.iciqLeakFrequency) +
    getScore(answers.iciqLeakAmount) +
    getScore(answers.iciqImpact);
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
    tone: copy.tone,
  };
}
