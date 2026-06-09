import {
  IciqAssessmentFieldKey,
  IciqAssessmentStepId,
  IciqLeakTrigger,
} from './iciqAssessmentContent';
import { getIciqAssessmentStep, iciqAssessmentSteps } from './iciqAssessmentSteps';

export type IciqAssessmentAnswers = {
  iciqLeakFrequency: string;
  iciqLeakAmount: string;
  iciqImpact: string;
  iciqLeakTriggers: IciqLeakTrigger[];
};

export type IciqAssessmentDraftSnapshot = {
  currentStep: IciqAssessmentStepId;
  answers: IciqAssessmentAnswers;
};

export type IciqAssessmentState = {
  currentStep: IciqAssessmentStepId;
  completed: boolean;
  answers: IciqAssessmentAnswers;
};

const emptyAnswers: IciqAssessmentAnswers = {
  iciqLeakFrequency: '',
  iciqLeakAmount: '',
  iciqImpact: '',
  iciqLeakTriggers: [],
};

export function createEmptyIciqAssessmentAnswers(
  overrides: Partial<IciqAssessmentAnswers> = {},
): IciqAssessmentAnswers {
  return {
    ...emptyAnswers,
    ...overrides,
  };
}

export function createIciqAssessmentState(
  draft?: IciqAssessmentDraftSnapshot | null,
): IciqAssessmentState {
  return {
    currentStep: draft?.currentStep ?? 1,
    completed: false,
    answers: createEmptyIciqAssessmentAnswers(draft?.answers),
  };
}

export function getCurrentIciqAssessmentStep(state: IciqAssessmentState) {
  return iciqAssessmentSteps.find((step) => step.id === state.currentStep) ?? getIciqAssessmentStep(1);
}

export function getCurrentIciqAssessmentStepIndex(state: IciqAssessmentState) {
  return getCurrentIciqAssessmentStep(state).id;
}

export function getIciqAssessmentTotalSteps() {
  return iciqAssessmentSteps.length;
}

export function answerIciqAssessmentField(
  state: IciqAssessmentState,
  field: Exclude<IciqAssessmentFieldKey, 'iciqLeakTriggers'>,
  value: string,
): IciqAssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function toggleIciqAssessmentTrigger(
  state: IciqAssessmentState,
  trigger: IciqLeakTrigger,
): IciqAssessmentState {
  const currentTriggers = state.answers.iciqLeakTriggers;
  const hasTrigger = currentTriggers.includes(trigger);

  if (trigger === 'none') {
    return {
      ...state,
      answers: {
        ...state.answers,
        iciqLeakTriggers: hasTrigger ? [] : ['none'],
      },
    };
  }

  const nextTriggers = hasTrigger
    ? currentTriggers.filter((item) => item !== trigger)
    : [...currentTriggers.filter((item) => item !== 'none'), trigger];

  return {
    ...state,
    answers: {
      ...state.answers,
      iciqLeakTriggers: nextTriggers,
    },
  };
}

export function isIciqAssessmentStepComplete(state: IciqAssessmentState) {
  const currentStep = getCurrentIciqAssessmentStep(state);

  return currentStep.fields.every((field) => {
    if (field === 'iciqLeakTriggers') {
      return state.answers.iciqLeakTriggers.length > 0;
    }

    return state.answers[field].trim().length > 0;
  });
}

export function goToNextIciqAssessmentStep(state: IciqAssessmentState): IciqAssessmentState {
  return {
    ...state,
    currentStep: Math.min(state.currentStep + 1, getIciqAssessmentTotalSteps()) as IciqAssessmentStepId,
  };
}

export function goToPreviousIciqAssessmentStep(state: IciqAssessmentState): IciqAssessmentState {
  return {
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1) as IciqAssessmentStepId,
  };
}
