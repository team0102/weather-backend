export type ApiResponse = {
  status: number;
  message: string;
};

export type FeedListResponse = {
  status: number;
  message: string;
  data?: FeedListItem[];
};

export type FeedListItem = {
  id: number;
  content: string;
  imageUrl: string;
  lowTemperature: number;
  highTemperature: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
  weatherConditionId: number;
  isAuthor: boolean;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

export type FeedDetailResponse = {
  status: number;
  message: string;
  data?: FeedDatail;
};

export type FeedDatail = {
  id: number;
  content: string;
  imageUrl: string;
  weatherConditionId: number;
  lowTemperature: number;
  highTemperature: number;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: number;
    nickname: string;
    profileImage: string | null;
  };
  comment: Array<{
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: {
      id: number;
      nickname: string;
      profileImage: string | null;
    };
  }>;
  isAuthor: boolean;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};

export type BookmarkListResponse = {
  status: number;
  message: string;
  data?: BookmarkList[];
};

export type BookmarkList = {
  id: number;
  createdAt: Date;
  feed: {
    id: number;
    content: string;
    imageUrl: string;
    lowTemperature: number;
    highTemperature: number;
    weatherConditionId: number;
    createdAt: Date;
    updatedAt: Date;
  }
  author: {
    id: number;
    nickname: string;
    profileImage: string | null;
  }
};
