import {
  EmqR13AssessmentFieldKey,
  EmqR13AssessmentResultLevel,
  EmqR13AssessmentResultTone,
  emqR13AssessmentDisclaimer,
  emqR13AssessmentFields,
  emqR13AssessmentPersonalizedFeedbackCopy,
  emqR13AssessmentResultCopy,
  emqR13AssessmentResultTitle,
  emqR13AttentionalTrackingFields,
  emqR13RetrievalFields,
} from './emqR13AssessmentContent';
import {
  EmqR13AssessmentAnswers,
  createEmptyEmqR13AssessmentAnswers,
} from './emqR13AssessmentState';

export type EmqR13AssessmentResultSummary = {
  title: string;
  score: number;
  retrievalScore: number;
  attentionalTrackingScore: number;
  level: EmqR13AssessmentResultLevel;
  levelLabel: string;
  summary: string;
  advice: string;
  disclaimer: string;
  personalizedFeedback: string[];
  needsFurtherEvaluation: boolean;
  tone: EmqR13AssessmentResultTone;
};

function getScore(answers: EmqR13AssessmentAnswers, field: EmqR13AssessmentFieldKey) {
  const score = Number(answers[field]);
  return Number.isFinite(score) ? score : 0;
}

function getTotalScore(answers: EmqR13AssessmentAnswers) {
  return emqR13AssessmentFields.reduce((total, field) => total + getScore(answers, field), 0);
}

function getSubscaleScore(
  answers: EmqR13AssessmentAnswers,
  fields: readonly EmqR13AssessmentFieldKey[],
) {
  return fields.reduce((total, field) => total + getScore(answers, field), 0);
}

function getLevel(
  retrievalScore: number,
  attentionalTrackingScore: number,
  totalScore: number,
): EmqR13AssessmentResultLevel {
  const retrievalFlag = retrievalScore >= 13;
  const attentionFlag = attentionalTrackingScore >= 7;

  if (!retrievalFlag && !attentionFlag) {
    return 'clear';
  }

  if (retrievalFlag !== attentionFlag) {
    return totalScore >= 24 ? 'track' : 'watch';
  }

  if (totalScore >= 30 || retrievalScore >= 18 || attentionalTrackingScore >= 10) {
    return 'evaluate';
  }

  return 'track';
}

function getPersonalizedFeedback(answers: EmqR13AssessmentAnswers) {
  return emqR13AssessmentFields
    .filter((field) => getScore(answers, field) >= 2)
    .map((field) => emqR13AssessmentPersonalizedFeedbackCopy[field]);
}

export function createEmqR13AssessmentAnswers(
  overrides: Partial<EmqR13AssessmentAnswers> = {},
) {
  return createEmptyEmqR13AssessmentAnswers({
    emqR13CheckDone: '0',
    emqR13TimeOrder: '0',
    emqR13ToldByOthers: '0',
    emqR13TipOfTongue: '0',
    emqR13ForgetPlanned: '0',
    emqR13ForgetDetails: '0',
    emqR13ForgetPassingInfo: '0',
    emqR13ForgetJustSaid: '0',
    emqR13LoseStoryline: '0',
    emqR13MixDetails: '0',
    emqR13RepeatSelf: '0',
    emqR13RereadWithoutRealizing: '0',
    emqR13MisplaceItems: '0',
    ...overrides,
  });
}

export function getEmqR13AssessmentResultSummary(
  answers: EmqR13AssessmentAnswers,
): EmqR13AssessmentResultSummary {
  const score = getTotalScore(answers);
  const retrievalScore = getSubscaleScore(answers, emqR13RetrievalFields);
  const attentionalTrackingScore = getSubscaleScore(answers, emqR13AttentionalTrackingFields);
  const level = getLevel(retrievalScore, attentionalTrackingScore, score);
  const copy = emqR13AssessmentResultCopy[level];

  return {
    title: emqR13AssessmentResultTitle,
    score,
    retrievalScore,
    attentionalTrackingScore,
    level,
    levelLabel: copy.levelLabel,
    summary: copy.summary.replace('{{score}}', String(score)),
    advice: copy.advice,
    disclaimer: emqR13AssessmentDisclaimer,
    personalizedFeedback: getPersonalizedFeedback(answers),
    needsFurtherEvaluation: level === 'evaluate',
    tone: copy.tone,
  };
}
