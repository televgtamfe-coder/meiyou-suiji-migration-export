import { useLayoutEffect, useRef } from 'react';
import { AssessmentProgress } from '../components/AssessmentProgress';
import {
  BoneAssessmentState,
  getBoneAssessmentTotalSteps,
  getCurrentBoneAssessmentStepIndex,
  isBoneAssessmentStepComplete,
} from './boneAssessmentState';
import { BoneAssessmentStepRenderer } from './BoneAssessmentStepRenderer';
import { BoneAssessmentCarryoverItem } from './boneAssessmentSharedProfile';
import { BoneAssessmentFieldKey } from './boneAssessmentContent';

type BoneAssessmentShellProps = {
  state: BoneAssessmentState;
  carryoverItems: BoneAssessmentCarryoverItem[];
  onAnswer: (field: BoneAssessmentFieldKey, value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function BoneAssessmentShell({
  state,
  carryoverItems,
  onAnswer,
  onPrevious,
  onNext,
}: BoneAssessmentShellProps) {
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const currentStepIndex = getCurrentBoneAssessmentStepIndex(state);
  const totalSteps = getBoneAssessmentTotalSteps(state);
  const isLastStep = currentStepIndex === totalSteps;

  useLayoutEffect(() => {
    if (!bodyRef.current) {
      return;
    }

    bodyRef.current.scrollTop = 0;
  }, [state.currentStep]);

  return (
    <div className="scene1-assessment-shell scene1-assessment-shell-compact" data-testid="scene1-bone-assessment-shell">
      <AssessmentProgress currentStep={currentStepIndex} totalSteps={totalSteps} />

      <div ref={bodyRef} className="scene1-assessment-body">
        <BoneAssessmentStepRenderer state={state} carryoverItems={carryoverItems} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer" data-testid="scene1-bone-assessment-footer">
        <button type="button" className="scene1-assessment-secondary-btn" onClick={onPrevious}>
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!isBoneAssessmentStepComplete(state)}
          onClick={onNext}
        >
          {isLastStep ? '查看结果' : '下一步'}
        </button>
      </div>
    </div>
  );
}
