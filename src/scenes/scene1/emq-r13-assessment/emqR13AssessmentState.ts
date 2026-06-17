import { EmqR13AssessmentFieldKey, EmqR13AssessmentStepId } from './emqR13AssessmentContent';
import { emqR13AssessmentSteps, getEmqR13AssessmentStep } from './emqR13AssessmentSteps';

export type EmqR13AssessmentAnswers = Record<EmqR13AssessmentFieldKey, string>;

export type EmqR13AssessmentDraftSnapshot = {
  currentStep: EmqR13AssessmentStepId;
  answers: EmqR13AssessmentAnswers;
};

export type EmqR13AssessmentState = {
  currentStep: EmqR13AssessmentStepId;
  completed: boolean;
  answers: EmqR13AssessmentAnswers;
};

const emptyAnswers: EmqR13AssessmentAnswers = {
  emqR13CheckDone: '',
  emqR13TimeOrder: '',
  emqR13ToldByOthers: '',
  emqR13TipOfTongue: '',
  emqR13ForgetPlanned: '',
  emqR13ForgetDetails: '',
  emqR13ForgetPassingInfo: '',
  emqR13ForgetJustSaid: '',
  emqR13LoseStoryline: '',
  emqR13MixDetails: '',
  emqR13RepeatSelf: '',
  emqR13RereadWithoutRealizing: '',
  emqR13MisplaceItems: '',
};

export function createEmptyEmqR13AssessmentAnswers(
  overrides: Partial<EmqR13AssessmentAnswers> = {},
): EmqR13AssessmentAnswers {
  return {
    ...emptyAnswers,
    ...overrides,
  };
}

export function createEmqR13AssessmentState(
  draft?: EmqR13AssessmentDraftSnapshot | null,
): EmqR13AssessmentState {
  return {
    currentStep: draft?.currentStep ?? 1,
    completed: false,
    answers: createEmptyEmqR13AssessmentAnswers(draft?.answers),
  };
}

export function getCurrentEmqR13AssessmentStep(state: EmqR13AssessmentState) {
  return emqR13AssessmentSteps.find((step) => step.id === state.currentStep) ?? getEmqR13AssessmentStep(1);
}

export function getCurrentEmqR13AssessmentStepIndex(state: EmqR13AssessmentState) {
  return getCurrentEmqR13AssessmentStep(state).id;
}

export function getEmqR13AssessmentTotalSteps() {
  return emqR13AssessmentSteps.length;
}

export function answerEmqR13AssessmentField(
  state: EmqR13AssessmentState,
  field: EmqR13AssessmentFieldKey,
  value: string,
): EmqR13AssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function isEmqR13AssessmentStepComplete(state: EmqR13AssessmentState) {
  const currentStep = getCurrentEmqR13AssessmentStep(state);
  return currentStep.fields.every((field) => state.answers[field].trim().length > 0);
}

export function goToNextEmqR13AssessmentStep(state: EmqR13AssessmentState): EmqR13AssessmentState {
  return {
    ...state,
    currentStep: Math.min(state.currentStep + 1, getEmqR13AssessmentTotalSteps()) as EmqR13AssessmentStepId,
  };
}

export function goToPreviousEmqR13AssessmentStep(state: EmqR13AssessmentState): EmqR13AssessmentState {
  return {
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1) as EmqR13AssessmentStepId,
  };
}
