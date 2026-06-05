import {
  Phq9AssessmentFieldKey,
  Phq9AssessmentResultLevel,
  Phq9AssessmentResultTone,
  phq9AssessmentDisclaimer,
  phq9AssessmentFields,
  phq9AssessmentHighRiskAlert,
  phq9AssessmentPersonalizedFeedbackCopy,
  phq9AssessmentResultCopy,
  phq9AssessmentResultTitle,
} from './phq9AssessmentContent';
import {
  Phq9AssessmentAnswers,
  createEmptyPhq9AssessmentAnswers,
} from './phq9AssessmentState';

export type Phq9AssessmentResultSummary = {
  title: string;
  score: number;
  level: Phq9AssessmentResultLevel;
  levelLabel: string;
  summary: string;
  advice: string;
  disclaimer: string;
  personalizedFeedback: string[];
  highRiskAlert: string | null;
  needsReferral: boolean;
  tone: Phq9AssessmentResultTone;
};

function getScore(answers: Phq9AssessmentAnswers, field: Phq9AssessmentFieldKey) {
  const score = Number(answers[field]);
  return Number.isFinite(score) ? score : 0;
}

function getTotalScore(answers: Phq9AssessmentAnswers) {
  return phq9AssessmentFields.reduce((total, field) => total + getScore(answers, field), 0);
}

function getLevel(score: number): Phq9AssessmentResultLevel {
  if (score <= 4) {
    return 'minimal';
  }

  if (score <= 9) {
    return 'mild';
  }

  if (score <= 14) {
    return 'moderate';
  }

  if (score <= 19) {
    return 'moderately-severe';
  }

  return 'severe';
}

function getPersonalizedFeedback(answers: Phq9AssessmentAnswers) {
  return phq9AssessmentFields
    .filter((field) => getScore(answers, field) >= 2)
    .map((field) => phq9AssessmentPersonalizedFeedbackCopy[field]);
}

export function createPhq9AssessmentAnswers(
  overrides: Partial<Phq9AssessmentAnswers> = {},
) {
  return createEmptyPhq9AssessmentAnswers({
    phq9LittleInterest: '0',
    phq9LowMood: '0',
    phq9SleepProblem: '0',
    phq9Fatigue: '0',
    phq9AppetiteChange: '0',
    phq9Worthlessness: '0',
    phq9Concentration: '0',
    phq9PsychomotorChange: '0',
    phq9SelfHarmThought: '0',
    ...overrides,
  });
}

export function createSamplePhq9AssessmentAnswers() {
  return createPhq9AssessmentAnswers({
    phq9LittleInterest: '2',
    phq9LowMood: '2',
    phq9SleepProblem: '1',
    phq9Fatigue: '1',
  });
}

export function getPhq9AssessmentResultSummary(
  answers: Phq9AssessmentAnswers,
): Phq9AssessmentResultSummary {
  const score = getTotalScore(answers);
  const level = getLevel(score);
  const copy = phq9AssessmentResultCopy[level];

  return {
    title: phq9AssessmentResultTitle,
    score,
    level,
    levelLabel: copy.levelLabel,
    summary: copy.summary.replace('{{score}}', String(score)),
    advice: copy.advice,
    disclaimer: phq9AssessmentDisclaimer,
    personalizedFeedback: getPersonalizedFeedback(answers),
    highRiskAlert: getScore(answers, 'phq9SelfHarmThought') >= 1 ? phq9AssessmentHighRiskAlert : null,
    needsReferral: score >= 10,
    tone: copy.tone,
  };
}
