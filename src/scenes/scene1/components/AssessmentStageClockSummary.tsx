type ClockStageId =
  | 'reproductive-early'
  | 'reproductive-peak'
  | 'reproductive-late'
  | 'perimenopause-early'
  | 'perimenopause-late'
  | 'postmenopause-early'
  | 'postmenopause-late';

type ClockStage = {
  id: ClockStageId;
  label: string;
  lines: [string, string];
  fill: string;
  highlight: string;
  insight: string;
};

type Point = {
  x: number;
  y: number;
};

type AssessmentStageClockSummaryProps = {
  resultTitle: string;
  heading?: string;
  insight?: string;
};

const CLOCK_CENTER = 180;
const OUTER_RADIUS = 122;
const INNER_RADIUS = 74;
const LABEL_RADIUS = 158;
const CLOCK_NUMBER_RADIUS = 56;
const CLOCK_TICK_OUTER_RADIUS = 68;
const CLOCK_TICK_INNER_RADIUS = 60;

const clockStages: ClockStage[] = [
  {
    id: 'reproductive-early',
    label: '生育期早期',
    lines: ['生育期', '早期'],
    fill: '#f1e7e7',
    highlight: '#d8b4bc',
    insight: '身体节律处于较早的建立阶段，通常更强调基础周期的形成与稳定记录。',
  },
  {
    id: 'reproductive-peak',
    label: '生育期峰期',
    lines: ['生育期', '峰期'],
    fill: '#ece1e1',
    highlight: '#d8b4bc',
    insight: '这一阶段通常表现为相对稳定的生理节律，是身体活力与生育力较集中的时期。',
  },
  {
    id: 'reproductive-late',
    label: '生育期晚期',
    lines: ['生育期', '晚期'],
    fill: '#e8dddd',
    highlight: '#d8b4bc',
    insight: '身体仍处于生育期，但节律可能会逐步出现轻微波动，适合开始关注长期趋势。',
  },
  {
    id: 'perimenopause-early',
    label: '绝经过渡期早期',
    lines: ['绝经过渡期', '早期'],
    fill: '#e3d5d5',
    highlight: '#e7c1c7',
    insight:
      '你的身体正在从相对稳定的节律进入波动阶段。月经可能开始提前或推后，潮热、睡眠和情绪变化也会逐步出现。现阶段最值得做的是持续记录月经与核心症状，让后续判断和管理更准确。',
  },
  {
    id: 'perimenopause-late',
    label: '绝经过渡期晚期',
    lines: ['绝经过渡期', '晚期'],
    fill: '#e7dbdb',
    highlight: '#e4b4bd',
    insight: '这一步通常意味着月经间隔已经明显拉长，身体节律波动加大。建议把月经、睡眠、潮热和情绪作为重点连续观察。',
  },
  {
    id: 'postmenopause-early',
    label: '绝经后期早期',
    lines: ['绝经后期', '早期'],
    fill: '#f0e6e6',
    highlight: '#d7b0ba',
    insight: '这一阶段更关注绝经后的适应与修复，建议把骨健康、睡眠质量和泌尿生殖道舒适度纳入长期管理。',
  },
  {
    id: 'postmenopause-late',
    label: '绝经后期晚期',
    lines: ['绝经后期', '晚期'],
    fill: '#f5eded',
    highlight: '#d7b0ba',
    insight: '身体节律已进入更长期的稳定适应阶段，重点会转向慢病预防、骨骼与代谢维护。',
  },
];

const stageDescriptionMap: Record<ClockStageId, string> = {
  'reproductive-early':
    '\u8fd9\u4e2a\u533a\u95f4\u901a\u5e38\u662f\u6708\u7ecf\u8282\u5f8b\u9010\u6e10\u5efa\u7acb\u3001\u8eab\u4f53\u53cd\u9988\u6bd4\u8f83\u76f4\u63a5\u7684\u65f6\u5019\uff0c\u91cd\u70b9\u662f\u5148\u628a\u5468\u671f\u3001\u7ecf\u91cf\u548c\u65e5\u5e38\u72b6\u6001\u8bb0\u5f55\u7a33\u5b9a\u4e0b\u6765\u3002',
  'reproductive-peak':
    '\u8fd9\u4e2a\u533a\u95f4\u591a\u89c1\u4e8e\u5468\u671f\u76f8\u5bf9\u7a33\u5b9a\u3001\u6574\u4f53\u72b6\u6001\u8f83\u6709\u89c4\u5f8b\u7684\u65f6\u5019\uff0c\u6301\u7eed\u8bb0\u5f55\u80fd\u5e2e\u4f60\u66f4\u6e05\u695a\u5730\u770b\u5230\u81ea\u5df1\u7684\u4e2a\u4eba\u6ce2\u52a8\u3002',
  'reproductive-late':
    '\u8fd9\u4e2a\u533a\u95f4\u4ecd\u5c5e\u4e8e\u751f\u80b2\u671f\uff0c\u4f46\u8282\u5f8b\u53ef\u80fd\u5f00\u59cb\u51fa\u73b0\u8f7b\u5fae\u53d8\u5316\uff0c\u8d8a\u65e9\u5f62\u6210\u8fde\u7eed\u8bb0\u5f55\uff0c\u8d8a\u5bb9\u6613\u5206\u6e05\u77ed\u671f\u6ce2\u52a8\u548c\u957f\u671f\u8d8b\u52bf\u3002',
  'perimenopause-early':
    '\u8fd9\u4e2a\u533a\u95f4\u5e38\u89c1\u4e8e\u6708\u7ecf\u5f00\u59cb\u63d0\u524d\u6216\u63a8\u540e\uff0c\u7761\u7720\u548c\u60c5\u7eea\u4e5f\u9010\u6e10\u51fa\u73b0\u6ce2\u52a8\u7684\u65f6\u5019\uff0c\u8bf4\u660e\u8eab\u4f53\u6b63\u5728\u8fdb\u5165\u65b0\u7684\u8c03\u8282\u9636\u6bb5\u3002',
  'perimenopause-late':
    '\u8fd9\u4e2a\u533a\u95f4\u66f4\u5e38\u89c1\u4e8e\u6708\u7ecf\u95f4\u9694\u660e\u663e\u62c9\u957f\u3001\u75c7\u72b6\u6ce2\u52a8\u53d8\u591a\u7684\u65f6\u5019\uff0c\u5efa\u8bae\u628a\u6708\u7ecf\u3001\u6f6e\u70ed\u3001\u7761\u7720\u548c\u60c5\u7eea\u4f5c\u4e3a\u8fde\u7eed\u89c2\u5bdf\u91cd\u70b9\u3002',
  'postmenopause-early':
    '\u8fd9\u4e2a\u533a\u95f4\u66f4\u5173\u6ce8\u7edd\u7ecf\u540e\u7684\u9002\u5e94\u8fc7\u7a0b\uff0c\u9aa8\u5065\u5eb7\u3001\u7761\u7720\u8d28\u91cf\u548c\u6ccc\u5c3f\u751f\u6b96\u9053\u8212\u9002\u5ea6\u4f1a\u6210\u4e3a\u66f4\u503c\u5f97\u957f\u671f\u7559\u610f\u7684\u65b9\u5411\u3002',
  'postmenopause-late':
    '\u8fd9\u4e2a\u533a\u95f4\u591a\u89c1\u4e8e\u8eab\u4f53\u8fdb\u5165\u66f4\u957f\u671f\u7684\u7a33\u5b9a\u9002\u5e94\u671f\uff0c\u5173\u6ce8\u6162\u75c5\u9884\u9632\u3001\u9aa8\u9abc\u72b6\u6001\u548c\u4ee3\u8c22\u7ba1\u7406\u4f1a\u66f4\u6709\u610f\u4e49\u3002',
};

const stageSweepDegrees = 360 / clockStages.length;

function polarToCartesian(radius: number, angleDegrees: number): Point {
  const radians = (angleDegrees * Math.PI) / 180;

  return {
    x: CLOCK_CENTER + radius * Math.cos(radians),
    y: CLOCK_CENTER + radius * Math.sin(radians),
  };
}

function describeRingSegment(
  startAngle: number,
  endAngle: number,
  outerRadius = OUTER_RADIUS,
  innerRadius = INNER_RADIUS,
) {
  const outerStart = polarToCartesian(outerRadius, startAngle);
  const outerEnd = polarToCartesian(outerRadius, endAngle);
  const innerStart = polarToCartesian(innerRadius, startAngle);
  const innerEnd = polarToCartesian(innerRadius, endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

function getClockStageId(resultTitle: string): ClockStageId {
  if (resultTitle.includes('进入围绝经期') || resultTitle.includes('阶段待继续观察')) {
    return 'perimenopause-early';
  }

  if (resultTitle.includes('过渡晚期')) {
    return 'perimenopause-late';
  }

  if (resultTitle.includes('绝经') && !resultTitle.includes('过渡')) {
    return 'postmenopause-early';
  }

  if (resultTitle.includes('未进入围绝经期')) {
    return 'reproductive-late';
  }

  if (resultTitle.includes('异常') || resultTitle.includes('S1')) {
    return 'perimenopause-early';
  }

  return 'perimenopause-early';
}

export function AssessmentStageClockSummary({
  resultTitle,
  heading,
  insight,
}: AssessmentStageClockSummaryProps) {
  const currentStageId = getClockStageId(resultTitle);
  const currentStageIndex = clockStages.findIndex((stage) => stage.id === currentStageId);
  const currentStage = clockStages[currentStageIndex] ?? clockStages[3];

  const stageGeometry = clockStages.map((stage, index) => {
    const startAngle = -90 + index * stageSweepDegrees;
    const endAngle = startAngle + stageSweepDegrees;
    const midAngle = startAngle + stageSweepDegrees / 2;
    const labelPoint = polarToCartesian(LABEL_RADIUS, midAngle);

    return {
      ...stage,
      startAngle,
      endAngle,
      midAngle,
      labelPoint,
      path: describeRingSegment(startAngle, endAngle),
      activePath: describeRingSegment(startAngle, endAngle, OUTER_RADIUS + 7, INNER_RADIUS - 5),
    };
  });

  const currentStageGeometry =
    stageGeometry.find((stage) => stage.id === currentStage.id) ?? stageGeometry[3];
  const pointerBaseRotation = currentStageGeometry.midAngle + 90;
  const pointerStartRotation = pointerBaseRotation - Math.min(stageSweepDegrees * 0.08, 2.5);
  const pointerEndRotation = pointerBaseRotation + Math.min(stageSweepDegrees * 0.16, 5);
  const clockTicks = Array.from({ length: 12 }, (_, index) => {
    const angle = -90 + index * 30;

    return {
      angle,
      innerPoint: polarToCartesian(CLOCK_TICK_INNER_RADIUS, angle),
      outerPoint: polarToCartesian(CLOCK_TICK_OUTER_RADIUS, angle),
    };
  });
  const clockNumbers = [
    { label: '12', angle: -90 },
    { label: '3', angle: 0 },
    { label: '6', angle: 90 },
    { label: '9', angle: 180 },
  ].map((number) => ({
    ...number,
    point: polarToCartesian(CLOCK_NUMBER_RADIUS, number.angle),
  }));
  const insightHeading = heading ?? currentStage.label;
  const insightBody = insight?.trim() ? insight : currentStage.insight;
  const stageDescription = stageDescriptionMap[currentStage.id];

  return (
    <section
      className="scene1-assessment-stage-summary-card"
      data-testid="scene1-assessment-stage-summary-card"
    >
      <div className="scene1-assessment-stage-clock-visual" data-testid="scene1-assessment-stage-clock-visual">
        <svg viewBox="0 0 360 360" aria-hidden="true">
          <defs>
            <filter id="scene1-stage-clock-segment-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#ff4d88" floodOpacity="0.18" />
            </filter>
          </defs>

          <circle
            cx={CLOCK_CENTER}
            cy={CLOCK_CENTER}
            r={OUTER_RADIUS + 6}
            fill="rgba(255,255,255,0.72)"
          />

          <circle
            cx={CLOCK_CENTER}
            cy={CLOCK_CENTER}
            r={OUTER_RADIUS + 2}
            fill="none"
            stroke="rgba(255, 77, 136, 0.08)"
            strokeWidth="1"
          />

          {stageGeometry.map((stage) => (
            <path
              key={stage.id}
              data-testid={
                stage.id === currentStage.id ? 'scene1-assessment-stage-clock-active-segment' : undefined
              }
              d={stage.id === currentStage.id ? stage.activePath : stage.path}
              fill={stage.id === currentStage.id ? stage.highlight : stage.fill}
              filter={stage.id === currentStage.id ? 'url(#scene1-stage-clock-segment-shadow)' : undefined}
            />
          ))}

          <circle
            cx={CLOCK_CENTER}
            cy={CLOCK_CENTER}
            r={INNER_RADIUS - 6}
            fill="rgba(255, 251, 252, 0.98)"
            stroke="rgba(255, 77, 136, 0.1)"
            strokeWidth="1"
          />

          <circle
            cx={CLOCK_CENTER}
            cy={CLOCK_CENTER}
            r={CLOCK_TICK_OUTER_RADIUS + 6}
            fill="none"
            stroke="rgba(255, 77, 136, 0.08)"
            strokeWidth="1"
          />

          {clockTicks.map((tick) => (
            <line
              key={`tick-${tick.angle}`}
              x1={tick.innerPoint.x}
              y1={tick.innerPoint.y}
              x2={tick.outerPoint.x}
              y2={tick.outerPoint.y}
              className="scene1-assessment-stage-clock-tick"
            />
          ))}

          {clockNumbers.map((number) => (
            <text
              key={`clock-number-${number.label}`}
              x={number.point.x}
              y={number.point.y + (number.label === '12' ? 4 : 5)}
              className="scene1-assessment-stage-clock-number"
              textAnchor="middle"
            >
              {number.label}
            </text>
          ))}

          <text x={CLOCK_CENTER} y="30" className="scene1-assessment-stage-clock-anchor">
            初潮
          </text>
          <circle cx={CLOCK_CENTER} cy="48" r="4" fill="#ff9cbc" />

          {stageGeometry.map((stage) => (
            <text
              key={`${stage.id}-label`}
              x={stage.labelPoint.x}
              y={stage.labelPoint.y}
              className={`scene1-assessment-stage-clock-label${stage.id === currentStage.id ? ' active' : ''}`}
              textAnchor="middle"
            >
              <tspan x={stage.labelPoint.x} dy="-4">
                {stage.lines[0]}
              </tspan>
              <tspan x={stage.labelPoint.x} dy="13">
                {stage.lines[1]}
              </tspan>
            </text>
          ))}

          <g data-testid="scene1-assessment-stage-clock-pointer">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values={[
                `${pointerStartRotation} ${CLOCK_CENTER} ${CLOCK_CENTER}`,
                `${pointerEndRotation} ${CLOCK_CENTER} ${CLOCK_CENTER}`,
                `${pointerBaseRotation} ${CLOCK_CENTER} ${CLOCK_CENTER}`,
              ].join(';')}
              dur="2.4s"
              repeatCount="indefinite"
            />
            <line
              x1={CLOCK_CENTER}
              y1={CLOCK_CENTER + 18}
              x2={CLOCK_CENTER}
              y2={CLOCK_CENTER - 84}
              className="scene1-assessment-stage-clock-pointer-hand"
            />
            <circle
              cx={CLOCK_CENTER}
              cy={CLOCK_CENTER + 22}
              r="5"
              className="scene1-assessment-stage-clock-pointer-tail"
            />
            <circle cx={CLOCK_CENTER} cy={CLOCK_CENTER} r="7" fill="#ff4d88" />
            <circle cx={CLOCK_CENTER} cy={CLOCK_CENTER} r="3" fill="#fff8fa" />
          </g>
        </svg>

        <div className="scene1-assessment-stage-clock-sr">
          <span>初潮</span>
          <span>12</span>
          <span>3</span>
          <span>6</span>
          <span>9</span>
          {clockStages.map((stage) => (
            <span key={`${stage.id}-sr`}>{stage.label}</span>
          ))}
        </div>
      </div>

      <div className="scene1-assessment-stage-summary-content">
        <div
          className="scene1-assessment-stage-summary-heading"
          data-testid="scene1-assessment-stage-summary-heading"
        >
          <span className="scene1-assessment-stage-summary-accent" aria-hidden="true" />
          <h2>{insightHeading}</h2>
        </div>
        <p>{insightBody}</p>
        <p
          className="scene1-assessment-stage-summary-followup"
          data-testid="scene1-assessment-stage-summary-stage-intro"
        >
          {stageDescription}
        </p>
      </div>
    </section>
  );
}
