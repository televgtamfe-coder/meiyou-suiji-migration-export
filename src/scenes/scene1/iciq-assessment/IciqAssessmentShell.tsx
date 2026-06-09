import { useLayoutEffect, useRef } from 'react';
import { AssessmentProgress } from '../components/AssessmentProgress';
import { IciqAssessmentFieldKey, IciqLeakTrigger } from './iciqAssessmentContent';
import { IciqAssessmentStepRenderer } from './IciqAssessmentStepRenderer';
import {
  IciqAssessmentState,
  getCurrentIciqAssessmentStepIndex,
  getIciqAssessmentTotalSteps,
  isIciqAssessmentStepComplete,
} from './iciqAssessmentState';

type IciqAssessmentShellProps = {
  state: IciqAssessmentState;
  onAnswer: (field: Exclude<IciqAssessmentFieldKey, 'iciqLeakTriggers'>, value: string) => void;
  onToggleTrigger: (trigger: IciqLeakTrigger) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function IciqAssessmentShell({
  state,
  onAnswer,
  onToggleTrigger,
  onPrevious,
  onNext,
}: IciqAssessmentShellProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = getCurrentIciqAssessmentStepIndex(state);
  const totalSteps = getIciqAssessmentTotalSteps();
  const isLastStep = currentStepIndex === totalSteps;

  useLayoutEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = 0;
    }
  }, [state.currentStep]);

  return (
    <div
      className="scene1-assessment-shell scene1-assessment-shell-compact"
      data-testid="scene1-iciq-assessment-shell"
    >
      <AssessmentProgress currentStep={currentStepIndex} totalSteps={totalSteps} />

      <div ref={bodyRef} className="scene1-assessment-body">
        <IciqAssessmentStepRenderer
          state={state}
          onAnswer={onAnswer}
          onToggleTrigger={onToggleTrigger}
        />
      </div>

      <div className="scene1-assessment-footer">
        <button type="button" className="scene1-assessment-secondary-btn" onClick={onPrevious}>
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!isIciqAssessmentStepComplete(state)}
          onClick={onNext}
        >
          {isLastStep ? '查看结果' : '下一步'}
        </button>
      </div>
    </div>
  );
}
