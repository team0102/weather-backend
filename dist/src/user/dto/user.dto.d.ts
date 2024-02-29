import { SocialAccountProviderEntity } from 'src/entities/socialAccountProviders.entity';
export type GetCheckNicknameOverlapDto = {
    nickname?: string;
};
export type UserFollowDto = {
    userId: number;
    followUserId: number;
};
export type UserBlockDto = {
    userId: number;
    blockUserId: number;
};
export type LoginUserInfoDto = {
    userId: string;
    userEmail: string;
    userNickname: string;
    userProfileImage: string;
};
export type SignUpUserInfoDto = {
    socialAccountProvider: number;
    socialAccountUid: string;
    email: string;
    nickname: string;
    profileImage: string;
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
    nickname: string;
    email: string;
    gender?: number;
    locationInformationAgree?: number;
    socialAccountUid: string;
    profileImage?: string;
    temperatureSensitivity?: number;
    city?: number;
};
export type kakaoSignUpDto = {
    email: string;
    gender?: number;
    locationInformationAgree?: number;
    socialAccountUid: string;
    profileImage?: string;
    temperatureSensitivity?: number;
    SocialAccountProvider: SocialAccountProviderEntity;
};
