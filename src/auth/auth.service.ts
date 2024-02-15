// import {
//   HttpException,
//   HttpStatus,
//   Injectable,
//   NotFoundException,
//   UnauthorizedException,
// } from '@nestjs/common';
// import axios from 'axios';
// import * as qs from 'qs';
// import { ConfigService } from '@nestjs/config';

// import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
// import { UserRepository } from 'src/user/user.repository';
// import { UserEntity } from 'src/entities/users.entity';
// import { kakaoSignUpDto } from './dto/auth.dto';
// import { LoginResponseDto, UserInfoDto } from 'src/user/dto/user.dto';

// // method. A---------------------------------------------------------------------------------------------------

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly userRepository: UserRepository,
//     private readonly configService: ConfigService,
//     private readonly jwtService: JwtService,
//   ) {}

//   // ★★★★★★★★★★★★★★★★★   accessToken만 test   ★★★★★★★★★★★★★★★★★

//   async getJWT(
//     kakaoId: string,
//     kakaoEmail: string,
//     kakaoNickname: string,
//     kakaoProfileImage: string,
//   ) {
//     const user = await this.kakaoValidateUser(
//       kakaoId,
//       kakaoEmail,
//       kakaoNickname,
//       kakaoProfileImage,
//     ); // 카카오 정보 검증 및 회원가입 로직

//     const token = this.generateAccessToken(user); // accessToken 생성

//     return { token };
//   }

//   // 사용자 확인, 미존재시 회원가입
//   async kakaoValidateUser(
//     kakaoId: string,
//     kakaoEmail: string,
//     kakaoNickname: string,
//     kakaoProfileImage: string,
//   ): Promise<UserEntity> {
//     let user: UserEntity = await this.userRepository.findUserByKakaoId(kakaoId); // 유저 조회

//     console.log(user);

//     if (!user) {
//       // 회원 가입 로직
//       user = await this.userRepository.create({
//         SocialAccountProvider: 1, // 1: KAKAO, 2: NAVER, 3: GOOGLE
//         socialAccountUid: kakaoId,
//         email: kakaoEmail,
//         nickname: kakaoNickname,
//         profileImage: kakaoProfileImage,
//       });
//     }
//     return user;
//   }

//   generateAccessToken(user: UserEntity): string {
//     const payload = {
//       userId: user.socialAccountUid,
//       userEmail: user.email,
//     };
//     return this.jwtService.sign(payload);
//   }

//   async getUserInfoBysocialAccountUid(
//     socialAccountUid: string,
//   ): Promise<UserInfoDto> {
//     const user = await this.userRepository.findUserByUid(socialAccountUid);
//     if (!user) throw new NotFoundException('USER_NOT_FOUND');

//     const { id, nickname, profileImage } =
//       await this.userRepository.findUserByUid(socialAccountUid);

//     // return {
//     //   id: user.id,
//     //   nickname: user.nickname,
//     //   profileImage: user.profileImage,
//     // };

//     return {
//       id,
//       nickname,
//       profileImage,
//     };
//   }

//   // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

//   // async getJWT(kakaoId: string, kakaoEmail: string) {
//   //   // kakaoId: string ???
//   //   const user = await this.kakaoValidateUser(kakaoId, kakaoEmail); // 카카오 정보 검증 및 회원가입 로직
//   //   const accessToken = this.generateAccessToken(user); // accessToken 생성
//   //   // const refreshToken = await this.generateRefreshToken(user); // refreshToken 생성
//   //   return { accessToken }; //  , refreshToken
//   // }

//   // // async kakaoValidateUser(kakaoId: string): Promise<UserEntity[] | null> {
//   // //   // kakaoId: string ???
//   // //   let userExistCheck: UserEntity[] | null =
//   // //     await this.userRepository.findUserByKakaoId(kakaoId); // 유저 조회

//   // //   // 회원 가입 로직
//   // //   const user = new UserEntity();

//   // //   if (!userExistCheck) {
//   // //     user.socialAccountUid = kakaoId;
//   // //     user.SocialAccountProvider = 1; // 1: KAKAO, 2: NAVER, 3: GOOGLE
//   // //   }
//   // //   // }
//   // //   // user = ({
//   // //   // kakaoId,
//   // //   // provider: 'kakao',
//   // //   // socialAccountUid: kakaoId,
//   // //   // SocialAccountProvider: 1, // 1: KAKAO, 2: NAVER, 3: GOOGLE
//   // //   //   socialAccountUid,
//   // //   //   SocialAccountProvider, // 1: KAKAO, 2: NAVER, 3: GOOGLE
//   // //   // });
//   // //   // }
//   // //   // return user;
//   // //   return await this.userRepository.create(user);
//   // // }

//   // // 사용자 확인, 미존재시 회원가입
//   // async kakaoValidateUser(
//   //   kakaoId: string,
//   //   kakaoEmail: string,
//   // ): Promise<UserEntity> {
//   //   let user: UserEntity = await this.userRepository.findUserByKakaoId(kakaoId); // 유저 조회

//   //   if (!user) {
//   //     // 회원 가입 로직
//   //     user = await this.userRepository.create({
//   //       socialAccountUid: kakaoId,
//   //       SocialAccountProvider: 1, // 1: KAKAO, 2: NAVER, 3: GOOGLE
//   //       email: kakaoEmail,
//   //     });
//   //   }
//   //   return user;
//   // }

//   // async kakaoValidateUser(kakaoId: string): Promise<UserEntity[] | null> {
//   //   let userExistCheck: UserEntity[] | null =
//   //     await this.userRepository.findUserByKakaoId(kakaoId); // 유저 조회

//   //   // 회원 가입 로직
//   //   const user = new UserEntity();

//   //   if (!userExistCheck) {
//   //     user.socialAccountUid = kakaoId;
//   //     user.SocialAccountProvider = 1; // 1: KAKAO, 2: NAVER, 3: GOOGLE
//   //   }
//   //   // }
//   //   // user = ({
//   //   // kakaoId,
//   //   // provider: 'kakao',
//   //   // socialAccountUid: kakaoId,
//   //   // SocialAccountProvider: 1, // 1: KAKAO, 2: NAVER, 3: GOOGLE
//   //   //   socialAccountUid,
//   //   //   SocialAccountProvider, // 1: KAKAO, 2: NAVER, 3: GOOGLE
//   //   // });
//   //   // }
//   //   // return user;
//   //   return await this.userRepository.create(user);
//   // }

//   // ★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★

//   // async generateRefreshToken(user: UserEntity): Promise<string> {
//   //   // user: UserDocument
//   //   const payload = {
//   //     userId: user.socialAccountUid, // userId: user._id,
//   //   };

//   //   const refreshToken = this.jwtService.sign(payload, {
//   //     secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
//   //     expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
//   //   });

//   //   const saltOrRounds = 10;
//   //   const currentRefreshToken = await bcrypt.hash(refreshToken, saltOrRounds);

//   //   await this.userRepository.setCurrentRefreshToken(
//   //     payload.userId,
//   //     currentRefreshToken,
//   //   );

//   //   return refreshToken;
//   // }

//   // async refresh(refreshToken: string): Promise<string> {
//   //   try {
//   //     // 1차 검증
//   //     const decodedRefreshToken = this.jwtService.verify(refreshToken, {
//   //       secret: this.configService.get('JWT_REFRESH_SECRET'),
//   //     });
//   //     const userId = decodedRefreshToken.userId;

//   //     // 데이터베이스에서 User 객체 가져오기
//   //     const user =
//   //       await this.userRepository.getUserWithCurrentRefreshToken(userId);

//   //     // 2차 검증
//   //     const isRefreshTokenMatching = await bcrypt.compare(
//   //       refreshToken,
//   //       user.currentRefreshToken,
//   //     );

//   //     if (!isRefreshTokenMatching) {
//   //       throw new UnauthorizedException('Invalid refresh-token');
//   //     }

//   //     // 새로운 accessToken 생성
//   //     const accessToken = this.generateAccessToken(user);

//   //     return accessToken;
//   //   } catch (err) {
//   //     throw new UnauthorizedException('Invalid refresh-token');
//   //   }
//   // }
// }

// // method. B---------------------------------------------------------------------------------------------------

// // @Injectable()
// // export class AuthService {
// //   constructor(
// //     private readonly userRepository: UserRepository,
// //     private readonly configService: ConfigService,
// //     private readonly jwtService: JwtService,
// //   ) {} // 의존성 주입

// //   async validateKakaoLogin(profile: any): Promise<any> {
// //     const { id, username, displayName, emails } = profile._json;

// //     const user = await this.userRepository.findUserByKakaoId(id);
// //     if (!user) {
// //       const newUser = await this.userRepository.createKakaoUser({
// //         kakaoId: id,
// //         username,
// //         displayName,
// //         email: emails ? emails[0].value : null,
// //       });
// //       return newUser;
// //     }
// //     // update update update update update update update update update update update update update update update
// //     return user;
// //   }

// //   async login(user: any): Promise<{ access_token: string }> {
// //     const payload = {
// //       sub: user.userId,
// //       username: user.username,
// //     };
// //     return { access_token: this.jwtService.sign(payload) };
// //   }
// // }
