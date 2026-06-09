import { useLayoutEffect, useRef } from 'react';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { MrsAssessmentFieldKey } from './mrsAssessmentContent';
import { MrsAssessmentStepRenderer } from './MrsAssessmentStepRenderer';
import {
  MrsAssessmentState,
  getCurrentMrsAssessmentStepIndex,
  getMrsAssessmentTotalSteps,
  isMrsAssessmentStepComplete,
} from './mrsAssessmentState';

type MrsAssessmentShellProps = {
  state: MrsAssessmentState;
  onAnswer: (field: MrsAssessmentFieldKey, value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function MrsAssessmentShell({ state, onAnswer, onPrevious, onNext }: MrsAssessmentShellProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = getCurrentMrsAssessmentStepIndex(state);
  const totalSteps = getMrsAssessmentTotalSteps();
  const isLastStep = currentStepIndex === totalSteps;

  useLayoutEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [state.currentStep]);

  return (
    <div className="scene1-assessment-shell scene1-assessment-shell-compact" data-testid="scene1-mrs-assessment-shell">
      <AssessmentProgress currentStep={currentStepIndex} totalSteps={totalSteps} />

      <div ref={bodyRef} className="scene1-assessment-body">
        <MrsAssessmentStepRenderer state={state} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer">
        <button type="button" className="scene1-assessment-secondary-btn" onClick={onPrevious}>
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!isMrsAssessmentStepComplete(state)}
          onClick={onNext}
        >
          {isLastStep ? '查看结果' : '下一步'}
        </button>
      </div>
    </div>
  );
}
