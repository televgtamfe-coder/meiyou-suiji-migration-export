import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BoneAssessmentFieldKey,
  boneAssessmentFieldCopyMap,
  boneAssessmentYesNoOptions,
} from './boneAssessmentContent';
import { BoneAssessmentState, getCurrentBoneAssessmentStep } from './boneAssessmentState';
import { BoneAssessmentCarryoverItem, isBoneAssessmentProfileField } from './boneAssessmentSharedProfile';
import { boneAssessmentOverviewSummary } from '../assessmentOverviewCopy';

type BoneAssessmentStepRendererProps = {
  state: BoneAssessmentState;
  carryoverItems: BoneAssessmentCarryoverItem[];
  onAnswer: (field: BoneAssessmentFieldKey, value: string) => void;
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

type ChoiceRowProps = {
  label: string;
  value: string;
  onSelect: (value: string) => void;
};

const agePickerOptions = createIntegerPickerOptions(18, 80, '岁');
const heightPickerOptions = createIntegerPickerOptions(140, 200, 'cm');
const weightPickerOptions = createIntegerPickerOptions(30, 120, 'kg');

const profilePickerConfigMap: Record<ProfilePickerFieldKey, Omit<ProfilePickerConfig, 'field'>> = {
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

const boneAssessmentStepNotes: Partial<Record<number, { title: string; body: string }>> = {
  2: {
    title: '这一步主要识别家族史与基础疾病风险',
    body: '如果你对既往情况拿不准，可以先按“否”完成本次问卷，后续再补充更准确信息。',
  },
  3: {
    title: '生活方式也会影响骨健康储备',
    body: '饮酒、吸烟、活动量和绝经相关因素，会和 OSTA/IOF 一起影响整体判断。',
  },
  4: {
    title: '维生素D风险会结合日晒、饮食与吸收情况',
    body: '这一页先看生活习惯层面的风险来源，不会单独作为医疗诊断。',
  },
  5: {
    title: '近期身体感受可帮助识别是否要更积极关注',
    body: '若近期已经出现骨痛、肌肉无力或反复抽筋，结果页会给出更明确的提醒。',
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

function ChoiceRow({ label, value, onSelect }: ChoiceRowProps) {
  return (
    <div className="scene1-assessment-block">
      <h3 className="scene1-assessment-question">{label}</h3>
      <div className="scene1-assessment-choice-grid">
        {boneAssessmentYesNoOptions.map((option) => (
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

export function BoneAssessmentStepRenderer({
  state,
  carryoverItems,
  onAnswer,
}: BoneAssessmentStepRendererProps) {
  const [profilePickerState, setProfilePickerState] = useState<ProfilePickerSheetState | null>(null);
  const step = getCurrentBoneAssessmentStep(state);
  const profileFields = useMemo(
    () => step.fields.filter(isBoneAssessmentProfileField) as ProfilePickerFieldKey[],
    [step.fields]
  );

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

  return (
    <div className="scene1-assessment-stack">
      <section className="scene1-assessment-block scene1-bone-assessment-overview">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">OSTA + IOF 骨质疏松风险判定</h2>
          <p className="scene1-assessment-body-copy">
            通过 5 步问卷快速查看当前骨健康风险，并同步给出维生素D风险副结果。
          </p>
          <p className="scene1-assessment-helper">{boneAssessmentOverviewSummary}</p>
        </div>

        {carryoverItems.length > 0 ? (
          <div
            className="scene1-bone-assessment-carryover scene1-assessment-chip-row"
            data-testid="scene1-bone-assessment-carryover"
          >
            {carryoverItems.map((item) => (
              <span key={item.field} className="scene1-assessment-chip active">
                {item.text}
              </span>
            ))}
          </div>
        ) : null}
      </section>

      <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      </div>

      {step.id === 1 ? (
        <section className="scene1-assessment-block">
          <div className="scene1-assessment-field-stack">
            {profileFields.includes('age') ? (
              <ProfilePickerField
                label="年龄"
                value={formatProfileValue('age', state.answers.age)}
                placeholder={profilePickerConfigMap.age.placeholder}
                onOpen={() => openProfilePicker('age')}
              />
            ) : null}

            {profileFields.includes('heightCm') || profileFields.includes('weightKg') ? (
              <div className="scene1-assessment-two-col">
                {profileFields.includes('heightCm') ? (
                  <ProfilePickerField
                    label="身高"
                    value={formatProfileValue('heightCm', state.answers.heightCm)}
                    placeholder={profilePickerConfigMap.heightCm.placeholder}
                    onOpen={() => openProfilePicker('heightCm')}
                  />
                ) : (
                  <div />
                )}
                {profileFields.includes('weightKg') ? (
                  <ProfilePickerField
                    label="体重"
                    value={formatProfileValue('weightKg', state.answers.weightKg)}
                    placeholder={profilePickerConfigMap.weightKg.placeholder}
                    onOpen={() => openProfilePicker('weightKg')}
                  />
                ) : (
                  <div />
                )}
              </div>
            ) : null}
          </div>

          <div className="scene1-assessment-banner scene1-assessment-footnote">
            <strong className="scene1-assessment-footnote-title">基础资料会被重复利用</strong>
            <p className="scene1-assessment-footnote-body">
              年龄、身高和体重会用于计算 OSTA 指数与 BMI，并写入本地健康资料，方便后续评估自动带入。
            </p>
          </div>
        </section>
      ) : (
        step.fields.map((field) => (
          <ChoiceRow
            key={field}
            label={boneAssessmentFieldCopyMap[field].label}
            value={state.answers[field]}
            onSelect={(value) => onAnswer(field, value)}
          />
        ))
      )}

      {boneAssessmentStepNotes[step.id] ? (
        <div className="scene1-assessment-banner scene1-assessment-footnote">
          <strong className="scene1-assessment-footnote-title">{boneAssessmentStepNotes[step.id]?.title}</strong>
          <p className="scene1-assessment-footnote-body">{boneAssessmentStepNotes[step.id]?.body}</p>
        </div>
      ) : null}

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
