import { readScene1KmiScore } from './kmiScoreStorage';
import { scene1HomeFeeds } from './scene1HomeFeeds';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { PeriodDropletIcon } from './components/PeriodDropletIcon';
import { StatusBar } from './components/StatusBar';

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
          <section className="scene1-home-feed-list" data-testid="scene1-home-feed-list">
            {scene1HomeFeeds.map((feed) => {
            const isPrimaryFeed = feed.id === 'feed-primary';

            return (
              <article
                key={feed.id}
                className={`scene1-home-post-card${isPrimaryFeed ? '' : ' scene1-home-post-card-secondary'}`}
                data-testid={isPrimaryFeed ? 'scene1-home-community-card' : undefined}
              >
                <header className="scene1-home-post-head">
                  <div
                    className={`scene1-home-post-avatar${feed.avatarStyle === 'secondary' ? ' scene1-home-post-avatar-secondary' : ''}`}
                    aria-hidden="true"
                  >
                    <div className="scene1-home-post-avatar-photo">
                      {feed.avatarImages.map((image, imageIndex) => (
                        <img
                          key={`${feed.id}-avatar-${imageIndex}`}
                          src={image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className={`scene1-home-post-avatar-image scene1-home-post-avatar-image-${imageIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="scene1-home-post-meta">
                    <strong>{feed.author}</strong>
                    <span>{feed.subtitle}</span>
                    {!isPrimaryFeed && feed.authorNote ? <span className="scene1-home-post-meta-note">{feed.authorNote}</span> : null}
                  </div>
                  {isPrimaryFeed ? (
                    <button type="button" className="scene1-home-post-more" aria-label="更多操作">
                      <span />
                      <span />
                      <span />
                    </button>
                  ) : null}
                </header>

                <div className={`scene1-home-post-body${isPrimaryFeed ? '' : ' scene1-home-post-body-secondary'}`}>
                  <p className={`scene1-home-post-text${isPrimaryFeed ? '' : ' scene1-home-post-text-secondary'}`}>
                    {feed.tag ? <span className="scene1-home-post-tag">{feed.tag}</span> : null}
                    {isPrimaryFeed ? <span className="scene1-home-post-text-copy">{feed.body}</span> : feed.body}
                    {feed.expandLabel ? <span className="scene1-home-post-text-link">{feed.expandLabel}</span> : null}
                  </p>
                </div>

                {feed.images?.length ? (
                  <div className="scene1-home-post-images" aria-hidden="true">
                    {feed.images.map((image, imageIndex) => (
                      <div key={`${feed.id}-image-${imageIndex}`} className="scene1-home-post-image-frame">
                        <img
                          src={image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          data-testid="scene1-home-feed-image"
                          className="scene1-home-post-image"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                {feed.hotCommentLabel && feed.hotComment ? (
                  <div className="scene1-home-post-quote">
                    <p>
                      <span className="scene1-home-post-quote-tag">{feed.hotCommentLabel}</span>
                      <span className="scene1-home-post-quote-copy">{feed.hotComment}</span>
                    </p>
                  </div>
                ) : null}

                <footer className="scene1-home-post-footer">
                  <span className="scene1-home-post-footer-metric">
                    <span className="scene1-home-post-footer-chat" aria-hidden="true">
                      <i />
                      <i />
                      <span className="scene1-home-post-footer-chat-bubble" />
                    </span>
                    <span>{feed.comments}</span>
                  </span>
                  <span className="scene1-home-post-footer-metric">
                    <span className="scene1-home-post-footer-heart" aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M12 20.3 4.9 13.5a4.6 4.6 0 0 1 0-6.7 4.9 4.9 0 0 1 6.9 0l.2.2.2-.2a4.9 4.9 0 0 1 6.9 0 4.6 4.6 0 0 1 0 6.7L12 20.3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{feed.likes}</span>
                  </span>
                </footer>
              </article>
            );
            })}
          </section>
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
