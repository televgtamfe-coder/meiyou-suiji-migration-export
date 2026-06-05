import { useEffect, useMemo, useState } from 'react';
import { StatusBar } from '../scene1/components/StatusBar';

type TrainingPhase = {
  id: 'ready' | 'contract' | 'relax' | 'done';
  label: string;
  subtitle: string;
  voiceover: string;
  emphasis: string;
  startMs: number;
  endMs: number;
};

const tickMs = 100;
const trainingTotalMs = 12_000;

const trainingPhases: TrainingPhase[] = [
  {
    id: 'ready',
    label: '准备开始',
    subtitle: '准备开始',
    voiceover: '先找到舒服的姿势，保持自然呼吸，准备跟着节拍开始。',
    emphasis: '准备 3 秒进入训练节拍',
    startMs: 0,
    endMs: 3_000,
  },
  {
    id: 'contract',
    label: '收紧阶段',
    subtitle: '收紧，3秒',
    voiceover: '轻轻向内收、向上提，保持三秒，不要带动腹部和大腿。',
    emphasis: '轻轻收紧，保持三秒',
    startMs: 3_000,
    endMs: 6_000,
  },
  {
    id: 'relax',
    label: '放松阶段',
    subtitle: '放松，4秒',
    voiceover: '慢慢放松，把力量缓下来，不要一下子泄力。',
    emphasis: '慢慢放松，回到自然状态',
    startMs: 6_000,
    endMs: 10_000,
  },
  {
    id: 'done',
    label: '完成一次基础训练',
    subtitle: '本轮完成',
    voiceover: '这轮已经完成，先做对，再逐步增加训练量。',
    emphasis: '完成 1 轮基础节拍',
    startMs: 10_000,
    endMs: 12_000,
  },
];

function getTrainingPhase(elapsedMs: number) {
  return (
    trainingPhases.find((phase) => elapsedMs >= phase.startMs && elapsedMs < phase.endMs) ??
    trainingPhases[trainingPhases.length - 1]
  );
}

function getTempoValue(phase: TrainingPhase, elapsedMs: number) {
  if (phase.id === 'done') return null;
  const remainingMs = Math.max(0, phase.endMs - elapsedMs);
  return Math.max(1, Math.ceil(remainingMs / 1_000));
}

function getRingProgress(phase: TrainingPhase, elapsedMs: number) {
  if (phase.id === 'done') return 100;
  const span = phase.endMs - phase.startMs;
  const elapsedInPhase = Math.min(span, Math.max(0, elapsedMs - phase.startMs));
  return Math.min(100, Math.round((elapsedInPhase / span) * 100));
}

function formatDurationLabel(elapsedMs: number) {
  const currentSeconds = Math.min(12, Math.floor(elapsedMs / 1_000));
  return `00:${String(currentSeconds).padStart(2, '0')} / 00:12`;
}

export function KegelTrainingPage() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;

    const id = window.setInterval(() => {
      setElapsedMs((prev) => Math.min(trainingTotalMs, prev + tickMs));
    }, tickMs);

    return () => window.clearInterval(id);
  }, [isRunning]);

  useEffect(() => {
    if (elapsedMs >= trainingTotalMs && isRunning) {
      setIsRunning(false);
    }
  }, [elapsedMs, isRunning]);

  const currentPhase = useMemo(() => getTrainingPhase(elapsedMs), [elapsedMs]);
  const tempoValue = useMemo(() => getTempoValue(currentPhase, elapsedMs), [currentPhase, elapsedMs]);
  const ringProgress = useMemo(() => getRingProgress(currentPhase, elapsedMs), [currentPhase, elapsedMs]);
  const progress = Math.round((elapsedMs / trainingTotalMs) * 100);
  const stage = isRunning || elapsedMs > 0 ? currentPhase.id : 'idle';
  const doneStage = currentPhase.id === 'done' && elapsedMs > 0 ? 'visible' : 'hidden';

  const handlePrimaryAction = () => {
    if (elapsedMs >= trainingTotalMs) {
      setElapsedMs(0);
      setIsRunning(true);
      return;
    }

    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setElapsedMs(0);
    setIsRunning(false);
  };

  const primaryLabel = elapsedMs >= trainingTotalMs ? '再练一轮' : isRunning ? '暂停训练' : elapsedMs > 0 ? '继续训练' : '开始训练';

  return (
    <div className="kegel-training-page" data-testid="kegel-training-page">
      <StatusBar />

      <div className="kegel-training-shell">
        <header className="kegel-training-topbar">
          <div className="kegel-training-topbar-copy">
            <span className="kegel-training-kicker">美柚产后康复</span>
            <h1 className="kegel-training-title">凯格尔正式训练</h1>
            <p className="kegel-training-note">第一版先提供一轮基础节拍工具，帮助你按准备、收紧、放松的顺序完成训练。</p>
          </div>

          <div className="kegel-training-meta-card">
            <div className="kegel-training-meta-row">
              <span className="kegel-training-meta-label">当前状态</span>
              <strong data-testid="kegel-training-state-label">{stage === 'idle' ? '等待开始' : currentPhase.label}</strong>
            </div>
            <div className="kegel-training-meta-inline">
              <span data-testid="kegel-training-progress">{progress}%</span>
              <span data-testid="kegel-training-duration">{formatDurationLabel(elapsedMs)}</span>
              <span data-testid="kegel-training-completed-rounds">已完成 {elapsedMs >= trainingTotalMs ? 1 : 0} 轮</span>
            </div>
          </div>
        </header>

        <main className="kegel-training-stage" data-testid="kegel-training-stage" data-stage={stage}>
          <section className="kegel-training-hero-card">
            <div className="kegel-training-ring-wrap">
              <div className="kegel-training-ring" style={{ ['--ring-progress' as string]: `${ringProgress}%` }}>
                <div className="kegel-training-ring-center">
                  <span className="kegel-training-ring-label">{tempoValue === null ? '完成' : '倒计时'}</span>
                  <strong data-testid="kegel-training-tempo-value">{tempoValue ?? '✓'}</strong>
                </div>
              </div>
            </div>

            <div className="kegel-training-copy">
              <span className="kegel-training-copy-kicker">本轮提示</span>
              <strong data-testid="kegel-training-subtitle-text">{stage === 'idle' ? '先准备好，再开始训练' : currentPhase.subtitle}</strong>
              <p data-testid="kegel-training-voiceover">
                {stage === 'idle' ? '点击开始以后，工具会按照准备、收紧、放松的节拍自动推进。' : currentPhase.voiceover}
              </p>
            </div>

            <div className="kegel-training-phase-strip">
              <div className={currentPhase.id === 'ready' && stage !== 'idle' ? 'kegel-training-phase-chip active' : 'kegel-training-phase-chip'}>
                准备
              </div>
              <div className={currentPhase.id === 'contract' ? 'kegel-training-phase-chip active' : 'kegel-training-phase-chip'}>
                收紧
              </div>
              <div className={currentPhase.id === 'relax' ? 'kegel-training-phase-chip active' : 'kegel-training-phase-chip'}>
                放松
              </div>
              <div className={currentPhase.id === 'done' && stage !== 'idle' ? 'kegel-training-phase-chip active' : 'kegel-training-phase-chip'}>
                完成
              </div>
            </div>
          </section>

          <section className="kegel-training-controls-card">
            <div className="kegel-training-summary-card" data-testid="kegel-training-summary-card">
              <span className="kegel-training-summary-kicker">训练原则</span>
              <strong>{stage === 'idle' ? '先做对，再逐步增加训练量' : currentPhase.emphasis}</strong>
              <p>如果你感到明显疼痛、坠胀或异常出血，请先暂停本轮训练，不要勉强继续。</p>
            </div>

            <div className="kegel-training-actions">
              <button
                className="kegel-training-primary-button"
                data-testid="kegel-training-primary-button"
                onClick={handlePrimaryAction}
                type="button"
              >
                {primaryLabel}
              </button>
              <button
                className="kegel-training-secondary-button"
                data-testid="kegel-training-reset-button"
                onClick={handleReset}
                type="button"
              >
                重置本轮
              </button>
            </div>
          </section>

          <section className="kegel-training-done-banner" data-stage={doneStage} data-testid="kegel-training-done-banner">
            <span className="kegel-training-check">✓</span>
            <div>
              <strong>本轮基础训练已完成</strong>
              <p>如果感觉轻松，可以休息片刻后再练一轮，仍然以动作准确和身体舒适为先。</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
