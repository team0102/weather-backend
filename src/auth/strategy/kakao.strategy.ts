// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy } from 'passport-kakao';
// import { AuthService } from '../auth.service';
// import * as _ from 'lodash';
// import { VerifyCallback } from 'passport-jwt';

// // method. A--------------------------------------------------------------------------------------------------------------

// @Injectable()
// export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
//   constructor(private readonly configService: ConfigService) {
//     super({
//       // 아래 내용으로 카카오 서버에 POST 요청(/oauth/token)을 보낸다.
//       clientID: configService.get('KAKAO_CLIENTID'), // REST API 키
//       clientSecret: '', // 카카오 로그인 - 보안 - Client Secret 키  /  사용시 내용 추가 필요 : configService.get('KAKAO_CLIENTSECRET')
//       callbackURL: configService.get('KAKAO_RIDIRECT_URI'), // 카카오 로그인 - Redirect URI
//     });
//   }

//   async validate(
//     // 위 POST 요청(/oauth/token)에 대한 응답이 담긴다.
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile, // 사용자 정보
//     done: (error: any, user?: any, info?: any) => void,
//   ) {
//     try {
//       const { _json } = profile; // 카카오 로그인 - 동의 항목  에서 동의한 정보가 profile로 들어온다.

//       console.log(_json);
//       console.log(`accessToken::::::::: ${accessToken}`);
//       console.log(`refreshToken:::::::::::: ${refreshToken}`);

//       const user = {
//         // PropertyKeys 목록  :  https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#propertykeys
//         kakaoId: _json.id,
//         kakaoEmail: _json.kakao_account.email,
//         kakaoNickname: _json.kakao_account.profile.nickname,
//         kakaoProfileImage: _json.kakao_account.profile.profile_image_url,
//         // kakaoGender: _json.kakao_account.~~~~~~~~~~~,
//       };

//       console.log(`kakaoId:::::::   ${user.kakaoId}`);
//       console.log(`kakaoEmail:::::::   ${user.kakaoEmail}`);
//       console.log(`kakaoNickname:::::::   ${user.kakaoNickname}`);
//       console.log(`kakaoProfileImage:::::::   ${user.kakaoProfileImage}`);
//       // console.log(`kakaoProfileImage:::::::   ${user.kakaoGender}`);

//       done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   }
// }

// // A. another------------------

// // @Injectable()
// // export class KakaoStrategy extends PassportStrategy(Strategy) {
// //   constructor(private readonly configService: ConfigService) {
// //     super({
// //       clientID: configService.get<string>('KAKAO_REST_API_KEY'),
// //       clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET'),
// //       callbackURL: configService.get<string>('KAKAO_REDIRECT_URI'),
// //     });
// //   }

// //   async validate(accessToken, refreshToken, profile, done) {
// //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
// //     const { _raw, _json, ...profileRest } = profile;
// //     const properties = _.mapKeys(_json.properties, (v, k) => {
// //       return _.camelCase(k);
// //     });

// //     const payload = {
// //       profile: profileRest,
// //       properties,
// //       token: {
// //         accessToken,
// //         refreshToken,
// //       },
// //     };
// //     done(null, payload);
// //   }
// // }

// // method. B--------------------------------------------------------------------------------------------------------------

// // @Injectable()
// // export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
// //   constructor(private readonly authService: AuthService) {
// //     super({
// //       // 여기 적어준 정보를 가지고 카카오 서버에 POST /oauth/token 요청이 날아갑니다.
// //       clientID: process.env.KAKAO_CLIENTID, // REST API 키
// //       clientSecret: process.env.KAKAO_CLIENTSECRET, // 카카오 로그인 - 보안 - Client Secret 키  /  사용시 활성화 필요
// //       callbackURL: process.env.KAKAO_RIDIRECT_URI, // 카카오 로그인 - Redirect URI
// //     });
// //   }

// //   async validate(
// //     // POST /oauth/token 요청에 대한 응답이 담깁니다.
// //     accessToken: string,
// //     refreshToken: string,
// //     // profile: Profile,
// //     profile: any,
// //     // done: VerifyCallback,
// //     done: (error: any, user?: any, info?: any) => void,
// //   ): Promise<any> {
// //     const user = await this.authService.validateKakaoLogin(profile);
// //     if (!user) {
// //       return done(new UnauthorizedException(), false);
// //     }
// //     return done(null, user);
// //   }
// // }
