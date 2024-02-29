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
exports.FeedRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const feeds_entity_1 = require("../entities/feeds.entity");
const typeorm_2 = require("typeorm");
const feedImages_entity_1 = require("../entities/feedImages.entity");
let FeedRepository = class FeedRepository {
    constructor(feedRepository, feedImageRepository) {
        this.feedRepository = feedRepository;
        this.feedImageRepository = feedImageRepository;
    }
    async getFeedListWithDetails() {
        const feedList = await this.feedRepository.find({
            relations: {
                user: true,
                feedImage: true,
                feedComment: {
                    user: true,
                },
                feedLike: {
                    user: true
                },
                weatherCondition: true,
                bookmark: {
                    user: true,
                },
                feedTag: {
                    tag: true,
                },
            },
            order: { createdAt: 'DESC' },
            where: {
                deletedAt: null,
                user: {
                    deletedAt: null,
                },
            },
        });
        console.log(feedList);
        return feedList;
    }
    async getFeedWithDetailsById(feedId) {
        const [feed] = await this.feedRepository.find({
            relations: {
                user: true,
                feedImage: true,
                feedComment: {
                    user: true,
                },
                feedLike: {
                    user: true,
                },
                weatherCondition: true,
                bookmark: {
                    user: true,
                },
                feedTag: {
                    tag: true,
                },
            },
            where: {
                id: feedId,
                user: {
                    deletedAt: null,
                },
            },
        });
        console.log(feed);
        return feed;
    }
    async createFeed(userId, feedData) {
        const { weatherConditionId, imageUrl } = feedData;
        const savedFeed = await this.feedRepository.save({
            user: { id: userId },
            weatherCondition: { id: weatherConditionId },
            ...feedData,
        });
        const savedFeedImage = await this.feedImageRepository.save({
            feed: savedFeed,
            imageUrl: imageUrl,
        });
        return savedFeed;
    }
    async deletedFeed(findFeed) {
        const { feedImage } = findFeed;
        if (Array.isArray(feedImage) && feedImage.length > 0) {
            await Promise.all(feedImage.map(async (image) => {
                await this.feedImageRepository.softDelete(image.id);
            }));
        }
        await this.feedRepository.softDelete({
            id: findFeed.id,
        });
    }
    async updateFeed(feedId, feedData) {
        const { weatherConditionId, imageUrl, ...updateData } = feedData;
        if (weatherConditionId) {
            await this.feedRepository.update({ id: feedId }, { weatherCondition: { id: weatherConditionId } });
        }
        const updateFeed = await this.feedRepository.update({ id: feedId }, { ...updateData });
        const updateFeedImage = await this.feedImageRepository.update({ feed: { id: feedId } }, { imageUrl: imageUrl });
        return updateFeed;
    }
};
exports.FeedRepository = FeedRepository;
exports.FeedRepository = FeedRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feeds_entity_1.FeedEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(feedImages_entity_1.FeedImageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FeedRepository);
//# sourceMappingURL=feed.repository.js.map