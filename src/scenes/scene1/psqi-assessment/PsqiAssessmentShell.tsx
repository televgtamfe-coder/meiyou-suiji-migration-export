import { useLayoutEffect, useRef } from 'react';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { PsqiAssessmentFieldKey } from './psqiAssessmentContent';
import { PsqiAssessmentStepRenderer } from './PsqiAssessmentStepRenderer';
import {
  PsqiAssessmentState,
  getCurrentPsqiAssessmentStepIndex,
  getPsqiAssessmentTotalSteps,
  isPsqiAssessmentStepComplete,
} from './psqiAssessmentState';

type PsqiAssessmentShellProps = {
  state: PsqiAssessmentState;
  onAnswer: (field: PsqiAssessmentFieldKey, value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function PsqiAssessmentShell({
  state,
  onAnswer,
  onPrevious,
  onNext,
}: PsqiAssessmentShellProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = getCurrentPsqiAssessmentStepIndex(state);
  const totalSteps = getPsqiAssessmentTotalSteps();
  const isLastStep = currentStepIndex === totalSteps;

  useLayoutEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [state.currentStep]);

  return (
    <div
      className="scene1-assessment-shell scene1-assessment-shell-compact"
      data-testid="scene1-psqi-assessment-shell"
    >
      <AssessmentProgress currentStep={currentStepIndex} totalSteps={totalSteps} />

      <div ref={bodyRef} className="scene1-assessment-body">
        <PsqiAssessmentStepRenderer state={state} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer">
        <button type="button" className="scene1-assessment-secondary-btn" onClick={onPrevious}>
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!isPsqiAssessmentStepComplete(state)}
          onClick={onNext}
        >
          {isLastStep ? '查看结果' : '下一步'}
        </button>
      </div>
    </div>
  );
}
