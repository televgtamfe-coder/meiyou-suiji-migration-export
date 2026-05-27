import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const scene2ChartData = [0.35, 0.55, 0.4, 0.7, 0.5, 0.8, 0.65] as const;
const scene2ChartLabels = ['一', '二', '三', '四', '五', '六', '日'] as const;
const scene2TranscriptFull = '今天有点累，肚子胀，午饭吃了三明治';
const scene2Copy = {
  pageTitle: '记录',
  backLabel: '返回',
  backAriaLabel: '返回上一页',
  heroLead: '在美柚，',
  heroHighlight: '记一刻',
  heroSub: '说一句话，情绪 · 症状 · 饮食 自动整理',
  demoLabel: '示例 · 一次记录会发生什么',
  moodCategory: '情绪',
  moodValue: '疲惫',
  symptomCategory: '症状',
  symptomValue: '腹胀',
  foodCategory: '饮食',
  foodValue: '三明治',
  chartTitle: '本周情绪走势',
  chartBadge: '自动生成',
  pressHint: '按住说话  或  点击长录',
  releaseHint: '松开发表',
} as const;

function getDemoStage(step: number) {
  if (step < 5) return 'intro';
  if (step < 13) return 'voice';
  if (step < 22) return 'transcript';
  if (step < 30) return 'tags';
  return 'chart';
}

export function Scene2Page() {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setDemoStep((prev) => (prev < 30 ? prev + 1 : prev));
    }, 100);

    return () => window.clearInterval(id);
  }, []);

  const transcriptStep = Math.min(demoStep, 16);
  const progress = Math.min(100, Math.floor((transcriptStep / 16) * 100));
  const transcriptLength = Math.max(1, Math.floor((scene2TranscriptFull.length * transcriptStep) / 16));
  const transcriptText = useMemo(() => scene2TranscriptFull.slice(0, transcriptLength), [transcriptLength]);
  const cursorVisible = transcriptLength < scene2TranscriptFull.length;
  const tagsVisible = demoStep >= 12;
  const chartVisible = demoStep >= 18;
  const cardStage = getDemoStage(demoStep);

  return (
    <div className="app-root">
      <div className="phone-shell scene2-shell" data-testid="scene2-shell">
        <div className="statusbar">
          <span>9:41</span>
          <div className="sb-r">
            <span className="sb-bars">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
            <div className="sb-batt">
              <i></i>
            </div>
          </div>
        </div>

        <div className="scene2-page">
          <div className="scene2-blob scene2-blob-tr" aria-hidden="true" />
          <div className="scene2-blob scene2-blob-bl" aria-hidden="true" />

          <div className="scene2-head">
            <button
              type="button"
              className="record-page-back scene2-back"
              aria-label={scene2Copy.backAriaLabel}
              data-testid="scene2-back-button"
              onClick={() => navigate(-1)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6L9 12L15 18" />
              </svg>
              <span>{scene2Copy.backLabel}</span>
            </button>
            <div className="scene2-title">{scene2Copy.pageTitle}</div>
          </div>

          <div className="scene2-hero" data-testid="scene2-hero">
            <h1 className="scene2-hero-title">
              {scene2Copy.heroLead}
              <span className="scene2-accent">{scene2Copy.heroHighlight}</span>
            </h1>
            <p className="scene2-hero-sub">{scene2Copy.heroSub}</p>
          </div>

          <div className="scene2-demo" data-testid="scene2-demo-card">
            <div className="scene2-card" data-testid="scene2-card" data-stage={cardStage}>
              <div className="scene2-card-hd">
                <div className="scene2-card-label">{scene2Copy.demoLabel}</div>
                <span className="scene2-card-pct" data-testid="scene2-progress">
                  {progress}%
                </span>
              </div>
              <div className="scene2-bubble-wrap">
                <div className="scene2-bubble">
                  <span className="scene2-mic">🎙</span>
                  <div className="scene2-wave">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <span
                        key={i}
                        data-testid="scene2-wave-bar"
                        style={{ opacity: i < Math.min(22, demoStep + 6) ? 1 : 0.25 }}
                      ></span>
                    ))}
                  </div>
                  <span className="scene2-bubble-dur" data-testid="scene2-bubble-dur">
                    0:06
                  </span>
                </div>
                <div className="scene2-transcript" data-testid="scene2-transcript">
                  {transcriptText}
                  {cursorVisible ? <span className="scene2-cursor" data-testid="scene2-cursor" /> : null}
                </div>
              </div>
              <div className="scene2-tags" data-testid="scene2-tags" data-stage={tagsVisible ? 'visible' : 'hidden'}>
                <div className="scene2-tag">
                  <span className="scene2-tag-cat">{scene2Copy.moodCategory}</span>
                  <span className="scene2-tag-val">{scene2Copy.moodValue}</span>
                </div>
                <div className="scene2-tag">
                  <span className="scene2-tag-cat">{scene2Copy.symptomCategory}</span>
                  <span className="scene2-tag-val">{scene2Copy.symptomValue}</span>
                </div>
                <div className="scene2-tag">
                  <span className="scene2-tag-cat">{scene2Copy.foodCategory}</span>
                  <span className="scene2-tag-val">{scene2Copy.foodValue}</span>
                </div>
              </div>
              <div className="scene2-chart" data-testid="scene2-chart" data-stage={chartVisible ? 'visible' : 'hidden'}>
                <div className="scene2-chart-hd">
                  <span className="scene2-chart-title">{scene2Copy.chartTitle}</span>
                  <span className="scene2-chart-badge">{scene2Copy.chartBadge}</span>
                </div>
                <div className="scene2-chart-bars">
                  {scene2ChartData.map((v, index) => (
                    <div key={scene2ChartLabels[index]} className="scene2-chart-col" data-testid="scene2-chart-col">
                      <div
                        className={index === scene2ChartData.length - 1 ? 'scene2-chart-bar active' : 'scene2-chart-bar'}
                        style={{ height: `${Math.round(v * 44)}px`, opacity: chartVisible ? 1 : 0.25 }}
                      />
                      <span className="scene2-chart-day">{scene2ChartLabels[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="scene2-voice-wrap" data-testid="scene2-voice-wrap">
            <button
              type="button"
              className={pressed ? 'scene2-mic-btn pressed' : 'scene2-mic-btn'}
              aria-label="按住说话"
              onMouseDown={() => setPressed(true)}
              onMouseUp={() => setPressed(false)}
              onMouseLeave={() => setPressed(false)}
            >
              <span className="scene2-mic-ring scene2-mic-ring--glow" data-testid="scene2-mic-glow" aria-hidden="true" />
              <span className="scene2-mic-ring scene2-mic-ring--stroke" data-testid="scene2-mic-stroke" aria-hidden="true" />
              <span className="scene2-mic-core" data-testid="scene2-mic-core">
                <span className="scene2-mic-glyph">🎙</span>
              </span>
            </button>
            <p className="scene2-voice-hint">{pressed ? scene2Copy.releaseHint : scene2Copy.pressHint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
