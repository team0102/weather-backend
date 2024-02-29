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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("./user.repository");
const userFollows_entity_1 = require("../entities/userFollows.entity");
const userFollow_repository_1 = require("./userFollow.repository");
const city_repository_1 = require("./city.repository");
const config_1 = require("@nestjs/config");
const userBlock_repository_1 = require("./userBlock.repository");
const userBlocks_entity_1 = require("../entities/userBlocks.entity");
const redis_user_service_1 = require("./redis/redis.user.service");
let UserService = class UserService {
    constructor(jwtService, userRepository, userFollowRepository, cityRepository, configService, redisUserService, userBlockRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.userFollowRepository = userFollowRepository;
        this.cityRepository = cityRepository;
        this.configService = configService;
        this.redisUserService = redisUserService;
        this.userBlockRepository = userBlockRepository;
    }
    async getToken(loginUserInfo) {
        const user = await this.kakaoValidateUser(loginUserInfo);
        const token = this.generateAccessToken(user);
        return token;
    }
    async kakaoValidateUser(loginUserInfo) {
        const { userId, userEmail, userNickname, userProfileImage } = loginUserInfo;
        let user = await this.userRepository.findUserByKakaoId(userId);
        console.log(user);
        if (!user) {
            const signUpUserInfo = {
                socialAccountProvider: 1,
                socialAccountUid: userId,
                email: userEmail,
                nickname: userNickname,
                profileImage: userProfileImage,
            };
            user = await this.userRepository.createUser(signUpUserInfo);
        }
        return user;
    }
    generateAccessToken(user) {
        const payload = {
            userId: user.socialAccountUid,
            userEmail: user.email,
        };
        return this.jwtService.sign(payload);
    }
    async getUserInfoBysocialAccountUid(socialAccountUid) {
        const user = await this.userRepository.findUserByUid(socialAccountUid);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        const { id, nickname, profileImage } = await this.userRepository.findUserByUid(socialAccountUid);
        const userInfo = {
            id,
            nickname,
            profileImage,
        };
        return userInfo;
    }
    async getCheckNicknameOverlap(nickname) {
        const numberOfOverlapNickname = this.userRepository.getCheckNicknameOverlap(nickname);
        return (await numberOfOverlapNickname) === 0
            ? 'USER_NOT_EXIST'
            : 'USER_EXIST';
    }
    async getUserInfo(userId) {
        const user = await this.userRepository.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        return user;
    }
    async userLogout(token) {
        const decodedToken = this.jwtService.verify(token);
        const userId = decodedToken.aud;
        const user = await this.userRepository.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('NOT_FOUND_USER');
        const logoutCheck = await this.redisUserService.get(token);
        if (logoutCheck !== null)
            throw new common_1.BadRequestException('LOGIN_REQUIRED');
        const currentTime = Math.floor(new Date().getTime() / 1000.0);
        const exp = Number(await decodedToken.exp);
        const remainedTime = exp - currentTime;
        return await this.redisUserService.set(token, '', remainedTime);
    }
    async deleteUser(id) {
        const user = this.userRepository.findOneById(id);
        if (!user)
            throw new common_1.NotFoundException(`USER_NOT_FOUND`);
        return await this.userRepository.deleteUserById(id);
    }
    async updateUserInfo(updateUserInfoDto) {
        const { email, gender, locationInformationAgree, nickname, profileImage, socialAccountUid, temperatureSensitivity, city, } = updateUserInfoDto;
        if (!email || !nickname || !socialAccountUid)
            throw new common_1.BadRequestException('KEY_ERROR: NOT_INPUT_REQUIRED_VALUE');
        if (gender && !(gender >= 0 && gender <= 2))
            throw new common_1.BadRequestException('KEY_ERROR: GENDER');
        if (locationInformationAgree &&
            !(locationInformationAgree >= 0 && locationInformationAgree <= 2))
            throw new common_1.BadRequestException('KEY_ERROR: LOCATION_IN_FORMATIONAGREE');
        if (temperatureSensitivity &&
            !(temperatureSensitivity >= 0 && temperatureSensitivity <= 2))
            throw new common_1.BadRequestException('KEY_ERROR: TEMPERATURE_SENSITIVITY');
        let checkCityExist;
        if (city === 0) {
            throw new common_1.BadRequestException('KEY_ERROR: CITY(0)');
        }
        else if (city) {
            checkCityExist = await this.cityRepository.findCityByCityId(city);
            if (!checkCityExist)
                throw new common_1.BadRequestException('KEY_ERROR: NOT_EXIST_CITY');
        }
        const user = await this.userRepository.findUserByUid(socialAccountUid);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        if (email)
            user.email = email;
        if ((gender && gender !== undefined) || gender === 0)
            user.gender = gender;
        if ((locationInformationAgree && locationInformationAgree !== undefined) ||
            locationInformationAgree === 0)
            user.locationInformationAgree = locationInformationAgree;
        if (nickname)
            user.nickname = nickname;
        if (profileImage)
            user.profileImage = profileImage;
        if (socialAccountUid)
            user.socialAccountUid = socialAccountUid;
        if ((temperatureSensitivity && temperatureSensitivity !== undefined) ||
            temperatureSensitivity === 0)
            user.temperatureSensitivity = temperatureSensitivity;
        if (city)
            user.city = city;
        await this.userRepository.updateUserInfo(user);
    }
    async createUserFollow(userFollowDto) {
        const { userId, followUserId } = userFollowDto;
        if (!userId || !followUserId)
            throw new common_1.NotFoundException('KEY_ERROR');
        if (userId === followUserId)
            throw new common_1.BadRequestException('SAME_ID_REQUESTED');
        const user = await this.userRepository.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        const followUser = await this.userRepository.findOneById(followUserId);
        if (!followUser)
            throw new common_1.NotFoundException('FOLLOW_USER_NOT_FOUND');
        const checkFollowOverlap = await this.userFollowRepository.checkFollowOverlap(userFollowDto);
        if (checkFollowOverlap !== 0)
            throw new common_1.BadRequestException('ALREADY_FOLLOWING');
        const userFollow = new userFollows_entity_1.UserFollowEntity();
        userFollow.user = userId;
        userFollow.followUser = followUserId;
        return await this.userFollowRepository.createUserFollow(userFollow);
    }
    async deleteUserFollow(userFollowDto) {
        const { userId, followUserId } = userFollowDto;
        if (!userId || !followUserId)
            throw new common_1.NotFoundException('KEY_ERROR');
        if (userId === followUserId)
            throw new common_1.BadRequestException('SAME_ID_REQUESTED');
        const user = await this.userRepository.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        const followUser = await this.userRepository.findOneById(followUserId);
        if (!followUser)
            throw new common_1.NotFoundException('FOLLOW_USER_NOT_FOUND');
        const checkFollowOverlap = await this.userFollowRepository.checkFollowOverlap(userFollowDto);
        if (checkFollowOverlap !== 1)
            throw new common_1.BadRequestException('NOT_FOLLOWING');
        const followRelation = await this.userFollowRepository.findFollowRelation(userFollowDto);
        return await this.userFollowRepository.deleteUserFollow(followRelation);
    }
    async getUserFollowingList(userId) {
        if (!userId)
            throw new common_1.NotFoundException('KEY_ERROR');
        const user = this.userRepository.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        const followingList = await this.userFollowRepository.findFollowingList(userId);
        return followingList;
    }
    async getUserFollowerList(followUserId) {
        if (!followUserId)
            throw new common_1.NotFoundException('KEY_ERROR');
        const followUser = this.userRepository.findOneById(followUserId);
        if (!followUser)
            throw new common_1.NotFoundException('FOLLOW_USER_NOT_FOUND');
        const followerList = await this.userFollowRepository.findFollowerList(followUserId);
        const followingListByCurrentUser = await this.userFollowRepository.findFollowingList(followUserId);
        followerList.forEach((follower) => {
            const followUserId = typeof follower.user === 'number' ? follower.user : follower.user.id;
            follower.isFollowingBack = followingListByCurrentUser.some((following) => {
                const followingUserId = typeof following.followUser === 'number'
                    ? following.followUser
                    : following.followUser.id;
                return followUserId === followingUserId;
            });
        });
        return followerList;
    }
    async getUserBlockList(userId) {
        if (!userId)
            throw new common_1.NotFoundException('KEY_ERROR');
        const user = this.userRepository.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        return this.userBlockRepository.findUserBlockList(userId);
    }
    async createUserBlock(userBlockDto) {
        const { userId, blockUserId } = userBlockDto;
        if (!userId || !blockUserId)
            throw new common_1.NotFoundException('KEY_ERROR');
        if (userId === blockUserId)
            throw new common_1.BadRequestException('SAME_ID_REQUESTED');
        const user = await this.userRepository.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        const blockUser = await this.userRepository.findOneById(blockUserId);
        if (!blockUser)
            throw new common_1.NotFoundException('BLOCK_USER_NOT_FOUND');
        const isBlocked = await this.userBlockRepository.findBlockRelation(userBlockDto);
        if (isBlocked)
            throw new common_1.BadRequestException('ALREADY_BLOCK');
        const userBlock = new userBlocks_entity_1.UserBlockEntity();
        userBlock.user = userId;
        userBlock.blockUser = blockUserId;
        return await this.userBlockRepository.createUserBlock(userBlock);
    }
    async deleteUserBlock(userBlockDto) {
        const { userId, blockUserId } = userBlockDto;
        if (!userId || !blockUserId)
            throw new common_1.NotFoundException('KEY_ERROR');
        if (userId === blockUserId)
            throw new common_1.BadRequestException('SAME_ID_REQUESTED');
        const user = await this.userRepository.findOneById(userId);
        if (!user)
            throw new common_1.NotFoundException('USER_NOT_FOUND');
        const blockUser = await this.userRepository.findOneById(blockUserId);
        if (!blockUser)
            throw new common_1.NotFoundException('BLOCK_USER_NOT_FOUND');
        const isBlocked = await this.userBlockRepository.findBlockRelation(userBlockDto);
        if (!isBlocked)
            throw new common_1.BadRequestException('NOT_BLOCKED_USER');
        return await this.userBlockRepository.deleteUserBlock(isBlocked);
    }
    async login(socialAccountUid) {
        if (!socialAccountUid)
            throw new common_1.BadRequestException('socialAccountUid_required');
        const user = await this.userRepository.findUserByUid(socialAccountUid);
        if (!user)
            throw new common_1.NotFoundException(`USER_NOT_EXIST`);
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_1.UserRepository,
        userFollow_repository_1.UserFollowRepository,
        city_repository_1.CityRepository,
        config_1.ConfigService,
        redis_user_service_1.RedisUserService,
        userBlock_repository_1.UserBlockRepository])
], UserService);
//# sourceMappingURL=user.service.js.map