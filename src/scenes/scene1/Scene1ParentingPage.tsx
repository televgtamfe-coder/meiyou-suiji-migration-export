import heroBackground from '../../assets/scene1-parenting/ad60b58af7505e4a5892e8ad1f0830db7b9df0f2.webp';
import babyAvatar from '../../assets/scene1-parenting/Ellipse_8_34771.png';
import inviteIcon from '../../assets/scene1-parenting/Group_8_34814.png';
import inviteArrow from '../../assets/scene1-parenting/Frame_8_34821.png';
import feedingIcon from '../../assets/scene1-parenting/Group_80_49328.png';
import earlyLearningIcon from '../../assets/scene1-parenting/Group_80_28882.png';
import storyIcon from '../../assets/scene1-parenting/Boolean_operation_80_38991.png';
import growthIcon from '../../assets/scene1-parenting/Group_80_48610.png';
import moreIcon from '../../assets/scene1-parenting/Frame_8_35132.png';
import todayCardArt from '../../assets/scene1-parenting/Frame_80_146673.png';
import entryPhotoA from '../../assets/scene1-parenting/63fc3fcc2b72b6ca1b3d9e4770641b7b471e2e57.png';
import entryPhotoB from '../../assets/scene1-parenting/84737e0ae3402fa33a235e8b6e0d4da68a63cb94.png';
import entryPhotoC from '../../assets/scene1-parenting/5dc14bab99b339fd992a6f5c0a2dc0a1fd42b5c3.png';
import entryPhotoD from '../../assets/scene1-parenting/17c0ef8efe8642eb0085b750154d50d557cca927.png';
import entryPhotoE from '../../assets/scene1-parenting/4cd678b252d3a58fa1c120bcaba0c80224947098.png';
import entryPhotoF from '../../assets/scene1-parenting/dd9c702943b7af3d401557c595ad5d88c741013d.png';
import entryPhotoG from '../../assets/scene1-parenting/a7082d33a6801a12d42de234e12433ea09fee6f0.png';
import entryPhotoH from '../../assets/scene1-parenting/fafc02233724b6d2b69cf266f8af574f3a3d7cb1.png';
import entryPhotoI from '../../assets/scene1-parenting/128a80054ac0ada6bd649bc2875d775a18340b43.png';
import entryPhotoJ from '../../assets/scene1-parenting/66ba8a347c2ed848d7d2ba06821d58c36ecc2283.png';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { StatusBar } from './components/StatusBar';

type RecordEntry = {
  id: string;
  date: string;
  age: string;
  title: string;
  summary: string;
  images: string[];
  tags: string[];
  author: string;
  time: string;
  badge?: string;
  footer?: string;
};

const quickActions = [
  { key: 'feeding', label: '喂养记录', icon: feedingIcon },
  { key: 'early-learning', label: '在家早教', icon: earlyLearningIcon },
  { key: 'stories', label: '儿歌故事', icon: storyIcon },
  { key: 'growth', label: '记身高体重', icon: growthIcon },
  { key: 'more', label: '更多', icon: moreIcon },
] as const;

const recordEntries: RecordEntry[] = [
  {
    id: 'today',
    date: '今天',
    age: '9个月10天',
    title: '宝宝已经可以自己坐起来啦',
    summary: '来上传和爸爸一起看的成长瞬间，也可以顺手记录今天的新变化。',
    badge: '立即记录',
    images: [todayCardArt],
    tags: ['会坐了', '成长记录', '小可爱'],
    author: '妈妈',
    time: '刚刚',
    footer: '爷爷、奶奶都能看到这条成长记录',
  },
  {
    id: 'yesterday-a',
    date: '8月8日',
    age: '9个月9天',
    title: '宝宝开始咿咿呀呀地自言自语了',
    summary: '今天会盯着玩具发出很多小声音，像是在认真跟我们聊天。',
    images: [entryPhotoA, entryPhotoB, entryPhotoC],
    tags: ['咿呀学语', '互动', '好奇心'],
    author: '妈妈',
    time: '刚刚',
  },
  {
    id: 'yesterday-b',
    date: '8月8日',
    age: '9个月9天',
    title: '第一次自己扶着坐稳',
    summary: '把今天的照片和一句成长备注都留在这里，后面翻看会很有感觉。',
    images: [entryPhotoD, entryPhotoE, entryPhotoF, entryPhotoG, entryPhotoH, entryPhotoI, entryPhotoJ],
    tags: ['会坐了', '家庭相册', '成长记录'],
    author: '妈妈',
    time: '刚刚',
  },
];

function getRecordMediaClassName(imageCount: number) {
  if (imageCount === 1) {
    return 'scene1-parenting-record-media scene1-parenting-record-media-single';
  }

  if (imageCount > 3) {
    return 'scene1-parenting-record-media scene1-parenting-record-media-mosaic';
  }

  return 'scene1-parenting-record-media';
}

export function Scene1ParentingPage() {
  return (
    <div className="scene1-parenting-page" data-testid="scene1-parenting-shell">
      <StatusBar />

      <div className="scene1-parenting-scroll">
        <header className="scene1-parenting-hero" data-testid="scene1-parenting-hero">
          <img
            src={heroBackground}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            className="scene1-parenting-hero-bg"
          />
          <div className="scene1-parenting-hero-overlay" />

          <div
            className="scene1-parenting-profile-panel"
            data-testid="scene1-parenting-profile-panel"
          >
            <div className="scene1-parenting-profile">
              <div className="scene1-parenting-profile-main">
                <img src={babyAvatar} alt="" aria-hidden="true" className="scene1-parenting-avatar" />
                <div className="scene1-parenting-profile-copy">
                  <strong>宝宝</strong>
                  <p className="scene1-parenting-profile-summary">成长第 284 天，今天也有新变化</p>
                  <button type="button" className="scene1-parenting-age-chip">
                    <span>9个月10天</span>
                    <img src={inviteArrow} alt="" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <button type="button" className="scene1-parenting-invite-pill">
                <img src={inviteIcon} alt="" aria-hidden="true" />
                <span>邀请亲友</span>
                <img
                  src={inviteArrow}
                  alt=""
                  aria-hidden="true"
                  className="scene1-parenting-invite-arrow"
                />
              </button>
            </div>

            <section className="scene1-parenting-change-card">
              <div className="scene1-parenting-change-copy">
                <p className="scene1-parenting-change-label">宝宝变化</p>
                <p className="scene1-parenting-change-text">
                  妈妈，当你看到我把水杯碰倒时，不要责怪我。我已经开始学习用杯子喝水，只是还没完全掌握放回去的动作，所以偶尔会把它碰倒呀。
                </p>
              </div>
              <div className="scene1-parenting-change-meta">
                <span>第 1 周 · 11月9日</span>
                <button type="button">回到今天</button>
              </div>
            </section>
          </div>
        </header>

        <main className="scene1-parenting-body">
          <section className="scene1-parenting-quick-card" data-testid="scene1-parenting-quick-grid">
            {quickActions.map((item) => (
              <button key={item.key} type="button" className="scene1-parenting-quick-item">
                <span className="scene1-parenting-quick-icon-wrap">
                  <img src={item.icon} alt="" aria-hidden="true" className="scene1-parenting-quick-icon" />
                </span>
                <span className="scene1-parenting-quick-label">{item.label}</span>
              </button>
            ))}
          </section>

          <section className="scene1-parenting-family-card" data-testid="scene1-parenting-family-card">
            <div className="scene1-parenting-family-copy">
              <p>邀请爷爷奶奶，一起上传宝宝照片</p>
              <span>全家都能在这里看见宝宝今天的新变化</span>
            </div>
            <button type="button">去邀请</button>
          </section>

          <section
            className="scene1-parenting-record-section"
            data-testid="scene1-parenting-record-section"
          >
            <div className="scene1-parenting-record-section-head">
              <div>
                <h2>成长记录</h2>
                <p>把照片、小变化和陪伴瞬间都留在这里</p>
              </div>
            </div>

            <section className="scene1-parenting-record-list" data-testid="scene1-parenting-record-list">
              {recordEntries.map((entry) => (
                <article key={entry.id} className="scene1-parenting-record">
                  <div className="scene1-parenting-record-date">
                    <div className="scene1-parenting-record-date-dot" aria-hidden="true" />
                    <div className="scene1-parenting-record-date-copy">
                      <strong>{entry.date}</strong>
                      <span>{entry.age}</span>
                    </div>
                  </div>

                  <div className="scene1-parenting-record-card">
                    <div className="scene1-parenting-record-copy">
                      <div className="scene1-parenting-record-head">
                        <h3>{entry.title}</h3>
                        {entry.badge ? <button type="button">{entry.badge}</button> : null}
                      </div>
                      <p>{entry.summary}</p>
                    </div>

                    <div className={getRecordMediaClassName(entry.images.length)}>
                      {entry.images.map((image, index) => (
                        <div
                          key={`${entry.id}-image-${index}`}
                          className="scene1-parenting-record-media-frame"
                        >
                          <img src={image} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                        </div>
                      ))}
                    </div>

                    <div className="scene1-parenting-record-tags">
                      {entry.tags.map((tag) => (
                        <span key={`${entry.id}-${tag}`}>{tag}</span>
                      ))}
                    </div>

                    <footer className="scene1-parenting-record-footer">
                      <div className="scene1-parenting-record-author">
                        <span>{entry.author}</span>
                        <span>{entry.time}</span>
                      </div>
                      <button type="button" className="scene1-parenting-record-like" aria-label="点赞">
                        <span aria-hidden="true">♡</span>
                      </button>
                    </footer>

                    {entry.footer ? <p className="scene1-parenting-record-note">{entry.footer}</p> : null}
                  </div>
                </article>
              ))}
            </section>
          </section>

          <p className="scene1-parenting-empty">没有更多记录了</p>
        </main>
      </div>

      <div
        className="scene1-parenting-mode-switch"
        data-testid="scene1-parenting-mode-switch"
        aria-label="育儿模式切换"
      >
        <button type="button" className="scene1-parenting-mode-pill">
          妈妈
        </button>
        <button type="button" className="scene1-parenting-mode-pill active">
          宝宝
        </button>
      </div>

      <Scene1BottomTabBar activeTab="home" className="scene1-parenting-tabbar" />
      <div className="scene1-home-indicator" aria-hidden="true" />
    </div>
  );
}
