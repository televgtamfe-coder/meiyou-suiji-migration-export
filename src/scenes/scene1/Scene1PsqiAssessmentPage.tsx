import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { PsqiAssessmentShell } from './psqi-assessment/PsqiAssessmentShell';
import { PsqiAssessmentFieldKey } from './psqi-assessment/psqiAssessmentContent';
import {
  PsqiAssessmentState,
  answerPsqiAssessmentField,
  createPsqiAssessmentState,
  getCurrentPsqiAssessmentStepIndex,
  getPsqiAssessmentTotalSteps,
  goToNextPsqiAssessmentStep,
  goToPreviousPsqiAssessmentStep,
} from './psqi-assessment/psqiAssessmentState';
import {
  clearPsqiAssessmentDraft,
  readPsqiAssessmentDraft,
  writePsqiAssessmentDraft,
  writePsqiAssessmentLatest,
} from './psqi-assessment/psqiAssessmentStorage';

function createInitialPsqiAssessmentPageState() {
  return createPsqiAssessmentState(readPsqiAssessmentDraft());
}

function writeDraftSnapshot(nextState: PsqiAssessmentState) {
  writePsqiAssessmentDraft({
    currentStep: nextState.currentStep,
    answers: nextState.answers,
  });
}

export function Scene1PsqiAssessmentPage() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => createInitialPsqiAssessmentPageState());

  function handleAnswer(field: PsqiAssessmentFieldKey, value: string) {
    const nextState = answerPsqiAssessmentField(state, field, value);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handlePrevious() {
    if (getCurrentPsqiAssessmentStepIndex(state) === 1) {
      navigate('/scene1-home');
      return;
    }

    const nextState = goToPreviousPsqiAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleNext() {
    const totalSteps = getPsqiAssessmentTotalSteps();
    const currentStepIndex = getCurrentPsqiAssessmentStepIndex(state);

    if (currentStepIndex === totalSteps) {
      writePsqiAssessmentLatest({
        answers: state.answers,
        completedAt: new Date().toISOString(),
      });
      clearPsqiAssessmentDraft();
      navigate('/scene1-psqi-assessment-result');
      return;
    }

    const nextState = goToNextPsqiAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  return (
    <div className="scene1-calendar-page scene1-psqi-assessment-page" data-testid="scene1-psqi-assessment-route-shell">
      <StatusBar />
      <PsqiAssessmentShell
        state={state}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
