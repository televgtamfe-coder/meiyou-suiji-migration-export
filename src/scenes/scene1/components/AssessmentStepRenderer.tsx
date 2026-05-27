import { ChangeEvent } from 'react';
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
  type?: 'text' | 'date' | 'number';
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

function TextField({
  field,
  label,
  value,
  onAnswer,
  type = 'text',
  placeholder,
  suffix,
}: TextFieldProps) {
  const id = `scene1-assessment-${field}`;

  return (
    <div className="scene1-assessment-field">
      <label className="scene1-assessment-label" htmlFor={id}>
        {label}
      </label>
      <div className="scene1-assessment-input-wrap">
        <input
          id={id}
          className="scene1-assessment-input"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onAnswer(field, event.target.value)}
        />
        {suffix ? <span className="scene1-assessment-input-suffix">{suffix}</span> : null}
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
            <div className="scene1-assessment-result-radar-side">
              {radarMetrics.slice(0, 2).map((item) => (
                <div key={item.label} className="scene1-assessment-result-radar-metric">
                  <strong>{item.label}</strong>
                  <span>{`得分 ${item.score}`}</span>
                </div>
              ))}
            </div>
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
            <div className="scene1-assessment-result-radar-side align-end">
              {radarMetrics.slice(2, 5).map((item) => (
                <div key={item.label} className="scene1-assessment-result-radar-metric">
                  <strong>{item.label}</strong>
                  <span>{`得分 ${item.score}`}</span>
                </div>
              ))}
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
            <TextField
              field="birthDate"
              label="出生日期"
              value={state.answers.birthDate}
              onAnswer={onAnswer}
              type="date"
            />

            <div className="scene1-assessment-two-col">
              <TextField
                field="heightCm"
                label="身高 (cm)"
                value={state.answers.heightCm}
                onAnswer={onAnswer}
                type="number"
                placeholder="00.0"
                suffix="CM"
              />
              <TextField
                field="weightKg"
                label="体重 (kg)"
                value={state.answers.weightKg}
                onAnswer={onAnswer}
                type="number"
                placeholder="00.0"
                suffix="KG"
              />
            </div>
          </div>
        </section>

        <InlineBanner
          title="BMI 指数将结合身高和体重自动辅助判断"
          body="这能帮助我们更完整地理解代谢负担与身体阶段变化之间的关系，但不会单独作为结论依据。"
        />
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
