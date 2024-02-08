import { CityEntity } from 'src/entities/cities.entity';
import { UserEntity } from 'src/entities/users.entity';

export type GetCheckNicknameOverlapDto = {
  nickname?: string;
};

export type UserFollowDto = {
  userId: number;
  followUserId: number;
};

export type LoginResponseDto = {
  token: string;
  user: UserInfoDto;
};

export type UserInfoDto = {
  id: number;
  nickname: string;
  profileImage: string;
};

export type UpdateUserInfoDto = {
  id: number;
  nickname: string; // 첫 로그인시 작성
  email: string; // 소셜로그인으로 정보 삽입
  gender?: number; // 성별, 0: 공용, 1: 남성, 2: 여성 / 비회원: 0만, 회원: 0~2 모두 다
  locationInformationAgree?: number; // 위치정보 동의 여부, 0:동의안함, 1:사용중에만 동의, 2: 항상 동의
  socialAccountUid: string; // 소셜로그인시, SNS ID
  profileImage?: string; // 소셜로그인으로 정보 삽입
  temperatureSensitivity?: number; // 기온 민감도, 0: 기본, 1: 추위타요, 2: 더위타요
  city?: number;
};
