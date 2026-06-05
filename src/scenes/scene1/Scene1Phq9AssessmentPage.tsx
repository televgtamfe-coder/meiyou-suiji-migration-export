import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { Phq9AssessmentShell } from './phq9-assessment/Phq9AssessmentShell';
import { Phq9AssessmentFieldKey } from './phq9-assessment/phq9AssessmentContent';
import {
  Phq9AssessmentState,
  answerPhq9AssessmentField,
  createPhq9AssessmentState,
  getCurrentPhq9AssessmentStepIndex,
  getPhq9AssessmentTotalSteps,
  goToNextPhq9AssessmentStep,
  goToPreviousPhq9AssessmentStep,
} from './phq9-assessment/phq9AssessmentState';
import {
  clearPhq9AssessmentDraft,
  readPhq9AssessmentDraft,
  writePhq9AssessmentDraft,
  writePhq9AssessmentLatest,
} from './phq9-assessment/phq9AssessmentStorage';

function createInitialPhq9AssessmentPageState() {
  const draft = readPhq9AssessmentDraft();

  return createPhq9AssessmentState(draft);
}

function writeDraftSnapshot(nextState: Phq9AssessmentState) {
  writePhq9AssessmentDraft({
    currentStep: nextState.currentStep,
    answers: nextState.answers,
  });
}

export function Scene1Phq9AssessmentPage() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => createInitialPhq9AssessmentPageState());

  function handleAnswer(field: Phq9AssessmentFieldKey, value: string) {
    const nextState = answerPhq9AssessmentField(state, field, value);

    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handlePrevious() {
    if (getCurrentPhq9AssessmentStepIndex(state) === 1) {
      navigate('/scene1-home');
      return;
    }

    const nextState = goToPreviousPhq9AssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleNext() {
    const totalSteps = getPhq9AssessmentTotalSteps();
    const currentStepIndex = getCurrentPhq9AssessmentStepIndex(state);

    if (currentStepIndex === totalSteps) {
      writePhq9AssessmentLatest({
        answers: state.answers,
        completedAt: new Date().toISOString(),
      });
      clearPhq9AssessmentDraft();
      navigate('/scene1-phq9-assessment-result');
      return;
    }

    const nextState = goToNextPhq9AssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  return (
    <div className="scene1-calendar-page scene1-phq9-assessment-page" data-testid="scene1-phq9-assessment-route-shell">
      <StatusBar />
      <Phq9AssessmentShell
        state={state}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
