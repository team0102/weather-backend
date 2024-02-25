import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

import {
  LoginResponseDto,
  LoginUserInfoDto,
  SignUpUserInfoDto,
  UpdateUserInfoDto,
  UserFollowDto,
  UserInfoDto,
} from './dto/user.dto';
import { UserEntity } from 'src/entities/users.entity';
import { UserRepository } from './user.repository';
import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { UserFollowRepository } from './userFollow.repository';
import { CityRepository } from './city.repository';
import { RedisUserService } from './redis/redis.user.service';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly userFollowRepository: UserFollowRepository,
    private readonly cityRepository: CityRepository,
    private readonly redisUserService: RedisUserService,
  ) {}

  // 소셜로그인
  async getToken(loginUserInfo: LoginUserInfoDto) {
    const user = await this.kakaoValidateUser(loginUserInfo); // 카카오 정보 검증 및 회원가입 로직

    const token = this.generateAccessToken(user); // accessToken 생성

    return token;
  }

  async kakaoValidateUser(
    loginUserInfo: LoginUserInfoDto,
  ): Promise<UserEntity> {
    const { userId, userEmail, userNickname, userProfileImage } = loginUserInfo;

    let user: UserEntity = await this.userRepository.findUserByKakaoId(userId); // 유저 조회

    console.log(user);

    // 회원 가입 로직
    if (!user) {
      const signUpUserInfo: SignUpUserInfoDto = {
        socialAccountProvider: 1, // 1: KAKAO, 2: NAVER, 3: GOOGLE
        socialAccountUid: userId,
        email: userEmail,
        nickname: userNickname,
        profileImage: userProfileImage,
      };

      user = await this.userRepository.createUser(signUpUserInfo);
    }

    return user;
  }

  generateAccessToken(user: UserEntity): string {
    const payload = {
      userId: user.socialAccountUid,
      userEmail: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async getUserInfoBysocialAccountUid(
    socialAccountUid: string,
  ): Promise<UserInfoDto> {
    const user = await this.userRepository.findUserByUid(socialAccountUid);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const { id, nickname, profileImage } =
      await this.userRepository.findUserByUid(socialAccountUid);

    const userInfo = {
      id,
      nickname,
      profileImage,
    };

    return userInfo;
  }

  // 닉네임 중복 체크 : O
  async getCheckNicknameOverlap(nickname: string): Promise<string> {
    const numberOfOverlapNickname =
      this.userRepository.getCheckNicknameOverlap(nickname);

    return (await numberOfOverlapNickname) === 0
      ? 'USER_NOT_EXIST'
      : 'USER_EXIST';
  }

  // 유저 정보 조회 : O
  async getUserInfo(userId: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneById(userId);

    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    return user;
  }

  // 로그아웃 : O
  async userLogout(token: string): Promise<void> {
    // redis DB 이용

    const decodedToken = this.jwtService.verify(token);
    const userId = decodedToken.aud;

    const user = await this.userRepository.findOneById(userId);
    if (!user) throw new NotFoundException('NOT_FOUND_USER');

    const logoutCheck = await this.redisUserService.get(token);
    if (logoutCheck !== null) throw new BadRequestException('LOGIN_REQUIRED');

    const currentTime = Math.floor(new Date().getTime() / 1000.0); // UNIX TIME 기준(초)
    const exp = Number(await decodedToken.exp); //  token.exp  =  .env.JWT_ACCESS_TOKEN_EXPIRATION_TIME
    const remainedTime = exp - currentTime;

    return await this.redisUserService.set(token, '', remainedTime); // exp에 도달하면 자동 삭제
  }

  // 회원탈퇴 : O
  async deleteUser(id: number): Promise<void> {
    const user = this.userRepository.findOneById(id);

    if (!user) throw new NotFoundException(`USER_NOT_FOUND`);

    return await this.userRepository.deleteUserById(id);
  }

  // 회원 정보 수정 : O
  async updateUserInfo(updateUserInfoDto: UpdateUserInfoDto): Promise<void> {
    const {
      email,
      gender,
      locationInformationAgree,
      nickname,
      profileImage,
      socialAccountUid,
      temperatureSensitivity,
      city,
    } = updateUserInfoDto;

    if (!email || !nickname || !socialAccountUid)
      throw new BadRequestException('KEY_ERROR: NOT_INPUT_REQUIRED_VALUE');

    // 성별, 0: 공용, 1: 남성, 2: 여성
    if (gender && !(gender >= 0 && gender <= 2))
      throw new BadRequestException('KEY_ERROR: GENDER');

    // 위치정보 동의 여부, 0:동의안함, 1:사용중에만 동의, 2: 항상 동의
    if (
      locationInformationAgree &&
      !(locationInformationAgree >= 0 && locationInformationAgree <= 2)
    )
      throw new BadRequestException('KEY_ERROR: LOCATION_IN_FORMATIONAGREE');

    // 기온 민감도, 0: 기본, 1: 추위타요, 2: 더위타요
    if (
      temperatureSensitivity &&
      !(temperatureSensitivity >= 0 && temperatureSensitivity <= 2)
    )
      throw new BadRequestException('KEY_ERROR: TEMPERATURE_SENSITIVITY');

    let checkCityExist;

    if (city === 0) {
      throw new BadRequestException('KEY_ERROR: CITY(0)');
    } else if (city) {
      checkCityExist = await this.cityRepository.findCityByCityId(city);

      if (!checkCityExist)
        throw new BadRequestException('KEY_ERROR: NOT_EXIST_CITY');
    }

    const user = await this.userRepository.findUserByUid(socialAccountUid);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    if (email) user.email = email;
    if ((gender && gender !== undefined) || gender === 0) user.gender = gender;
    if (
      (locationInformationAgree && locationInformationAgree !== undefined) ||
      locationInformationAgree === 0
    )
      user.locationInformationAgree = locationInformationAgree;
    if (nickname) user.nickname = nickname;
    if (profileImage) user.profileImage = profileImage;
    if (socialAccountUid) user.socialAccountUid = socialAccountUid;
    if (
      (temperatureSensitivity && temperatureSensitivity !== undefined) ||
      temperatureSensitivity === 0
    )
      user.temperatureSensitivity = temperatureSensitivity;
    if (city) user.city = city;

    await this.userRepository.updateUserInfo(user);
  }

  // 유저 팔로우(생성) : O
  async createUserFollow(userFollowDto: UserFollowDto): Promise<void> {
    const { userId, followUserId } = userFollowDto;
    if (!userId || !followUserId) throw new NotFoundException('KEY_ERROR');

    if (userId === followUserId)
      throw new BadRequestException('SAME_ID_REQUESTED');

    const user = await this.userRepository.findOneById(userId);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    const followUser = await this.userRepository.findOneById(followUserId);
    if (!followUser) throw new NotFoundException('FOLLOW_USER_NOT_FOUND');

    const checkFollowOverlap =
      await this.userFollowRepository.checkFollowOverlap(userFollowDto);
    if (checkFollowOverlap !== 0)
      throw new BadRequestException('ALREADY_FOLLOWING');

    const userFollow = new UserFollowEntity();
    userFollow.user = userId;
    userFollow.followUser = followUserId;

    return await this.userFollowRepository.createUserFollow(userFollow);
  }

  // 유저 팔로우(삭제) : O
  async deleteUserFollow(userFollowDto: UserFollowDto): Promise<void> {
    const { userId, followUserId } = userFollowDto;
    if (!userId || !followUserId) throw new NotFoundException('KEY_ERROR');

    if (userId === followUserId)
      throw new BadRequestException('SAME_ID_REQUESTED');

    const user = await this.userRepository.findOneById(userId);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');
    const followUser = await this.userRepository.findOneById(followUserId);
    if (!followUser) throw new NotFoundException('FOLLOW_USER_NOT_FOUND');

    const checkFollowOverlap =
      await this.userFollowRepository.checkFollowOverlap(userFollowDto);
    if (checkFollowOverlap !== 1)
      throw new BadRequestException('NOT_FOLLOWING');

    const followRelation =
      await this.userFollowRepository.findFollowRelationByUserIdAndFollowUserId(
        userFollowDto,
      );

    return await this.userFollowRepository.deleteUserFollow(followRelation);
  }

  // 유저 팔로잉 목록 : O / 내가 팔로우 한 = 내 id가 userId에 있고, followUserId를 찾아 출력
  async getUserFollowingList(
    userId: number,
  ): Promise<UserFollowEntity[] | null> {
    if (!userId) throw new NotFoundException('KEY_ERROR');

    const user = this.userRepository.findOneById(userId);
    if (!user) throw new NotFoundException('USER_NOT_FOUND');

    const followingList =
      await this.userFollowRepository.findFollowingList(userId);

    return followingList;
  }

  //  유저 팔로워 목록 : O / 나를 팔로우 한 = 내 id가 followUserId에 있고, userId를 찾아 출력
  async getUserFollowerList(
    followUserId: number,
  ): Promise<UserFollowEntity[] | null> {
    if (!followUserId) throw new NotFoundException('KEY_ERROR');

    const followUser = this.userRepository.findOneById(followUserId);
    if (!followUser) throw new NotFoundException('FOLLOW_USER_NOT_FOUND');

    const followerList = // 나를 팔로우 한(= userId)
      await this.userFollowRepository.findFollowerList(followUserId);

    const followingListByCurrentUser = // = 내가 팔로우 한(=followUserId)
      await this.userFollowRepository.findFollowingList(followUserId);

    // isFollowingBack : 맞팔로우 여부(내가 팔로우 한 유저가 나를 팔로우 했는지)
    //  - 로그인 한 유저(=나) 기준, 나를 팔로우 한 유저의 목록과 내가 팔로우 한 유저의 목록을 대조 / 서로의 목록에 ID가 있으면 true, 없으면 false
    //  - followUser, user가 number 혹은 UserEntity 중 어떤 타입인지 확실히 하지 않았다. >> followUser, user를 타입으로 확인하고 일치하도록 구성
    followerList.forEach((follower) => {
      const followUserId =
        typeof follower.user === 'number' ? follower.user : follower.user.id;

      follower.isFollowingBack = followingListByCurrentUser.some(
        (following) => {
          const followingUserId =
            typeof following.followUser === 'number'
              ? following.followUser
              : following.followUser.id;

          return followUserId === followingUserId;
        },
      );
    });

    return followerList;
  }

  // 테스트용 로그인 -----------------------------------------------

  async login(socialAccountUid: string): Promise<LoginResponseDto | null> {
    if (!socialAccountUid)
      throw new BadRequestException('socialAccountUid_required');

    const user = await this.userRepository.findUserByUid(socialAccountUid);
    if (!user) throw new NotFoundException(`USER_NOT_EXIST`);

    const { ...userInfo } = user;

    const token = await this.jwtService.signAsync({
      aud: userInfo.id,
    });

    return {
      token: token,
      user: {
        id: userInfo.id,
        nickname: userInfo.nickname,
        profileImage: userInfo.profileImage,
      },
    };
  }

  // ------------------------------------------------------------

  // async kakaoLogin(param: { domain: any }): Promise<any> {
  //   // code: any;
  //   const { domain } = param; // code,
  //   const kakaoKey = '6575f9a06d842d6868bb139e4b40c876'; // 카카오 키(REST API 키)
  //   const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token'; // 카카오 토큰 url  // https://developers.kakao.com/docs/latest/ko/rest-api/reference#rest-api-list
  //   const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me'; // 카카오 유저 정보 조회 url  // 확인 주소 상동

  //   const body = {
  //     grant_type: 'authorization_code', // API 호출
  //     client_id: kakaoKey,
  //     // redirect_uri: `${domain}/users/signup`, // 주소 : callback 받을 Redirect_uri(카카오 디벨로퍼 - 제품 설정 - 카카오 로그인 - Redirect URI), 포트번호 이후 주소
  //     redirect_uri: `http://localhost:3000/users/signup`, // 주소 : callback 받을 Redirect_uri(카카오 디벨로퍼 - 제품 설정 - 카카오 로그인 - Redirect URI), 포트번호 이후 주소
  //     // code,
  //   };
  //   const headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //   };

  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: kakaoTokenUrl,
  //       timeout: 30000,
  //       headers,
  //       data: qs.stringify(body),
  //     });

  //     if (response.status === 200) {
  //       // 정상 작동할 때 response의 data 확인
  //       console.log(`token: ${JSON.stringify(response.data)}`);
  //       const headerUserInfo = {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //         Authorization: 'Bearer ' + response.data.access_token,
  //       };
  //       const responseUserInfo = await axios({
  //         method: 'GET',
  //         url: kakaoUserInfoUrl,
  //         timeout: 30000,
  //         headers: headerUserInfo,
  //       });
  //       if (responseUserInfo.status === 200) {
  //         console.log(`userInfo: ${JSON.stringify(responseUserInfo.data)}`);

  //         return responseUserInfo.data;
  //       } else {
  //         throw new UnauthorizedException();
  //       }
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
