import {
  MrsAssessmentFieldKey,
  mrsAssessmentFieldCopyMap,
  mrsAssessmentIntro,
  mrsAssessmentOptions,
  mrsAssessmentQuestionnaireTitle,
} from './mrsAssessmentContent';
import { MrsAssessmentState, getCurrentMrsAssessmentStep } from './mrsAssessmentState';
import { mrsAssessmentOverviewSummary } from '../assessmentOverviewCopy';

type MrsAssessmentStepRendererProps = {
  state: MrsAssessmentState;
  onAnswer: (field: MrsAssessmentFieldKey, value: string) => void;
};

type ChoiceRowProps = {
  label: string;
  value: string;
  onSelect: (value: string) => void;
};

function ChoiceRow({ label, value, onSelect }: ChoiceRowProps) {
  return (
    <div className="scene1-assessment-block">
      <h3 className="scene1-assessment-question">{label}</h3>
      <div className="scene1-assessment-choice-grid">
        {mrsAssessmentOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? 'scene1-assessment-choice active' : 'scene1-assessment-choice'}
            onClick={() => onSelect(option.value)}
          >
            <span className="scene1-assessment-choice-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MrsAssessmentStepRenderer({ state, onAnswer }: MrsAssessmentStepRendererProps) {
  const step = getCurrentMrsAssessmentStep(state);

  return (
    <div className="scene1-assessment-stack">
      <section className="scene1-assessment-block">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">{mrsAssessmentQuestionnaireTitle}</h2>
          <p className="scene1-assessment-body-copy">{mrsAssessmentIntro}</p>
          <p className="scene1-assessment-helper">{mrsAssessmentOverviewSummary}</p>
        </div>
      </section>

      <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      </div>

      {step.fields.map((field) => (
        <ChoiceRow
          key={field}
          label={mrsAssessmentFieldCopyMap[field].label}
          value={state.answers[field]}
          onSelect={(value) => onAnswer(field, value)}
        />
      ))}
    </div>
  );
}
