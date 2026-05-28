import avatarFramePrimary from '../../assets/scene1-home/avatar-frame-primary.png';
import avatarPrimaryBase from '../../assets/scene1-home/avatar-primary-base.png';
import avatarPrimaryOverlay from '../../assets/scene1-home/avatar-primary-overlay.png';
import avatarFrameSecondary from '../../assets/scene1-home/avatar-frame-secondary.png';
import avatarFrameTertiary from '../../assets/scene1-home/avatar-frame-tertiary.png';
import feedImage1 from '../../assets/scene1-home/feed-image-1.webp';
import feedImage2 from '../../assets/scene1-home/feed-image-2.webp';
import feedImage3 from '../../assets/scene1-home/feed-image-3.webp';

export type Scene1HomeFeed = {
  id: string;
  author: string;
  subtitle: string;
  avatarStyle: 'primary' | 'secondary' | 'tertiary';
  authorNote?: string;
  tag?: string;
  body: string;
  expandLabel?: string;
  images?: string[];
  hotCommentLabel?: string;
  hotComment?: string;
  comments: string;
  likes: string;
  avatarImages: string[];
};

export const scene1HomeFeeds: Scene1HomeFeed[] = [
  {
    id: 'feed-primary',
    author: '月月姐姐',
    subtitle: '宝宝1岁',
    avatarStyle: 'primary',
    tag: '#姐妹来帮忙',
    body: '剖腹产一年，现在又怀孕了，关键是老公还结扎了都可以怀孕，都不知道敢不敢要，这个是万分之一的吧，有姐妹老...',
    expandLabel: '全文',
    images: [feedImage1, feedImage2, feedImage3],
    hotCommentLabel: '热评',
    hotComment: '我有个邻居大哥结扎后，他媳妇还真怀了，当时还闹了乌龙。',
    comments: '106',
    likes: '12',
    avatarImages: [avatarFramePrimary, avatarPrimaryBase, avatarPrimaryOverlay],
  },
  {
    id: 'feed-secondary',
    author: '草莓牛奶王子',
    avatarStyle: 'secondary',
    authorNote: '发了一篇帖子',
    subtitle: '宝宝1岁',
    body: '晒晒我的婚纱照 和先生是研究生同学，我们是从校园到婚纱，遇见彼此也是很幸运的。我们在校园相识相知相恋。',
    comments: '133',
    likes: '200',
    avatarImages: [avatarFrameSecondary],
  },
  {
    id: 'feed-tertiary',
    author: '海边日落',
    avatarStyle: 'tertiary',
    authorNote: '发了一篇帖子',
    subtitle: '宝宝1岁',
    body: '竖版视频：看我新画的美美的妆，超级满意，准备出门玩啦',
    comments: '133',
    likes: '200',
    avatarImages: [avatarFrameTertiary],
  },
];
