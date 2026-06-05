import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { StatusBar } from '../scene1/components/StatusBar';
import {
  getKegelReviewProgress,
  getKegelReviewSceneAt,
  getKegelReviewSceneIndex,
  getKegelStateLabel,
  getKegelTempoValue,
  kegelReviewScenes,
  kegelReviewTotalMs,
  type KegelReviewScene,
} from './kegelReviewScript';

const tickMs = 100;

function formatDurationLabel(elapsedMs: number) {
  const currentSeconds = Math.min(30, Math.floor(elapsedMs / 1_000));
  return `00:${String(currentSeconds).padStart(2, '0')} / 00:30`;
}

function getRingProgress(scene: KegelReviewScene, elapsedMs: number) {
  if (scene.simulatorState === 'ready' || scene.simulatorState === 'contract' || scene.simulatorState === 'relax') {
    const span = scene.endMs - scene.startMs;
    const elapsedInScene = Math.min(span, Math.max(0, elapsedMs - scene.startMs));
    return Math.min(100, Math.round((elapsedInScene / span) * 100));
  }

  if (scene.simulatorState === 'done') {
    return 100;
  }

  return 0;
}

export function KegelReviewPage() {
  const [elapsedMs, setElapsedMs] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setElapsedMs((prev) => (prev < kegelReviewTotalMs ? prev + tickMs : prev));
    }, tickMs);

    return () => window.clearInterval(id);
  }, []);

  const currentScene = useMemo(() => getKegelReviewSceneAt(elapsedMs), [elapsedMs]);
  const progress = useMemo(() => getKegelReviewProgress(elapsedMs), [elapsedMs]);
  const sceneIndex = useMemo(() => getKegelReviewSceneIndex(currentScene.id), [currentScene.id]);
  const tempoValue = useMemo(() => getKegelTempoValue(currentScene, elapsedMs), [currentScene, elapsedMs]);
  const ringProgress = useMemo(() => getRingProgress(currentScene, elapsedMs), [currentScene, elapsedMs]);

  const riskStage = currentScene.showRiskCard ? 'visible' : 'hidden';
  const ctaStage = currentScene.showCta ? 'visible' : 'hidden';

  return (
    <div className="kegel-review-page" data-testid="kegel-review-page">
      <StatusBar />

      <div className="kegel-review-shell">
        <header className="kegel-review-topbar">
          <div className="kegel-review-topbar-copy">
            <span className="kegel-review-topbar-kicker">美柚产后康复</span>
            <h1 className="kegel-review-title">凯格尔训练教学</h1>
            <p className="kegel-review-topbar-note">先看肌肉模拟教学视频，再通过下方数秒器预览节拍，最后进入正式训练工具页。</p>
          </div>

          <div className="kegel-review-topbar-meta">
            <div className="kegel-review-meta-row">
              <span className="kegel-review-meta-label">当前讲解节点</span>
              <strong data-testid="kegel-review-scene-title">{currentScene.title}</strong>
            </div>
            <div className="kegel-review-meta-inline">
              <span>{`第 ${sceneIndex} / ${kegelReviewScenes.length} 段`}</span>
              <span data-testid="kegel-review-progress">{progress}%</span>
              <span data-testid="kegel-review-duration">{formatDurationLabel(elapsedMs)}</span>
            </div>
          </div>
        </header>

        <main className="kegel-review-stage" data-testid="kegel-review-stage" data-scene={currentScene.id}>
          <section className="kegel-review-video-card">
            <div className="kegel-review-card-head">
              <div>
                <span className="kegel-review-panel-kicker">教学视频</span>
                <h2>肌肉模拟演示</h2>
              </div>
              <span className="kegel-review-panel-tag">手机端播放</span>
            </div>

            <div className="kegel-review-video-frame">
              <video
                aria-label="凯格尔训练教学视频"
                className="kegel-review-video"
                controls
                data-testid="kegel-review-video"
                playsInline
                preload="metadata"
              >
                <source src="/videos/kegel-teaching.mp4" type="video/mp4" />
              </video>
            </div>

            <p className="kegel-review-video-note">
              这段视频用于先理解动作和发力感，正式训练时再跟随节拍器完成一轮收紧与放松。
            </p>
          </section>

          <section className="kegel-review-preview-card" data-testid="kegel-review-timer-preview">
            <div className="kegel-review-card-head">
              <div>
                <span className="kegel-review-panel-kicker">数秒器预览</span>
                <h2>视频下方先看节拍怎么走</h2>
              </div>
              <span className="kegel-review-state-pill" data-testid="kegel-review-state-label">
                {getKegelStateLabel(currentScene)}
              </span>
            </div>

            <div className="kegel-review-preview-body">
              <div className="kegel-review-tempo-card" data-testid="kegel-review-tempo-card">
                <div className="kegel-review-tempo-ring" style={{ ['--ring-progress' as string]: `${ringProgress}%` }}>
                  <div className="kegel-review-tempo-center">
                    <span className="kegel-review-tempo-label">{tempoValue === null ? '状态' : '倒计时'}</span>
                    <strong data-testid="kegel-review-tempo-value">{tempoValue ?? '·'}</strong>
                  </div>
                </div>

                <div className="kegel-review-tempo-texts">
                  <strong data-testid="kegel-review-subtitle-text">{currentScene.subtitle}</strong>
                  <span data-testid="kegel-review-voiceover">{currentScene.voiceover}</span>
                </div>
              </div>

              <div className="kegel-review-phase-strip">
                <div
                  className={currentScene.simulatorState === 'ready' ? 'kegel-review-phase-chip active' : 'kegel-review-phase-chip'}
                >
                  准备 3 秒
                </div>
                <div
                  className={currentScene.simulatorState === 'contract' ? 'kegel-review-phase-chip active' : 'kegel-review-phase-chip'}
                >
                  收紧 3 秒
                </div>
                <div
                  className={currentScene.simulatorState === 'relax' ? 'kegel-review-phase-chip active' : 'kegel-review-phase-chip'}
                >
                  放松 4 秒
                </div>
              </div>

              <div className="kegel-review-guidance-card">
                <span className="kegel-review-guidance-label">本段重点</span>
                <strong>{currentScene.emphasis}</strong>
                <p>教学页会先带你理解动作，正式训练页再把节拍、时长和完成反馈串成一轮工具闭环。</p>
              </div>

              <div className="kegel-review-safety-card" data-stage={riskStage} data-testid="kegel-review-safety-card">
                <span className="kegel-review-safety-kicker">暂停提醒</span>
                <strong>明显不适时先暂停训练</strong>
                <p>如果出现明显疼痛、坠胀或异常出血，先不要硬撑，暂停自练后再做评估或就医确认。</p>
              </div>

              <div className="kegel-review-next-step-card" data-stage={ctaStage} data-testid="kegel-review-next-step-card">
                <span className="kegel-review-next-step-kicker">下一步</span>
                <strong>先评估，再开始训练</strong>
                <p>教学看明白以后，进入正式训练页跟着节拍完成一轮，感受自己的收紧与放松节奏。</p>
              </div>
            </div>
          </section>

          <section className="kegel-review-action-card">
            <div>
              <span className="kegel-review-action-kicker">正式训练工具</span>
              <h2>准备好以后进入训练页</h2>
              <p>训练工具页会给出节拍指导、当前时长、完成反馈和可继续下一轮的操作入口。</p>
            </div>
            <Link className="kegel-review-entry-link" data-testid="kegel-review-entry-link" to="/kegel-training">
              进入正式训练
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}
