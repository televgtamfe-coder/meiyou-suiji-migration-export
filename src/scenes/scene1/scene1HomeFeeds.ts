import avatarPrimaryFrame from '../../assets/scene1-home/avatar-primary-frame.png';
import avatarPrimaryBase from '../../assets/scene1-home/avatar-primary-base.png';
import avatarPrimaryOverlay from '../../assets/scene1-home/avatar-primary-overlay.png';
import avatarSecondaryFrame from '../../assets/scene1-home/avatar-secondary-frame.png';
import avatarTertiaryFrame from '../../assets/scene1-home/avatar-tertiary-frame.png';
import feedPrimaryPreview1 from '../../assets/scene1-home/feed-primary-preview-1.png';
import feedPrimaryPreview2 from '../../assets/scene1-home/feed-primary-preview-2.png';
import feedPrimaryPreview3 from '../../assets/scene1-home/feed-primary-preview-3.png';

export type Scene1HomeFeed = {
  id: string;
  author: string;
  subtitle: string;
  authorNote?: string;
  tag?: string;
  body: string;
  expandLabel?: string;
  previewImages?: string[];
  hotCommentLabel?: string;
  hotComment?: string;
  commentCount: string;
  likeCount: string;
  avatarImages: string[];
};

export const scene1HomeFeeds: Scene1HomeFeed[] = [
  {
    id: 'feed-primary',
    author: '月月姐姐',
    subtitle: '宝宝1岁',
    tag: '#姐妹来帮忙',
    body: '剖腹产一年，现在又怀孕了，关键是老公还结扎了都可以怀孕，都不知道敢不敢要，这个是万分之一的吧，有姐妹老...',
    expandLabel: '全文',
    previewImages: [feedPrimaryPreview1, feedPrimaryPreview2, feedPrimaryPreview3],
    hotCommentLabel: '热评',
    hotComment: '我有个邻居大哥结扎后，他媳妇还真怀了，当时还闹了乌龙。',
    commentCount: '106',
    likeCount: '12',
    avatarImages: [avatarPrimaryFrame, avatarPrimaryBase, avatarPrimaryOverlay],
  },
  {
    id: 'feed-secondary',
    author: '草莓牛奶王子',
    authorNote: '发了一篇帖子',
    subtitle: '宝宝1岁',
    body: '晒晒我的婚纱照 和先生是研究生同学，我们是从校园到婚纱，遇见彼此也是很幸运的。我们在校园相识相知相恋。',
    commentCount: '133',
    likeCount: '200',
    avatarImages: [avatarSecondaryFrame],
  },
  {
    id: 'feed-tertiary',
    author: '海边日落',
    authorNote: '发了一篇帖子',
    subtitle: '宝宝1岁',
    body: '竖版视频：看我新画的美美的妆，超级满意，准备出门玩啦',
    commentCount: '133',
    likeCount: '200',
    avatarImages: [avatarTertiaryFrame],
  },
];
