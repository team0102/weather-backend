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
exports.UserBlockRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const userBlocks_entity_1 = require("../entities/userBlocks.entity");
let UserBlockRepository = class UserBlockRepository {
    constructor(userBlockTypeormRepository) {
        this.userBlockTypeormRepository = userBlockTypeormRepository;
    }
    async findBlockRelation(userBlock) {
        const { userId, blockUserId } = userBlock;
        return this.userBlockTypeormRepository.findOneBy({
            user: { id: userId },
            blockUser: { id: blockUserId },
        });
    }
    async createUserBlock(userBlock) {
        await this.userBlockTypeormRepository.save(userBlock);
    }
    async deleteUserBlock(isBlocked) {
        await this.userBlockTypeormRepository.remove(isBlocked);
    }
    async findUserBlockList(userId) {
        return await this.userBlockTypeormRepository.find({
            select: {
                id: true,
                blockUser: { id: true },
                createdAt: true,
            },
            where: {
                user: { id: userId },
            },
            relations: {
                blockUser: true,
            },
        });
    }
};
exports.UserBlockRepository = UserBlockRepository;
exports.UserBlockRepository = UserBlockRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(userBlocks_entity_1.UserBlockEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserBlockRepository);
//# sourceMappingURL=userBlock.repository.js.map