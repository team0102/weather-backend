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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../entities/users.entity");
let UserRepository = class UserRepository {
    constructor(userTypeormRepository) {
        this.userTypeormRepository = userTypeormRepository;
    }
    async findUserByUid(socialAccountUid) {
        return await this.userTypeormRepository.findOneBy({
            socialAccountUid: socialAccountUid,
        });
    }
    async getCheckNicknameOverlap(nickname) {
        return await this.userTypeormRepository.countBy({
            nickname: nickname,
        });
    }
    async findOneById(userId) {
        return await this.userTypeormRepository.findOneBy({ id: userId });
    }
    async deleteUserById(id) {
        await this.userTypeormRepository.softDelete({ id });
    }
    async updateUserInfo(userInfoDto) {
        await this.userTypeormRepository.save(userInfoDto);
    }
    async createUser(signUpUserInfo) {
        const kakaoUser = this.userTypeormRepository.create(signUpUserInfo);
        return await this.userTypeormRepository.save(kakaoUser);
    }
    async findUserByKakaoId(kakaoId) {
        return await this.userTypeormRepository.findOne({
            where: {
                socialAccountUid: kakaoId,
            },
        });
    }
    async createKakaoUser(data) {
        const newUser = this.userTypeormRepository.create(data);
        return await this.userTypeormRepository.save(newUser);
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepository);
//# sourceMappingURL=user.repository.js.map