export type ApiResponse = {
  statusCode: number;
  message: string;
};

export type FeedList = {
  statusCode: number;
  message: string;
  data?: FeedItem[];
}

export type Feed = {
  statusCode: number;
  message: string;
  data?: FeedItem;
}

export type FeedItem = {
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
  isAuthor: boolean;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
};
