import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { Gad7AssessmentShell } from './gad7-assessment/Gad7AssessmentShell';
import { Gad7AssessmentFieldKey } from './gad7-assessment/gad7AssessmentContent';
import {
  Gad7AssessmentState,
  answerGad7AssessmentField,
  createGad7AssessmentState,
  getCurrentGad7AssessmentStepIndex,
  getGad7AssessmentTotalSteps,
  goToNextGad7AssessmentStep,
  goToPreviousGad7AssessmentStep,
} from './gad7-assessment/gad7AssessmentState';
import {
  clearGad7AssessmentDraft,
  readGad7AssessmentDraft,
  writeGad7AssessmentDraft,
  writeGad7AssessmentLatest,
} from './gad7-assessment/gad7AssessmentStorage';

function createInitialGad7AssessmentPageState() {
  const draft = readGad7AssessmentDraft();

  return createGad7AssessmentState(draft);
}

function writeDraftSnapshot(nextState: Gad7AssessmentState) {
  writeGad7AssessmentDraft({
    currentStep: nextState.currentStep,
    answers: nextState.answers,
  });
}

export function Scene1Gad7AssessmentPage() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => createInitialGad7AssessmentPageState());

  function handleAnswer(field: Gad7AssessmentFieldKey, value: string) {
    const nextState = answerGad7AssessmentField(state, field, value);

    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handlePrevious() {
    if (getCurrentGad7AssessmentStepIndex(state) === 1) {
      navigate('/scene1-home');
      return;
    }

    const nextState = goToPreviousGad7AssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleNext() {
    const totalSteps = getGad7AssessmentTotalSteps();
    const currentStepIndex = getCurrentGad7AssessmentStepIndex(state);

    if (currentStepIndex === totalSteps) {
      writeGad7AssessmentLatest({
        answers: state.answers,
        completedAt: new Date().toISOString(),
      });
      clearGad7AssessmentDraft();
      navigate('/scene1-gad7-assessment-result');
      return;
    }

    const nextState = goToNextGad7AssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  return (
    <div className="scene1-calendar-page scene1-gad7-assessment-page" data-testid="scene1-gad7-assessment-route-shell">
      <StatusBar />
      <Gad7AssessmentShell
        state={state}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
