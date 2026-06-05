import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { answerAssessmentField, createAssessmentStateWithoutEntry } from './assessmentState';
import { PerimenopauseAssessmentShell } from './components/PerimenopauseAssessmentShell';
import { StatusBar } from './components/StatusBar';

function createAssessmentResultPreviewState() {
  const baseState = createAssessmentStateWithoutEntry();

  return {
    ...baseState,
    assessmentOpen: true,
    completed: true,
    currentStep: 5 as const,
    answers: {
      ...baseState.answers,
      age: '46',
      heightCm: '160',
      weightKg: '55',
      periodPresence: 'yes',
      cycleChange: 'shorter',
      volumeChange: 'same',
      lastPeriodDate: '2026-05-01',
      ovarianFailure: 'no',
      surgeryHistory: 'none',
      hormonalContraception: 'no',
      hormoneReplacementTherapy: 'no',
      kmiHotFlashes: '1',
      kmiInsomnia: '1',
      kmiNervousness: '1',
    },
  };
}

export function Scene1AssessmentResultPreviewPage() {
  const navigate = useNavigate();
  const [state, setState] = useState(() => createAssessmentResultPreviewState());

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
        onNext={setState}
        onPrevious={setState}
      />
    </div>
  );
}
