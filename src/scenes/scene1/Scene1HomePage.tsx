import { readScene1KmiScore } from './kmiScoreStorage';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { PeriodDropletIcon } from './components/PeriodDropletIcon';
import { StatusBar } from './components/StatusBar';

const communityThumbnails = [
  { id: 'img-1', className: 'scene1-home-post-thumbnail-a', lineCount: 8 },
  { id: 'img-2', className: 'scene1-home-post-thumbnail-b', lineCount: 11 },
  { id: 'img-3', className: 'scene1-home-post-thumbnail-c', lineCount: 12 },
] as const;


export function Scene1HomePage() {
  const kmiScore = readScene1KmiScore();

  return (
    <div className="scene1-home-page" data-testid="scene1-home-shell">
      <StatusBar />

      <div className="scene1-home-scroll">
        <header className="scene1-home-topbar" data-testid="scene1-home-topbar">
          <button type="button" className="scene1-home-search-btn" aria-label="搜索">
            <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="6.9" stroke="currentColor" strokeWidth="1.8" />
              <path d="M13.55 13.55L18.1 18.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="scene1-home-brand">美柚</div>

          <button type="button" className="scene1-home-post-btn" aria-label="发帖">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M12.55 3.65L15.95 7.05L8.45 14.55H5.05V11.15L12.55 3.65Z"
                stroke="currentColor"
                strokeWidth="1.45"
                strokeLinejoin="round"
              />
              <path d="M11.8 4.4L15.2 7.8" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
              <path d="M4.6 17H15.4" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
            </svg>
            <span className="scene1-home-post-btn-text">发帖</span>
          </button>
        </header>

        <main className="scene1-home-body">
          <section className="scene1-home-hero-card" data-testid="scene1-home-hero">
            <div className="scene1-home-hero-copy">
              <h1>距大姨妈还有1天</h1>
              <p>预测经期开始日10月20日 &gt;</p>
              <button type="button" className="scene1-home-hero-link">
                查看详情
              </button>
            </div>

            <div className="scene1-home-hero-bubble" aria-label={`KMI指数 ${kmiScore}分`}>
              <span>KMI指数</span>
              <strong>{`${kmiScore}分`}</strong>
            </div>
          </section>

          <section className="scene1-home-switch-row" data-testid="scene1-home-period-row">
            <div className="scene1-home-switch-label">
              <PeriodDropletIcon
                testId="scene1-home-period-icon"
                gradientId="scene1-home-period-gradient"
                highlightId="scene1-home-period-highlight"
                className="scene1-home-switch-drop"
              />
              <span>大姨妈来了</span>
            </div>

            <div className="scene1-home-switch-actions" aria-label="经期切换">
              <button type="button" className="scene1-home-switch-button scene1-home-switch-button-muted">
                是
              </button>
              <button type="button" className="scene1-home-switch-button scene1-home-switch-button-active">
                否
              </button>
            </div>
          </section>

          <article className="scene1-home-post-card" data-testid="scene1-home-community-card">
            <header className="scene1-home-post-head">
              <div className="scene1-home-post-avatar" aria-hidden="true">
                <div className="scene1-home-post-avatar-photo">
                  <span className="scene1-home-post-avatar-hair" />
                  <span className="scene1-home-post-avatar-face" />
                  <span className="scene1-home-post-avatar-body" />
                </div>
              </div>
              <div className="scene1-home-post-meta">
                <strong>月月姐姐</strong>
                <span>宝宝1岁</span>
              </div>
              <button type="button" className="scene1-home-post-more" aria-label="更多操作">
                <span />
                <span />
                <span />
              </button>
            </header>

            <div className="scene1-home-post-body">
              <p className="scene1-home-post-text">
                <span className="scene1-home-post-tag">#姐妹来帮忙</span>
                <span className="scene1-home-post-text-copy">
                  剖腹产一年，现在又怀孕了，关键是老公还结扎了都可以怀孕，都不知道敢不敢要，这个是万分之一的吧，有姐妹老...
                </span>
                <span className="scene1-home-post-text-link">全文</span>
              </p>
            </div>

            <div className="scene1-home-post-images" aria-hidden="true">
              {communityThumbnails.map((image) => (
                <div
                  key={image.id}
                  data-testid="scene1-home-post-thumbnail"
                  className={`scene1-home-post-thumbnail ${image.className}`}
                >
                  <div className="scene1-home-post-thumbnail-glow" />
                  <div className="scene1-home-post-thumbnail-card">
                    <div className="scene1-home-post-thumbnail-title">
                      <span className="scene1-home-post-thumbnail-chip" />
                      <span className="scene1-home-post-thumbnail-dot" />
                      <span className="scene1-home-post-thumbnail-dot" />
                    </div>
                    <div className="scene1-home-post-thumbnail-lines">
                      {Array.from({ length: image.lineCount }).map((_, lineIndex) => (
                        <i key={`${image.id}-line-${lineIndex}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="scene1-home-post-quote">
              <p>
                <span className="scene1-home-post-quote-tag">热评</span>
                <span className="scene1-home-post-quote-copy">我有个邻居大哥结扎后，他媳妇还真怀了，当时还闹了乌龙。</span>
              </p>
            </div>

            <footer className="scene1-home-post-footer">
              <span className="scene1-home-post-footer-metric">
                <span className="scene1-home-post-footer-chat" aria-hidden="true">
                  <i />
                  <i />
                  <span className="scene1-home-post-footer-chat-bubble" />
                </span>
                <span>106</span>
              </span>
              <span className="scene1-home-post-footer-metric">
                <span className="scene1-home-post-footer-heart" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 20.3 4.9 13.5a4.6 4.6 0 0 1 0-6.7 4.9 4.9 0 0 1 6.9 0l.2.2.2-.2a4.9 4.9 0 0 1 6.9 0 4.6 4.6 0 0 1 0 6.7L12 20.3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>12</span>
              </span>
            </footer>
          </article>

          <article className="scene1-home-post-card scene1-home-post-card-secondary">
            <header className="scene1-home-post-head">
              <div className="scene1-home-post-avatar scene1-home-post-avatar-secondary" aria-hidden="true">
                草
              </div>
              <div className="scene1-home-post-meta">
                <strong>草莓牛奶王子</strong>
                <span>宝宝妈</span>
              </div>
            </header>

            <div className="scene1-home-post-body scene1-home-post-body-secondary">
              <p className="scene1-home-post-text scene1-home-post-text-secondary">
                晒晒我的备孕吃啥 和 牛牛暑研孕牛同学。我们是...
              </p>
            </div>
          </article>
        </main>

        <button type="button" className="scene1-home-fab" aria-label="发布">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M13.8 5.5 18.5 10 9.4 19H4.7v-4.7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="m12.8 6.5 4.7 4.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <Scene1BottomTabBar activeTab="home" className="scene1-home-tabbar" />

      <div className="scene1-home-indicator" aria-hidden="true" />
    </div>
  );
}
