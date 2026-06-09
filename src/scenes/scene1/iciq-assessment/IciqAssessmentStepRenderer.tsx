import {
  IciqAssessmentFieldKey,
  IciqLeakTrigger,
  iciqAmountOptions,
  iciqAssessmentIntro,
  iciqAssessmentQuestionnaireTitle,
  iciqFrequencyOptions,
  iciqImpactOptions,
  iciqLeakTriggerOptions,
} from './iciqAssessmentContent';
import { IciqAssessmentState, getCurrentIciqAssessmentStep } from './iciqAssessmentState';

type IciqAssessmentStepRendererProps = {
  state: IciqAssessmentState;
  onAnswer: (field: Exclude<IciqAssessmentFieldKey, 'iciqLeakTriggers'>, value: string) => void;
  onToggleTrigger: (trigger: IciqLeakTrigger) => void;
};

type ChoiceRowProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  description?: string;
  onSelect: (value: string) => void;
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

export function IciqAssessmentStepRenderer({
  state,
  onAnswer,
  onToggleTrigger,
}: IciqAssessmentStepRendererProps) {
  const step = getCurrentIciqAssessmentStep(state);

  return (
    <div className="scene1-assessment-stack">
      <section className="scene1-assessment-block scene1-phq9-assessment-overview">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">{iciqAssessmentQuestionnaireTitle}</h2>
          <p className="scene1-assessment-body-copy">{iciqAssessmentIntro}</p>
        </div>
      </section>

      <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      </div>

      {step.id === 1 ? (
        <>
          <ChoiceRow
            label="您出现漏尿的频率如何？"
            value={state.answers.iciqLeakFrequency}
            options={iciqFrequencyOptions}
            onSelect={(value) => onAnswer('iciqLeakFrequency', value)}
          />
          <ChoiceRow
            label="您通常漏尿的量有多少？"
            description="无论是否使用护垫或尿布，都按你更常见的情况选择。"
            value={state.answers.iciqLeakAmount}
            options={iciqAmountOptions}
            onSelect={(value) => onAnswer('iciqLeakAmount', value)}
          />
        </>
      ) : null}

      {step.id === 2 ? (
        <>
          <div className="scene1-assessment-block">
            <h3 className="scene1-assessment-question">漏尿对日常生活有多大影响？</h3>
            <p className="scene1-assessment-helper">
              请选择 0-10 分，0 表示毫无影响，10 表示极度影响。
            </p>
            <div className="scene1-assessment-chip-row">
              {iciqImpactOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    state.answers.iciqImpact === option.value
                      ? 'scene1-assessment-chip active'
                      : 'scene1-assessment-chip'
                  }
                  onClick={() => onAnswer('iciqImpact', option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="scene1-assessment-block">
            <h3 className="scene1-assessment-question">您通常在什么情况下会漏尿？</h3>
            <p className="scene1-assessment-helper">可多选；该题只用于判断类型，不计入总分。</p>
            <div className="scene1-assessment-chip-row">
              {iciqLeakTriggerOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={
                    state.answers.iciqLeakTriggers.includes(option.value)
                      ? 'scene1-assessment-chip active'
                      : 'scene1-assessment-chip'
                  }
                  onClick={() => onToggleTrigger(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
