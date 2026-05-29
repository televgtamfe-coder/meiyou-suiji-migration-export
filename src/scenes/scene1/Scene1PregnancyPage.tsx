import articlePhotoA from '../../assets/scene1-prep/ce721b2cecb373e28b7069f09191d0595ce57ca2.png';
import articlePhotoB from '../../assets/scene1-prep/5b0d40a680fa04a775fbda7d6290aa07d5987ceb.png';
import quoteLikeIcon from '../../assets/scene1-prep/like.png';
import articleTopicIcon from '../../assets/scene1-prep/Frame_75_11104.png';
import articleCommentIcon from '../../assets/scene1-prep/Frame_75_11130.png';
import articleLikeIcon from '../../assets/scene1-prep/Frame_75_11151.png';
import checkinArt from '../../assets/scene1-prep/a3d4f8b7723d1dc79b9b04e9bd8c0a12b374d598.webp';
import heroSilhouetteArtwork from '../../assets/scene1-pregnancy/7d44d82b2fc11c1994f3608403ec10133064ceca.png';
import heroEmbryoArtwork from '../../assets/scene1-pregnancy/990b3eae88a8abea9dc5b823d878ce62a96b8388.png';
import articlePhotoC from '../../assets/scene1-pregnancy/Rectangle_43_9146.png';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { StatusBar } from './components/StatusBar';

const pregnancyDates = [
  { label: '2天(8月31日)' },
  { label: '8周3天(9月1日)', active: true },
  { label: '8周4天(9月2日)' },
] as const;

const pregnancyQuickActions = [
  { key: 'doctor', label: '问医生' },
  { key: 'food', label: '能不能吃' },
  { key: 'checkup', label: '产检时间表' },
  { key: 'hcg', label: 'hCG查询' },
  { key: 'weight', label: '孕期体重' },
] as const;

const pregnancyServiceActions = [
  { key: 'skincare', label: '孕妈护肤' },
  { key: 'nanny', label: '月嫂报价' },
  { key: 'journal', label: '宝宝记' },
  { key: 'group', label: '同城孕妈群' },
  { key: 'action', label: '能不能做' },
] as const;

type PregnancyActionKey =
  | (typeof pregnancyQuickActions)[number]['key']
  | (typeof pregnancyServiceActions)[number]['key'];

function PregnancyActionIcon({ actionKey }: { actionKey: PregnancyActionKey }) {
  if (actionKey === 'doctor') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M14.5 2C7.6 2 2 7.5 2 14.3C2 17.6 3.3 20.7 5.6 22.9C5.3 24.3 4.6 25.6 3.6 26.7C3.4 26.9 3.6 27.2 3.9 27.1C6.4 26.7 8.4 25.8 9.9 24.8C11.3 25.4 12.9 25.8 14.5 25.8C21.4 25.8 27 20.3 27 13.5C27 6.7 21.4 2 14.5 2Z"
          fill="#6AA8FF"
        />
        <path
          d="M14.5 8.8V18.4"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M9.7 13.6H19.3"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (actionKey === 'food') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.6" y="2.6" width="23.8" height="23.8" rx="8" fill="#FF8C67" />
        <path
          d="M8.8 16.9C8.8 13.8 11.3 11.3 14.4 11.3H20.2C20.8 11.3 21.2 11.8 21 12.4C20.2 15.5 17.4 17.8 14.2 17.8H9.7C9.2 17.8 8.8 17.4 8.8 16.9Z"
          fill="#FFFFFF"
        />
        <path
          d="M10.7 10.2C12.1 8.7 13.9 7.9 15.9 7.9"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M13.5 8.1L11.9 6.6"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (actionKey === 'checkup') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="4" y="4.7" width="21" height="20" rx="5.4" fill="#AA73F1" />
        <rect x="7.3" y="10.2" width="14.4" height="9.7" rx="2.2" fill="#FFFFFF" />
        <path d="M9.4 7.8V11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M19.6 7.8V11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10.2 15.1L12.4 17.1L17.8 12.2" stroke="#AA73F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (actionKey === 'hcg') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.4" y="2.4" width="24.2" height="24.2" rx="8" fill="#FF74A3" />
        <circle cx="12.8" cy="12.2" r="5.1" stroke="#FFFFFF" strokeWidth="2.1" />
        <path d="M16.6 16.2L20.6 20.2" stroke="#FFFFFF" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M12.8 10.2V14.3" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M10.7 12.2H14.8" stroke="#FFFFFF" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }

  if (actionKey === 'weight') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.5" y="2.5" width="24" height="24" rx="8" fill="#A467F4" />
        <path
          d="M8.1 13.2C8.1 10.2 10.5 7.8 13.5 7.8H15.5C18.5 7.8 20.9 10.2 20.9 13.2V16.3C20.9 17 20.4 17.5 19.7 17.5H9.3C8.6 17.5 8.1 17 8.1 16.3V13.2Z"
          fill="#F8E8FF"
        />
        <path d="M14.5 11.4L17.2 10.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="14.5" cy="11.4" r="1.4" fill="#FFFFFF" />
      </svg>
    );
  }

  if (actionKey === 'skincare') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="3.1" y="2.7" width="22.8" height="23.6" rx="8" fill="#FF88BA" />
        <path
          d="M14.6 8.6L15.6 10.8L18 11.1L16.2 12.8L16.6 15.2L14.6 14.2L12.6 15.2L13 12.8L11.2 11.1L13.6 10.8L14.6 8.6Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  if (actionKey === 'nanny') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.7" y="4.1" width="23.6" height="20.8" rx="8" fill="#FDB462" />
        <path
          d="M8.7 13.5H20.3C20.7 13.5 21 13.8 21 14.2V18.4C21 19.8 19.8 21 18.4 21H10.6C9.2 21 8 19.8 8 18.4V14.2C8 13.8 8.3 13.5 8.7 13.5Z"
          fill="#FFFFFF"
        />
        <path d="M11.6 10.9V13.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.4 10.9V13.6" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12.4 17.2H16.6" stroke="#FDB462" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (actionKey === 'journal') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.8" y="2.8" width="23.4" height="23.4" rx="8" fill="#FF78AE" />
        <path
          d="M8.7 17.9C8.7 14.4 11.5 11.6 15 11.6H18.4V18.2C18.4 18.7 18 19.1 17.5 19.1H10C9.3 19.1 8.7 18.5 8.7 17.9Z"
          fill="#FFFFFF"
        />
        <path
          d="M9.8 12.2C10.8 9.9 12.8 8.4 15.3 8.4"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M14.1 8.6L12.6 7.2" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (actionKey === 'group') {
    return (
      <svg
        className="scene1-pregnancy-tool-svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2.5" y="4" width="24" height="20.8" rx="8" fill="#63E1B6" />
        <circle cx="10.8" cy="12" r="2" fill="#0F6A50" />
        <circle cx="18.3" cy="14.2" r="2" fill="#0F6A50" />
        <path
          d="M7.9 17.9C8.6 16.7 10 16 11.6 16C13.2 16 14.6 16.7 15.3 17.9"
          stroke="#0F6A50"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M15.7 18.2C16.2 17.1 17.3 16.4 18.6 16.4C19.9 16.4 21 17.1 21.5 18.2"
          stroke="#0F6A50"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className="scene1-pregnancy-tool-svg"
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3.2" y="3.2" width="22.6" height="22.6" rx="8" fill="#FF6E9F" />
      <path
        d="M8.9 17.7L16.9 9.7C17.3 9.3 17.9 9.1 18.4 9.1H19.9C20.4 9.1 20.8 9.5 20.8 10V11.5C20.8 12 20.6 12.6 20.2 13L12.2 21H8.9V17.7Z"
        fill="#FFFFFF"
      />
      <path d="M16.5 10.1L19.8 13.4" stroke="#FF6E9F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PregnancyActionItem({
  actionKey,
  label,
}: {
  actionKey: PregnancyActionKey;
  label: string;
}) {
  return (
    <button type="button" className="scene1-pregnancy-tool-item">
      <span className="scene1-pregnancy-tool-icon-wrap">
        <PregnancyActionIcon actionKey={actionKey} />
      </span>
      <span className="scene1-pregnancy-tool-label">{label}</span>
    </button>
  );
}

export function Scene1PregnancyPage() {
  return (
    <div className="scene1-pregnancy-page" data-testid="scene1-pregnancy-shell">
      <StatusBar />

      <div className="scene1-pregnancy-scroll">
        <header className="scene1-pregnancy-hero" data-testid="scene1-pregnancy-hero">
          <section className="scene1-pregnancy-main-card" data-testid="scene1-pregnancy-main-card">
            <div className="scene1-pregnancy-main-card-gradient" aria-hidden="true" />

            <section className="scene1-pregnancy-date-strip" aria-label="怀孕日期切换">
              <div className="scene1-pregnancy-date-list">
                {pregnancyDates.map((item) => (
                  <span
                    key={item.label}
                    className={item.active ? 'scene1-pregnancy-date-item active' : 'scene1-pregnancy-date-item'}
                  >
                    {item.label}
                  </span>
                ))}
              </div>

              <div className="scene1-pregnancy-date-meta">
                <button type="button" className="scene1-pregnancy-return-pill">
                  回今天
                </button>

                <div className="scene1-pregnancy-due-inline">
                  <span className="scene1-pregnancy-due-inline-label">距离预产期</span>
                  <strong>236</strong>
                  <span>天</span>
                </div>
              </div>
            </section>

            <div className="scene1-pregnancy-main-content">
              <div className="scene1-pregnancy-main-copy">
                <div className="scene1-pregnancy-metric-list">
                  <div className="scene1-pregnancy-metric-item">
                    <p>身长</p>
                    <div>
                      <strong>463</strong>
                      <span>mm</span>
                    </div>
                  </div>
                  <div className="scene1-pregnancy-metric-item">
                    <p>体重</p>
                    <div>
                      <strong>2384</strong>
                      <span>g</span>
                    </div>
                  </div>
                </div>

                <button type="button" className="scene1-pregnancy-guide-pill">
                  <span className="scene1-pregnancy-guide-pill-count">24</span>
                  <span>本周孕期指南</span>
                </button>
              </div>

              <div className="scene1-pregnancy-main-artwork" aria-hidden="true">
                <img src={heroSilhouetteArtwork} alt="" className="scene1-pregnancy-silhouette" />
                <img src={heroEmbryoArtwork} alt="" className="scene1-pregnancy-embryo" />
                <div className="scene1-pregnancy-week-badge">
                  <strong>38</strong>
                  <span>周</span>
                </div>
                <div className="scene1-pregnancy-week-chip">38周</div>
              </div>
            </div>

            <section className="scene1-pregnancy-changes-card" data-testid="scene1-pregnancy-changes-card">
              <article className="scene1-pregnancy-change-block">
                <p className="scene1-pregnancy-change-label">宝宝变化:</p>
                <p className="scene1-pregnancy-change-copy">
                  当光亮照进腹部的时候，我也会伸个懒腰醒过来，到了夜深人静会陪妈妈一起休息。
                </p>
              </article>
              <article className="scene1-pregnancy-change-block">
                <p className="scene1-pregnancy-change-label">妈妈变化:</p>
                <p className="scene1-pregnancy-change-copy">
                  现在胎宝宝的活动没有那么强烈和频繁了，但你还不能偷懒。
                </p>
              </article>
            </section>
          </section>
        </header>

        <main className="scene1-pregnancy-body">
          <section className="scene1-pregnancy-tools-card" data-testid="scene1-pregnancy-quick-grid">
            <div className="scene1-pregnancy-tools-row">
              {pregnancyQuickActions.map((item) => (
                <PregnancyActionItem key={item.key} actionKey={item.key} label={item.label} />
              ))}
            </div>

            <div
              className="scene1-pregnancy-tools-row scene1-pregnancy-tools-row-secondary"
              data-testid="scene1-pregnancy-services-grid"
            >
              {pregnancyServiceActions.map((item) => (
                <PregnancyActionItem key={item.key} actionKey={item.key} label={item.label} />
              ))}
            </div>
          </section>

          <section className="scene1-pregnancy-article-card" data-testid="scene1-pregnancy-article-card">
            <header className="scene1-pregnancy-article-head">
              <div className="scene1-pregnancy-article-author">
                <span className="scene1-pregnancy-article-avatar" aria-hidden="true">
                  菠
                </span>
                <div className="scene1-pregnancy-article-author-copy">
                  <strong>菠萝是个大可爱</strong>
                  <span>孕27周1天</span>
                </div>
              </div>

              <button type="button" className="scene1-pregnancy-article-more" aria-label="文章更多">
                ···
              </button>
            </header>

            <div className="scene1-pregnancy-article-copy">
              <h2>潮湿的生活环境会得阴道炎吗？</h2>
              <p>
                昨天一个妹子私信我，停暖气了，内裤晾在卫生间里，总觉得有点潮，没几天就觉得外阴阴道瘙痒...
                <button type="button">全文</button>
              </p>
            </div>

            <div className="scene1-pregnancy-article-gallery">
              <div className="scene1-pregnancy-article-gallery-frame">
                <img src={articlePhotoA} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              </div>
              <div className="scene1-pregnancy-article-gallery-frame">
                <img src={articlePhotoB} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              </div>
              <div className="scene1-pregnancy-article-gallery-frame">
                <img src={articlePhotoC} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              </div>
            </div>

            <div className="scene1-pregnancy-quote-card">
              <div className="scene1-pregnancy-quote-head">
                <img src={quoteLikeIcon} alt="" aria-hidden="true" />
                <span>懵懵懂懂：</span>
              </div>
              <p>幸福的小姐妹，心简单，世界就会生长。心自由，生活就自由。</p>
            </div>

            <footer className="scene1-pregnancy-article-footer">
              <span className="scene1-pregnancy-article-topic">
                <img src={articleTopicIcon} alt="" aria-hidden="true" />
                美妆进行时
              </span>

              <div className="scene1-pregnancy-article-metrics">
                <span>
                  <img src={articleCommentIcon} alt="" aria-hidden="true" />
                  1245
                </span>
                <span>
                  <img src={articleLikeIcon} alt="" aria-hidden="true" />
                  2345
                </span>
              </div>
            </footer>

            <section className="scene1-pregnancy-checkin-card" data-testid="scene1-pregnancy-checkin-card">
              <div className="scene1-pregnancy-checkin-copy">
                <img
                  src={checkinArt}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="scene1-pregnancy-checkin-art"
                />
                <strong>每日签到挑战</strong>
              </div>
              <span className="scene1-pregnancy-checkin-score">+5</span>
            </section>
          </section>

          <p className="scene1-pregnancy-empty">没有更多记录了</p>
        </main>
      </div>

      <Scene1BottomTabBar activeTab="home" className="scene1-pregnancy-tabbar" />
      <div className="scene1-home-indicator" aria-hidden="true" />
    </div>
  );
}
