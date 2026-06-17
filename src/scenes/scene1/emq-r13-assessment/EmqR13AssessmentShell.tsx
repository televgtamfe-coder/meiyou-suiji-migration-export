import { useLayoutEffect, useRef } from 'react';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { EmqR13AssessmentStepRenderer } from './EmqR13AssessmentStepRenderer';
import {
  EmqR13AssessmentState,
  getCurrentEmqR13AssessmentStepIndex,
  getEmqR13AssessmentTotalSteps,
  isEmqR13AssessmentStepComplete,
} from './emqR13AssessmentState';
import { EmqR13AssessmentFieldKey } from './emqR13AssessmentContent';

type EmqR13AssessmentShellProps = {
  state: EmqR13AssessmentState;
  onAnswer: (field: EmqR13AssessmentFieldKey, value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function EmqR13AssessmentShell({
  state,
  onAnswer,
  onPrevious,
  onNext,
}: EmqR13AssessmentShellProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = getCurrentEmqR13AssessmentStepIndex(state);
  const totalSteps = getEmqR13AssessmentTotalSteps();
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
      data-testid="scene1-emq-r13-assessment-shell"
    >
      <AssessmentProgress currentStep={currentStepIndex} totalSteps={totalSteps} />

      <div ref={bodyRef} className="scene1-assessment-body">
        <EmqR13AssessmentStepRenderer state={state} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer" data-testid="scene1-emq-r13-assessment-footer">
        <button type="button" className="scene1-assessment-secondary-btn" onClick={onPrevious}>
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!isEmqR13AssessmentStepComplete(state)}
          onClick={onNext}
        >
          {isLastStep ? '查看结果' : '下一步'}
        </button>
      </div>
    </div>
  );
}
