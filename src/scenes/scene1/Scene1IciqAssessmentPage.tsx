import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { IciqAssessmentShell } from './iciq-assessment/IciqAssessmentShell';
import { IciqAssessmentFieldKey, IciqLeakTrigger } from './iciq-assessment/iciqAssessmentContent';
import {
  IciqAssessmentState,
  answerIciqAssessmentField,
  createIciqAssessmentState,
  getCurrentIciqAssessmentStepIndex,
  getIciqAssessmentTotalSteps,
  goToNextIciqAssessmentStep,
  goToPreviousIciqAssessmentStep,
  toggleIciqAssessmentTrigger,
} from './iciq-assessment/iciqAssessmentState';
import {
  clearIciqAssessmentDraft,
  readIciqAssessmentDraft,
  writeIciqAssessmentDraft,
  writeIciqAssessmentLatest,
} from './iciq-assessment/iciqAssessmentStorage';

function createInitialIciqAssessmentPageState() {
  return createIciqAssessmentState(readIciqAssessmentDraft());
}

function writeDraftSnapshot(nextState: IciqAssessmentState) {
  writeIciqAssessmentDraft({
    currentStep: nextState.currentStep,
    answers: nextState.answers,
  });
}

export function Scene1IciqAssessmentPage() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => createInitialIciqAssessmentPageState());

  function handleAnswer(
    field: Exclude<IciqAssessmentFieldKey, 'iciqLeakTriggers'>,
    value: string,
  ) {
    const nextState = answerIciqAssessmentField(state, field, value);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleToggleTrigger(trigger: IciqLeakTrigger) {
    const nextState = toggleIciqAssessmentTrigger(state, trigger);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handlePrevious() {
    if (getCurrentIciqAssessmentStepIndex(state) === 1) {
      navigate('/scene1-home');
      return;
    }

    const nextState = goToPreviousIciqAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleNext() {
    const totalSteps = getIciqAssessmentTotalSteps();
    const currentStepIndex = getCurrentIciqAssessmentStepIndex(state);

    if (currentStepIndex === totalSteps) {
      writeIciqAssessmentLatest({
        answers: state.answers,
        completedAt: new Date().toISOString(),
      });
      clearIciqAssessmentDraft();
      navigate('/scene1-iciq-assessment-result');
      return;
    }

    const nextState = goToNextIciqAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  return (
    <div className="scene1-calendar-page scene1-iciq-assessment-page" data-testid="scene1-iciq-assessment-route-shell">
      <StatusBar />
      <IciqAssessmentShell
        state={state}
        onAnswer={handleAnswer}
        onToggleTrigger={handleToggleTrigger}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
