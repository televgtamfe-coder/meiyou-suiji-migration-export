import { Phq9AssessmentFieldKey, Phq9AssessmentStepId } from './phq9AssessmentContent';
import { getPhq9AssessmentStep, phq9AssessmentSteps } from './phq9AssessmentSteps';

export type Phq9AssessmentAnswers = Record<Phq9AssessmentFieldKey, string>;

export type Phq9AssessmentDraftSnapshot = {
  currentStep: Phq9AssessmentStepId;
  answers: Phq9AssessmentAnswers;
};

export type Phq9AssessmentState = {
  currentStep: Phq9AssessmentStepId;
  completed: boolean;
  answers: Phq9AssessmentAnswers;
};

const emptyAnswers: Phq9AssessmentAnswers = {
  phq9LittleInterest: '',
  phq9LowMood: '',
  phq9SleepProblem: '',
  phq9Fatigue: '',
  phq9AppetiteChange: '',
  phq9Worthlessness: '',
  phq9Concentration: '',
  phq9PsychomotorChange: '',
  phq9SelfHarmThought: '',
};

export function createEmptyPhq9AssessmentAnswers(
  overrides: Partial<Phq9AssessmentAnswers> = {},
): Phq9AssessmentAnswers {
  return {
    ...emptyAnswers,
    ...overrides,
  };
}

export function createPhq9AssessmentState(
  draft?: Phq9AssessmentDraftSnapshot | null,
): Phq9AssessmentState {
  return {
    currentStep: draft?.currentStep ?? 1,
    completed: false,
    answers: createEmptyPhq9AssessmentAnswers(draft?.answers),
  };
}

export function getCurrentPhq9AssessmentStep(state: Phq9AssessmentState) {
  return phq9AssessmentSteps.find((step) => step.id === state.currentStep) ?? getPhq9AssessmentStep(1);
}

export function getCurrentPhq9AssessmentStepIndex(state: Phq9AssessmentState) {
  return getCurrentPhq9AssessmentStep(state).id;
}

export function getPhq9AssessmentTotalSteps() {
  return phq9AssessmentSteps.length;
}

export function answerPhq9AssessmentField(
  state: Phq9AssessmentState,
  field: Phq9AssessmentFieldKey,
  value: string,
): Phq9AssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function isPhq9AssessmentStepComplete(state: Phq9AssessmentState) {
  const currentStep = getCurrentPhq9AssessmentStep(state);
  return currentStep.fields.every((field) => state.answers[field].trim().length > 0);
}

export function goToNextPhq9AssessmentStep(state: Phq9AssessmentState): Phq9AssessmentState {
  return {
    ...state,
    currentStep: Math.min(
      state.currentStep + 1,
      getPhq9AssessmentTotalSteps(),
    ) as Phq9AssessmentStepId,
  };
}

export function goToPreviousPhq9AssessmentStep(state: Phq9AssessmentState): Phq9AssessmentState {
  return {
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1) as Phq9AssessmentStepId,
  };
}
