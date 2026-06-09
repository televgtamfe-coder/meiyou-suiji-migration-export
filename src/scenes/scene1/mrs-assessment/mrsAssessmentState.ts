import { MrsAssessmentFieldKey, MrsAssessmentStepId } from './mrsAssessmentContent';
import { getMrsAssessmentStep, mrsAssessmentSteps } from './mrsAssessmentSteps';

export type MrsAssessmentAnswers = Record<MrsAssessmentFieldKey, string>;

export type MrsAssessmentDraftSnapshot = {
  currentStep: MrsAssessmentStepId;
  answers: MrsAssessmentAnswers;
};

export type MrsAssessmentState = {
  currentStep: MrsAssessmentStepId;
  completed: boolean;
  answers: MrsAssessmentAnswers;
};

const emptyAnswers: MrsAssessmentAnswers = {
  mrsHotFlashes: '',
  mrsHeartDiscomfort: '',
  mrsSleepProblem: '',
  mrsDepressiveMood: '',
  mrsIrritability: '',
  mrsAnxiety: '',
  mrsExhaustion: '',
  mrsSexualProblems: '',
  mrsBladderProblems: '',
  mrsVaginalDryness: '',
  mrsJointPain: '',
};

export function createEmptyMrsAssessmentAnswers(
  overrides: Partial<MrsAssessmentAnswers> = {},
): MrsAssessmentAnswers {
  return {
    ...emptyAnswers,
    ...overrides,
  };
}

export function createMrsAssessmentState(draft?: MrsAssessmentDraftSnapshot | null): MrsAssessmentState {
  return {
    currentStep: draft?.currentStep ?? 1,
    completed: false,
    answers: createEmptyMrsAssessmentAnswers(draft?.answers),
  };
}

export function getCurrentMrsAssessmentStep(state: MrsAssessmentState) {
  return mrsAssessmentSteps.find((step) => step.id === state.currentStep) ?? getMrsAssessmentStep(1);
}

export function getCurrentMrsAssessmentStepIndex(state: MrsAssessmentState) {
  return getCurrentMrsAssessmentStep(state).id;
}

export function getMrsAssessmentTotalSteps() {
  return mrsAssessmentSteps.length;
}

export function answerMrsAssessmentField(
  state: MrsAssessmentState,
  field: MrsAssessmentFieldKey,
  value: string,
): MrsAssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function isMrsAssessmentStepComplete(state: MrsAssessmentState) {
  const currentStep = getCurrentMrsAssessmentStep(state);
  return currentStep.fields.every((field) => state.answers[field].trim().length > 0);
}

export function goToNextMrsAssessmentStep(state: MrsAssessmentState): MrsAssessmentState {
  return {
    ...state,
    currentStep: Math.min(state.currentStep + 1, getMrsAssessmentTotalSteps()) as MrsAssessmentStepId,
  };
}

export function goToPreviousMrsAssessmentStep(state: MrsAssessmentState): MrsAssessmentState {
  return {
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1) as MrsAssessmentStepId,
  };
}
