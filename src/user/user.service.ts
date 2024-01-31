import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
// import axios from 'axios';
import * as qs from 'qs';

import {
  getCheckNicknameOverlapDto,
  loginDto,
  userFollowDto,
} from './dto/user.dto';
import { UserRepository } from './user.repository';
import { UserFollowRepository } from './userFollow.repository';
import { UserEntity } from 'src/entities/users.entity';
import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly userFollowRepository: UserFollowRepository,
  ) {}

  async getCheckNicknameOverlap(nickname: string): Promise<string> {
    const numberOfOverlapNickname =
      this.userRepository.getCheckNicknameOverlap(nickname);

    return (await numberOfOverlapNickname) === 0
      ? 'USER_NOT_EXIST'
      : 'USER_EXIST';
  }

  async createUserFollow(userFollowDto: userFollowDto): Promise<void> {
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
      throw new BadRequestException('ALREADY_FOLLOW_USER');

    const userFollow = new UserFollowEntity();
    userFollow.user = userId;
    userFollow.followUser = followUserId;

    return await this.userFollowRepository.createUserFollow(userFollow);
  }

  // 테스트용 로그인 -----------------------------------------------

  async login(socialAccountUid: string): Promise<loginDto | null> {
    if (!socialAccountUid)
      throw new BadRequestException('socialAccountUid_required');

    const user = await this.userRepository.findUserByUid(socialAccountUid);
    if (!user) throw new NotFoundException(`USER_NOT_EXIST`);

    const { ...userInfo } = user;

    const token = await this.JwtService.signAsync({
      aud: userInfo.id,
    });

    this.userRepository.findUserByUid(socialAccountUid);

    return { token: token, user: userInfo };
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
