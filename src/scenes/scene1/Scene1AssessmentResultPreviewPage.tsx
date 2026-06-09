import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { answerAssessmentField, createAssessmentStateWithoutEntry } from './assessmentState';
import {
  readScene1AssessmentLatest,
  writeScene1AssessmentLatest,
} from './assessmentResultStorage';
import { PerimenopauseAssessmentShell } from './components/PerimenopauseAssessmentShell';
import { StatusBar } from './components/StatusBar';

function createAssessmentResultPreviewState(answers: ReturnType<typeof createAssessmentStateWithoutEntry>['answers']) {
  const baseState = createAssessmentStateWithoutEntry();

  return {
    ...baseState,
    assessmentOpen: true,
    completed: true,
    currentStep: 5 as const,
    answers: {
      ...baseState.answers,
      ...answers,
    },
  };
}

export function Scene1AssessmentResultPreviewPage() {
  const latest = readScene1AssessmentLatest();
  const navigate = useNavigate();

  if (!latest) {
    return <Navigate to="/scene1" replace />;
  }

  const [state, setState] = useState(() => createAssessmentResultPreviewState(latest.answers));

  function handleStateChange(nextState: typeof state) {
    if (nextState.completed) {
      writeScene1AssessmentLatest({
        answers: nextState.answers,
        completedAt: new Date().toISOString(),
      });
    }

    setState(nextState);
  }

  return (
    <div
      className="scene1-assessment-stage-compare-page"
      data-testid="scene1-assessment-result-route-shell"
    >
      <StatusBar />
      <PerimenopauseAssessmentShell
        state={state}
        onAnswer={(field, value) => setState((prev) => answerAssessmentField(prev, field, value))}
        onExitToScene1={() => navigate('/scene1')}
        onReturnToScene1={() => navigate('/scene1')}
        onEnterPerimenopauseMode={() => navigate('/scene1-perimenopause')}
        onNext={handleStateChange}
        onPrevious={handleStateChange}
      />
    </div>
  );
}
