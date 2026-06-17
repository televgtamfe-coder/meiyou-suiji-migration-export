import { useEffect, useRef, useState } from 'react';
import type { EChartsOption, EChartsType } from 'echarts';
import { AssessmentFieldKey, AssessmentOption, getAssessmentStep } from '../assessmentSteps';
import { Scene1AssessmentState } from '../assessmentState';
import { getKmiScoreSummary, pickCompletedKmiAnswers } from '../kmiScoring';
import { kmiRules } from '../kmiRules';
import { AssessmentStageClockSummary } from './AssessmentStageClockSummary';
import {
  createBoneAssessmentAnswers,
  getBoneAssessmentResultSummary,
} from '../bone-assessment/boneAssessmentScoring';
import { readBoneAssessmentLatest } from '../bone-assessment/boneAssessmentStorage';
import {
  createExerciseAssessmentAnswers,
  getExerciseAssessmentResultSummary,
} from '../exercise-assessment/exerciseAssessmentScoring';
import { readExerciseAssessmentLatest } from '../exercise-assessment/exerciseAssessmentStorage';
import { perimenopauseAssessmentOverviewSummary } from '../assessmentOverviewCopy';

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

type CycleChangeFieldProps = {
  label: string;
  value: string;
  absenceDurationValue: string;
  options: AssessmentOption[];
  absenceDurationOptions: AssessmentOption[];
  onSelect: (value: string) => void;
  onSelectAbsenceDuration: (value: string) => void;
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

type KmiQuestionRowsProps = Omit<KmiGroupProps, 'title'>;

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

type ResultStageFact = {
  label: string;
  value: string;
};

type ResultStageSummary = {
  title: string;
  summary: string;
  tone: ResultBadgeTone;
  facts: ResultStageFact[];
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
  const absenceDurationLabel = getCycleAbsenceDurationLabel(answers.cycleAbsentDuration);

  if (answers.cycleChange === 'absent' && absenceDurationLabel) {
    return `已${absenceDurationLabel}未行经`;
  }

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

function getCycleAbsenceDurationLabel(value: string) {
  if (value === '3-6-months') {
    return '3-6个月';
  }

  if (value === '7-11-months') {
    return '7-11个月';
  }

  if (value === '12-plus-months') {
    return '1年以上';
  }

  return '';
}

function getCycleAbsenceDurationDays(value: string) {
  if (value === '3-6-months') {
    return 120;
  }

  if (value === '7-11-months') {
    return 270;
  }

  if (value === '12-plus-months') {
    return 365;
  }

  return null;
}

function getCycleChangeValue(answers: Scene1AssessmentState['answers']) {
  if (answers.cycleChange === 'same') {
    return '每月基本都来，周期规律（21-35天）';
  }

  if (answers.cycleChange === 'shorter') {
    return '每月基本都来，但周期有时提前或推后超过 7 天';
  }

  if (answers.cycleChange === 'longer') {
    return '经常 2-3 个月才来一次，量可能变少';
  }

  if (answers.cycleChange === 'absent') {
    const durationLabel = getCycleAbsenceDurationLabel(answers.cycleAbsentDuration);
    return durationLabel ? `已经${durationLabel}没来月经` : '已经很久没来月经';
  }

  if (answers.cycleChange === 'unsure') {
    return '完全不确定 / 没关注过';
  }

  return '周期变化暂不明确';
}

export function getStageSummary(
  answers: Scene1AssessmentState['answers'],
  kmiTotal: number,
  now = new Date()
): ResultStageSummary {
  const age = getAssessmentAge(answers.age);
  const lastPeriodGapDays = getDaysSinceDate(answers.lastPeriodDate, now);
  const reportedGapDays = getCycleAbsenceDurationDays(answers.cycleAbsentDuration);
  const effectiveLastPeriodGapDays =
    lastPeriodGapDays !== null && reportedGapDays !== null
      ? Math.max(lastPeriodGapDays, reportedGapDays)
      : (reportedGapDays ?? lastPeriodGapDays);
  const facts: ResultStageFact[] = [
    {
      label: '年龄',
      value: age === null ? '未填写' : `${age}岁`,
    },
    {
      label: '末次月经',
      value: formatLastPeriodValue(answers, effectiveLastPeriodGapDays),
    },
    {
      label: '周期变化',
      value: getCycleChangeValue(answers),
    },
  ];
  const buildSummary = (title: string, summary: string, tone: ResultBadgeTone): ResultStageSummary => ({
    title,
    summary,
    tone,
    facts,
  });

  if (answers.cycleChange === 'absent') {
    if (answers.cycleAbsentDuration === '12-plus-months') {
      if (age !== null && age >= 45) {
        return buildSummary(
          '绝经期',
          '您自报已经很久没来了（≥1年），且年龄≥45岁，当前更符合绝经期。',
          'orange'
        );
      }

      if (age !== null && age >= 40) {
        return buildSummary(
          '绝经期 / 早发性绝经',
          '您自报已经很久没来了（≥1年），但年龄仍在 40-44 岁，当前需按绝经期 / 早发性绝经方向优先判断，并建议尽快就医确认。',
          'orange'
        );
      }

      return buildSummary(
        'S1（卵巢早衰排查）',
        '您自报已经很久没来了（≥1年），且年龄<40岁，建议按卵巢早衰方向优先排查，并尽快就医。',
        'orange'
      );
    }

    if (answers.cycleAbsentDuration === '3-6-months' || answers.cycleAbsentDuration === '7-11-months') {
      if (age !== null && age >= 45) {
        return buildSummary(
          '围绝经期过渡晚期',
          '您自报已经 3-11 个月没来月经，且年龄≥45岁，当前更符合围绝经期过渡晚期。',
          'orange'
        );
      }

      return buildSummary(
        '异常闭经',
        '您自报已经 3-11 个月没来月经，但年龄<45岁，建议就医；在明确原因前，临时按进入围绝经期管理。',
        'orange'
      );
    }
  }

  if (answers.cycleChange === 'longer') {
    if (age !== null && age >= 40 && age <= 48) {
      return buildSummary(
        '围绝经期过渡晚期',
        '您自报经常 2-3 个月才来一次月经，且年龄处于 40-48 岁，当前更符合围绝经期过渡晚期（月经稀发）。',
        'orange'
      );
    }

    if (age !== null && age < 40) {
      return buildSummary(
        '异常月经稀发',
        '您自报经常 2-3 个月才来一次月经，但年龄<40岁，建议就医排查异常月经稀发原因。',
        'orange'
      );
    }
  }

  if (answers.cycleChange === 'shorter') {
    if (age !== null && age >= 40 && age <= 48) {
      return buildSummary(
        '围绝经期过渡早期',
        '您自报周期有时提前或推后超过7天，且年龄处于 40-48 岁，当前更符合围绝经期过渡早期。',
        'pink'
      );
    }

    if (age !== null && age < 40) {
      return buildSummary(
        '未进入围绝经期',
        '虽然存在周期变化，但年龄<40岁，当前更像单纯周期波动，建议持续观察并继续记录。',
        'green'
      );
    }
  }

  if (answers.cycleChange === 'same') {
    if (age !== null && age < 45 && kmiTotal <= 6) {
      return buildSummary(
        '未进入围绝经期',
        '您自报周期规律（21-35天），且 KMI≤6，当前更偏向未进入围绝经期。',
        'green'
      );
    }

    if (age !== null && age >= 45 && kmiTotal >= 7) {
      return buildSummary(
        '进入围绝经期（待确认）',
        '您自报周期规律，但症状评分提示可能存在围绝经期症状，当前临时按进入围绝经期管理，并标记为待确认。',
        kmiTotal >= 16 ? 'orange' : 'pink'
      );
    }

    if (kmiTotal > 30) {
      return buildSummary(
        '进入围绝经期（症状严重）',
        '虽然您自报周期规律，但 KMI 提示症状较重，当前按进入围绝经期管理，并建议尽快就医确认。',
        'orange'
      );
    }

    if (kmiTotal >= 16) {
      return buildSummary(
        '进入围绝经期（症状明显）',
        '虽然您自报周期规律，但 KMI 提示症状已经较明显，当前按进入围绝经期管理，并建议继续记录趋势。',
        'orange'
      );
    }

    if (kmiTotal >= 7) {
      return buildSummary(
        '进入围绝经期',
        '虽然您自报周期规律，但 KMI 已提示围绝经期相关症状，当前按进入围绝经期管理。',
        'pink'
      );
    }

    if (age !== null && age >= 45) {
      return buildSummary(
        '未进入围绝经期（建议持续观察）',
        '您自报周期规律，且当前 KMI 较低；虽然年龄已≥45岁，但现阶段仍先按未进入围绝经期处理，建议持续观察。',
        'green'
      );
    }
  }

  if (answers.cycleChange === 'unsure') {
    const note = '建议关注月经周期，记录3个月后可获得精准评估。';

    if (kmiTotal <= 6) {
      return buildSummary(
        '未进入围绝经期',
        `您暂时无法确定月经情况，当前先以 KMI 为主要依据保守判断为未进入围绝经期。${note}`,
        'green'
      );
    }

    if (kmiTotal <= 15) {
      return buildSummary(
        '进入围绝经期',
        `您暂时无法确定月经情况，当前以 KMI 为主要依据，提示已进入围绝经期。${note}`,
        'pink'
      );
    }

    if (kmiTotal <= 30) {
      return buildSummary(
        '进入围绝经期（症状明显）',
        `您暂时无法确定月经情况，当前以 KMI 为主要依据，提示围绝经期症状已经较明显。${note}`,
        'orange'
      );
    }

    return buildSummary(
      '进入围绝经期（症状严重）',
      `您暂时无法确定月经情况，当前以 KMI 为主要依据，提示围绝经期症状较重。${note}`,
      'orange'
    );
  }

  if (effectiveLastPeriodGapDays !== null && effectiveLastPeriodGapDays >= 365 && age !== null) {
    if (age >= 45) {
      return buildSummary('绝经期', '末次月经与当前记录也支持绝经期方向，建议结合持续记录与门诊信息综合判断。', 'orange');
    }

    if (age >= 40) {
      return buildSummary(
        '绝经期 / 早发性绝经',
        '末次月经与当前记录支持绝经期 / 早发性绝经方向，建议尽快就医确认。',
        'orange'
      );
    }

    return buildSummary(
      'S1（卵巢早衰排查）',
      '末次月经与当前记录提示停经时间较长，且年龄<40岁，建议按卵巢早衰方向优先排查。',
      'orange'
    );
  }

  return buildSummary(
    '阶段待继续观察',
    '现有年龄、月经与症状信息还不足以落到更明确的阶段结论，建议继续补充并连续记录。',
    'pink'
  );
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

function CycleChangeField({
  label,
  value,
  absenceDurationValue,
  options,
  absenceDurationOptions,
  onSelect,
  onSelectAbsenceDuration,
  description,
}: CycleChangeFieldProps) {
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
      {value === 'absent' ? (
        <div className="scene1-assessment-subchoice-panel">
          <p className="scene1-assessment-helper scene1-assessment-subchoice-helper">请选择具体时长</p>
          <div className="scene1-assessment-subchoice-grid">
            {absenceDurationOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={
                  absenceDurationValue === option.value
                    ? 'scene1-assessment-choice scene1-assessment-choice-sub active'
                    : 'scene1-assessment-choice scene1-assessment-choice-sub'
                }
                onClick={() => onSelectAbsenceDuration(option.value)}
              >
                <span className="scene1-assessment-choice-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
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
  if (title === '再了解一下你的月经变化') {
    return null;
  }

  return (
    <div
      className="scene1-assessment-support-panel scene1-assessment-footnote"
      data-testid="scene1-assessment-support-panel"
    >
      {kicker ? (
        <span className="scene1-assessment-support-kicker scene1-assessment-footnote-label">{kicker}</span>
      ) : null}
      <h3 className="scene1-assessment-support-title scene1-assessment-footnote-title">{title}</h3>
      <p className="scene1-assessment-support-body scene1-assessment-footnote-body">{body}</p>
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
  if (title === '围绝经期的识别通常需要结合年龄、月经变化和症状综合判断。') {
    return null;
  }

  return (
    <div
      className="scene1-assessment-banner scene1-assessment-footnote"
      data-testid="scene1-assessment-inline-banner"
    >
      <strong className="scene1-assessment-footnote-title">{title}</strong>
      <p className="scene1-assessment-footnote-body">{body}</p>
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
  id: string;
  title: string;
  tag: string;
  body: string;
  tone: ResultBadgeTone;
  analysis?: string;
};

type ResultRadarMetric = {
  id?: string;
  label: string;
  score: number | null;
};

type ResultScoreStageTone = 'alert' | 'focus' | 'good' | 'excellent';

type ResultScoreStage = {
  label: string;
  description: string;
  tone: ResultScoreStageTone;
};

const mentalSleepFields = ['kmiInsomnia', 'kmiNervousness', 'kmiMelancholia', 'kmiFatigue'] as const;
const genitourinaryReproductiveFields = ['kmiSexualImpact', 'kmiUrinarySymptoms'] as const;
const pictorialChartGridTop = 10;
const pictorialChartGridBottom = 18;
const resultScoreStages: ResultScoreStage[] = [
  { label: '预警', description: '<65', tone: 'alert' },
  { label: '关注', description: '65-74', tone: 'focus' },
  { label: '良好', description: '75-84', tone: 'good' },
  { label: '优秀', description: '≥85', tone: 'excellent' },
];
const pendingResultScoreStage: ResultScoreStage = {
  label: '待测',
  description: '完成后展示',
  tone: 'focus',
};

type SupplementAssessmentResult = {
  badgeLabel: string;
  overviewTag: string;
  body: string;
  analysis: string;
  tone: ResultBadgeTone;
  score: number | null;
};

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
  if (answers.cycleChange === 'same' || answers.cycleChange === 'shorter' || answers.cycleChange === 'longer' || answers.cycleChange === 'absent' || answers.cycleChange === 'unsure') {
    const cycleText =
      answers.cycleChange === 'same'
        ? '最近 1 年月经总体规律，周期仍在常见范围内。'
        : answers.cycleChange === 'shorter'
          ? '每月基本都来，但周期有时提前或推后超过 7 天，提示节律已经出现波动。'
          : answers.cycleChange === 'longer'
            ? '月经已经出现 2-3 个月才来一次的情况，属于需要重点关注的周期拉长信号。'
            : answers.cycleChange === 'absent'
              ? `已经${getCycleAbsenceDurationLabel(answers.cycleAbsentDuration) || '较长时间'}没来月经，建议结合年龄与伴随症状综合判断。`
              : '最近 1 年的月经情况暂不够明确，建议继续记录帮助识别趋势。';

    const volumeText =
      answers.volumeChange === 'heavier'
        ? '经量较前增多，需要留意是否伴随疲乏或出血异常。'
        : answers.volumeChange === 'lighter'
          ? '经量较前减少，和围绝经期激素波动相符。'
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

  const cycleText =
    answers.cycleChange === 'absent'
      ? `已经${getCycleAbsenceDurationLabel(answers.cycleAbsentDuration) || '较长时间'}没来月经，建议结合年龄与伴随症状综合判断。`
      : answers.cycleChange === 'shorter'
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
  if (answers.cycleChange === 'absent') {
    const cycleScore =
      answers.cycleAbsentDuration === '12-plus-months'
        ? 28
        : answers.cycleAbsentDuration === '7-11-months'
          ? 34
          : 40;
    const volumeScore =
      answers.volumeChange === 'same' ? 82 : answers.volumeChange === 'unsure' ? 64 : 52;
    const periodScore = answers.periodPresence === 'yes' ? 78 : 45;

    return Math.round((cycleScore + volumeScore + periodScore) / 3);
  }

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

function getResultDisplayScoreFromTone(tone: ResultBadgeTone) {
  if (tone === 'orange') {
    return 38;
  }

  if (tone === 'pink') {
    return 64;
  }

  return 86;
}

function getMetricChartScore(score: number | null) {
  return score ?? 0;
}

function getMetricScoreText(score: number | null) {
  return score === null ? '待测' : `得分 ${score}`;
}

function getMetricScoreValue(score: number | null) {
  return score === null ? '--' : String(score);
}

function getAverageScore(scores: Array<number | null>) {
  const validScores = scores.filter((item): item is number => item !== null);

  if (validScores.length === 0) {
    return 0;
  }

  return Math.round(validScores.reduce((sum, item) => sum + item, 0) / validScores.length);
}

function getBoneSupplementAssessmentResult(): SupplementAssessmentResult {
  const latest = readBoneAssessmentLatest();

  if (!latest) {
    return {
      badgeLabel: '待完成',
      overviewTag: '骨钙待完成',
      body: '尚未完成骨钙测评，当前不展示骨健康与维生素D的代理判断。',
      analysis: '完成独立测评后，这里会展示真实的骨质疏松风险与维生素D结果。',
      tone: 'pink',
      score: null,
    };
  }

  const summary = getBoneAssessmentResultSummary(createBoneAssessmentAnswers(latest.answers));

  return {
    badgeLabel: summary.mainResult.label,
    overviewTag: '骨钙已同步',
    body: summary.mainResult.summary,
    analysis: summary.vitaminD.detail,
    tone: summary.mainResult.tone,
    score: getResultDisplayScoreFromTone(summary.mainResult.tone),
  };
}

function getExerciseSupplementAssessmentResult(): SupplementAssessmentResult {
  const latest = readExerciseAssessmentLatest();

  if (!latest) {
    return {
      badgeLabel: '待完成',
      overviewTag: '运动待完成',
      body: '尚未完成运动能力评估，当前不展示运动安全性的代理判断。',
      analysis: '完成独立测评后，这里会展示真实的运动风险筛查结果。',
      tone: 'pink',
      score: null,
    };
  }

  const summary = getExerciseAssessmentResultSummary(createExerciseAssessmentAnswers(latest.answers));

  return {
    badgeLabel: summary.resultSummary,
    overviewTag: '运动已同步',
    body: summary.summaryText,
    analysis: summary.detail,
    tone: summary.tone,
    score: getResultDisplayScoreFromTone(summary.tone),
  };
}

function getKmiSubgroupHealthScore(
  details: Array<{ field: string; weight: number; score: number }>,
  fields: readonly string[],
) {
  const fieldSet = new Set(fields);
  const subgroupItems = details.filter((item) => fieldSet.has(item.field));

  if (subgroupItems.length === 0) {
    return 100;
  }

  const subgroupScore = subgroupItems.reduce((sum, item) => sum + item.score, 0);
  const subgroupMax = subgroupItems.reduce((sum, item) => sum + item.weight * 3, 0);

  if (subgroupMax <= 0) {
    return 100;
  }

  return Math.max(0, 100 - Math.round((subgroupScore / subgroupMax) * 100));
}

function getResultScoreStage(score: number | null): ResultScoreStage {
  if (score === null) {
    return pendingResultScoreStage;
  }

  if (score >= 85) {
    return resultScoreStages[3];
  }

  if (score >= 75) {
    return resultScoreStages[2];
  }

  if (score >= 65) {
    return resultScoreStages[1];
  }

  return resultScoreStages[0];
}

function buildPictorialBarOption(metrics: ResultRadarMetric[]): EChartsOption {
  return {
    animationDuration: 700,
    animationDurationUpdate: 700,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(255, 107, 157, 0.08)',
        },
      },
      formatter: (params) => {
        const row = Array.isArray(params) ? params[0] : params;
        const actualScore = row.data?.actualScore;

        return `${row.name}<br/>${getMetricScoreText(actualScore === null ? null : actualScore ?? row.value ?? 0)}`;
      },
    },
    grid: {
      left: 8,
      right: 8,
      top: pictorialChartGridTop,
      bottom: pictorialChartGridBottom,
      containLabel: false,
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      interval: 25,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#c3a1b0',
        fontSize: 10,
        align: 'left',
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: metrics.map((item) => item.label),
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#6f5562',
        fontSize: 13,
        fontWeight: 600,
        margin: 10,
      },
    },
    series: [
      {
        type: 'pictorialBar',
        z: 1,
        symbol: 'circle',
        symbolRepeat: 'fixed',
        symbolBoundingData: 100,
        symbolClip: false,
        symbolSize: 7,
        symbolMargin: 3,
        itemStyle: {
          color: 'rgba(255, 173, 197, 0.28)',
        },
        data: metrics.map((item) => ({
          value: 100,
          actualScore: item.score,
        })),
      },
      {
        type: 'pictorialBar',
        z: 2,
        symbol: 'circle',
        symbolRepeat: 'fixed',
        symbolBoundingData: 100,
        symbolClip: true,
        symbolSize: 7,
        symbolMargin: 3,
        emphasis: {
          scale: false,
        },
        itemStyle: {
          color: '#ff5d94',
        },
        data: metrics.map((item) => ({
          value: getMetricChartScore(item.score),
          actualScore: item.score,
        })),
      },
    ],
  };
}

function AssessmentResultPictorialBarCard({ metrics }: { metrics: ResultRadarMetric[] }) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = chartRef.current;

    if (!container || typeof window === 'undefined') {
      return;
    }

    let chart: EChartsType | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let disposed = false;

    const applyOption = async () => {
      const echarts = await import('echarts');

      if (disposed || !container) {
        return;
      }

      const renderChart = () => {
        if (disposed || container.clientWidth === 0 || container.clientHeight === 0) {
          return false;
        }

        chart = echarts.getInstanceByDom(container) ?? echarts.init(container, undefined, { renderer: 'svg' });
        chart.setOption(buildPictorialBarOption(metrics), true);
        chart.resize();

        return true;
      };

      if (!renderChart() && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          if (renderChart()) {
            resizeObserver?.disconnect();
            resizeObserver = null;
          }
        });
        resizeObserver.observe(container);
      }
    };

    void applyOption();

    const handleResize = () => {
      chart?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleResize);
      chart?.dispose();
    };
  }, [metrics]);

  return (
    <div className="scene1-assessment-result-pictorial-shell">
      <p className="scene1-assessment-result-pictorial-note">
        更高健康度对应更多填充圆点，采用 20 个圆点表达 100 分，每个圆点约代表 5 分。
      </p>
      <div
        ref={chartRef}
        className="scene1-assessment-result-pictorial-chart"
        data-testid="scene1-assessment-result-pictorial-chart"
      />
      <div className="scene1-assessment-result-pictorial-metrics-raw" aria-hidden="true">
        {metrics.map((item) => (
          <div
            key={item.id ?? item.label}
            data-testid={`scene1-assessment-result-radar-metric-${item.id ?? item.label}`}
          >
            <strong>{item.label}</strong>
            <span>{getMetricScoreText(item.score)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function KmiQuestionRows({ prompts, options, answers, onAnswer }: KmiQuestionRowsProps) {
  return (
    <>
      {prompts.map((item) => (
        <ChoiceRow
          key={item.field}
          label={item.label}
          value={answers[item.field]}
          options={options[item.field] ?? []}
          onSelect={(value) => onAnswer(item.field, value)}
        />
      ))}
    </>
  );
}

function AssessmentResultPictorialBarCardV2({ metrics }: { metrics: ResultRadarMetric[] }) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = chartRef.current;

    if (!container || typeof window === 'undefined') {
      return;
    }

    let chart: EChartsType | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let disposed = false;

    const applyOption = async () => {
      const echarts = await import('echarts');

      if (disposed || !container) {
        return;
      }

      const renderChart = () => {
        if (disposed || container.clientWidth === 0 || container.clientHeight === 0) {
          return false;
        }

        chart = echarts.getInstanceByDom(container) ?? echarts.init(container, undefined, { renderer: 'svg' });
        chart.setOption(buildPictorialBarOption(metrics), true);
        chart.resize();

        return true;
      };

      if (!renderChart() && typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          if (renderChart()) {
            resizeObserver?.disconnect();
            resizeObserver = null;
          }
        });
        resizeObserver.observe(container);
      }
    };

    void applyOption();

    const handleResize = () => {
      chart?.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      window.removeEventListener('resize', handleResize);
      chart?.dispose();
    };
  }, [metrics]);

  return (
    <div className="scene1-assessment-result-pictorial-shell">
      <div className="scene1-assessment-result-pictorial-frame">
        <div className="scene1-assessment-result-pictorial-chart-shell">
          <div
            ref={chartRef}
            className="scene1-assessment-result-pictorial-chart"
            data-testid="scene1-assessment-result-pictorial-chart"
          />
          <div
            className="scene1-assessment-result-pictorial-marker-column"
            style={{
              gridTemplateRows: `repeat(${metrics.length}, minmax(0, 1fr))`,
              top: pictorialChartGridTop,
              bottom: pictorialChartGridBottom,
            }}
            data-testid="scene1-assessment-result-pictorial-marker-column"
          >
            {metrics.map((item) => {
              const stage = getResultScoreStage(item.score);

              return (
                <div
                  key={item.id ?? item.label}
                  className="scene1-assessment-result-pictorial-marker-row"
                  data-testid={`scene1-assessment-result-pictorial-stage-marker-${item.id ?? item.label}`}
                >
                  <span
                    className={`scene1-assessment-result-pictorial-stage-badge scene1-assessment-result-pictorial-stage-badge-inline scene1-assessment-result-pictorial-stage-badge-floating scene1-assessment-result-pictorial-stage-badge-above-line ${stage.tone}`}
                    data-testid={`scene1-assessment-result-pictorial-stage-badge-${item.id ?? item.label}`}
                  >
                    {stage.label}
                  </span>
                  <strong
                    className="scene1-assessment-result-pictorial-score-inline scene1-assessment-result-pictorial-score-anchor"
                    data-testid={`scene1-assessment-result-pictorial-score-${item.id ?? item.label}`}
                  >
                    {getMetricScoreValue(item.score)}
                  </strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="scene1-assessment-result-pictorial-metrics-raw" aria-hidden="true">
        {metrics.map((item) => {
          const stage = getResultScoreStage(item.score);

          return (
            <div
              key={item.id ?? item.label}
              data-testid={`scene1-assessment-result-radar-metric-${item.id ?? item.label}`}
            >
              <strong>{item.label}</strong>
              <span>{getMetricScoreText(item.score)}</span>
              <em>{stage.label}</em>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CompletionState({ answers }: { answers: Scene1AssessmentState['answers'] }) {
  const summary = getKmiScoreSummary(pickCompletedKmiAnswers(answers));
  const stageSummary = getStageSummary(answers, summary.total);
  const progressWidth = `${(summary.total / summary.max) * 100}%`;
  const topSymptoms = summary.details
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
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
  const mentalSleepScore = getKmiSubgroupHealthScore(summary.details, mentalSleepFields);
  const genitourinaryReproductiveScore = getKmiSubgroupHealthScore(
    summary.details,
    genitourinaryReproductiveFields,
  );
  const boneAssessmentResult = getBoneSupplementAssessmentResult();
  const exerciseAssessmentResult = getExerciseSupplementAssessmentResult();
  const boneHealthScore = boneAssessmentResult.score;
  const exerciseScore = exerciseAssessmentResult.score;
  const specialFactorScore = getSpecialFactorScore(answers);
  const overallHealthScore = getAverageScore([
    kmiHealthScore,
    boneHealthScore,
    exerciseScore,
    cycleHealthScore,
    specialFactorScore,
  ]);
  const highlightItems: ResultHighlightItem[] = [
    ...topSymptoms.map((item) => ({
      id: item.field,
      title: item.label,
      tag: item.severity >= 2 ? '重点关注' : '持续观察',
      body: `本次评分 ${item.score} 分，当前为${item.severity}级表现，建议继续结合月经与触发因素记录变化。`,
      tone: getSeverityTone(item.severity),
    })),
    {
      id: 'bone-health',
      title: '骨健康与维生素D风险',
      tag: boneAssessmentResult.badgeLabel,
      body: boneAssessmentResult.body,
      tone: boneAssessmentResult.tone,
      analysis: boneAssessmentResult.analysis,
    },
    {
      id: 'exercise',
      title: '运动能力初筛',
      tag: exerciseAssessmentResult.badgeLabel,
      body: exerciseAssessmentResult.body,
      tone: exerciseAssessmentResult.tone,
      analysis: exerciseAssessmentResult.analysis,
    },
  ].slice(0, 5);
  const breakdownMetrics: ResultRadarMetric[] = [
    { id: 'bone-health-reserve', label: '骨健康储备', score: boneHealthScore },
    { id: 'kmi-health', label: 'KMI健康度', score: kmiHealthScore },
    { id: 'cycle-stability', label: '周期稳定', score: cycleHealthScore },
    { id: 'exercise-safety', label: '运动安全', score: exerciseScore },
    { id: 'special-factor', label: '特殊因素', score: specialFactorScore },
    { id: 'mental-sleep', label: '精神与睡眠', score: mentalSleepScore },
    { id: 'genitourinary-reproductive', label: '泌尿与生殖', score: genitourinaryReproductiveScore },
  ];
  const cycleTag =
    answers.cycleChange === 'same'
      ? '周期相对规律'
      : answers.cycleChange === 'absent'
        ? '停经信号需要关注'
      : answers.cycleChange === 'unsure'
        ? '月经情况待继续观察'
        : '月经变化较明显';

  return (
    <div className="scene1-assessment-result-page">
      <AssessmentStageClockSummary
        resultTitle={stageSummary.title}
        heading={stageSummary.title}
        insight={stageSummary.summary}
      />

      <section className="scene1-assessment-result-decision-section">
        <h3 className="scene1-assessment-result-module-title">测评分析</h3>
        <h3>最终结果分析与判断</h3>
        <div
          className="scene1-assessment-result-overview-card"
          data-testid="scene1-assessment-result-overview-card"
        >
          <div
            className="scene1-assessment-result-overview-left"
            data-testid="scene1-assessment-result-overview-left"
          >
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

            <div className="scene1-assessment-result-overview-kmi">
              <div className="scene1-assessment-result-overview-kmi-head">
                <h3>KMI 指数评估</h3>
                <div
                  className="scene1-assessment-result-overview-kmi-score"
                  aria-label={`${summary.total} / ${summary.max}`}
                >
                  <strong>{summary.total}</strong>
                  <span>/ {summary.max}</span>
                </div>
              </div>
              <div className="scene1-assessment-result-progress" aria-hidden="true">
                <div className="scene1-assessment-result-progress-fill" style={{ width: progressWidth }} />
              </div>
              <p>
                当前分值对应“{summary.interpretation.label}”，阈值依据围绝经期评估规则：≤6 分为正常，7-15
                分为轻度，16-30 分为中度，30 分以上为重度。
              </p>
            </div>
          </div>
          <div
            className="scene1-assessment-result-overview-main"
            data-testid="scene1-assessment-result-overview-main"
          >
            <div className="scene1-assessment-result-overview-headline">
              <h2>{summary.interpretation.label}</h2>
              <p>{kmiDecisionSummary}</p>
            </div>
            <div
              className="scene1-assessment-result-overview-main-foot"
              data-testid="scene1-assessment-result-overview-main-foot"
            >
              <div
                className="scene1-assessment-result-overview-tags"
                data-testid="scene1-assessment-result-overview-tags"
              >
              <span className="scene1-assessment-result-tag">KMI {summary.interpretation.label}</span>
              <span className="scene1-assessment-result-tag">{boneAssessmentResult.overviewTag}</span>
              <span className="scene1-assessment-result-tag">{exerciseAssessmentResult.overviewTag}</span>
            </div>
              <div
                className="scene1-assessment-result-overview-summary"
                data-testid="scene1-assessment-result-overview-summary"
              >
              <strong>周期总结：</strong>
              <p>{cycleSummary}</p>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scene1-assessment-result-grid" data-testid="scene1-assessment-result-grid">
        <div className="scene1-assessment-result-details scene1-assessment-result-pictorial-card">
          <div className="scene1-assessment-result-score-header">
            <h3 className="scene1-assessment-result-module-title">指标拆解</h3>
            <h3>围绝经指标拆解</h3>
            <span className="scene1-assessment-result-toggle-chip">图标填充条</span>
          </div>
          <AssessmentResultPictorialBarCardV2 metrics={breakdownMetrics} />
        </div>
      </section>

      <section className="scene1-assessment-result-focus-card">
        <h3>重点关注</h3>
        <div className="scene1-assessment-result-focus-list">
          {highlightItems.map((item) => (
            <div
              key={item.id}
              className="scene1-assessment-result-focus-item"
              data-testid={`scene1-assessment-result-focus-item-${item.id}`}
            >
              <div className="scene1-assessment-result-focus-head">
                <strong>{item.title}</strong>
                <span className={`scene1-assessment-result-badge-mini ${item.tone}`}>{item.tag}</span>
              </div>
              <p>{item.body}</p>
              {item.analysis ? (
                <div
                  className="scene1-assessment-result-focus-analysis"
                  data-testid="scene1-assessment-result-focus-analysis"
                >
                  <span>原因分析</span>
                  <p>{item.analysis}</p>
                </div>
              ) : null}
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
        <div className="scene1-assessment-stack scene1-assessment-intro-stack">
          <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
            <h2 className="scene1-assessment-title">个人生理特征</h2>
            <p className="scene1-assessment-body-copy">
              这部分信息用于帮助判断年龄阶段与体征变化之间的关系。
            </p>
          </div>

          <section className="scene1-assessment-block scene1-assessment-profile-card">
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

            <div
              className="scene1-assessment-profile-card-notes scene1-assessment-footnote"
              data-testid="scene1-assessment-intro-panel"
            >
              <p className="scene1-assessment-footnote-body">
                预计耗时 3-5 分钟，覆盖基础信息、周期变化、症状表现与 KMI 评估。
              </p>
              <p className="scene1-assessment-footnote-body">{perimenopauseAssessmentOverviewSummary}</p>
              <p className="scene1-assessment-footnote-body">
                结果用于健康管理参考，不能替代医生诊断，如存在异常出血或持续不适，请及时就医。
              </p>
            </div>

            <InlineBanner
              title="BMI 指数将结合身高和体重自动辅助判断"
              body="这能帮助我们更完整地理解代谢负担与身体阶段变化之间的关系，但不会单独作为结论依据。"
            />
          </section>

          <div
            className="scene1-assessment-intro-lockline scene1-assessment-footnote scene1-assessment-intro-lockline-critical"
            data-testid="scene1-assessment-intro-lockline"
          >
            <strong className="scene1-assessment-footnote-title">你的数据受到加密保护</strong>
            <span className="scene1-assessment-footnote-body">回答内容仅用于本次评估流程，不会对外展示或传播</span>
          </div>

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
      </div>
    );
  }

  if (step.id === 2) {
    return (
      <div className="scene1-assessment-stack scene1-assessment-stack-cycle">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">{step.title}</h2>
          <p className="scene1-assessment-body-copy">{step.subtitle}</p>
        </div>

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
        <CycleChangeField
          label="2. 您最近1年的月经情况？"
          description="请结合规律、间隔和停经时长，选择最符合的一项。"
          value={state.answers.cycleChange}
          absenceDurationValue={state.answers.cycleAbsentDuration}
          options={step.options?.cycleChange ?? []}
          absenceDurationOptions={step.options?.cycleAbsentDuration ?? []}
          onSelect={(value) => onAnswer('cycleChange', value)}
          onSelectAbsenceDuration={(value) => onAnswer('cycleAbsentDuration', value)}
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

  if (step.id === 3) {
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

  if (step.id === 4) {
    return (
      <div className="scene1-assessment-stack">
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>

        <KmiQuestionRows
          prompts={kmiSetOnePrompts}
          options={step.options ?? {}}
          answers={state.answers}
          onAnswer={onAnswer}
        />

        <SupportPanel
          kicker=""
          title="您的身体正在经历变化"
          body="这些题目不仅是在记录症状，也在帮助您更具体地看见变化发生在哪些方面。"
        />
      </div>
    );
  }

  return (
    <div className="scene1-assessment-stack">
      <p className="scene1-assessment-body-copy">{step.subtitle}</p>

      <KmiQuestionRows
        prompts={kmiSetTwoPrompts}
        options={step.options ?? {}}
        answers={state.answers}
        onAnswer={onAnswer}
      />

      <div
        className="scene1-assessment-side-card scene1-assessment-footnote"
        data-testid="scene1-assessment-side-card"
      >
        <h3 className="scene1-assessment-footnote-title">数据高度加密</h3>
        <p className="scene1-assessment-footnote-body">这部分会结合生活质量变化一起评估，但所有输入内容都仅在本次评估流程中使用。</p>
      </div>
    </div>
  );
}
