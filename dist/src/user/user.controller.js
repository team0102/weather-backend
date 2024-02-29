"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const user_service_1 = require("./user.service");
const passport_1 = require("@nestjs/passport");
const verifyToken_1 = require("../utils/verifyToken");
let UserController = class UserController {
    constructor(userService, jwtService, tokenService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.configService = configService;
    }
    async kakaoLogin(req, code) {
        console.log(`callback  ///  code------------ ${code}`);
        const { kakaoId, kakaoEmail, kakaoNickname, kakaoProfileImage } = req.user;
        const loginUserInfo = {
            userId: kakaoId,
            userEmail: kakaoEmail,
            userNickname: kakaoNickname,
            userProfileImage: kakaoProfileImage,
        };
        const token = await this.userService.getToken(loginUserInfo);
        console.log(`token//////// ${token}`);
        const user = await this.userService.getUserInfoBysocialAccountUid(req.user.kakaoId);
        return {
            token: token,
            user: user,
        };
    }
    async getCheckNicknameOverlap(nickname) {
        return await this.userService.getCheckNicknameOverlap(nickname);
    }
    async getUserInfo(token) {
        const userId = await this.tokenService.audienceFromToken(token);
        return await this.userService.getUserInfo(userId);
    }
    async userLogout(token) {
        return await this.userService.userLogout(token);
    }
    async deleteUser(token) {
        const userId = await this.tokenService.audienceFromToken(token);
        return await this.userService.deleteUser(userId);
    }
    async updateUserInfo(token, body) {
        const { nickname, email, gender, locationInformationAgree, socialAccountUid, profileImage, temperatureSensitivity, city, } = body;
        const userId = await this.tokenService.audienceFromToken(token);
        const updateUserInfoDto = {
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
    async createUserFollow(token, followUserId) {
        const userId = await this.tokenService.audienceFromToken(token);
        const userFollowDto = {
            userId: Number(userId),
            followUserId: Number(followUserId),
        };
        return await this.userService.createUserFollow(userFollowDto);
    }
    async deleteUserFollow(token, followUserId) {
        const userId = await this.tokenService.audienceFromToken(token);
        const userFollowDto = {
            userId: Number(userId),
            followUserId: Number(followUserId),
        };
        return await this.userService.deleteUserFollow(userFollowDto);
    }
    async getUserFollowingList(token) {
        const userId = await this.tokenService.audienceFromToken(token);
        return await this.userService.getUserFollowingList(userId);
    }
    async getUserFollowerList(token) {
        const followUserId = await this.tokenService.audienceFromToken(token);
        return await this.userService.getUserFollowerList(followUserId);
    }
    async createUserBlock(token, blockUserId) {
        const userId = await this.tokenService.audienceFromToken(token);
        const userBlockDto = {
            userId: Number(userId),
            blockUserId: Number(blockUserId),
        };
        return await this.userService.createUserBlock(userBlockDto);
    }
    async deleteUserBlock(token, blockUserId) {
        const userId = await this.tokenService.audienceFromToken(token);
        const userBlockDto = {
            userId: Number(userId),
            blockUserId: Number(blockUserId),
        };
        return this.userService.deleteUserBlock(userBlockDto);
    }
    async getUserBlockList(token) {
        const userId = await this.tokenService.audienceFromToken(token);
        return this.userService.getUserBlockList(userId);
    }
    async login(req) {
        const { socialAccountUid } = req.body;
        return await this.userService.login(socialAccountUid);
    }
    async loginTokenTest(token) {
        const decodedToken = await this.jwtService.verify(token);
        return decodedToken;
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiCookieAuth)(),
    (0, common_1.Get)('/kakao/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('kakao')),
    (0, common_1.HttpCode)(301),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "kakaoLogin", null);
__decorate([
    (0, common_1.Get)('/check/:nickname'),
    __param(0, (0, common_1.Param)('nickname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCheckNicknameOverlap", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Put)('/logout'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userLogout", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserInfo", null);
__decorate([
    (0, common_1.Post)('/follow/:followUserId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('followUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserFollow", null);
__decorate([
    (0, common_1.Delete)('/follow/:followUserId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('followUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserFollow", null);
__decorate([
    (0, common_1.Get)('/following'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserFollowingList", null);
__decorate([
    (0, common_1.Get)('/follower'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserFollowerList", null);
__decorate([
    (0, common_1.Post)('/block/:blockUserId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('blockUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserBlock", null);
__decorate([
    (0, common_1.Delete)('/block/:blockUserId'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('blockUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUserBlock", null);
__decorate([
    (0, common_1.Get)('/block'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserBlockList", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/logintokencheck'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginTokenTest", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        verifyToken_1.TokenService,
        config_1.ConfigService])
], UserController);
//# sourceMappingURL=user.controller.js.map