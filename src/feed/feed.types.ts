export type ApiResponse = {
  statusCode: number;
  message: string;
};

export type FeedListResponse = {
  statusCode: number;
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
  statusCode: number;
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

