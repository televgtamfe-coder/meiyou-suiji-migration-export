type AssessmentProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export function AssessmentProgress({
  currentStep,
  totalSteps,
}: AssessmentProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="scene1-assessment-progress">
      <div className="scene1-assessment-progress-row">
        <span>评估进度</span>
        <span>{`步骤 ${currentStep} / ${totalSteps}`}</span>
      </div>
      <div className="scene1-assessment-progress-track" aria-hidden="true">
        <div className="scene1-assessment-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
