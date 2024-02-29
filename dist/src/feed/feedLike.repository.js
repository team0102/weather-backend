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
exports.FeedLikeRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feedLikes_entity_1 = require("../entities/feedLikes.entity");
const typeorm_2 = require("typeorm");
let FeedLikeRepository = class FeedLikeRepository {
    constructor(feedLikeRepository) {
        this.feedLikeRepository = feedLikeRepository;
    }
    async findFeedLikeByFeedIdAndUserId(loginUserId, feedId) {
        console.log(loginUserId, feedId);
        const result = await this.feedLikeRepository.findOne({
            where: {
                user: { id: loginUserId },
                feed: { id: feedId },
            },
        });
        console.log(result);
        return result;
    }
    async createFeedLike(loginUserId, feedId) {
        await this.feedLikeRepository.save({
            user: { id: loginUserId },
            feed: { id: feedId },
        });
    }
    async deleteFeedLike(id) {
        await this.feedLikeRepository.delete({ id });
    }
    async deleteFeedLikesByIds(ids) {
        await this.feedLikeRepository.delete(ids);
    }
};
exports.FeedLikeRepository = FeedLikeRepository;
exports.FeedLikeRepository = FeedLikeRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feedLikes_entity_1.FeedLikeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FeedLikeRepository);
//# sourceMappingURL=feedLike.repository.js.map