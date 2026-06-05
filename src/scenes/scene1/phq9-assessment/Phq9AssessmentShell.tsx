import { useLayoutEffect, useRef } from 'react';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { Phq9AssessmentStepRenderer } from './Phq9AssessmentStepRenderer';
import {
  Phq9AssessmentState,
  getCurrentPhq9AssessmentStepIndex,
  getPhq9AssessmentTotalSteps,
  isPhq9AssessmentStepComplete,
} from './phq9AssessmentState';
import { Phq9AssessmentFieldKey } from './phq9AssessmentContent';

type Phq9AssessmentShellProps = {
  state: Phq9AssessmentState;
  onAnswer: (field: Phq9AssessmentFieldKey, value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function Phq9AssessmentShell({
  state,
  onAnswer,
  onPrevious,
  onNext,
}: Phq9AssessmentShellProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = getCurrentPhq9AssessmentStepIndex(state);
  const totalSteps = getPhq9AssessmentTotalSteps();
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
      data-testid="scene1-phq9-assessment-shell"
    >
      <AssessmentProgress currentStep={currentStepIndex} totalSteps={totalSteps} />

      <div ref={bodyRef} className="scene1-assessment-body">
        <Phq9AssessmentStepRenderer state={state} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer" data-testid="scene1-phq9-assessment-footer">
        <button type="button" className="scene1-assessment-secondary-btn" onClick={onPrevious}>
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!isPhq9AssessmentStepComplete(state)}
          onClick={onNext}
        >
          {isLastStep ? '查看结果' : '下一步'}
        </button>
      </div>
    </div>
  );
}
