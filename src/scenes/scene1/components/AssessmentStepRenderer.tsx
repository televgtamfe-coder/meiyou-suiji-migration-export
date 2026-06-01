import { useEffect, useRef, useState } from 'react';
import { AssessmentFieldKey, AssessmentOption, getAssessmentStep } from '../assessmentSteps';
import { Scene1AssessmentState } from '../assessmentState';
import { getKmiScoreSummary, pickCompletedKmiAnswers } from '../kmiScoring';
import { kmiRules } from '../kmiRules';
import { getResultDecisionSummary } from '../resultDecision';

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
  type?: 'text' | 'number';
  placeholder?: string;
  suffix?: string;
};

type DateChoiceFieldProps = {
  dateField: AssessmentFieldKey;
  quickField: AssessmentFieldKey;
  label: string;
  dateValue: string;
  quickValue: string;
  options: AssessmentOption[];
  onAnswer: (field: AssessmentFieldKey, value: string) => void;
  yearAriaLabel: string;
  monthAriaLabel: string;
  dayAriaLabel: string;
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

const kmiPrompts: KmiPrompt[] = kmiRules.map((rule) => ({
  field: rule.field,
  label: rule.label,
}));

const kmiSetOnePrompts = kmiPrompts.slice(0, 6);
const kmiSetTwoPrompts = kmiPrompts.slice(6);
const currentYear = new Date().getFullYear();
const dateYearOptions = Array.from({ length: currentYear - 1919 }, (_, index) => String(currentYear - index));
const dateMonthOptions = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, '0'));
const agePickerOptions = createIntegerPickerOptions(18, 80, '岁');
const heightPickerOptions = createIntegerPickerOptions(140, 200, 'cm');
const weightPickerOptions = createIntegerPickerOptions(30, 120, 'kg');
const profilePickerConfigMap: Record<
  ProfilePickerFieldKey,
  Omit<ProfilePickerConfig, 'field'>
> = {
  age: {
    label: '年龄',
    placeholder: '点击选择年龄',
    defaultValue: '45',
    options: agePickerOptions,
  },
  heightCm: {
    label: '身高',
    placeholder: '点击选择身高',
    defaultValue: '160',
    options: heightPickerOptions,
  },
  weightKg: {
    label: '体重',
    placeholder: '点击选择体重',
    defaultValue: '55',
    options: weightPickerOptions,
  },
};

function createIntegerPickerOptions(start: number, end: number, suffix: string): ProfilePickerOption[] {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const value = String(start + index);

    return {
      value,
      label: `${value}${suffix}`,
    };
  });
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function parseDateParts(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return { year: '', month: '', day: '' };
  }

  return {
    year: match[1],
    month: match[2],
    day: match[3],
  };
}

function buildDateValue(year: string, month: string, day: string) {
  if (!year || !month || !day) {
    return '';
  }

  const numericYear = Number(year);
  const numericMonth = Number(month);
  const maxDay = getDaysInMonth(numericYear, numericMonth);
  const normalizedDay = String(Math.min(Number(day), maxDay)).padStart(2, '0');

  return `${year}-${month}-${normalizedDay}`;
}

type StructuredDateFieldProps = Omit<TextFieldProps, 'type' | 'placeholder' | 'suffix'> & {
  yearAriaLabel: string;
  monthAriaLabel: string;
  dayAriaLabel: string;
  onValueChange?: (value: string) => void;
};

type ProfilePickerFieldKey = 'age' | 'heightCm' | 'weightKg';

type ProfilePickerOption = {
  value: string;
  label: string;
};

type ProfilePickerConfig = {
  field: ProfilePickerFieldKey;
  label: string;
  placeholder: string;
  defaultValue: string;
  options: ProfilePickerOption[];
};

type ProfilePickerSheetState = ProfilePickerConfig & {
  draftValue: string;
};

type ProfilePickerFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  onOpen: () => void;
};

type ProfilePickerSheetProps = {
  label: string;
  options: ProfilePickerOption[];
  value: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

type ResultStageEvidence = {
  label: string;
  value: string;
  detail: string;
};

type ResultStageSummary = {
  title: string;
  summary: string;
  tone: ResultBadgeTone;
  evidences: ResultStageEvidence[];
};

function parseDateString(value: string) {
  const parts = parseDateParts(value);

  if (!parts.year || !parts.month || !parts.day) {
    return null;
  }

  return new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
}

function getAssessmentAge(value: string) {
  if (!value) {
    return null;
  }

  const age = Number(value);

  if (!Number.isFinite(age) || age < 0) {
    return null;
  }

  return Math.round(age);
}

function normalizeProfilePickerValue(field: ProfilePickerFieldKey, value: string) {
  if (!value) {
    return '';
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return '';
  }

  if (field === 'age') {
    return String(Math.round(parsed));
  }

  return String(Math.trunc(parsed));
}

function formatProfileValue(field: ProfilePickerFieldKey, value: string) {
  const normalizedValue = normalizeProfilePickerValue(field, value);

  if (!normalizedValue) {
    return '';
  }

  if (field === 'age') {
    return `${normalizedValue}岁`;
  }

  return `${normalizedValue}${field === 'heightCm' ? 'cm' : 'kg'}`;
}

function getDaysSinceDate(value: string, now = new Date()) {
  const targetDate = parseDateString(value);

  if (!targetDate) {
    return null;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const diff = now.getTime() - targetDate.getTime();

  return Math.max(0, Math.floor(diff / millisecondsPerDay));
}

function formatLastPeriodValue(answers: Scene1AssessmentState['answers'], gapDays: number | null) {
  if (answers.lastPeriodQuickOption === 'current-period') {
    return '目前正处于经期';
  }

  if (answers.lastPeriodQuickOption === 'forgot') {
    return '记不清了';
  }

  if (answers.lastPeriodQuickOption === 'not-applicable') {
    return '暂未提供';
  }

  if (answers.lastPeriodDate && gapDays !== null) {
    if (gapDays < 30) {
      return `${answers.lastPeriodDate}（距今约 ${gapDays} 天）`;
    }

    const months = Math.floor(gapDays / 30);
    return `${answers.lastPeriodDate}（距今约 ${months} 个月）`;
  }

  return '未填写';
}

function getCycleChangeValue(answers: Scene1AssessmentState['answers']) {
  if (answers.cycleChange === 'shorter') {
    return '周期较以前提前，波动超过 7 天';
  }

  if (answers.cycleChange === 'longer') {
    return '周期延长，间隔明显拉长';
  }

  if (answers.cycleChange === 'same') {
    return '周期整体规律，暂未见明显波动';
  }

  return '周期变化暂不明确';
}

function getStageSummary(
  answers: Scene1AssessmentState['answers'],
  kmiTotal: number,
  now = new Date()
): ResultStageSummary {
  const age = getAssessmentAge(answers.age);
  const lastPeriodGapDays = getDaysSinceDate(answers.lastPeriodDate, now);
  const lastPeriodValue = formatLastPeriodValue(answers, lastPeriodGapDays);
  const cycleChangeValue = getCycleChangeValue(answers);
  const evidences: ResultStageEvidence[] = [
    {
      label: '年龄',
      value: age === null ? '未填写' : `${age}岁`,
      detail: '40-48 岁出现周期波动，更符合过渡阶段。',
    },
    {
      label: '末次月经',
      value: lastPeriodValue,
      detail: '3-11 个月偏向过渡晚期，≥12 个月需结合年龄看绝经风险。',
    },
    {
      label: '周期变化',
      value: cycleChangeValue,
      detail: '提前或推后超过 7 天，优先提示过渡早期。',
    },
  ];

  if (age !== null && lastPeriodGapDays !== null && lastPeriodGapDays >= 365) {
    if (age >= 48) {
      return {
        title: '绝经期',
        summary: '年龄与末次月经间隔已达到文档中的绝经判定区间，更符合绝经期管理路径。',
        tone: 'orange',
        evidences,
      };
    }

    if (age < 45) {
      return {
        title: '早发性绝经风险待排查',
        summary: '末次月经已超过 12 个月，但年龄未达到常见绝经阶段，需优先排查卵巢功能异常。',
        tone: 'orange',
        evidences,
      };
    }
  }

  if (age !== null && lastPeriodGapDays !== null && lastPeriodGapDays >= 90) {
    if (age >= 45) {
      return {
        title: '围绝经期过渡晚期',
        summary: '末次月经距今已进入 3-11 个月区间，且年龄处于文档定义的高相关阶段，更符合围绝经期过渡晚期。',
        tone: 'orange',
        evidences,
      };
    }

    return {
      title: '异常闭经待排查',
      summary: '末次月经间隔已明显拉长，但年龄尚轻，建议按异常闭经优先排查，同时继续按围绝经期路径观察。',
      tone: 'orange',
      evidences,
    };
  }

  if (age !== null && lastPeriodGapDays !== null && lastPeriodGapDays >= 60 && age >= 40 && age <= 48) {
    return {
      title: '围绝经期过渡晚期',
      summary: '末次月经间隔已接近 2-3 个月一次，符合文档中围绝经期过渡晚期的高相关信号。',
      tone: 'orange',
      evidences,
    };
  }

  if (age !== null && (answers.cycleChange === 'shorter' || answers.cycleChange === 'longer')) {
    if (age >= 40 && age <= 48) {
      return {
        title: '围绝经期过渡早期',
        summary: '当前更符合“40-48 岁 + 周期波动超过 7 天”的文档规则，提示已进入围绝经期过渡早期。',
        tone: 'pink',
        evidences,
      };
    }

    if (age < 40) {
      return {
        title: '周期变化待观察',
        summary: '虽然存在周期波动，但年龄尚未进入文档中的高相关区间，建议持续观察记录完整性。',
        tone: 'green',
        evidences,
      };
    }
  }

  if (answers.cycleChange === 'same') {
    if (age !== null && age < 45 && kmiTotal <= 6) {
      return {
        title: '未进入围绝经期',
        summary: '周期仍规律，年龄与症状分值也未达到文档中的围绝经期触发条件，更偏向未进入围绝经期。',
        tone: 'green',
        evidences,
      };
    }

    if (age !== null && age >= 45 && kmiTotal <= 6) {
      return {
        title: '未进入围绝经期（高风险关注）',
        summary: '虽然目前周期仍规律、症状较轻，但年龄已进入高相关阶段，建议密切关注后续周期变化。',
        tone: 'pink',
        evidences,
      };
    }

    if (kmiTotal >= 7) {
      return {
        title: '症状与周期不一致，阶段待确认',
        summary: '症状评分已提示围绝经期表现，但周期信息仍相对平稳，建议继续记录或结合门诊进一步确认。',
        tone: 'pink',
        evidences,
      };
    }
  }

  return {
    title: '阶段待继续观察',
    summary: '现有年龄、末次月经与周期变化信息还不足以落到更明确的阶段结论，建议继续补充和连续记录。',
    tone: 'pink',
    evidences,
  };
}

function ProfilePickerField({ label, value, placeholder, onOpen }: ProfilePickerFieldProps) {
  return (
    <div className="scene1-assessment-field">
      <button type="button" className="scene1-assessment-picker-trigger" aria-label={label} onClick={onOpen}>
        <span className="scene1-assessment-picker-trigger-label">{label}</span>
        <strong
          className={
            value
              ? 'scene1-assessment-picker-trigger-value'
              : 'scene1-assessment-picker-trigger-value placeholder'
          }
        >
          {value || placeholder}
        </strong>
        <span className="scene1-assessment-picker-trigger-hint">{value ? '点击修改' : '点击选择'}</span>
        <span aria-hidden="true" className="scene1-assessment-picker-trigger-arrow">
          <svg viewBox="0 0 16 16">
            <path d="M4 6L8 10L12 6" />
          </svg>
        </span>
      </button>
    </div>
  );
}

function ProfilePickerSheet({
  label,
  options,
  value,
  onSelect,
  onClose,
  onConfirm,
}: ProfilePickerSheetProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeOption = listRef.current?.querySelector<HTMLElement>('[data-picker-active="true"]');

    if (activeOption && typeof activeOption.scrollIntoView === 'function') {
      activeOption.scrollIntoView({ block: 'center' });
    }
  }, [label, value]);

  return (
    <div className="scene1-assessment-picker-overlay" onClick={onClose}>
      <div
        className="scene1-assessment-picker-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="scene1-assessment-picker-sheet-head">
          <button
            type="button"
            className="scene1-assessment-picker-sheet-action scene1-assessment-picker-sheet-action-muted"
            onClick={onClose}
          >
            取消
          </button>
          <strong>{label}</strong>
          <button type="button" className="scene1-assessment-picker-sheet-action" onClick={onConfirm}>
            确定
          </button>
        </div>

        <div className="scene1-assessment-picker-wheel-shell">
          <div className="scene1-assessment-picker-wheel-fade top" aria-hidden="true" />
          <div className="scene1-assessment-picker-wheel-fade bottom" aria-hidden="true" />
          <div className="scene1-assessment-picker-wheel-highlight" aria-hidden="true" />
          <div ref={listRef} className="scene1-assessment-picker-wheel">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                data-picker-active={value === option.value ? 'true' : 'false'}
                className={
                  value === option.value
                    ? 'scene1-assessment-picker-option active'
                    : 'scene1-assessment-picker-option'
                }
                aria-pressed={value === option.value}
                onClick={() => onSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DateSelectorField({
  field,
  label,
  value,
  onAnswer,
  yearAriaLabel,
  monthAriaLabel,
  dayAriaLabel,
  onValueChange,
}: StructuredDateFieldProps) {
  const parsedParts = parseDateParts(value);
  const [year, setYear] = useState(parsedParts.year);
  const [month, setMonth] = useState(parsedParts.month);
  const [day, setDay] = useState(parsedParts.day);
  const availableDays = year && month
    ? Array.from({ length: getDaysInMonth(Number(year), Number(month)) }, (_, index) => String(index + 1).padStart(2, '0'))
    : Array.from({ length: 31 }, (_, index) => String(index + 1).padStart(2, '0'));

  useEffect(() => {
    setYear(parsedParts.year);
    setMonth(parsedParts.month);
    setDay(parsedParts.day);
  }, [parsedParts.day, parsedParts.month, parsedParts.year]);

  const syncValue = (nextValue: string) => {
    onAnswer(field, nextValue);
    onValueChange?.(nextValue);
  };

  const updateDatePart = (nextYear: string, nextMonth: string, nextDay: string) => {
    setYear(nextYear);
    setMonth(nextMonth);
    setDay(nextDay);
    syncValue(buildDateValue(nextYear, nextMonth, nextDay));
  };

  return (
    <div className="scene1-assessment-field">
      <p className="scene1-assessment-label">{label}</p>
      <div className="scene1-assessment-birthdate-grid">
        <label className="scene1-assessment-select-field">
          <span className="scene1-assessment-select-label">年份</span>
          <select
            className="scene1-assessment-input scene1-assessment-select"
            aria-label={yearAriaLabel}
            value={year}
            onChange={(event) => updateDatePart(event.target.value, month, day || '01')}
          >
            <option value="">年</option>
            {dateYearOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="scene1-assessment-select-field">
          <span className="scene1-assessment-select-label">月份</span>
          <select
            className="scene1-assessment-input scene1-assessment-select"
            aria-label={monthAriaLabel}
            value={month}
            onChange={(event) => updateDatePart(year, event.target.value, day || '01')}
          >
            <option value="">月</option>
            {dateMonthOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="scene1-assessment-select-field">
          <span className="scene1-assessment-select-label">日期</span>
          <select
            className="scene1-assessment-input scene1-assessment-select"
            aria-label={dayAriaLabel}
            value={day}
            onChange={(event) => updateDatePart(year, month, event.target.value)}
          >
            <option value="">日</option>
            {availableDays.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
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
            <span className="scene1-assessment-choice-label">{option.label}</span>
            {option.description ? (
              <span aria-hidden="true" className="scene1-assessment-choice-description">
                {option.description}
              </span>
            ) : null}
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
  yearAriaLabel,
  monthAriaLabel,
  dayAriaLabel,
}: DateChoiceFieldProps) {
  return (
    <div className="scene1-assessment-block">
      <DateSelectorField
        field={dateField}
        label={label}
        value={dateValue}
        onAnswer={onAnswer}
        yearAriaLabel={yearAriaLabel}
        monthAriaLabel={monthAriaLabel}
        dayAriaLabel={dayAriaLabel}
        onValueChange={(nextValue) => onAnswer(quickField, nextValue ? 'date-entered' : '')}
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

type ResultBadgeTone = 'pink' | 'orange' | 'green';

type ResultHighlightItem = {
  title: string;
  tag: string;
  body: string;
  tone: ResultBadgeTone;
};

type ResultRadarMetric = {
  label: string;
  score: number;
};

const radarMetricPositions = ['top', 'top-right', 'bottom-right', 'bottom-left', 'top-left'] as const;

function getSeverityTone(severity: number): ResultBadgeTone {
  if (severity >= 2) {
    return 'orange';
  }

  if (severity === 1) {
    return 'pink';
  }

  return 'green';
}

function getRiskToneFromDecisionLabel(label: string): ResultBadgeTone {
  if (label.includes('高风险') || label.includes('红灯')) {
    return 'orange';
  }

  if (label.includes('中风险') || label.includes('黄灯')) {
    return 'pink';
  }

  return 'green';
}

function getCycleSummary(answers: Scene1AssessmentState['answers']) {
  const cycleText =
    answers.cycleChange === 'shorter'
      ? '周期较以往提前，提示卵巢功能可能已经出现波动。'
      : answers.cycleChange === 'longer'
        ? '周期延长或间隔拉长，属于围绝经期常见变化信号。'
        : answers.cycleChange === 'same'
          ? '周期整体还算稳定，暂未看到非常明显的节律紊乱。'
          : '周期变化暂不够明确，建议继续记录帮助识别趋势。';

  const volumeText =
    answers.volumeChange === 'heavier'
      ? '经量较前增多，需要留意是否伴随疲乏或出血异常。'
      : answers.volumeChange === 'lighter'
        ? '经量较前减少，和围绝经期雌激素波动相符。'
        : answers.volumeChange === 'same'
          ? '经量变化目前不算突出。'
          : '经量变化还不够清晰。';

  const lastPeriodText =
    answers.lastPeriodQuickOption === 'current-period'
      ? '当前正处于经期。'
      : answers.lastPeriodQuickOption === 'forgot'
        ? '最近一次月经时间暂不明确。'
        : answers.lastPeriodQuickOption === 'not-applicable'
          ? '最近月经情况暂不适用。'
          : answers.lastPeriodDate
            ? `最近一次月经记录为 ${answers.lastPeriodDate}。`
            : '';

  return `${cycleText}${volumeText}${lastPeriodText}`;
}

function getCycleHealthScore(answers: Scene1AssessmentState['answers']) {
  const cycleScore =
    answers.cycleChange === 'same' ? 82 : answers.cycleChange === 'unsure' ? 60 : 46;
  const volumeScore =
    answers.volumeChange === 'same' ? 82 : answers.volumeChange === 'unsure' ? 64 : 52;
  const periodScore = answers.periodPresence === 'yes' ? 78 : 45;

  return Math.round((cycleScore + volumeScore + periodScore) / 3);
}

function getSpecialFactorScore(answers: Scene1AssessmentState['answers']) {
  const flags = [
    answers.ovarianFailure === 'yes',
    answers.surgeryHistory !== 'none' && answers.surgeryHistory !== '',
    answers.hormonalContraception === 'yes',
    answers.hormoneReplacementTherapy === 'yes',
  ].filter(Boolean).length;

  if (flags === 0) {
    return 86;
  }

  if (flags === 1) {
    return 68;
  }

  return 44;
}

function getDecisionDisplayScore(label: string) {
  if (label.includes('高风险') || label.includes('红灯')) {
    return 38;
  }

  if (label.includes('中风险') || label.includes('黄灯')) {
    return 64;
  }

  return 86;
}

function buildRadarPath(scores: number[]) {
  const centerX = 110;
  const centerY = 110;
  const radius = 64;

  return scores
    .map((score, index) => {
      const angle = (-90 + index * (360 / scores.length)) * (Math.PI / 180);
      const distance = (Math.max(0, Math.min(100, score)) / 100) * radius;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ')
    .concat(' Z');
}

function CompletionState({ answers }: { answers: Scene1AssessmentState['answers'] }) {
  const summary = getKmiScoreSummary(pickCompletedKmiAnswers(answers));
  const stageSummary = getStageSummary(answers, summary.total);
  const progressWidth = `${(summary.total / summary.max) * 100}%`;
  const topSymptoms = summary.details
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
  const decisionSummary = getResultDecisionSummary(answers, summary.details);
  const kmiDecisionSummary =
    summary.interpretation.band === 'severe'
      ? '症状评分已达重度区间，建议尽快结合门诊做系统评估。'
      : summary.interpretation.band === 'moderate'
        ? '症状已进入中度区间，建议尽快把睡眠、潮热、情绪和月经变化纳入连续观察。'
        : summary.interpretation.band === 'mild'
        ? '当前更像围绝经期早期变化，适合尽早开始生活方式管理。'
          : '当前 KMI 症状负担较轻，建议继续观察周期变化与核心症状。';
  const cycleSummary = getCycleSummary(answers);
  const cycleHealthScore = getCycleHealthScore(answers);
  const kmiHealthScore = Math.max(18, 100 - Math.round((summary.total / summary.max) * 100));
  const boneHealthScore = getDecisionDisplayScore(decisionSummary.boneHealth.label);
  const exerciseScore = getDecisionDisplayScore(decisionSummary.exercise.label);
  const specialFactorScore = getSpecialFactorScore(answers);
  const overallHealthScore = Math.round(
    (kmiHealthScore + boneHealthScore + exerciseScore + cycleHealthScore + specialFactorScore) / 5
  );
  const highlightItems: ResultHighlightItem[] = [
    ...topSymptoms.map((item) => ({
      title: item.label,
      tag: item.severity >= 2 ? '重点关注' : '持续观察',
      body: `本次评分 ${item.score} 分，当前为${item.severity}级表现，建议继续结合月经与触发因素记录变化。`,
      tone: getSeverityTone(item.severity),
    })),
    {
      title: '骨健康与维生素D风险',
      tag: decisionSummary.boneHealth.label,
      body: decisionSummary.boneHealth.summary,
      tone: getRiskToneFromDecisionLabel(decisionSummary.boneHealth.label),
    },
    {
      title: '运动能力初筛',
      tag: decisionSummary.exercise.label,
      body: decisionSummary.exercise.summary,
      tone: getRiskToneFromDecisionLabel(decisionSummary.exercise.label),
    },
  ].slice(0, 5);
  const radarMetrics: ResultRadarMetric[] = [
    { label: 'KMI健康度', score: kmiHealthScore },
    { label: '运动安全', score: exerciseScore },
    { label: '特殊因素', score: specialFactorScore },
    { label: '周期稳定', score: cycleHealthScore },
    { label: '骨健康储备', score: boneHealthScore },
  ];
  const radarPath = buildRadarPath(radarMetrics.map((item) => item.score));
  const cycleTag =
    answers.cycleChange === 'same'
      ? '周期相对稳定'
      : answers.cycleChange === 'unsure'
        ? '周期变化待继续观察'
        : '周期变化明显';

  return (
    <div className="scene1-assessment-result-page">
      <section className={`scene1-assessment-result-stage-card ${stageSummary.tone}`}>
        <div className="scene1-assessment-result-stage-head">
          <div>
            <span className="scene1-assessment-result-stage-kicker">阶段判断</span>
            <h2>{stageSummary.title}</h2>
          </div>
        </div>
        <p>{stageSummary.summary}</p>
        <div className="scene1-assessment-result-stage-evidence">
          <div className="scene1-assessment-result-stage-evidence-head">
            <strong>判断依据</strong>
            <span>年龄 / 末次月经 / 周期变化</span>
          </div>
          <div className="scene1-assessment-result-stage-evidence-grid">
            {stageSummary.evidences.map((item) => (
              <div key={item.label} className="scene1-assessment-result-stage-evidence-item">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scene1-assessment-result-hero">
        <div className="scene1-assessment-result-hero-top">
          <p className="scene1-assessment-kicker">评估已完成</p>
          <span className="scene1-assessment-result-hero-vip">结果分析</span>
        </div>
        <div className="scene1-assessment-result-switcher">
          <button type="button" className="scene1-assessment-result-switcher-tab active">
            当前结果
          </button>
          <button type="button" className="scene1-assessment-result-switcher-tab" disabled>
            连续跟踪
          </button>
        </div>
        <div className="scene1-assessment-result-chip-row">
          <span className="scene1-assessment-result-chip active">综合解读</span>
          <span className="scene1-assessment-result-chip">结果判断</span>
          <span className="scene1-assessment-result-chip">管理建议</span>
        </div>
      </section>

      <section className="scene1-assessment-result-decision-section">
        <h3>最终结果分析与判断</h3>
        <div className="scene1-assessment-result-overview-card">
          <div className="scene1-assessment-result-overview-gauge">
            <div
              className="scene1-assessment-result-overview-gauge-ring"
              style={{
                background: `conic-gradient(#ff6b9d 0deg ${Math.round(
                  (overallHealthScore / 100) * 260
                )}deg, rgba(255,255,255,0.42) ${Math.round((overallHealthScore / 100) * 260)}deg 260deg, rgba(255,255,255,0) 260deg 360deg)`,
              }}
              aria-hidden="true"
            >
              <div className="scene1-assessment-result-overview-gauge-core">
                <span>健康分</span>
                <strong>{overallHealthScore}</strong>
              </div>
            </div>
            <div className="scene1-assessment-result-overview-gauge-foot">
              <span>{cycleTag}</span>
              <strong>{summary.interpretation.label}</strong>
            </div>
          </div>
          <div className="scene1-assessment-result-overview-main">
            <div className="scene1-assessment-result-overview-headline">
              <h2>{summary.interpretation.label}</h2>
              <p>{kmiDecisionSummary}</p>
            </div>
            <div className="scene1-assessment-result-overview-tags">
              <span className="scene1-assessment-result-tag">KMI {summary.interpretation.label}</span>
              <span className="scene1-assessment-result-tag">{decisionSummary.boneHealth.label}</span>
              <span className="scene1-assessment-result-tag">{decisionSummary.exercise.label}</span>
            </div>
            <div className="scene1-assessment-result-overview-summary">
              <strong>周期总结：</strong>
              <p>{cycleSummary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="scene1-assessment-result-grid">
        <div className="scene1-assessment-result-score">
          <div className="scene1-assessment-result-score-header scene1-assessment-result-score-header-stacked">
            <h3>KMI 指数评估</h3>
            <span>{`${summary.total} / ${summary.max}`}</span>
          </div>
          <div className="scene1-assessment-result-progress" aria-hidden="true">
            <div className="scene1-assessment-result-progress-fill" style={{ width: progressWidth }} />
          </div>
          <p>
            当前分值对应“{summary.interpretation.label}”，阈值依据围绝经期评估规则：≤6 分为正常，7-15
            分为轻度，16-30 分为中度，30 分以上为重度。
          </p>
        </div>

        <div className="scene1-assessment-result-details scene1-assessment-result-radar-card">
          <div className="scene1-assessment-result-score-header">
            <h3>围绝经指标拆解</h3>
            <span className="scene1-assessment-result-toggle-chip">综合</span>
          </div>
          <div className="scene1-assessment-result-radar-layout">
            <div className="scene1-assessment-result-radar-stage">
              {radarMetrics.map((item, index) => (
                <div
                  key={item.label}
                  className={`scene1-assessment-result-radar-metric scene1-assessment-result-radar-metric-${radarMetricPositions[index]}`}
                >
                  <strong>{item.label}</strong>
                  <span>{`得分 ${item.score}`}</span>
                </div>
              ))}
              <div className="scene1-assessment-result-radar-visual" aria-hidden="true">
                <svg viewBox="0 0 220 220">
                  <circle cx="110" cy="110" r="64" className="scene1-assessment-result-radar-ring" />
                  <circle cx="110" cy="110" r="46" className="scene1-assessment-result-radar-ring" />
                  <circle cx="110" cy="110" r="28" className="scene1-assessment-result-radar-ring" />
                  <path
                    d="M110 46L170.87 90.22L147.64 161.78L72.36 161.78L49.13 90.22Z"
                    className="scene1-assessment-result-radar-grid"
                  />
                  <path d={radarPath} className="scene1-assessment-result-radar-fill" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scene1-assessment-result-focus-card">
        <h3>重点关注</h3>
        <div className="scene1-assessment-result-focus-list">
          {highlightItems.map((item) => (
            <div key={`${item.title}-${item.tag}`} className="scene1-assessment-result-focus-item">
              <div className="scene1-assessment-result-focus-head">
                <strong>{item.title}</strong>
                <span className={`scene1-assessment-result-badge-mini ${item.tone}`}>{item.tag}</span>
              </div>
              <p>{item.body}</p>
            </div>
          ))}
          {highlightItems.length === 0 ? (
            <div className="scene1-assessment-result-focus-item">
              <div className="scene1-assessment-result-focus-head">
                <strong>暂无明显 KMI 症状</strong>
                <span className="scene1-assessment-result-badge-mini green">继续观察</span>
              </div>
              <p>本次记录未出现需要重点提示的 KMI 症状得分。</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="scene1-assessment-result-extension-grid">
        <div className="scene1-assessment-result-extension-card">
          <h3>原因分析</h3>
          <div className="scene1-assessment-result-analysis-block">
            <strong>{summary.interpretation.label}</strong>
            <p>{kmiDecisionSummary}</p>
          </div>
          <div className="scene1-assessment-result-analysis-block">
            <strong>{decisionSummary.boneHealth.title}</strong>
            <p>{decisionSummary.boneHealth.rationale}</p>
          </div>
          <div className="scene1-assessment-result-analysis-block">
            <strong>{decisionSummary.exercise.title}</strong>
            <p>{decisionSummary.exercise.rationale}</p>
          </div>
        </div>

        <div className="scene1-assessment-result-extension-card">
          <h3>{decisionSummary.boneHealth.title}</h3>
          <strong>{decisionSummary.boneHealth.label}</strong>
          <p>{decisionSummary.boneHealth.summary}</p>
          <div className="scene1-assessment-result-mini-actions">
            {decisionSummary.boneHealth.actions.map((item) => (
              <div key={item} className="scene1-assessment-result-mini-action">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="scene1-assessment-result-extension-card">
          <h3>{decisionSummary.exercise.title}</h3>
          <strong>{decisionSummary.exercise.label}</strong>
          <p>{decisionSummary.exercise.summary}</p>
          <div className="scene1-assessment-result-mini-actions">
            {decisionSummary.exercise.actions.map((item) => (
              <div key={item} className="scene1-assessment-result-mini-action">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="scene1-assessment-result-action-section">
        <h3>接下来的行动指南</h3>
        <div className="scene1-assessment-result-action-list">
          <div className="scene1-assessment-result-action-card">
            <strong>记录 14 天完整症状日记</strong>
            <p>持续记录月经、睡眠、潮热与情绪，有助于判断症状波动和触发因素。</p>
          </div>
          <div className="scene1-assessment-result-action-card">
            <strong>建议进一步医学评估</strong>
            <p>如果症状已影响工作、睡眠或生活质量，建议与医生讨论更系统的管理方案。</p>
          </div>
          <div className="scene1-assessment-result-action-card">
            <strong>骨健康与维生素D管理</strong>
            <p>{decisionSummary.boneHealth.actions[0]}</p>
          </div>
          <div className="scene1-assessment-result-action-card">
            <strong>运动方案按红黄绿灯执行</strong>
            <p>{decisionSummary.exercise.actions[0]}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export function AssessmentStepRenderer({
  state,
  onAnswer,
}: AssessmentStepRendererProps) {
  const [profilePickerState, setProfilePickerState] = useState<ProfilePickerSheetState | null>(null);

  const openProfilePicker = (field: ProfilePickerFieldKey) => {
    const config = profilePickerConfigMap[field];
    const currentValue = state.answers[field] || config.defaultValue;
    const draftValue = normalizeProfilePickerValue(field, currentValue) || config.defaultValue;

    setProfilePickerState({
      field,
      ...config,
      draftValue,
    });
  };

  const closeProfilePicker = () => {
    setProfilePickerState(null);
  };

  const confirmProfilePicker = () => {
    if (!profilePickerState) {
      return;
    }

    const nextValue =
      normalizeProfilePickerValue(profilePickerState.field, profilePickerState.draftValue) ||
      profilePickerConfigMap[profilePickerState.field].defaultValue;

    onAnswer(profilePickerState.field, nextValue);
    setProfilePickerState(null);
  };

  if (state.completed) {
    return <CompletionState answers={state.answers} />;
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
              帮助了解当前是否存在围绝经期相关表现，并评估症状影响程度。该评估旨在辅助识别身体变化，为后续健康管理提供更清晰的参考。
            </p>
          </div>

          <div className="scene1-assessment-intro-feature-grid">
            <IntroFeatureCard
              title="快速便捷"
              body="预计耗时 3-5 分钟，重点覆盖基础信息、周期变化、症状表现与 KMI 评估。"
            />
            <IntroFeatureCard
              title="健康参考"
              body="结果用于健康管理参考，不能替代临床医生诊断，但能帮助您更早发现变化。"
            />
          </div>

          <div className="scene1-assessment-intro-visual">
            <div className="scene1-assessment-intro-visual-glow" aria-hidden="true" />
            <p>“在变化中找到平衡，重新理解身体节律，也更从容地应对每一次波动。”</p>
          </div>
        </div>

        <div className="scene1-assessment-intro-side">
          <div className="scene1-assessment-intro-panel">
            <h3>评估须知</h3>
            <IntroNoticeItem
              title="隐私保护"
              body="回答内容仅用于当前评估流程，个人敏感数据会以受保护方式展示和处理。"
            />
            <IntroNoticeItem
              title="可继续完成"
              body="当前流程支持前后切换查看内容，但关闭评估后会重置本轮填写状态。"
            />
            <div className="scene1-assessment-intro-disclaimer">
              <strong>免责声明</strong>
              <p>
                本评估结果仅作健康管理参考，不构成医学诊断或治疗意见。如您存在明显异常出血、严重睡眠障碍或持续不适，请及时就医。
              </p>
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

        <section className="scene1-assessment-block scene1-assessment-profile-card">
          <div className="scene1-assessment-section-head">
            <h3>个人生理特征</h3>
            <p>这部分信息用于帮助判断年龄阶段与体征变化之间的关系。</p>
          </div>

          <div className="scene1-assessment-field-stack">
            <ProfilePickerField
              label="年龄"
              value={formatProfileValue('age', state.answers.age)}
              placeholder={profilePickerConfigMap.age.placeholder}
              onOpen={() => openProfilePicker('age')}
            />

            <div className="scene1-assessment-two-col">
              <ProfilePickerField
                label="身高"
                value={formatProfileValue('heightCm', state.answers.heightCm)}
                placeholder={profilePickerConfigMap.heightCm.placeholder}
                onOpen={() => openProfilePicker('heightCm')}
              />
              <ProfilePickerField
                label="体重"
                value={formatProfileValue('weightKg', state.answers.weightKg)}
                placeholder={profilePickerConfigMap.weightKg.placeholder}
                onOpen={() => openProfilePicker('weightKg')}
              />
            </div>
          </div>
        </section>

        <InlineBanner
          title="BMI 指数将结合身高和体重自动辅助判断"
          body="这能帮助我们更完整地理解代谢负担与身体阶段变化之间的关系，但不会单独作为结论依据。"
        />

        {profilePickerState ? (
          <ProfilePickerSheet
            label={profilePickerState.label}
            options={profilePickerState.options}
            value={profilePickerState.draftValue}
            onSelect={(value) =>
              setProfilePickerState((prev) => (prev ? { ...prev, draftValue: value } : prev))
            }
            onClose={closeProfilePicker}
            onConfirm={confirmProfilePicker}
          />
        ) : null}
      </div>
    );
  }

  if (step.id === 3) {
    return (
      <div className="scene1-assessment-stack">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
        <p className="scene1-assessment-helper scene1-assessment-step-helper">（记录数据读取，无记录数据填写）</p>

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
          label="2. 最近 12 个月月经周期是否有明显变化？"
          description="指两次月经第一天之间的间隔天数。"
          value={state.answers.cycleChange}
          options={step.options?.cycleChange ?? []}
          onSelect={(value) => onAnswer('cycleChange', value)}
        />
        <ChoiceRow
          label="3. 最近 12 个月月经量是否明显变化？"
          value={state.answers.volumeChange}
          options={step.options?.volumeChange ?? []}
          onSelect={(value) => onAnswer('volumeChange', value)}
        />
        <DateChoiceField
          dateField="lastPeriodDate"
          quickField="lastPeriodQuickOption"
          label="4. 最近一次月经距离现在多久？"
          dateValue={state.answers.lastPeriodDate}
          quickValue={state.answers.lastPeriodQuickOption}
          options={step.options?.lastPeriodQuickOption ?? []}
          onAnswer={onAnswer}
          yearAriaLabel="最近月经年份"
          monthAriaLabel="最近月经月份"
          dayAriaLabel="最近月经日期"
        />
      </div>
    );
  }

  if (step.id === 4) {
    return (
      <div className="scene1-assessment-stack">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>

        <div className="scene1-assessment-special-grid">
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
            description="您目前是否正在使用曼月乐或其他激素类避孕方式？"
            value={state.answers.hormonalContraception}
            options={step.options?.hormonalContraception ?? []}
            onSelect={(value) => onAnswer('hormonalContraception', value)}
          />
          <ChoiceRow
            label="激素替代治疗"
            description="最近三个月是否接受过激素替代治疗？"
            value={state.answers.hormoneReplacementTherapy}
            options={step.options?.hormoneReplacementTherapy ?? []}
            onSelect={(value) => onAnswer('hormoneReplacementTherapy', value)}
          />
        </div>

        <InlineBanner
          title="特殊情况说明"
          body="您的情况可能较为特殊，结果页会结合这些信息一起解释。"
        />
      </div>
    );
  }

  if (step.id === 5) {
    return (
      <div className="scene1-assessment-stack">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>

        <InlineBanner
          title="请根据最近1个月的实际感受进行选择"
          body="KMI 问卷第一部分会先从较常见的身体与情绪变化开始，帮助判断围绝经期症状强度。"
        />

        <KmiGroup
          title="KMI 问卷第一部分"
          prompts={kmiSetOnePrompts}
          options={step.options ?? {}}
          answers={state.answers}
          onAnswer={onAnswer}
        />

        <SupportPanel
          kicker="身心调节"
          title="您的身体正在经历变化"
          body="这些题目不仅是在记录症状，也在帮助您更具体地看见变化发生在哪些方面。"
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
          <p>这部分会结合生活质量变化一起评估，但所有输入内容都仅在本次评估流程中使用。</p>
        </div>
      </section>
    </div>
  );
}
