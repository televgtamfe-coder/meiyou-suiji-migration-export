import {
  MrsAssessmentFieldKey,
  MrsAssessmentResultLevel,
  MrsAssessmentResultTone,
  mrsAssessmentDisclaimer,
  mrsAssessmentFields,
  mrsAssessmentResultCopy,
  mrsAssessmentResultTitle,
} from './mrsAssessmentContent';
import { MrsAssessmentAnswers, createEmptyMrsAssessmentAnswers } from './mrsAssessmentState';

export type MrsAssessmentDimensionKey = 'somatic' | 'psychological' | 'urogenital';

export type MrsAssessmentResultSummary = {
  title: string;
  score: number;
  level: MrsAssessmentResultLevel;
  levelLabel: string;
  summary: string;
  advice: string;
  disclaimer: string;
  somaticScore: number;
  psychologicalScore: number;
  urogenitalScore: number;
  severeDimensions: MrsAssessmentDimensionKey[];
  tone: MrsAssessmentResultTone;
};

const somaticFields: MrsAssessmentFieldKey[] = [
  'mrsHotFlashes',
  'mrsHeartDiscomfort',
  'mrsSleepProblem',
  'mrsJointPain',
];
const psychologicalFields: MrsAssessmentFieldKey[] = [
  'mrsDepressiveMood',
  'mrsIrritability',
  'mrsAnxiety',
  'mrsExhaustion',
];
const urogenitalFields: MrsAssessmentFieldKey[] = [
  'mrsSexualProblems',
  'mrsBladderProblems',
  'mrsVaginalDryness',
];

function getScore(answers: MrsAssessmentAnswers, field: MrsAssessmentFieldKey) {
  const score = Number(answers[field]);
  return Number.isFinite(score) ? score : 0;
}

function getDimensionScore(answers: MrsAssessmentAnswers, fields: MrsAssessmentFieldKey[]) {
  return fields.reduce((total, field) => total + getScore(answers, field), 0);
}

function getLevel(score: number): MrsAssessmentResultLevel {
  if (score <= 3) {
    return 'minimal';
  }

  if (score <= 6) {
    return 'mild';
  }

  if (score <= 11) {
    return 'moderate';
  }

  return 'severe';
}

function getSevereDimensions(
  somaticScore: number,
  psychologicalScore: number,
  urogenitalScore: number,
): MrsAssessmentDimensionKey[] {
  const severeDimensions: MrsAssessmentDimensionKey[] = [];

  if (somaticScore >= 6) {
    severeDimensions.push('somatic');
  }

  if (psychologicalScore >= 4) {
    severeDimensions.push('psychological');
  }

  if (urogenitalScore >= 2) {
    severeDimensions.push('urogenital');
  }

  return severeDimensions;
}

export function createMrsAssessmentAnswers(overrides: Partial<MrsAssessmentAnswers> = {}) {
  return createEmptyMrsAssessmentAnswers({
    mrsHotFlashes: '0',
    mrsHeartDiscomfort: '0',
    mrsSleepProblem: '0',
    mrsDepressiveMood: '0',
    mrsIrritability: '0',
    mrsAnxiety: '0',
    mrsExhaustion: '0',
    mrsSexualProblems: '0',
    mrsBladderProblems: '0',
    mrsVaginalDryness: '0',
    mrsJointPain: '0',
    ...overrides,
  });
}

export function getMrsAssessmentResultSummary(answers: MrsAssessmentAnswers): MrsAssessmentResultSummary {
  const score = mrsAssessmentFields.reduce((total, field) => total + getScore(answers, field), 0);
  const somaticScore = getDimensionScore(answers, somaticFields);
  const psychologicalScore = getDimensionScore(answers, psychologicalFields);
  const urogenitalScore = getDimensionScore(answers, urogenitalFields);
  const severeDimensions = getSevereDimensions(somaticScore, psychologicalScore, urogenitalScore);
  const level = getLevel(score);
  const copy = mrsAssessmentResultCopy[level];

  return {
    title: mrsAssessmentResultTitle,
    score,
    level,
    levelLabel: copy.levelLabel,
    summary: copy.summary.replace('{{score}}', String(score)),
    advice: copy.advice,
    disclaimer: mrsAssessmentDisclaimer,
    somaticScore,
    psychologicalScore,
    urogenitalScore,
    severeDimensions,
    tone: copy.tone,
  };
}
