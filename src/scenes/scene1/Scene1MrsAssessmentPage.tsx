import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { MrsAssessmentShell } from './mrs-assessment/MrsAssessmentShell';
import { MrsAssessmentFieldKey } from './mrs-assessment/mrsAssessmentContent';
import {
  MrsAssessmentState,
  answerMrsAssessmentField,
  createMrsAssessmentState,
  getCurrentMrsAssessmentStepIndex,
  getMrsAssessmentTotalSteps,
  goToNextMrsAssessmentStep,
  goToPreviousMrsAssessmentStep,
} from './mrs-assessment/mrsAssessmentState';
import {
  clearMrsAssessmentDraft,
  readMrsAssessmentDraft,
  writeMrsAssessmentDraft,
  writeMrsAssessmentLatest,
} from './mrs-assessment/mrsAssessmentStorage';

function createInitialMrsAssessmentPageState() {
  return createMrsAssessmentState(readMrsAssessmentDraft());
}

function writeDraftSnapshot(nextState: MrsAssessmentState) {
  writeMrsAssessmentDraft({
    currentStep: nextState.currentStep,
    answers: nextState.answers,
  });
}

export function Scene1MrsAssessmentPage() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => createInitialMrsAssessmentPageState());

  function handleAnswer(field: MrsAssessmentFieldKey, value: string) {
    const nextState = answerMrsAssessmentField(state, field, value);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handlePrevious() {
    if (getCurrentMrsAssessmentStepIndex(state) === 1) {
      navigate('/scene1-home');
      return;
    }

    const nextState = goToPreviousMrsAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleNext() {
    const totalSteps = getMrsAssessmentTotalSteps();
    const currentStepIndex = getCurrentMrsAssessmentStepIndex(state);

    if (currentStepIndex === totalSteps) {
      writeMrsAssessmentLatest({
        answers: state.answers,
        completedAt: new Date().toISOString(),
      });
      clearMrsAssessmentDraft();
      navigate('/scene1-mrs-assessment-result');
      return;
    }

    const nextState = goToNextMrsAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  return (
    <div className="scene1-calendar-page scene1-mrs-assessment-page" data-testid="scene1-mrs-assessment-route-shell">
      <StatusBar />
      <MrsAssessmentShell state={state} onAnswer={handleAnswer} onPrevious={handlePrevious} onNext={handleNext} />
    </div>
  );
}
