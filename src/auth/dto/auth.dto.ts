import { SocialAccountProviderEntity } from 'src/entities/socialAccountProviders.entity';

export type LoginResponseDto = {
  token: string;
  user: UserInfo;
};

export type UserInfo = {
  id: number;
  nickname: string;
  profileImage: string;
};

// export type SignUpRequestDto = {
//   name?: string;
//   email: string;
//   password: string;
// };

export type getCheckNicknameOverlapDto = {
  nickname?: string;
};

export type userFollowDto = {
  userId: number;
  followUserId: number;
};

export type kakaoSignUpDto = {
  email: string;
  gender?: number;
  locationInformationAgree?: number; // 위치정보 동의 여부, 0:동의안함, 1:사용중에만 동의, 2: 항상 동의
  socialAccountUid: string; // 소셜로그인시, SNS ID
  profileImage?: string; // 소셜로그인으로 정보 삽입
  temperatureSensitivity?: number; // 기온 민감도, 0: 기본, 1: 추위타요, 2: 더위타요
  // SocialAccountProvider: number;
  SocialAccountProvider: SocialAccountProviderEntity; // 1: 카카오, 2: 네이버, 3: 구글 등
};
