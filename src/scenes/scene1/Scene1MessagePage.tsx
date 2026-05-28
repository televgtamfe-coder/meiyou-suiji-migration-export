import noticeIcon from '../../assets/scene1-message/Frame_18_7257.png';
import avatarXiaoyouzi from '../../assets/scene1-message/4f6290544997252e8640034867b53086d8c03a97.png';
import avatarEsteeLauder from '../../assets/scene1-message/bf7226d0912d3b8099dbcd3f8627e4d55a9c49d1.png';
import avatarBabyDiaryGlyph from '../../assets/scene1-message/_1.png';
import avatarProyaBase from '../../assets/scene1-message/714d429f0df00b478440e56c93bb438fc6f79e52.webp';
import avatarProyaOverlay from '../../assets/scene1-message/19884c9b3452a1b7ce76ab95b9b23fb02c77f7ba.png';
import avatarTataCircleBase from '../../assets/scene1-message/Ellipse14.png';
import avatarTataCircleGlyph from '../../assets/scene1-message/Group174.png';
import avatarYouziStreetBase from '../../assets/scene1-message/Ellipse12.png';
import avatarYouziStreetGlyph from '../../assets/scene1-message/Boolean_operation_2_275.png';
import avatarInteractionBase from '../../assets/scene1-message/Ellipse13.png';
import avatarInteractionGlyph from '../../assets/scene1-message/Boolean_operation_2_245.png';
import avatarYouziSauceTexture from '../../assets/scene1-message/d96cb2b92907e3ec2c15d129afa784095a63a23a.png';
import avatarYouziSauceGlyph from '../../assets/scene1-message/584d3a10c7e3bc7b7039a10a67995890c5287891.webp';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { StatusBar } from './components/StatusBar';

type MessageItem = {
  id: string;
  title: string;
  time: string;
  preview: string;
  badge?: string;
  tag?: string;
  avatar: 'image' | 'babyDiary' | 'proya' | 'tataCircle' | 'youziSauce' | 'interaction' | 'youziStreet';
};

const messageItems: MessageItem[] = [
  {
    id: 'xiaoyouzi',
    title: '小柚子',
    tag: '官方',
    time: '昨天 11:08',
    preview: '经期开始提醒',
    badge: '1',
    avatar: 'image'
  },
  {
    id: 'estee-lauder',
    title: '雅诗兰黛',
    time: '广告',
    preview: '正在发经期福利：雅诗兰黛小棕瓶精华液 50ml...',
    avatar: 'image'
  },
  {
    id: 'baby-diary',
    title: '宝宝记',
    time: '昨天 11:04',
    preview: '崽仔是不是又可爱了许多？快来上传照片...',
    badge: '1',
    avatar: 'babyDiary'
  },
  {
    id: 'proya',
    title: '珀莱雅',
    time: '广告',
    preview: '正在发美柚福利：珀莱雅红宝石双抗精华水乳套装...',
    avatar: 'proya'
  },
  {
    id: 'tata-circle',
    title: '她她圈',
    time: '星期二',
    preview: '有奖 | 美柚11周年生日趴在线送祝福啦！',
    badge: '99+',
    avatar: 'tataCircle'
  },
  {
    id: 'youzi-sauce',
    title: '柚子酱',
    tag: '内测',
    time: '星期二',
    preview: '痛经怎么办？可以用手捏虎口区域有效缓解',
    badge: '1',
    avatar: 'youziSauce'
  },
  {
    id: 'interaction',
    title: '互动消息',
    time: '5-21',
    preview: '大太阳 回复了 你的评论',
    avatar: 'interaction'
  },
  {
    id: 'youzi-street',
    title: '柚子街',
    time: '5-21',
    preview: '正在发经期福利：安睡裤 10条 10.99元买4送1...',
    avatar: 'youziStreet'
  }
];

function MessageAvatar({ item }: { item: MessageItem }) {
  if (item.avatar === 'image') {
    const src = item.id === 'xiaoyouzi' ? avatarXiaoyouzi : avatarEsteeLauder;

    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="scene1-message-avatar-image"
      />
    );
  }

  if (item.avatar === 'babyDiary') {
    return (
      <span className="scene1-message-avatar-baby-diary" aria-hidden="true">
        <span className="scene1-message-avatar-baby-diary-bg" />
        <img
          src={avatarBabyDiaryGlyph}
          alt=""
          loading="lazy"
          decoding="async"
          className="scene1-message-avatar-baby-diary-glyph"
        />
      </span>
    );
  }

  if (item.avatar === 'proya') {
    return (
      <span className="scene1-message-avatar-proya" aria-hidden="true">
        <img src={avatarProyaBase} alt="" loading="lazy" decoding="async" className="scene1-message-avatar-proya-base" />
        <img
          src={avatarProyaOverlay}
          alt=""
          loading="lazy"
          decoding="async"
          className="scene1-message-avatar-proya-overlay"
        />
      </span>
    );
  }

  if (item.avatar === 'tataCircle') {
    return (
      <span className="scene1-message-avatar-round" aria-hidden="true">
        <img src={avatarTataCircleBase} alt="" loading="lazy" decoding="async" className="scene1-message-avatar-round-base" />
        <img
          src={avatarTataCircleGlyph}
          alt=""
          loading="lazy"
          decoding="async"
          className="scene1-message-avatar-round-glyph scene1-message-avatar-round-glyph-tata"
        />
      </span>
    );
  }

  if (item.avatar === 'youziSauce') {
    return (
      <span className="scene1-message-avatar-youzi-sauce" aria-hidden="true">
        <span className="scene1-message-avatar-youzi-sauce-bg" />
        <img
          src={avatarYouziSauceTexture}
          alt=""
          loading="lazy"
          decoding="async"
          className="scene1-message-avatar-youzi-sauce-texture"
        />
        <img
          src={avatarYouziSauceGlyph}
          alt=""
          loading="lazy"
          decoding="async"
          className="scene1-message-avatar-youzi-sauce-glyph"
        />
      </span>
    );
  }

  if (item.avatar === 'interaction') {
    return (
      <span className="scene1-message-avatar-round" aria-hidden="true">
        <img src={avatarInteractionBase} alt="" loading="lazy" decoding="async" className="scene1-message-avatar-round-base" />
        <img
          src={avatarInteractionGlyph}
          alt=""
          loading="lazy"
          decoding="async"
          className="scene1-message-avatar-round-glyph scene1-message-avatar-round-glyph-interaction"
        />
      </span>
    );
  }

  return (
    <span className="scene1-message-avatar-round" aria-hidden="true">
      <img src={avatarYouziStreetBase} alt="" loading="lazy" decoding="async" className="scene1-message-avatar-round-base" />
      <img
        src={avatarYouziStreetGlyph}
        alt=""
        loading="lazy"
        decoding="async"
        className="scene1-message-avatar-round-glyph scene1-message-avatar-round-glyph-street"
      />
    </span>
  );
}

export function Scene1MessagePage() {
  return (
    <div className="scene1-message-page" data-testid="scene1-message-shell">
      <StatusBar />

      <div className="scene1-message-scroll">
        <header className="scene1-message-header">
          <span className="scene1-message-header-side" aria-hidden="true" />
          <h1>消息</h1>
          <span className="scene1-message-header-side" aria-hidden="true" />
        </header>

        <section className="scene1-message-notice" aria-label="通知提示">
          <div className="scene1-message-notice-copy">
            <p>打开通知，及时接收重要消息。</p>
            <button type="button">去开启</button>
          </div>
          <img
            src={noticeIcon}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="scene1-message-notice-icon"
          />
        </section>

        <main className="scene1-message-list" data-testid="scene1-message-list">
          {messageItems.map((item) => (
            <article key={item.id} className="scene1-message-row" data-testid="scene1-message-row">
              <div className="scene1-message-avatar">
                <MessageAvatar item={item} />
              </div>

              <div className="scene1-message-copy">
                <div className="scene1-message-meta">
                  <div className="scene1-message-title-wrap">
                    <strong>{item.title}</strong>
                    {item.tag ? <span className="scene1-message-tag">{item.tag}</span> : null}
                  </div>
                  <span className="scene1-message-time">{item.time}</span>
                </div>

                <div className="scene1-message-preview-wrap">
                  <p>{item.preview}</p>
                  {item.badge ? <span className="scene1-message-badge">{item.badge}</span> : null}
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>

      <Scene1BottomTabBar activeTab="message" className="scene1-message-tabbar" />
      <div className="scene1-home-indicator" aria-hidden="true" />
    </div>
  );
}
