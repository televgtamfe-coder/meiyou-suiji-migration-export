import { AssessmentFieldKey, AssessmentStepId, getAssessmentStep } from './assessmentSteps';

export type AssessmentAnswers = Record<AssessmentFieldKey, string>;

export type Scene1AssessmentState = {
  entryModalOpen: boolean;
  assessmentOpen: boolean;
  currentStep: AssessmentStepId;
  completed: boolean;
  answers: AssessmentAnswers;
};

const emptyAnswers: AssessmentAnswers = {
  age: '',
  heightCm: '',
  weightKg: '',
  periodPresence: '',
  cycleChange: '',
  cycleAbsentDuration: '',
  volumeChange: '',
  lastPeriodDate: '',
  lastPeriodQuickOption: '',
  ovarianFailure: '',
  surgeryHistory: '',
  hormonalContraception: '',
  hormoneReplacementTherapy: '',
  kmiHotFlashes: '',
  kmiParesthesia: '',
  kmiInsomnia: '',
  kmiNervousness: '',
  kmiMelancholia: '',
  kmiVertigo: '',
  kmiFatigue: '',
  kmiJointPain: '',
  kmiHeadache: '',
  kmiPalpitations: '',
  kmiFormication: '',
  kmiSexualImpact: '',
  kmiUrinarySymptoms: '',
};

export function createAssessmentState(): Scene1AssessmentState {
  return {
    entryModalOpen: true,
    assessmentOpen: false,
    currentStep: 1,
    completed: false,
    answers: { ...emptyAnswers },
  };
}

export function createAssessmentStateWithoutEntry(): Scene1AssessmentState {
  return {
    ...createAssessmentState(),
    entryModalOpen: false,
    assessmentOpen: false,
  };
}

export function openAssessmentFlow(state: Scene1AssessmentState): Scene1AssessmentState {
  return {
    ...state,
    entryModalOpen: false,
    assessmentOpen: true,
    currentStep: 1,
    completed: false,
  };
}

export function closeAssessmentFlow(_state?: Scene1AssessmentState): Scene1AssessmentState {
  return createAssessmentState();
}

export function dismissEntryModal(state: Scene1AssessmentState): Scene1AssessmentState {
  return {
    ...state,
    entryModalOpen: false,
  };
}

export function exitAssessmentFlow(state: Scene1AssessmentState): Scene1AssessmentState {
  return {
    ...state,
    entryModalOpen: false,
    assessmentOpen: false,
    completed: false,
    currentStep: 1,
  };
}

export function answerAssessmentField(
  state: Scene1AssessmentState,
  field: AssessmentFieldKey,
  value: string
): Scene1AssessmentState {
  const nextAnswers = {
    ...state.answers,
    [field]: value,
  };

  if (field === 'cycleChange' && value !== 'absent') {
    nextAnswers.cycleAbsentDuration = '';
  }

  return {
    ...state,
    answers: nextAnswers,
  };
}

export function isAssessmentStepComplete(state: Scene1AssessmentState): boolean {
  const step = getAssessmentStep(state.currentStep);

  const baseComplete = step.requiredFields.every((field) => state.answers[field].trim().length > 0);

  if (!baseComplete) {
    return false;
  }

  if (state.currentStep === 2 && state.answers.cycleChange === 'absent') {
    return state.answers.cycleAbsentDuration.trim().length > 0;
  }

  return true;
}

export function goToNextAssessmentStep(state: Scene1AssessmentState): Scene1AssessmentState {
  return {
    ...state,
    currentStep: Math.min(5, state.currentStep + 1) as AssessmentStepId,
  };
}

export function goToPreviousAssessmentStep(state: Scene1AssessmentState): Scene1AssessmentState {
  return {
    ...state,
    currentStep: Math.max(1, state.currentStep - 1) as AssessmentStepId,
  };
}

export function completeAssessment(state: Scene1AssessmentState): Scene1AssessmentState {
  return {
    ...state,
    completed: true,
    assessmentOpen: true,
  };
}

export function reopenAssessmentFromCompletion(state: Scene1AssessmentState): Scene1AssessmentState {
  return {
    ...state,
    currentStep: 5,
    completed: false,
    assessmentOpen: true,
  };
}
