import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { ExerciseAssessmentShell } from './exercise-assessment/ExerciseAssessmentShell';
import { ExerciseAssessmentFieldKey } from './exercise-assessment/exerciseAssessmentContent';
import {
  answerExerciseAssessmentField,
  createExerciseAssessmentState,
  ExerciseAssessmentState,
  getCurrentExerciseAssessmentStepIndex,
  getExerciseAssessmentTotalSteps,
  goToNextExerciseAssessmentStep,
  goToPreviousExerciseAssessmentStep,
} from './exercise-assessment/exerciseAssessmentState';
import {
  clearExerciseAssessmentDraft,
  readExerciseAssessmentDraft,
  writeExerciseAssessmentDraft,
  writeExerciseAssessmentLatest,
} from './exercise-assessment/exerciseAssessmentStorage';

function createInitialExerciseAssessmentPageState() {
  const draft = readExerciseAssessmentDraft();

  return {
    state: createExerciseAssessmentState(draft),
  };
}

function writeDraftSnapshot(nextState: ExerciseAssessmentState) {
  writeExerciseAssessmentDraft({
    currentStep: nextState.currentStep,
    answers: nextState.answers,
  });
}

export function Scene1ExerciseAssessmentPage() {
  const navigate = useNavigate();
  const initialState = createInitialExerciseAssessmentPageState();
  const [state, setState] = useState(() => initialState.state);

  function handleAnswer(field: ExerciseAssessmentFieldKey, value: string) {
    const nextState = answerExerciseAssessmentField(state, field, value);

    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handlePrevious() {
    if (getCurrentExerciseAssessmentStepIndex(state) === 1) {
      navigate('/scene1-home');
      return;
    }

    const nextState = goToPreviousExerciseAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  function handleNext() {
    const totalSteps = getExerciseAssessmentTotalSteps();
    const currentStepIndex = getCurrentExerciseAssessmentStepIndex(state);

    if (currentStepIndex === totalSteps) {
      writeExerciseAssessmentLatest({
        answers: state.answers,
        completedAt: new Date().toISOString(),
      });
      clearExerciseAssessmentDraft();
      navigate('/scene1-exercise-assessment-result');
      return;
    }

    const nextState = goToNextExerciseAssessmentStep(state);
    writeDraftSnapshot(nextState);
    setState(nextState);
  }

  return (
    <div
      className="scene1-calendar-page scene1-exercise-assessment-page"
      data-testid="scene1-exercise-assessment-route-shell"
    >
      <StatusBar />
      <ExerciseAssessmentShell
        state={state}
        onAnswer={handleAnswer}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
