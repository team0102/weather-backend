import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
  UnauthorizedException,
  BadRequestException,
  // Request,
  // Response,
  UseGuards,
  HttpCode,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service'; // , UserService
import { ApiCookieAuth } from '@nestjs/swagger';
import { format } from 'url';
import { LoginResponseDto } from './dto/auth.dto';
// import { getCheckNicknameOverlapDto, userFollowDto } from './dto/user.dto';

// 회원가입(SNS), 로그인(SNS), 회원가입 상세, 로그아웃, 회원탈퇴, 회원 정보 수정, 닉네임 중복 체크, 유저 팔로우(목록, 생성, 삭제), 유저 차단(목록, 생성, 삭제)

// test_2 : method. A------------------------------------------------------------------------------------------------

@ApiCookieAuth() //  Swagger (OpenAPI) 문서를 자동으로 생성, Swagger 문서에서 특정 API 엔드포인트가 쿠키 기반의 인증을 사용한다는 정보를 표시
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly JwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // @Get('/kakao') // 카카오 서버를 거쳐서 도착하게 될 엔드포인트
  @Get('/kakao/callback') // 카카오 서버를 거쳐서 도착하게 될 엔드포인트
  @UseGuards(AuthGuard('kakao')) // kakao.strategy를 실행시켜 준다.
  @HttpCode(301)
  async kakaoLogin(
    @Req() req: Request,
    // @Res() res: Response,
    @Query('code') code: string,
  ): Promise<LoginResponseDto> {
    console.log(`callback  ///  code------------ ${code}`);

    const { token } = await this.authService.getJWT(
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

    const user = await this.authService.getUserInfoBysocialAccountUid(
      req.user.kakaoId,
    );

    return {
      token: token,
      user: user,
    };
  }

  // ---

  // @Get('/kakao/callback')
  // @UseGuards(AuthGuard('kakao'))
  // async kakaoLoginCallback(
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   @Query('code') code: string,
  // ) {
  //   console.log(`callback  ??????  code------------ ${code}`);

  //   const { accessToken } = await this.authService.getJWT(
  //     req.user.kakaoId,
  //     req.user.kakaoEmail,
  //     req.user.kakaoNickname,
  //     req.user.kakaoProfileImage,
  //   );

  //   res.cookie('accessToken', accessToken, { httpOnly: true }); // 쿠키 여부 확인 필요
  //   res.cookie('isLoggedIn', true, { httpOnly: false });

  //   console.log(`accessToken//////// ${accessToken}`);

  //   // return {
  //   //   // accessToken,
  //   //   message: `login complete`,
  //   // };

  //   return res.redirect(
  //     format({
  //       pathname: 'http://localhost:3000/auth/kakao/login',
  //       query: {
  //         success: true,
  //         message: 'complete',
  //         accessToken,
  //         // refreshToken: refreshToken,
  //       },
  //     }),
  //   );
  // }

  // @Get('/kakao/callback')
  // @UseGuards(AuthGuard('kakao'))
  // async kakaoLoginCallback(
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   // @Param() redirectCode: string,
  // ) {
  //   const { accessToken } = await this.authService.getJWT(
  //     req.user.kakaoId,
  //     req.user.kakaoEmail,
  //     req.user.kakaoNickname,
  //     req.user.kakaoProfileImage,
  //   );

  //   // const { code } = redirectCode;

  //   res.cookie('accessToken', accessToken, { httpOnly: true }); // 쿠키 여부 확인 필요
  //   res.cookie('isLoggedIn', true, { httpOnly: false });
  //   // return res.redirect(this.cofigService.get('CLIENT_URL')); // 원본
  //   // return res.redirect(process.env.CLIENT_URL);
  //   console.log(`accessToken::::::::;:: ${accessToken}`);
  //   // return res.redirect('/auth/logintest');
  //   return { accessToken, message: `login complete` };
  // }

  // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

  // // -----------------

  //   // ★★★★★★★★★★★★★★★★★   accessToken만 test   ★★★★★★★★★★★★★★★★★

  //   // 사용자를 카카오 로그인 페이지로 리다이렉트하고,
  //   // 사용자가 카카오 계정으로 로그인한 후에
  //   // 카카오 서버가 인가 코드를 생성하고 해당 코드를 콜백 URL로 전송하는 과정
  //   @Get('/kakao') // 카카오 서버를 거쳐서 도착하게 될 엔드포인트
  //   @UseGuards(AuthGuard('kakao')) // kakao.strategy를 실행시켜 준다.
  //   @HttpCode(301)
  //   // async kakaoLogin(@Req() req: Request, @Res() res: Response) {
  //   async kakaoLogin(@Res() res: Response) {
  //     console.log(`aaaaaaaaaaaaa`);
  //     // const { accessToken } = await this.authService.getJWT(
  //     //   req.user.kakaoId,
  //     //   req.user.kakaoEmail,
  //     //   req.user.kakaoNickname,
  //     //   req.user.kakaoProfileImage,
  //     // );
  //     // res.cookie('accessToken', accessToken, { httpOnly: true }); // 쿠키 여부 확인 필요
  //     // res.cookie('isLoggedIn', true, { httpOnly: false });
  //     // return res.redirect(this.configService.get('CLIENT_URL')); // 원본
  //     // return res.redirect(process.env.CLIENT_URL);

  //     // console.log(`accessToken//////// ${accessToken}`);

  //     return res.redirect(process.env.KAKAO_RIDIRECT_URI);
  //   }

  //   @Get('/kakao/callback')
  //   @UseGuards(AuthGuard('kakao'))
  //   async kakaoLoginCallback(
  //     @Req() req: Request,
  //     @Res() res: Response,
  //     @Query('code') code: string,
  //   ) {
  //     console.log(`callback  ///  code------------ ${code}`);

  //     const { accessToken } = await this.authService.getJWT(
  //       req.user.kakaoId,
  //       req.user.kakaoEmail,
  //       req.user.kakaoNickname,
  //       req.user.kakaoProfileImage,
  //     );

  //     res.cookie('accessToken', accessToken, { httpOnly: true }); // 쿠키 여부 확인 필요
  //     res.cookie('isLoggedIn', true, { httpOnly: false });

  //     console.log(`accessToken//////// ${accessToken}`);

  //     // return {
  //     //   // accessToken,
  //     //   message: `login complete`,
  //     // };

  //     return res.redirect(
  //       format({
  //         pathname: 'http://localhost:3000/auth/kakao/login',
  //         query: {
  //           success: true,
  //           message: 'complete',
  //           accessToken,
  //           // refreshToken: refreshToken,
  //         },
  //       }),
  //     );
  //   }

  //   @Get('/kakao/login')
  //   kakaocomplete() {
  //     return `login complete`;
  //   }

  //   // @Get('/kakao/callback')
  //   // @UseGuards(AuthGuard('kakao'))
  //   // async kakaoLoginCallback(
  //   //   @Req() req: Request,
  //   //   @Res() res: Response,
  //   //   // @Param() redirectCode: string,
  //   // ) {
  //   //   const { accessToken } = await this.authService.getJWT(
  //   //     req.user.kakaoId,
  //   //     req.user.kakaoEmail,
  //   //     req.user.kakaoNickname,
  //   //     req.user.kakaoProfileImage,
  //   //   );

  //   //   // const { code } = redirectCode;

  //   //   res.cookie('accessToken', accessToken, { httpOnly: true }); // 쿠키 여부 확인 필요
  //   //   res.cookie('isLoggedIn', true, { httpOnly: false });
  //   //   // return res.redirect(this.cofigService.get('CLIENT_URL')); // 원본
  //   //   // return res.redirect(process.env.CLIENT_URL);
  //   //   console.log(`accessToken::::::::;:: ${accessToken}`);
  //   //   // return res.redirect('/auth/logintest');
  //   //   return { accessToken, message: `login complete` };
  //   // }

  //   // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

  // @Get('/kakao/callback')
  // @UseGuards(AuthGuard('kakao'))
  // async kakaoLoginCallback(@Req() req: Request, @Res() res: Response) {
  //   const { accessToken } = await this.authService.getJWT(
  //     // , refreshToken
  //     req.user.kakaoId,
  //     req.user.kakaoEmail,
  //   );
  //   res.cookie('accessToken', accessToken, { httpOnly: true }); // 쿠키 여부 확인 필요
  //   // res.cookie('refreshToken', refreshToken, { httpOnly: true });
  //   res.cookie('isLoggedIn', true, { httpOnly: false });
  //   // return res.redirect(this.cofigService.get('CLIENT_URL')); // 원본
  //   // return res.redirect(process.env.CLIENT_URL);
  //   return await accessToken;
  // }

  // @Get('/refresh')
  // @HttpCode(200)
  // async refresh(@Req() req: Request, @Res() res: Response) {
  //   try {
  //     const newAccessToken = await this.authService.refresh(
  //       req.cookies.refreshToken,
  //     );
  //     res.cookie('accessToken', newAccessToken, {
  //       httpOnly: true,
  //     });
  //     return res.send();
  //   } catch (err) {
  //     res.clearCookie('accessToken');
  //     res.clearCookie('refreshToken');
  //     res.clearCookie('isLoggedIn');
  //     throw new UnauthorizedException();
  //   }
  // }
}

// method. B------------------------------------------------------------------------------------------------

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Get('kakao')
//   @UseGuards(AuthGuard('kakao'))
//   // async kakaoLogin() {}
//   async kakaoLogin(@Res() res) {
//     return res.redirect('/');
//   }

//   @Get('kakao/callback')
//   @UseGuards(AuthGuard('kakao'))
//   async kakaoLoginCallback(@Req() req, @Res() res) {
//     // 카카오 로그인 콜백을 처리합니다.
//     const user = req.user; // Passport에 의해 전략에서 반환된 사용자 정보

//     if (!user) {
//       // 로그인 실패
//       return res.redirect('/login-failed');
//     }

//     // 로그인 성공 시 JWT 토큰 생성
//     const token = await this.authService.login(user);

//     // 토큰을 쿠키에 담아서 클라이언트에게 반환
//     res.cookie('access_token', token.access_token, { httpOnly: true });

//     // 로그인 성공 시 리다이렉션할 URL
//     const redirectUrl = '/dashboard';

//     // 클라이언트에게 로그인 성공 후 리다이렉션
//     return res.redirect(redirectUrl);
//   }
// }

// 네이버 소셜로그인★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
// 설명 영상  :  https://www.youtube.com/watch?v=y1ShPwA9N40
// 설명 깃허브  :  https://github.com/2425sja/socialLogin/blob/main/3_Nlogin_Final.js
// 네이버 예시 - 설명  :  https://developers.naver.com/docs/login/api/api.md
// 네이버 디벨로퍼 예시  :  https://developers.naver.com/docs/login/api/api.md

// var express = require('express');
// var app = express();
// var client_id = 'YOUR_CLIENT_ID';
// var client_secret = 'YOUR_CLIENT_SECRET';
// var state = 'RAMDOM_STATE';
// var redirectURI = encodeURI('YOUR_CALLBACK_URL');
// var api_url = '';
// app.get('/naverlogin', function (req, res) {
//   api_url =
//     'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' +
//     client_id +
//     '&redirect_uri=' +
//     redirectURI +
//     '&state=' +
//     state;
//   res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
//   res.end(
//     "<a href='" +
//       api_url +
//       "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>",
//   );
// });
// app.get('/callback', function (req, res) {
//   code = req.query.code;
//   state = req.query.state;
//   api_url =
//     'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
//     client_id +
//     '&client_secret=' +
//     client_secret +
//     '&redirect_uri=' +
//     redirectURI +
//     '&code=' +
//     code +
//     '&state=' +
//     state;
//   var request = require('request');
//   var options = {
//     url: api_url,
//     headers: {
//       'X-Naver-Client-Id': client_id,
//       'X-Naver-Client-Secret': client_secret,
//     },
//   };
//   request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
//       res.end(body);
//     } else {
//       res.status(response.statusCode).end();
//       console.log('error = ' + response.statusCode);
//     }
//   });
// });
// app.listen(3000, function () {
//   console.log('http://127.0.0.1:3000/naverlogin app listening on port 3000!');
// });

// ----- 위 코드까지 작성하면 accessToken을 받을 수 있는 것  /  accessToken을 이용해 사용자 정보를 받기 위한 작업 필요
// 영상 참고  :  https://youtu.be/y1ShPwA9N40?feature=shared
// ★★★설명★★★  :  https://koreankoder.tistory.com/14?category=1375257

//  1. request를 node-fetch로 수정  :  accessToken, refreshToken을 받음

//    - 수정 전

//   var options = {
//     url: api_url,
//     headers: {
//       'X-Naver-Client-Id': client_id,
//       'X-Naver-Client-Secret': client_secret,
//     },
//   };
//   request.get(options, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
//       res.end(body);
//     } else {
//       res.status(response.statusCode).end();
//       console.log('error = ' + response.statusCode);
//     }
//   });

//    - 수정 후

// import fetch from 'node-fetch';

// const response = await fetch(api_url, {
//   headers: {
//   "X-Naver-Client-Id": client_id,
//   "X-Naver-Client-secret": client_secret
//   }
//   })

//   const tokenRequest = await response.json()

//   return res.send(tokenRequest)

//  2. request를 node-fetch로 수정  :  사용자 정보 받기
//    - 네이버 문서  :  https://developers.naver.com/docs/login/devguide/devguide.md#3-4-5-%EC%A0%91%EA%B7%BC-%ED%86%A0%ED%81%B0%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%ED%94%84%EB%A1%9C%ED%95%84-api-%ED%98%B8%EC%B6%9C%ED%95%98%EA%B8%B0

//    - 내용 추가

// if ('access_token' in tikenRequest) {
//   const { access_token } = tomenRequest;
//   const apiUrl = 'http://openapi.naver.com/v1/nid/me';

//   const data = await fetch(apiUrl, {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

//   const userData = await data.json();
//   console.log('userData:', userData);
// }

// return res.send('DB 저장 후 랜드페이지로 redirect');
