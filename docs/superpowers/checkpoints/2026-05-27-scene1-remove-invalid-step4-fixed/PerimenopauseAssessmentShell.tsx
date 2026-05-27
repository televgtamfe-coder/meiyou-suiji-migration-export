import { AssessmentFieldKey } from '../assessmentSteps';
import {
  Scene1AssessmentState,
  completeAssessment,
  goToNextAssessmentStep,
  goToPreviousAssessmentStep,
  isAssessmentStepComplete,
} from '../assessmentState';
import { AssessmentProgress } from './AssessmentProgress';
import { AssessmentStepRenderer } from './AssessmentStepRenderer';

type PerimenopauseAssessmentShellProps = {
  state: Scene1AssessmentState;
  onAnswer: (field: AssessmentFieldKey, value: string) => void;
  onClose: () => void;
  onNext: (nextState: Scene1AssessmentState) => void;
  onPrevious: (nextState: Scene1AssessmentState) => void;
};

export function PerimenopauseAssessmentShell({
  state,
  onAnswer,
  onClose,
  onNext,
  onPrevious,
}: PerimenopauseAssessmentShellProps) {
  if (!state.assessmentOpen) {
    return null;
  }

  const canAdvance =
    state.currentStep === 1 || state.completed || isAssessmentStepComplete(state);
  const nextLabel = state.currentStep === 6 ? '完成评估' : '下一步';

  return (
    <div className="scene1-assessment-shell" data-testid="scene1-assessment-shell">
      <div className="scene1-assessment-header">
        <button
          type="button"
          className="scene1-assessment-header-btn"
          aria-label="返回"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 6L9 12L15 18" />
          </svg>
          <span className="scene1-sr-only">返回</span>
        </button>
      </div>

      {!state.completed ? (
        <AssessmentProgress currentStep={state.currentStep} totalSteps={6} />
      ) : null}

      <div className="scene1-assessment-body">
        <AssessmentStepRenderer state={state} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer">
        <button
          type="button"
          className="scene1-assessment-secondary-btn"
          disabled={state.currentStep === 1 || state.completed}
          onClick={() => onPrevious(goToPreviousAssessmentStep(state))}
        >
          上一步
        </button>
        <button
          type="button"
          className="scene1-assessment-primary-btn"
          disabled={!canAdvance}
          onClick={() => {
            if (state.completed) {
              onClose();
              return;
            }

            if (state.currentStep === 6) {
              onNext(completeAssessment(state));
              return;
            }

            onNext(goToNextAssessmentStep(state));
          }}
        >
          {state.completed ? '返回 scene1' : nextLabel}
        </button>
      </div>
    </div>
  );
}
