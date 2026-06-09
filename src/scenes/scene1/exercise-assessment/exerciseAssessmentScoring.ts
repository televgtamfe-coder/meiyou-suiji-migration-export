import {
  exerciseAssessmentCriticalAlertFields,
  exerciseAssessmentDisclaimer,
  exerciseAssessmentExplanation,
  exerciseAssessmentFieldCopyMap,
  exerciseAssessmentFields,
  exerciseAssessmentResultCopy,
  ExerciseAssessmentFieldKey,
  ExerciseAssessmentResultLevel,
  ExerciseAssessmentResultTone,
  exerciseAssessmentTitle,
} from './exerciseAssessmentContent';
import {
  ExerciseAssessmentAnswers,
} from './exerciseAssessmentState';

export type ExerciseAssessmentResultSummary = {
  title: string;
  positiveCount: number;
  level: ExerciseAssessmentResultLevel;
  resultSummary: string;
  summaryText: string;
  resultExplanation: string;
  detail: string;
  nextStepLabel: string;
  nextStepAdvice: string;
  disclaimer: string;
  hitQuestionLabels: string[];
  criticalAlerts: string[];
  tone: ExerciseAssessmentResultTone;
};

function getPositiveFields(answers: ExerciseAssessmentAnswers) {
  return exerciseAssessmentFields.filter((field) => answers[field] === 'yes');
}

function getLevel(
  positiveFields: ExerciseAssessmentFieldKey[],
  criticalAlertFields: ExerciseAssessmentFieldKey[],
): ExerciseAssessmentResultLevel {
  if (positiveFields.length === 0) {
    return 'ready';
  }

  if (criticalAlertFields.length > 0 || positiveFields.length > 0) {
    return 'restricted';
  }

  return 'ready';
}

function getDetail(level: ExerciseAssessmentResultLevel, positiveCount: number, criticalAlerts: string[]) {
  if (level === 'ready') {
    return '本次 7 项均为“否”，目前未见明显运动禁忌信号，可从中等强度以下的体力活动循序渐进开始。';
  }

  if (level === 'caution') {
    return '本次命中 1 项，主要集中在骨骼、关节或软组织限制上。当前更适合从低冲击、可控强度的运动开始，先观察身体反馈。';
  }

  if (level === 'consult') {
    return `本次命中 ${positiveCount} 项，提示目前存在需要先做健康确认的慢病、血压、心脏或用药因素。虽然这不等于完全不能运动，但直接开展高强度运动并不稳妥。`;
  }

  if (criticalAlerts.length > 0) {
    return `本次命中了需要优先重视的风险信号：${criticalAlerts.join('；')}。在医生或专业人员确认前，不建议自行开始高强度运动。`;
  }

  return `本次共命中 ${positiveCount} 项阳性提示，已经超过低风险起步范围。请先做专业确认，再决定运动方案会更安全。`;
}

export function createExerciseAssessmentAnswers(
  overrides: Partial<ExerciseAssessmentAnswers> = {},
) {
  return {
    ...negativeAnswers,
    ...overrides,
  };
}

export function createSampleExerciseAssessmentAnswers() {
  return createExerciseAssessmentAnswers({
    exerciseBoneJointSoftTissueIssue: 'yes',
  });
}

export function getExerciseAssessmentResultSummary(
  answers: ExerciseAssessmentAnswers,
): ExerciseAssessmentResultSummary {
  const positiveFields = getPositiveFields(answers);
  const criticalAlertFields = exerciseAssessmentCriticalAlertFields.filter(
    (field) => answers[field] === 'yes',
  );
  const hitQuestionLabels = positiveFields.map((field) => exerciseAssessmentFieldCopyMap[field].label);
  const criticalAlerts = criticalAlertFields.map((field) => exerciseAssessmentFieldCopyMap[field].label);
  const level = getLevel(positiveFields, criticalAlertFields);
  const copy = exerciseAssessmentResultCopy[level];

  return {
    title: exerciseAssessmentTitle,
    positiveCount: positiveFields.length,
    level,
    resultSummary: copy.resultSummary,
    summaryText: copy.summaryText,
    resultExplanation: exerciseAssessmentExplanation,
    detail: getDetail(level, positiveFields.length, criticalAlerts),
    nextStepLabel: copy.nextStepLabel,
    nextStepAdvice: copy.nextStepAdvice,
    disclaimer: exerciseAssessmentDisclaimer,
    hitQuestionLabels,
    criticalAlerts,
    tone: copy.tone,
  };
}
const negativeAnswers: ExerciseAssessmentAnswers = {
  exerciseHeartDiseaseOrHypertension: 'no',
  exerciseChestPain: 'no',
  exerciseDizzinessOrSyncope: 'no',
  exerciseOtherChronicDisease: 'no',
  exercisePrescriptionMedication: 'no',
  exerciseBoneJointSoftTissueIssue: 'no',
  exerciseMedicalSupervisionOnly: 'no',
};
