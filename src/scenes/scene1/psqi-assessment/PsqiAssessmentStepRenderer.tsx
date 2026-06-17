import {
  PsqiAssessmentFieldKey,
  psqiAssessmentFieldCopyMap,
  psqiFrequencyOptions,
  psqiAssessmentIntro,
  psqiAssessmentQuestionnaireTitle,
  psqiDaytimeEnthusiasmOptions,
  psqiSubjectiveQualityOptions,
} from './psqiAssessmentContent';
import { PsqiAssessmentState, getCurrentPsqiAssessmentStep } from './psqiAssessmentState';
import { psqiAssessmentOverviewSummary } from '../assessmentOverviewCopy';

type PsqiAssessmentStepRendererProps = {
  state: PsqiAssessmentState;
  onAnswer: (field: PsqiAssessmentFieldKey, value: string) => void;
};

type ChoiceRowProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  description?: string;
  onSelect: (value: string) => void;
};

type InputRowProps = {
  label: string;
  value: string;
  type: 'time' | 'number';
  description?: string;
  step?: string;
  min?: string;
  max?: string;
  suffix?: string;
  onChange: (value: string) => void;
};

function ChoiceRow({ label, value, options, description, onSelect }: ChoiceRowProps) {
  return (
    <div className="scene1-assessment-block">
      <h3 className="scene1-assessment-question">{label}</h3>
      {description ? <p className="scene1-assessment-helper">{description}</p> : null}
      <div className="scene1-assessment-choice-grid">
        {options.map((option) => (
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

function InputRow({
  label,
  value,
  type,
  description,
  step,
  min,
  max,
  suffix,
  onChange,
}: InputRowProps) {
  return (
    <div className="scene1-assessment-block">
      <h3 className="scene1-assessment-question">{label}</h3>
      {description ? <p className="scene1-assessment-helper">{description}</p> : null}
      <div className="scene1-assessment-input-wrap">
        <input
          type={type}
          className="scene1-assessment-input"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(event) => onChange(event.target.value)}
        />
        {suffix ? <span className="scene1-assessment-input-suffix">{suffix}</span> : null}
      </div>
    </div>
  );
}

export function PsqiAssessmentStepRenderer({
  state,
  onAnswer,
}: PsqiAssessmentStepRendererProps) {
  const step = getCurrentPsqiAssessmentStep(state);

  return (
    <div className="scene1-assessment-stack">
      <section className="scene1-assessment-block scene1-phq9-assessment-overview">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">{psqiAssessmentQuestionnaireTitle}</h2>
          <p className="scene1-assessment-body-copy">{psqiAssessmentIntro}</p>
          <p className="scene1-assessment-helper">{psqiAssessmentOverviewSummary}</p>
        </div>
      </section>

      <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      </div>

      {step.id === 1 ? (
        <>
          <InputRow
            label={psqiAssessmentFieldCopyMap.psqiBedTime.label}
            description={psqiAssessmentFieldCopyMap.psqiBedTime.description}
            type="time"
            value={state.answers.psqiBedTime}
            onChange={(value) => onAnswer('psqiBedTime', value)}
          />
          <InputRow
            label={psqiAssessmentFieldCopyMap.psqiSleepLatencyMinutes.label}
            description={psqiAssessmentFieldCopyMap.psqiSleepLatencyMinutes.description}
            type="number"
            step="1"
            min="0"
            value={state.answers.psqiSleepLatencyMinutes}
            suffix="分钟"
            onChange={(value) => onAnswer('psqiSleepLatencyMinutes', value)}
          />
          <InputRow
            label={psqiAssessmentFieldCopyMap.psqiWakeTime.label}
            type="time"
            value={state.answers.psqiWakeTime}
            onChange={(value) => onAnswer('psqiWakeTime', value)}
          />
          <InputRow
            label={psqiAssessmentFieldCopyMap.psqiSleepDurationHours.label}
            description={psqiAssessmentFieldCopyMap.psqiSleepDurationHours.description}
            type="number"
            step="0.5"
            min="0"
            max="24"
            value={state.answers.psqiSleepDurationHours}
            suffix="小时"
            onChange={(value) => onAnswer('psqiSleepDurationHours', value)}
          />
        </>
      ) : null}

      {step.id === 2 ? (
        <section className="scene1-assessment-group">
          <div className="scene1-assessment-group-header">
            <h3>夜间睡眠中断情况</h3>
          </div>
          <div className="scene1-assessment-group-stack">
            {step.fields.map((field) => (
              <ChoiceRow
                key={field}
                label={psqiAssessmentFieldCopyMap[field].label}
                value={state.answers[field]}
                options={psqiFrequencyOptions}
                onSelect={(value) => onAnswer(field, value)}
              />
            ))}
            <div className="scene1-assessment-block">
              <h3 className="scene1-assessment-question">
                {psqiAssessmentFieldCopyMap.psqiSleepDisturbanceOtherText.label}
              </h3>
              <div className="scene1-assessment-input-wrap">
                <input
                  type="text"
                  className="scene1-assessment-input"
                  value={state.answers.psqiSleepDisturbanceOtherText}
                  onChange={(event) => onAnswer('psqiSleepDisturbanceOtherText', event.target.value)}
                />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {step.id === 3 ? (
        <>
          <ChoiceRow
            label={psqiAssessmentFieldCopyMap.psqiSubjectiveQuality.label}
            value={state.answers.psqiSubjectiveQuality}
            options={psqiSubjectiveQualityOptions}
            onSelect={(value) => onAnswer('psqiSubjectiveQuality', value)}
          />
          <ChoiceRow
            label={psqiAssessmentFieldCopyMap.psqiSleepMedication.label}
            value={state.answers.psqiSleepMedication}
            options={psqiFrequencyOptions}
            onSelect={(value) => onAnswer('psqiSleepMedication', value)}
          />
          <ChoiceRow
            label={psqiAssessmentFieldCopyMap.psqiDaytimeSleepiness.label}
            value={state.answers.psqiDaytimeSleepiness}
            options={psqiFrequencyOptions}
            onSelect={(value) => onAnswer('psqiDaytimeSleepiness', value)}
          />
          <ChoiceRow
            label={psqiAssessmentFieldCopyMap.psqiDaytimeEnthusiasm.label}
            value={state.answers.psqiDaytimeEnthusiasm}
            options={psqiDaytimeEnthusiasmOptions}
            onSelect={(value) => onAnswer('psqiDaytimeEnthusiasm', value)}
          />
        </>
      ) : null}
    </div>
  );
}
