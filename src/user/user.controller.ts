import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  UnauthorizedException,
  BadRequestException,
  Response,
  UseGuards,
  HttpCode,
  Req,
  Res,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiCookieAuth } from '@nestjs/swagger';

import { UserService } from './user.service';
import {
  GetCheckNicknameOverlapDto,
  LoginResponseDto,
  UserFollowDto,
  UpdateUserInfoDto,
} from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from 'src/utils/verifyToken';
import { UserFollowEntity } from 'src/entities/userFollows.entity';
import { UserEntity } from 'src/entities/users.entity';
// import { AuthService } from 'src/auth/auth.service';

// 회원가입 : 회원가입 상세, 로그아웃, 회원탈퇴, 회원 정보 수정(O), 닉네임 중복 체크(O)
// 유저 팔로우 : 목록(O), 생성(O), 삭제(O)
// 유저 차단 : 목록, 생성, 삭제

@Controller('/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly JwtService: JwtService,
    private readonly tokenService: TokenService,
    // private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  // -----소셜로그인 : auth → user_ing
  @ApiCookieAuth() //  Swagger (OpenAPI) 문서를 자동으로 생성, Swagger 문서에서 특정 API 엔드포인트가 쿠키 기반의 인증을 사용한다는 정보를 표시
  @Get('/kakao/callback') // 카카오 서버를 거쳐서 도착하게 될 엔드포인트
  @UseGuards(AuthGuard('kakao')) // kakao.strategy를 실행시켜 준다.
  @HttpCode(301)
  async kakaoLogin(
    @Req() req: Request,
    // @Res() res: Response,
    @Query('code') code: string,
  ): Promise<LoginResponseDto> {
    console.log(`callback  ///  code------------ ${code}`);

    const { token } = await this.userService.getJWT(
      req.user.kakaoId,
      req.user.kakaoEmail,
      req.user.kakaoNickname,
      req.user.kakaoProfileImage,
    );

    // 쿠키 여부 확인 필요
    // res.cookie('accessToken', accessToken, { httpOnly: true });
    // res.cookie('refreshToken', refreshToken, { httpOnly: true });
    // res.cookie('isLoggedIn', true, { httpOnly: false });

    console.log(`token//////// ${token}`);

    const user = await this.userService.getUserInfoBysocialAccountUid(
      req.user.kakaoId,
    );

    return {
      token: token,
      user: user,
    };
  }

  // -----소셜로그인

  // 닉네임 중복 체크 : O

  @Get('/check/:nickname')
  async getCheckNicknameOverlap(
    @Param('nickname') nickname: string,
  ): Promise<string> {
    return await this.userService.getCheckNicknameOverlap(nickname);
  }

  // 마이페이지 입장시 유저 정보 get
  @Get() async getUserInfo(
    @Headers('authorization') token: string,
  ): Promise<UserEntity | null> {
    const userId = this.tokenService.audienceFromToken(token);

    return await this.userService.getUserInfo(userId);
  }

  // 회원탈퇴_ing
  @Delete()
  async deleteUser(@Headers('authorization') token: string): Promise<void> {
    const userId = this.tokenService.audienceFromToken(token);

    return await this.userService.deleteUser(userId);
  }

  // 회원 정보 수정 : O
  @Put()
  async updateUserInfo(
    @Headers('authorization') token: string,
    @Body() body: UpdateUserInfoDto,
  ): Promise<void> {
    const {
      nickname,
      email,
      gender,
      locationInformationAgree,
      socialAccountUid,
      profileImage,
      temperatureSensitivity,
      city,
    } = body;

    const userId = this.tokenService.audienceFromToken(token);

    const updateUserInfoDto: UpdateUserInfoDto = {
      id: Number(userId),
      nickname: nickname,
      email: email,
      gender: Number(gender),
      locationInformationAgree: Number(locationInformationAgree),
      socialAccountUid: socialAccountUid,
      profileImage: profileImage,
      temperatureSensitivity: Number(temperatureSensitivity),
      city: Number(city),
    };

    return await this.userService.updateUserInfo(updateUserInfoDto);
  }

  // 유저 팔로우(생성) : O
  @Post('/follow/:followUserId')
  async createUserFollow(
    @Headers('authorization') token: string,
    @Param('followUserId') followUserId: number,
  ): Promise<void> {
    const userId = this.tokenService.audienceFromToken(token);

    const userFollowDto: UserFollowDto = {
      userId: Number(userId),
      followUserId: Number(followUserId),
    };

    return await this.userService.createUserFollow(userFollowDto);
  }

  // 유저 팔로우(삭제) : O
  @Delete('/follow/:followUserId')
  async deleteUserFollow(
    @Headers('authorization') token: string,
    @Param('followUserId') followUserId: number,
  ): Promise<void> {
    const userID = this.tokenService.audienceFromToken(token);

    const userFollowDto: UserFollowDto = {
      userId: Number(userID),
      followUserId: Number(followUserId),
    };

    return await this.userService.deleteUserFollow(userFollowDto);
  }

  // 유저 팔로잉 목록 : O / 내가 팔로우 한 = 내 id가 userId에 있고, followUserId를 찾아 출력
  @Get('/following')
  async getUserFollowingList(
    @Headers('authorization') token: string,
  ): Promise<UserFollowEntity[] | null> {
    const userId = this.tokenService.audienceFromToken(token);

    return await this.userService.followingList(userId);
  }

  //  유저 팔로워 목록 : O / 나를 팔로우 한 = 내 id가 followUserId에 있고, userId를 찾아 출력
  @Get('/follower')
  async getUserFollowerList(
    @Headers('authorization') token: string,
  ): Promise<UserFollowEntity[] | null> {
    const followUserId = this.tokenService.audienceFromToken(token);

    return await this.userService.followerList(followUserId);
  }

  // 테스트용 로그인 -----------------------------------------------

  @Post('/login')
  @HttpCode(200)
  async login(@Req() req: Request): Promise<LoginResponseDto> {
    const { socialAccountUid } = req.body;

    return await this.userService.login(socialAccountUid);
  }

  @Post('/logintokencheck') // 카카오 로그인 토큰 내용 확인 테스트
  @HttpCode(200)
  async loginsss(@Body('token') token: string): Promise<LoginResponseDto> {
    const decodedToken = this.JwtService.verify(token);

    return decodedToken;
  }

  // -----------------------------------------------------------------
  // verifyToken(token: string): { aud: number } {
  //   const decodedToken = this.JwtService.verify(token);

  //   return decodedToken;
  // }

  // ------------------------------------------------------------

  // @Post('/signup')
  // async login(@Body() body: any, @Response() res): Promise<any> {
  //   try {
  //     const { domain } = body; // code,
  //     console.log(`domain:::::::::    ${domain}`);
  //     console.log(`body:::::::::    ${body}`);

  //     if (!domain) {
  //       // !code ||
  //       throw new BadRequestException('카카오 로그인 정보가 없습니다.');
  //     }
  //     const kakao = await this.userService.kakaoLogin({ domain }); // code,
  //     console.log(`kakaoUser: ${JSON.stringify(kakao)}`);
  //     res.send({
  //       user: kakao,
  //       message: 'success',
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     throw new UnauthorizedException();
  //   }
  // }
}
