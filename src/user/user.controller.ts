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
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import {
  GetCheckNicknameOverlapDto,
  LoginDto,
  UserFollowDto,
} from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from 'src/utils/verifyToken';

// 회원가입 상세, 로그아웃, 회원탈퇴, 회원 정보 수정, 닉네임 중복 체크(O), 유저 팔로우(목록, 생성(o), 삭제), 유저 차단(목록, 생성, 삭제)

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly JwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  // 닉네임 중복 체크
  @Get('/check/:nickname')
  async getCheckNicknameOverlap(
    @Param('nickname') nickname: string,
  ): Promise<string> {
    return await this.userService.getCheckNicknameOverlap(nickname);
  }

  // 유저 팔로우(생성) : O
  @Post('/follow/:followUserId')
  async createUserFollow(
    @Headers('authorization') token: string,
    @Param('followUserId') followUserId: number,
  ): Promise<void> {
    const decodedToken = this.tokenService.verifyToken(token);
    const userFollowDto: UserFollowDto = {
      userId: Number(decodedToken.aud),
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
    const decodedToken = this.tokenService.verifyToken(token);
    const userFollowDto: UserFollowDto = {
      userId: Number(decodedToken.aud),
      followUserId: Number(followUserId),
    };

    return await this.userService.deleteUserFollow(userFollowDto);
  }

  // 유저 팔로우(목록)_ing
  @Get('/follow')
  async userFollowList(
    @Headers('authorization') token: string,
    @Body() body,
  ): Promise<void> {}

  // 테스트용 로그인 -----------------------------------------------

  @Post('/login')
  @HttpCode(200)
  async login(@Req() req: Request): Promise<LoginDto> {
    const { socialAccountUid } = req.body;
    return await this.userService.login(socialAccountUid);
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
