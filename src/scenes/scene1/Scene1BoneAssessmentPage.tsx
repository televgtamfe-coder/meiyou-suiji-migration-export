import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { BoneAssessmentShell } from './bone-assessment/BoneAssessmentShell';
import {
  BoneAssessmentFieldKey,
} from './bone-assessment/boneAssessmentContent';
import {
  BoneAssessmentState,
  answerBoneAssessmentField,
  createBoneAssessmentState,
  getBoneAssessmentTotalSteps,
  getCurrentBoneAssessmentStepIndex,
  goToNextBoneAssessmentStep,
  goToPreviousBoneAssessmentStep,
} from './bone-assessment/boneAssessmentState';
import {
  clearBoneAssessmentDraft,
  readBoneAssessmentDraft,
  writeBoneAssessmentDraft,
  writeBoneAssessmentLatest,
  writeScene1HealthProfile,
} from './bone-assessment/boneAssessmentStorage';
import {
  getBoneAssessmentCarryoverItems,
  isBoneAssessmentProfileField,
  readBoneAssessmentSharedProfile,
} from './bone-assessment/boneAssessmentSharedProfile';

function createInitialBoneAssessmentPageState() {
  const sharedProfile = readBoneAssessmentSharedProfile();
  const draft = readBoneAssessmentDraft();

  return {
    sharedProfile,
    state: createBoneAssessmentState(sharedProfile, draft),
  };
}

function writeDraftSnapshot(nextState: BoneAssessmentState) {
  writeBoneAssessmentDraft({
    currentStep: nextState.currentStep,
    answers: nextState.answers,
    hiddenFields: nextState.hiddenFields,
  });
}

export function Scene1BoneAssessmentPage() {
  const navigate = useNavigate();
  const initialState = createInitialBoneAssessmentPageState();
  const [carryoverItems] = useState(() => getBoneAssessmentCarryoverItems(initialState.sharedProfile));
  const [state, setState] = useState(() => initialState.state);

  function handleAnswer(field: BoneAssessmentFieldKey, value: string) {
    const nextState = answerBoneAssessmentField(state, field, value);

    if (isBoneAssessmentProfileField(field)) {
      writeScene1HealthProfile({ [field]: value });
    }

    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handlePrevious() {
    if (getCurrentBoneAssessmentStepIndex(state) === 1) {
      navigate('/scene1');
      return;
    }

    const nextState = goToPreviousBoneAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleNext() {
    const totalSteps = getBoneAssessmentTotalSteps(state);
    const currentStepIndex = getCurrentBoneAssessmentStepIndex(state);

    if (currentStepIndex === totalSteps) {
      writeBoneAssessmentLatest({
        answers: state.answers,
        completedAt: new Date().toISOString(),
      });
      clearBoneAssessmentDraft();
      navigate('/scene1-bone-assessment-result');
      return;
    }

    const nextState = goToNextBoneAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  return (
    <div className="scene1-calendar-page scene1-bone-assessment-page" data-testid="scene1-bone-assessment-route-shell">
      <StatusBar />
      <BoneAssessmentShell
        state={state}
        carryoverItems={carryoverItems}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
