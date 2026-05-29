import { useState } from 'react';
import heroBackground from '../../assets/scene1-prep/bg.png';
import chanceRingArtwork from '../../assets/scene1-prep/Union0.png';
import chanceRingFill from '../../assets/scene1-prep/Ellipse_77_9462.png';
import recordCardBackground from '../../assets/scene1-prep/Vector_77_7951.png';
import recordDrop from '../../assets/scene1-prep/Vector_77_8478.png';
import recordHighlight from '../../assets/scene1-prep/Group_77_8479.png';
import tipsIcon from '../../assets/scene1-prep/Group_77_8675.png';
import tipsHeart from '../../assets/scene1-prep/Vector_77_8682.png';
import foodIcon from '../../assets/scene1-prep/Group_77_5522.png';
import earlyCheckIcon from '../../assets/scene1-prep/Group9.png';
import earlyCheckSpark from '../../assets/scene1-prep/Group_77_5670.png';
import moreIcon from '../../assets/scene1-prep/Group_77_5262.png';
import moreArrow from '../../assets/scene1-prep/Frame_75_10958.png';
import adBanner from '../../assets/scene1-prep/e1a6ed51495985a40b0a17a4789e1101240833ac.webp';
import adMenu from '../../assets/scene1-prep/Frame_75_10979.png';
import authorAvatar from '../../assets/scene1-prep/Ellipse_75_11003.png';
import authorMore from '../../assets/scene1-prep/Frame_75_11037.png';
import articlePhotoA from '../../assets/scene1-prep/ce721b2cecb373e28b7069f09191d0595ce57ca2.png';
import articlePhotoB from '../../assets/scene1-prep/5b0d40a680fa04a775fbda7d6290aa07d5987ceb.png';
import articlePhotoC from '../../assets/scene1-prep/Rectangle_77_359.png';
import quoteLikeIcon from '../../assets/scene1-prep/like.png';
import articleTopicIcon from '../../assets/scene1-prep/Frame_75_11104.png';
import articleCommentIcon from '../../assets/scene1-prep/Frame_75_11130.png';
import articleLikeIcon from '../../assets/scene1-prep/Frame_75_11151.png';
import checkinArt from '../../assets/scene1-prep/a3d4f8b7723d1dc79b9b04e9bd8c0a12b374d598.webp';
import knowledgeMailIcon from '../../assets/scene1-prep/Frame_75_11432.png';
import knowledgeSurface from '../../assets/scene1-prep/Vector_75_11450.png';
import knowledgeToastOutline from '../../assets/scene1-prep/Boolean_operation_75_11416.png';
import knowledgeToastText from '../../assets/scene1-prep/Group_75_11419.png';
import knowledgeSearchIcon from '../../assets/scene1-prep/Frame_75_11451.png';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { StatusBar } from './components/StatusBar';

const prepDates = [
  { label: '周二(10月26日)' },
  { label: '今天(12月22日)', active: true },
  { label: '周二(12月23日)' },
];

const prepTools = [
  { key: 'tips', label: '备孕锦囊' },
  { key: 'food', label: '能不能吃' },
  { key: 'ovulation', label: '排卵试纸' },
  { key: 'check', label: '早孕检查' },
  { key: 'more', label: '更多' },
] as const;

type PrepToolKey = (typeof prepTools)[number]['key'];

function PrepToolIcon({ toolKey }: { toolKey: PrepToolKey }) {
  if (toolKey === 'tips') {
    return (
      <span className="scene1-prep-tool-icon-composed scene1-prep-tool-icon-tips">
        <img src={tipsIcon} alt="" aria-hidden="true" className="scene1-prep-tool-image" />
        <img
          src={tipsHeart}
          alt=""
          aria-hidden="true"
          className="scene1-prep-tool-image scene1-prep-tool-image-accent"
        />
      </span>
    );
  }

  if (toolKey === 'food') {
    return <img src={foodIcon} alt="" aria-hidden="true" className="scene1-prep-tool-image" />;
  }

  if (toolKey === 'ovulation') {
    return (
      <span className="scene1-prep-tool-strip" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    );
  }

  if (toolKey === 'check') {
    return (
      <span className="scene1-prep-tool-icon-composed scene1-prep-tool-icon-check">
        <img src={earlyCheckIcon} alt="" aria-hidden="true" className="scene1-prep-tool-image" />
        <img
          src={earlyCheckSpark}
          alt=""
          aria-hidden="true"
          className="scene1-prep-tool-image scene1-prep-tool-image-accent"
        />
      </span>
    );
  }

  return <img src={moreIcon} alt="" aria-hidden="true" className="scene1-prep-tool-image" />;
}

export function Scene1PrepPage() {
  const [periodStarted, setPeriodStarted] = useState(false);

  return (
    <div className="scene1-prep-page" data-testid="scene1-prep-shell">
      <StatusBar />

      <button
        type="button"
        className="scene1-prep-knowledge-pill"
        data-testid="scene1-prep-knowledge-pill"
      >
        <img src={knowledgeMailIcon} alt="" aria-hidden="true" className="scene1-prep-knowledge-mail" />
        <span className="scene1-prep-knowledge-surface">
          <img src={knowledgeSurface} alt="" aria-hidden="true" className="scene1-prep-knowledge-bg" />
          <span className="scene1-prep-knowledge-toast" aria-hidden="true">
            <img src={knowledgeToastOutline} alt="" />
            <img src={knowledgeToastText} alt="" />
          </span>
          <img
            src={knowledgeSearchIcon}
            alt=""
            aria-hidden="true"
            className="scene1-prep-knowledge-search"
          />
          <span className="scene1-prep-knowledge-label">备孕知识</span>
        </span>
      </button>

      <div className="scene1-prep-scroll">
        <header className="scene1-prep-hero" data-testid="scene1-prep-hero">
          <section className="scene1-prep-date-strip" aria-label="备孕日期切换">
            <button type="button" className="scene1-prep-date-return">
              回今天
            </button>
            {prepDates.map((item) => (
              <span key={item.label} className={item.active ? 'scene1-prep-date-item active' : 'scene1-prep-date-item'}>
                {item.label}
              </span>
            ))}
          </section>

          <section className="scene1-prep-chance-card" data-testid="scene1-prep-chance-card">
            <img
              src={heroBackground}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="scene1-prep-chance-bg"
            />

            <div className="scene1-prep-chance-main">
              <div className="scene1-prep-chance-copy">
                <p className="scene1-prep-topbar-kicker">距排卵日还有7天</p>
                <button type="button" className="scene1-prep-ovulation-pill">
                  预计下次排卵日11月6日
                </button>
              </div>

              <div className="scene1-prep-ring" aria-hidden="true">
                <img src={chanceRingArtwork} alt="" className="scene1-prep-ring-art" />
                <img src={chanceRingFill} alt="" className="scene1-prep-ring-fill" />
                <div className="scene1-prep-ring-core">
                  <span className="scene1-prep-ring-label">怀孕几率</span>
                  <strong className="scene1-prep-ring-value">15.3%</strong>
                </div>
              </div>
            </div>
          </section>
        </header>

        <main className="scene1-prep-body">
          <section className="scene1-prep-record-card" data-testid="scene1-prep-record-card">
            <img
              src={recordCardBackground}
              alt=""
              aria-hidden="true"
              className="scene1-prep-record-bg"
            />

            <div className="scene1-prep-record-copy">
              <span className="scene1-prep-record-icon" aria-hidden="true">
                <img src={recordDrop} alt="" className="scene1-prep-record-drop" />
                <img src={recordHighlight} alt="" className="scene1-prep-record-highlight" />
              </span>
              <strong>大姨妈来了</strong>
            </div>

            <div className="scene1-prep-toggle" aria-label="经期开始切换">
              <button
                type="button"
                className={periodStarted ? 'scene1-prep-toggle-pill active' : 'scene1-prep-toggle-pill'}
                onClick={() => setPeriodStarted(true)}
              >
                是
              </button>
              <button
                type="button"
                className={!periodStarted ? 'scene1-prep-toggle-pill active' : 'scene1-prep-toggle-pill'}
                onClick={() => setPeriodStarted(false)}
              >
                否
              </button>
            </div>
          </section>

          <section className="scene1-prep-tools-card" data-testid="scene1-prep-tools-grid">
            {prepTools.map((tool) => (
              <button key={tool.key} type="button" className="scene1-prep-tool-item">
                <span className="scene1-prep-tool-icon-wrap">
                  <PrepToolIcon toolKey={tool.key} />
                </span>
                <span className="scene1-prep-tool-label">
                  {tool.label}
                  {tool.key === 'more' ? (
                    <img src={moreArrow} alt="" aria-hidden="true" className="scene1-prep-tool-arrow" />
                  ) : null}
                </span>
              </button>
            ))}
          </section>

          <section className="scene1-prep-ad-card" data-testid="scene1-prep-ad-card">
            <img
              src={adBanner}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="scene1-prep-ad-image"
            />
            <span className="scene1-prep-ad-badge">广告</span>
            <button type="button" className="scene1-prep-ad-menu" aria-label="广告更多">
              <img src={adMenu} alt="" aria-hidden="true" />
            </button>
          </section>

          <section className="scene1-prep-article-card" data-testid="scene1-prep-article-card">
            <header className="scene1-prep-article-head">
              <div className="scene1-prep-article-author">
                <img src={authorAvatar} alt="" aria-hidden="true" className="scene1-prep-article-avatar" />
                <div className="scene1-prep-article-author-copy">
                  <strong>菠萝是个大可爱</strong>
                  <span>孕27周1天</span>
                </div>
              </div>

              <button type="button" className="scene1-prep-article-more" aria-label="文章更多">
                <img src={authorMore} alt="" aria-hidden="true" />
              </button>
            </header>

            <div className="scene1-prep-article-copy">
              <h2>潮湿的生活环境会得阴道炎吗？</h2>
              <p className="scene1-prep-article-summary">
                昨天一个妹子私信我，停暖气了，内裤晾在卫生间里，总觉得有点潮，没几天就觉得外阴阴道瘙痒…
                <button type="button">全文</button>
              </p>
            </div>

            <div className="scene1-prep-article-gallery">
              <div className="scene1-prep-article-gallery-frame">
                <img src={articlePhotoA} alt="" aria-hidden="true" />
              </div>
              <div className="scene1-prep-article-gallery-frame">
                <img src={articlePhotoB} alt="" aria-hidden="true" />
              </div>
              <div className="scene1-prep-article-gallery-frame">
                <img src={articlePhotoC} alt="" aria-hidden="true" />
              </div>
            </div>

            <div className="scene1-prep-article-quote">
              <div className="scene1-prep-article-quote-head">
                <img src={quoteLikeIcon} alt="" aria-hidden="true" />
                <span>懵懵懂懂：</span>
              </div>
              <p>幸福的小妹妹，心简单，世界就会生长。</p>
              <p>心自由，生活就自由。</p>
            </div>

            <footer className="scene1-prep-article-footer">
              <span className="scene1-prep-article-topic">
                <img src={articleTopicIcon} alt="" aria-hidden="true" />
                美柚进行时
              </span>

              <div className="scene1-prep-article-metrics">
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
            <section className="scene1-prep-checkin-card" data-testid="scene1-prep-checkin-card">
              <div className="scene1-prep-checkin-copy">
                <img
                  src={checkinArt}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="scene1-prep-checkin-art"
                />
                <div>
                  <strong>每日签到挑战</strong>
                </div>
              </div>
              <span className="scene1-prep-checkin-score">+5</span>
            </section>
          </section>
        </main>
      </div>

      <Scene1BottomTabBar activeTab="home" className="scene1-prep-tabbar" />
      <div className="scene1-home-indicator" aria-hidden="true" />
    </div>
  );
}
