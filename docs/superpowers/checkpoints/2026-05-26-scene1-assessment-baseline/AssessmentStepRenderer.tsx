import { ChangeEvent } from 'react';
import { AssessmentFieldKey, AssessmentOption, getAssessmentStep } from '../assessmentSteps';
import { Scene1AssessmentState } from '../assessmentState';

type AssessmentStepRendererProps = {
  state: Scene1AssessmentState;
  onAnswer: (field: AssessmentFieldKey, value: string) => void;
};

type ChoiceRowProps = {
  label: string;
  value: string;
  options: AssessmentOption[];
  onSelect: (value: string) => void;
  description?: string;
};

type TextFieldProps = {
  field: AssessmentFieldKey;
  label: string;
  value: string;
  onAnswer: (field: AssessmentFieldKey, value: string) => void;
  type?: 'text' | 'date' | 'number';
  placeholder?: string;
};

type DateChoiceFieldProps = {
  dateField: AssessmentFieldKey;
  quickField: AssessmentFieldKey;
  label: string;
  dateValue: string;
  quickValue: string;
  options: AssessmentOption[];
  onAnswer: (field: AssessmentFieldKey, value: string) => void;
};

type KmiPrompt = {
  field: AssessmentFieldKey;
  label: string;
};

type KmiGroupProps = {
  title: string;
  prompts: KmiPrompt[];
  options: Partial<Record<AssessmentFieldKey, AssessmentOption[]>>;
  answers: Scene1AssessmentState['answers'];
  onAnswer: (field: AssessmentFieldKey, value: string) => void;
};

const kmiSetOnePrompts: KmiPrompt[] = [
  { field: 'kmiHotFlashes', label: '潮热出汗' },
  { field: 'kmiParesthesia', label: '感觉异常' },
  { field: 'kmiInsomnia', label: '失眠' },
  { field: 'kmiNervousness', label: '易激动' },
  { field: 'kmiMelancholia', label: '忧郁' },
  { field: 'kmiVertigo', label: '头晕' },
];

const kmiSetTwoPrompts: KmiPrompt[] = [
  { field: 'kmiFatigue', label: '易疲劳、乏力' },
  { field: 'kmiJointPain', label: '关节或肌肉疼痛' },
  { field: 'kmiHeadache', label: '头痛频率' },
  { field: 'kmiPalpitations', label: '心悸' },
  { field: 'kmiFormication', label: '皮肤蚁走感' },
  { field: 'kmiSexualImpact', label: '性生活影响' },
  { field: 'kmiUrinarySymptoms', label: '泌尿系统症状' },
];

function TextField({
  field,
  label,
  value,
  onAnswer,
  type = 'text',
  placeholder,
}: TextFieldProps) {
  const id = `scene1-assessment-${field}`;

  return (
    <div className="scene1-assessment-block">
      <label className="scene1-assessment-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="scene1-assessment-input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onAnswer(field, event.target.value)}
      />
    </div>
  );
}

function ChoiceRow({ label, value, options, onSelect, description }: ChoiceRowProps) {
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
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DateChoiceField({
  dateField,
  quickField,
  label,
  dateValue,
  quickValue,
  options,
  onAnswer,
}: DateChoiceFieldProps) {
  const id = `scene1-assessment-${dateField}`;

  return (
    <div className="scene1-assessment-block">
      <label className="scene1-assessment-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="scene1-assessment-input"
        type="date"
        value={dateValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const nextValue = event.target.value;
          onAnswer(dateField, nextValue);
          onAnswer(quickField, nextValue ? 'date-entered' : '');
        }}
      />
      <div className="scene1-assessment-chip-row">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={quickValue === option.value ? 'scene1-assessment-chip active' : 'scene1-assessment-chip'}
            onClick={() => {
              onAnswer(dateField, '');
              onAnswer(quickField, option.value);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CompletionState() {
  return (
    <div className="scene1-assessment-complete">
      <div className="scene1-assessment-complete-icon" aria-hidden="true">
        ✓
      </div>
      <h2>评估已完成</h2>
      <p>本轮 1-7 步测评内容已经完成，结果页和后续说明我们会在下一步继续接上。</p>
    </div>
  );
}

function SupportPanel({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div className="scene1-assessment-support-panel">
      <span className="scene1-assessment-support-kicker">{kicker}</span>
      <h3 className="scene1-assessment-support-title">{title}</h3>
      <p className="scene1-assessment-support-body">{body}</p>
    </div>
  );
}

function InlineBanner({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="scene1-assessment-banner">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}

function KmiGroup({ title, prompts, options, answers, onAnswer }: KmiGroupProps) {
  return (
    <section className="scene1-assessment-group">
      <div className="scene1-assessment-group-header">
        <h3>{title}</h3>
      </div>
      <div className="scene1-assessment-group-stack">
        {prompts.map((item) => (
          <ChoiceRow
            key={item.field}
            label={item.label}
            value={answers[item.field]}
            options={options[item.field] ?? []}
            onSelect={(value) => onAnswer(item.field, value)}
          />
        ))}
      </div>
    </section>
  );
}

function IntroFeatureCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="scene1-assessment-intro-feature">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function IntroNoticeItem({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="scene1-assessment-intro-notice-item">
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  );
}

export function AssessmentStepRenderer({
  state,
  onAnswer,
}: AssessmentStepRendererProps) {
  if (state.completed) {
    return <CompletionState />;
  }

  const step = getAssessmentStep(state.currentStep);

  if (step.id === 1) {
    return (
      <div className="scene1-assessment-intro-layout">
        <div className="scene1-assessment-stack">
          <div className="scene1-assessment-hero-card">
            <p className="scene1-assessment-kicker">个人健康洞察</p>
            <h2 className="scene1-assessment-title">围绝经期评估</h2>
            <p className="scene1-assessment-body-copy">
              帮助了解当前是否存在围绝经期相关表现，并评估症状影响程度。该评估旨在帮助您识别症状并提供针对性的健康管理建议。
            </p>
          </div>
          <div className="scene1-assessment-intro-feature-grid">
            <IntroFeatureCard
              title="快速便捷"
              body="预计耗时 3-5 分钟，专为忙碌的您设计。"
            />
            <IntroFeatureCard
              title="健康参考"
              body="结果用于健康管理参考，不能替代医生诊断。"
            />
          </div>
          <div className="scene1-assessment-intro-visual">
            <div className="scene1-assessment-intro-visual-glow" aria-hidden="true" />
            <p>“在变化中找到平衡，重塑您的健康主权。”</p>
          </div>
        </div>
        <div className="scene1-assessment-intro-side">
          <div className="scene1-assessment-intro-panel">
            <h3>评估须知</h3>
            <IntroNoticeItem
              title="隐私保护"
              body="回答内容将完全保密，仅用于生成您的健康建议。"
            />
            <IntroNoticeItem
              title="可继续完成"
              body="您可以随时暂停，并从上次中断的地方继续。"
            />
            <div className="scene1-assessment-intro-disclaimer">
              <strong>免责声明</strong>
              <p>本评估结果仅供健康管理参考，不构成医学诊断或治疗方案。如您有严重的身体不适，请务必咨询专业医疗机构。</p>
            </div>
            <div className="scene1-assessment-intro-lock">
              <span>您的数据受到加密保护</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step.id === 2) {
    return (
      <div className="scene1-assessment-stack">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
        <TextField
          field="birthDate"
          label="出生日期"
          value={state.answers.birthDate}
          onAnswer={onAnswer}
          type="date"
        />
        <TextField
          field="heightCm"
          label="身高 (cm)"
          value={state.answers.heightCm}
          onAnswer={onAnswer}
          type="number"
          placeholder="请输入身高"
        />
        <TextField
          field="weightKg"
          label="体重 (kg)"
          value={state.answers.weightKg}
          onAnswer={onAnswer}
          type="number"
          placeholder="请输入体重"
        />
      </div>
    );
  }

  if (step.id === 3) {
    return (
      <div className="scene1-assessment-stack">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
        <SupportPanel
          kicker="月经周期识别"
          title="再了解一下你的月经变化"
          body="追踪这些变化有助于识别您目前所处的围绝经期阶段。请根据您过去3-6个月的实际情况进行选择。"
        />
        <InlineBanner
          title="围绝经期的识别通常需要结合年龄、月经变化和症状综合判断。"
          body="这一页会聚焦月经周期、经量和最近一次月经时间，帮助我们更完整地判断当前状态。"
        />
        <ChoiceRow
          label="1. 您目前是否仍有月经？"
          value={state.answers.periodPresence}
          options={step.options?.periodPresence ?? []}
          onSelect={(value) => onAnswer('periodPresence', value)}
        />
        <ChoiceRow
          label="2. 最近12个月月经周期是否明显变化？"
          description="指两次月经第一天之间的间隔天数"
          value={state.answers.cycleChange}
          options={step.options?.cycleChange ?? []}
          onSelect={(value) => onAnswer('cycleChange', value)}
        />
        <ChoiceRow
          label="3. 最近12个月月经量是否明显变化？"
          value={state.answers.volumeChange}
          options={step.options?.volumeChange ?? []}
          onSelect={(value) => onAnswer('volumeChange', value)}
        />
        <DateChoiceField
          dateField="lastPeriodDate"
          quickField="lastPeriodQuickOption"
          label="4. 最近一次月经距今多久？"
          dateValue={state.answers.lastPeriodDate}
          quickValue={state.answers.lastPeriodQuickOption}
          options={step.options?.lastPeriodQuickOption ?? []}
          onAnswer={onAnswer}
        />
      </div>
    );
  }

  if (step.id === 4) {
    return (
      <div className="scene1-assessment-stack">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
        <ChoiceRow
          label="身体不适程度"
          value={state.answers.symptomLevel}
          options={step.options?.symptomLevel ?? []}
          onSelect={(value) => onAnswer('symptomLevel', value)}
        />
        <ChoiceRow
          label="情绪波动程度"
          value={state.answers.emotionLevel}
          options={step.options?.emotionLevel ?? []}
          onSelect={(value) => onAnswer('emotionLevel', value)}
        />
      </div>
    );
  }

  if (step.id === 5) {
    return (
      <div className="scene1-assessment-stack">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
        <ChoiceRow
          label="卵巢早衰"
          description="是否曾在 40 岁前被诊断为卵巢功能不全？"
          value={state.answers.ovarianFailure}
          options={step.options?.ovarianFailure ?? []}
          onSelect={(value) => onAnswer('ovarianFailure', value)}
        />
        <ChoiceRow
          label="手术史"
          description="是否进行过卵巢或子宫切除手术？"
          value={state.answers.surgeryHistory}
          options={step.options?.surgeryHistory ?? []}
          onSelect={(value) => onAnswer('surgeryHistory', value)}
        />
        <ChoiceRow
          label="激素避孕"
          description="您目前是否正在使用曼月乐或其他激素类避孕药？"
          value={state.answers.hormonalContraception}
          options={step.options?.hormonalContraception ?? []}
          onSelect={(value) => onAnswer('hormonalContraception', value)}
        />
        <ChoiceRow
          label="激素替代疗法"
          description="您最近三个月是否接受过激素替代治疗？"
          value={state.answers.hormoneReplacementTherapy}
          options={step.options?.hormoneReplacementTherapy ?? []}
          onSelect={(value) => onAnswer('hormoneReplacementTherapy', value)}
        />
        <InlineBanner
          title="特殊情况说明"
          body="您的情况可能较为特殊，结果页会结合这些信息一起解释。"
        />
      </div>
    );
  }

  if (step.id === 6) {
    return (
      <div className="scene1-assessment-stack">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
        <InlineBanner
          title="请根据最近1个月的实际感受进行选择"
          body="KMI 问卷第一部分会先从较常见的身体和情绪变化开始。"
        />
        <KmiGroup
          title="KMI 问卷第一部分"
          prompts={kmiSetOnePrompts}
          options={step.options ?? {}}
          answers={state.answers}
          onAnswer={onAnswer}
        />
        <InlineBanner
          title="您的身体正在经历变化"
          body="这些评估不仅是数据，更是通往更好自我管理的桥梁。我们会在保持 scene1 风格的前提下，把这些信息接入后续结果解释。"
        />
      </div>
    );
  }

  return (
    <div className="scene1-assessment-stack">
      <h2 className="scene1-assessment-title">{step.title}</h2>
      <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      <KmiGroup
        title="身体症状"
        prompts={kmiSetTwoPrompts.slice(0, 3)}
        options={step.options ?? {}}
        answers={state.answers}
        onAnswer={onAnswer}
      />
      <KmiGroup
        title="神经与感官"
        prompts={kmiSetTwoPrompts.slice(3, 5)}
        options={step.options ?? {}}
        answers={state.answers}
        onAnswer={onAnswer}
      />
      <section className="scene1-assessment-split-layout">
        <KmiGroup
          title="生活质量"
          prompts={kmiSetTwoPrompts.slice(5)}
          options={step.options ?? {}}
          answers={state.answers}
          onAnswer={onAnswer}
        />
        <div className="scene1-assessment-side-card">
          <span className="scene1-assessment-side-badge">隐私保护</span>
          <h3>数据高度加密</h3>
          <p>这一组会结合生活质量变化一起评估，但所有输入仍只在本次测评流程中使用。</p>
        </div>
      </section>
    </div>
  );
}
