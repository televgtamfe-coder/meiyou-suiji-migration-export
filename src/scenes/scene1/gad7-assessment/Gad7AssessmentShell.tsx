import { useLayoutEffect, useRef } from 'react';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { Gad7AssessmentStepRenderer } from './Gad7AssessmentStepRenderer';
import {
  Gad7AssessmentState,
  getCurrentGad7AssessmentStepIndex,
  getGad7AssessmentTotalSteps,
  isGad7AssessmentStepComplete,
} from './gad7AssessmentState';
import { Gad7AssessmentFieldKey } from './gad7AssessmentContent';

type Gad7AssessmentShellProps = {
  state: Gad7AssessmentState;
  onAnswer: (field: Gad7AssessmentFieldKey, value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function Gad7AssessmentShell({
  state,
  onAnswer,
  onPrevious,
  onNext,
}: Gad7AssessmentShellProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = getCurrentGad7AssessmentStepIndex(state);
  const totalSteps = getGad7AssessmentTotalSteps();
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
      data-testid="scene1-gad7-assessment-shell"
    >
      <AssessmentProgress currentStep={currentStepIndex} totalSteps={totalSteps} />

      <div ref={bodyRef} className="scene1-assessment-body">
        <Gad7AssessmentStepRenderer state={state} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer" data-testid="scene1-gad7-assessment-footer">
        <button type="button" className="scene1-assessment-secondary-btn" onClick={onPrevious}>
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!isGad7AssessmentStepComplete(state)}
          onClick={onNext}
        >
          {isLastStep ? '查看结果' : '下一步'}
        </button>
      </div>
    </div>
  );
}
