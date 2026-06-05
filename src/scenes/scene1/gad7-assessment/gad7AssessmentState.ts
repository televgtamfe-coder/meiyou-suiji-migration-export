import { Gad7AssessmentFieldKey, Gad7AssessmentStepId } from './gad7AssessmentContent';
import { gad7AssessmentSteps, getGad7AssessmentStep } from './gad7AssessmentSteps';

export type Gad7AssessmentAnswers = Record<Gad7AssessmentFieldKey, string>;

export type Gad7AssessmentDraftSnapshot = {
  currentStep: Gad7AssessmentStepId;
  answers: Gad7AssessmentAnswers;
};

export type Gad7AssessmentState = {
  currentStep: Gad7AssessmentStepId;
  completed: boolean;
  answers: Gad7AssessmentAnswers;
};

const emptyAnswers: Gad7AssessmentAnswers = {
  gad7Nervous: '',
  gad7UncontrollableWorry: '',
  gad7ExcessiveWorry: '',
  gad7TroubleRelaxing: '',
  gad7Restlessness: '',
  gad7Irritability: '',
  gad7FearSomethingAwful: '',
};

export function createEmptyGad7AssessmentAnswers(
  overrides: Partial<Gad7AssessmentAnswers> = {},
): Gad7AssessmentAnswers {
  return {
    ...emptyAnswers,
    ...overrides,
  };
}

export function createGad7AssessmentState(
  draft?: Gad7AssessmentDraftSnapshot | null,
): Gad7AssessmentState {
  return {
    currentStep: draft?.currentStep ?? 1,
    completed: false,
    answers: createEmptyGad7AssessmentAnswers(draft?.answers),
  };
}

export function getCurrentGad7AssessmentStep(state: Gad7AssessmentState) {
  return gad7AssessmentSteps.find((step) => step.id === state.currentStep) ?? getGad7AssessmentStep(1);
}

export function getCurrentGad7AssessmentStepIndex(state: Gad7AssessmentState) {
  return getCurrentGad7AssessmentStep(state).id;
}

export function getGad7AssessmentTotalSteps() {
  return gad7AssessmentSteps.length;
}

export function answerGad7AssessmentField(
  state: Gad7AssessmentState,
  field: Gad7AssessmentFieldKey,
  value: string,
): Gad7AssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function isGad7AssessmentStepComplete(state: Gad7AssessmentState) {
  const currentStep = getCurrentGad7AssessmentStep(state);
  return currentStep.fields.every((field) => state.answers[field].trim().length > 0);
}

export function goToNextGad7AssessmentStep(state: Gad7AssessmentState): Gad7AssessmentState {
  return {
    ...state,
    currentStep: Math.min(
      state.currentStep + 1,
      getGad7AssessmentTotalSteps(),
    ) as Gad7AssessmentStepId,
  };
}

export function goToPreviousGad7AssessmentStep(state: Gad7AssessmentState): Gad7AssessmentState {
  return {
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1) as Gad7AssessmentStepId,
  };
}
