import { useLayoutEffect, useRef } from 'react';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { ExerciseAssessmentStepRenderer } from './ExerciseAssessmentStepRenderer';
import {
  ExerciseAssessmentState,
  getCurrentExerciseAssessmentStepIndex,
  getExerciseAssessmentTotalSteps,
  isExerciseAssessmentStepComplete,
} from './exerciseAssessmentState';
import { ExerciseAssessmentFieldKey } from './exerciseAssessmentContent';

type ExerciseAssessmentShellProps = {
  state: ExerciseAssessmentState;
  onAnswer: (field: ExerciseAssessmentFieldKey, value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ExerciseAssessmentShell({
  state,
  onAnswer,
  onPrevious,
  onNext,
}: ExerciseAssessmentShellProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = getCurrentExerciseAssessmentStepIndex(state);
  const totalSteps = getExerciseAssessmentTotalSteps();
  const isLastStep = currentStepIndex === totalSteps;

  useLayoutEffect(() => {
    if (!bodyRef.current) {
      return;
    }

    bodyRef.current.scrollTop = 0;
  }, [state.currentStep]);

  return (
    <div
      className="scene1-assessment-shell scene1-assessment-shell-compact"
      data-testid="scene1-exercise-assessment-shell"
    >
      <AssessmentProgress currentStep={currentStepIndex} totalSteps={totalSteps} />

      <div ref={bodyRef} className="scene1-assessment-body">
        <ExerciseAssessmentStepRenderer state={state} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer" data-testid="scene1-exercise-assessment-footer">
        <button type="button" className="scene1-assessment-secondary-btn" onClick={onPrevious}>
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!isExerciseAssessmentStepComplete(state)}
          onClick={onNext}
        >
          {isLastStep ? '查看结果' : '下一步'}
        </button>
      </div>
    </div>
  );
}
