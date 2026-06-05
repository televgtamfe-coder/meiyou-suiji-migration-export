import { ExerciseAssessmentFieldKey, ExerciseAssessmentStepId } from './exerciseAssessmentContent';
import { exerciseAssessmentSteps, getExerciseAssessmentStep } from './exerciseAssessmentSteps';

export type ExerciseAssessmentAnswers = Record<ExerciseAssessmentFieldKey, string>;

export type ExerciseAssessmentDraftSnapshot = {
  currentStep: ExerciseAssessmentStepId;
  answers: ExerciseAssessmentAnswers;
};

export type ExerciseAssessmentState = {
  currentStep: ExerciseAssessmentStepId;
  completed: boolean;
  answers: ExerciseAssessmentAnswers;
};

const emptyAnswers: ExerciseAssessmentAnswers = {
  exerciseHeartDiseaseOrHypertension: '',
  exerciseChestPain: '',
  exerciseDizzinessOrSyncope: '',
  exerciseOtherChronicDisease: '',
  exercisePrescriptionMedication: '',
  exerciseBoneJointSoftTissueIssue: '',
  exerciseMedicalSupervisionOnly: '',
};

export function createEmptyExerciseAssessmentAnswers(
  overrides: Partial<ExerciseAssessmentAnswers> = {},
): ExerciseAssessmentAnswers {
  return {
    ...emptyAnswers,
    ...overrides,
  };
}

export function createExerciseAssessmentState(
  draft?: ExerciseAssessmentDraftSnapshot | null,
): ExerciseAssessmentState {
  return {
    currentStep: draft?.currentStep ?? 1,
    completed: false,
    answers: createEmptyExerciseAssessmentAnswers(draft?.answers),
  };
}

export function getCurrentExerciseAssessmentStep(state: ExerciseAssessmentState) {
  return exerciseAssessmentSteps.find((step) => step.id === state.currentStep) ?? getExerciseAssessmentStep(1);
}

export function getCurrentExerciseAssessmentStepIndex(state: ExerciseAssessmentState) {
  return getCurrentExerciseAssessmentStep(state).id;
}

export function getExerciseAssessmentTotalSteps() {
  return exerciseAssessmentSteps.length;
}

export function answerExerciseAssessmentField(
  state: ExerciseAssessmentState,
  field: ExerciseAssessmentFieldKey,
  value: string,
): ExerciseAssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function isExerciseAssessmentStepComplete(state: ExerciseAssessmentState) {
  const currentStep = getCurrentExerciseAssessmentStep(state);
  return currentStep.fields.every((field) => state.answers[field].trim().length > 0);
}

export function goToNextExerciseAssessmentStep(state: ExerciseAssessmentState): ExerciseAssessmentState {
  return {
    ...state,
    currentStep: Math.min(
      state.currentStep + 1,
      getExerciseAssessmentTotalSteps(),
    ) as ExerciseAssessmentStepId,
  };
}

export function goToPreviousExerciseAssessmentStep(state: ExerciseAssessmentState): ExerciseAssessmentState {
  return {
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1) as ExerciseAssessmentStepId,
  };
}
