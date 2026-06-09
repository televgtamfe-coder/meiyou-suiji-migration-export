import { PsqiAssessmentFieldKey, PsqiAssessmentStepId } from './psqiAssessmentContent';
import { getPsqiAssessmentStep, psqiAssessmentSteps } from './psqiAssessmentSteps';

export type PsqiAssessmentAnswers = Record<PsqiAssessmentFieldKey, string>;

export type PsqiAssessmentDraftSnapshot = {
  currentStep: PsqiAssessmentStepId;
  answers: PsqiAssessmentAnswers;
};

export type PsqiAssessmentState = {
  currentStep: PsqiAssessmentStepId;
  completed: boolean;
  answers: PsqiAssessmentAnswers;
};

const emptyAnswers: PsqiAssessmentAnswers = {
  psqiBedTime: '',
  psqiSleepLatencyMinutes: '',
  psqiWakeTime: '',
  psqiSleepDurationHours: '',
  psqiSleepDisturbanceFallingAsleep: '',
  psqiSleepDisturbanceWakeUp: '',
  psqiSleepDisturbanceBathroom: '',
  psqiSleepDisturbanceBreathing: '',
  psqiSleepDisturbanceSnoring: '',
  psqiSleepDisturbanceCold: '',
  psqiSleepDisturbanceHot: '',
  psqiSleepDisturbanceDreams: '',
  psqiSleepDisturbancePain: '',
  psqiSleepDisturbanceOther: '',
  psqiSleepDisturbanceOtherText: '',
  psqiSubjectiveQuality: '',
  psqiSleepMedication: '',
  psqiDaytimeSleepiness: '',
  psqiDaytimeEnthusiasm: '',
};

export function createEmptyPsqiAssessmentAnswers(
  overrides: Partial<PsqiAssessmentAnswers> = {},
): PsqiAssessmentAnswers {
  return {
    ...emptyAnswers,
    ...overrides,
  };
}

export function createPsqiAssessmentState(
  draft?: PsqiAssessmentDraftSnapshot | null,
): PsqiAssessmentState {
  return {
    currentStep: draft?.currentStep ?? 1,
    completed: false,
    answers: createEmptyPsqiAssessmentAnswers(draft?.answers),
  };
}

export function getCurrentPsqiAssessmentStep(state: PsqiAssessmentState) {
  return psqiAssessmentSteps.find((step) => step.id === state.currentStep) ?? getPsqiAssessmentStep(1);
}

export function getCurrentPsqiAssessmentStepIndex(state: PsqiAssessmentState) {
  return getCurrentPsqiAssessmentStep(state).id;
}

export function getPsqiAssessmentTotalSteps() {
  return psqiAssessmentSteps.length;
}

export function answerPsqiAssessmentField(
  state: PsqiAssessmentState,
  field: PsqiAssessmentFieldKey,
  value: string,
): PsqiAssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function isPsqiAssessmentStepComplete(state: PsqiAssessmentState) {
  const currentStep = getCurrentPsqiAssessmentStep(state);
  return currentStep.fields.every((field) => state.answers[field].trim().length > 0);
}

export function goToNextPsqiAssessmentStep(state: PsqiAssessmentState): PsqiAssessmentState {
  return {
    ...state,
    currentStep: Math.min(state.currentStep + 1, getPsqiAssessmentTotalSteps()) as PsqiAssessmentStepId,
  };
}

export function goToPreviousPsqiAssessmentStep(state: PsqiAssessmentState): PsqiAssessmentState {
  return {
    ...state,
    currentStep: Math.max(state.currentStep - 1, 1) as PsqiAssessmentStepId,
  };
}
