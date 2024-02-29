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
exports.UserFollowRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userFollows_entity_1 = require("../entities/userFollows.entity");
let UserFollowRepository = class UserFollowRepository {
    constructor(userFollowTypeormRepository) {
        this.userFollowTypeormRepository = userFollowTypeormRepository;
    }
    async checkFollowOverlap(userFollowDto) {
        const { userId, followUserId } = userFollowDto;
        return await this.userFollowTypeormRepository.countBy({
            user: { id: userId },
            followUser: { id: followUserId },
        });
    }
    async createUserFollow(userFollowDto) {
        await this.userFollowTypeormRepository.save(userFollowDto);
    }
    async findFollowRelation(userFollowDto) {
        const { userId, followUserId } = userFollowDto;
        return await this.userFollowTypeormRepository.find({
            select: {
                user: { id: true },
                followUser: { id: true },
            },
            where: {
                user: { id: userId },
                followUser: { id: followUserId },
            },
            relations: {
                user: true,
                followUser: true,
            },
        });
    }
    async deleteUserFollow(followRelation) {
        await this.userFollowTypeormRepository.remove(followRelation);
    }
    async findFollowingList(userId) {
        return this.userFollowTypeormRepository.find({
            relations: {
                followUser: true,
            },
            select: {
                id: true,
                followUser: {
                    id: true,
                    profileImage: true,
                    nickname: true,
                    createdAt: true,
                },
            },
            where: {
                user: { id: userId },
            },
        });
    }
    async findFollowerList(followUserId) {
        return this.userFollowTypeormRepository.find({
            relations: { user: true },
            select: {
                id: true,
                user: {
                    id: true,
                    profileImage: true,
                    nickname: true,
                    createdAt: true,
                },
            },
            where: {
                followUser: { id: followUserId },
            },
        });
    }
};
exports.UserFollowRepository = UserFollowRepository;
exports.UserFollowRepository = UserFollowRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userFollows_entity_1.UserFollowEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserFollowRepository);
//# sourceMappingURL=userFollow.repository.js.map