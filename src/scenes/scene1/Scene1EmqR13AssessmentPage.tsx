import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { EmqR13AssessmentShell } from './emq-r13-assessment/EmqR13AssessmentShell';
import { EmqR13AssessmentFieldKey } from './emq-r13-assessment/emqR13AssessmentContent';
import {
  EmqR13AssessmentState,
  answerEmqR13AssessmentField,
  createEmqR13AssessmentState,
  getCurrentEmqR13AssessmentStepIndex,
  getEmqR13AssessmentTotalSteps,
  goToNextEmqR13AssessmentStep,
  goToPreviousEmqR13AssessmentStep,
} from './emq-r13-assessment/emqR13AssessmentState';
import {
  clearEmqR13AssessmentDraft,
  readEmqR13AssessmentDraft,
  writeEmqR13AssessmentDraft,
  writeEmqR13AssessmentLatest,
} from './emq-r13-assessment/emqR13AssessmentStorage';

function createInitialEmqR13AssessmentPageState() {
  const draft = readEmqR13AssessmentDraft();

  return createEmqR13AssessmentState(draft);
}

function writeDraftSnapshot(nextState: EmqR13AssessmentState) {
  writeEmqR13AssessmentDraft({
    currentStep: nextState.currentStep,
    answers: nextState.answers,
  });
}

export function Scene1EmqR13AssessmentPage() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => createInitialEmqR13AssessmentPageState());

  function handleAnswer(field: EmqR13AssessmentFieldKey, value: string) {
    const nextState = answerEmqR13AssessmentField(state, field, value);

    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handlePrevious() {
    if (getCurrentEmqR13AssessmentStepIndex(state) === 1) {
      navigate('/scene1-home');
      return;
    }

    const nextState = goToPreviousEmqR13AssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleNext() {
    const totalSteps = getEmqR13AssessmentTotalSteps();
    const currentStepIndex = getCurrentEmqR13AssessmentStepIndex(state);

    if (currentStepIndex === totalSteps) {
      writeEmqR13AssessmentLatest({
        answers: state.answers,
        completedAt: new Date().toISOString(),
      });
      clearEmqR13AssessmentDraft();
      navigate('/scene1-emq-r13-assessment-result');
      return;
    }

    const nextState = goToNextEmqR13AssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  return (
    <div className="scene1-calendar-page scene1-phq9-assessment-page" data-testid="scene1-emq-r13-assessment-route-shell">
      <StatusBar />
      <EmqR13AssessmentShell
        state={state}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
