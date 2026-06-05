import {
  Gad7AssessmentFieldKey,
  Gad7AssessmentResultLevel,
  Gad7AssessmentResultTone,
  gad7AssessmentDisclaimer,
  gad7AssessmentFields,
  gad7AssessmentPersonalizedFeedbackCopy,
  gad7AssessmentResultCopy,
  gad7AssessmentResultTitle,
} from './gad7AssessmentContent';
import {
  Gad7AssessmentAnswers,
  createEmptyGad7AssessmentAnswers,
} from './gad7AssessmentState';

export type Gad7AssessmentResultSummary = {
  title: string;
  score: number;
  level: Gad7AssessmentResultLevel;
  levelLabel: string;
  summary: string;
  advice: string;
  disclaimer: string;
  personalizedFeedback: string[];
  needsReferral: boolean;
  tone: Gad7AssessmentResultTone;
};

function getScore(answers: Gad7AssessmentAnswers, field: Gad7AssessmentFieldKey) {
  const score = Number(answers[field]);
  return Number.isFinite(score) ? score : 0;
}

function getTotalScore(answers: Gad7AssessmentAnswers) {
  return gad7AssessmentFields.reduce((total, field) => total + getScore(answers, field), 0);
}

function getLevel(score: number): Gad7AssessmentResultLevel {
  if (score <= 4) {
    return 'minimal';
  }

  if (score <= 9) {
    return 'mild';
  }

  if (score <= 14) {
    return 'moderate';
  }

  return 'severe';
}

function getPersonalizedFeedback(answers: Gad7AssessmentAnswers) {
  return gad7AssessmentFields
    .filter((field) => getScore(answers, field) >= 2)
    .map((field) => gad7AssessmentPersonalizedFeedbackCopy[field]);
}

export function createGad7AssessmentAnswers(
  overrides: Partial<Gad7AssessmentAnswers> = {},
) {
  return createEmptyGad7AssessmentAnswers({
    gad7Nervous: '0',
    gad7UncontrollableWorry: '0',
    gad7ExcessiveWorry: '0',
    gad7TroubleRelaxing: '0',
    gad7Restlessness: '0',
    gad7Irritability: '0',
    gad7FearSomethingAwful: '0',
    ...overrides,
  });
}

export function createSampleGad7AssessmentAnswers() {
  return createGad7AssessmentAnswers({
    gad7Nervous: '2',
    gad7UncontrollableWorry: '1',
    gad7ExcessiveWorry: '1',
    gad7TroubleRelaxing: '1',
  });
}

export function getGad7AssessmentResultSummary(
  answers: Gad7AssessmentAnswers,
): Gad7AssessmentResultSummary {
  const score = getTotalScore(answers);
  const level = getLevel(score);
  const copy = gad7AssessmentResultCopy[level];

  return {
    title: gad7AssessmentResultTitle,
    score,
    level,
    levelLabel: copy.levelLabel,
    summary: copy.summary.replace('{{score}}', String(score)),
    advice: copy.advice,
    disclaimer: gad7AssessmentDisclaimer,
    personalizedFeedback: getPersonalizedFeedback(answers),
    needsReferral: score >= 10,
    tone: copy.tone,
  };
}
