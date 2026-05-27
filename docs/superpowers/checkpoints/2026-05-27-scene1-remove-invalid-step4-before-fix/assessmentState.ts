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
  birthDate: '',
  heightCm: '',
  weightKg: '',
  periodPresence: '',
  cycleChange: '',
  volumeChange: '',
  lastPeriodDate: '',
  lastPeriodQuickOption: '',
  symptomLevel: '',
  emotionLevel: '',
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

export function answerAssessmentField(
  state: Scene1AssessmentState,
  field: AssessmentFieldKey,
  value: string
): Scene1AssessmentState {
  return {
    ...state,
    answers: {
      ...state.answers,
      [field]: value,
    },
  };
}

export function isAssessmentStepComplete(state: Scene1AssessmentState): boolean {
  const step = getAssessmentStep(state.currentStep);

  return step.requiredFields.every((field) => state.answers[field].trim().length > 0);
}

export function goToNextAssessmentStep(state: Scene1AssessmentState): Scene1AssessmentState {
  return {
    ...state,
    currentStep: Math.min(7, state.currentStep + 1) as AssessmentStepId,
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
