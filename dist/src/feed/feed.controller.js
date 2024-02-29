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
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const feed_service_1 = require("./feed.service");
const create_feed_dto_1 = require("./dto/create-feed.dto");
const verifyToken_1 = require("../utils/verifyToken");
const update_feed_dto_1 = require("./dto/update-feed.dto");
const httpError_1 = require("../utils/httpError");
let FeedController = class FeedController {
    constructor(feedService, tokenService) {
        this.feedService = feedService;
        this.tokenService = tokenService;
    }
    async getFeedList(token) {
        let loginUserId = null;
        if (token) {
            loginUserId = await this.tokenService.audienceFromToken(token);
        }
        const feedDatas = await this.feedService.getFeedList(loginUserId);
        return {
            status: 200,
            message: 'Successed to get feedList',
            data: feedDatas,
        };
    }
    async getBookmarkList(token) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        const bookmarkList = await this.feedService.getBookmarkList(loginUserId);
        return {
            status: 201,
            message: 'Successed to get BookmarkList',
            data: bookmarkList,
        };
    }
    async getFeedDetails(token, feedId) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        const feedData = await this.feedService.getFeedDetails(loginUserId, feedId);
        return {
            status: 200,
            message: 'Successed to get feedDetails',
            data: feedData,
        };
    }
    async createFeed(token, feedData) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.createFeed(loginUserId, feedData);
        return { status: 201, message: 'Feed created successfully' };
    }
    async deleteFeed(token, feedId) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.deleteFeed(loginUserId, feedId);
        return { status: 204, message: 'Feed deledted successfully' };
    }
    async updateFeed(token, feedId, feedData) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        const updatedFeed = await this.feedService.updateFeed(loginUserId, feedId, feedData);
        return {
            status: 201,
            message: 'Feed updated successfully',
        };
    }
    async createFeedComment(token, feedId, content) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.createFeedComment(loginUserId, feedId, content);
        return { status: 201, message: 'Comment created successfully' };
    }
    async updateFeedComment(token, commentId, feedId, content) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.updateFeedComment(loginUserId, feedId, commentId, content);
        return { status: 201, message: 'Comment updated successfully' };
    }
    async deleteFeedComment(token, commentId, feedId) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.deleteFeedComment(loginUserId, feedId, commentId);
        return { status: 204, message: 'Comment deleted successfully' };
    }
    async handleFeedLike(token, feedId, isLiked) {
        if (typeof isLiked !== 'boolean') {
            throw new httpError_1.default(400, 'Invalid value for isLiked');
        }
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.handleFeedLike(isLiked, loginUserId, feedId);
        return { status: 201, message: 'FeedLike changed successfully' };
    }
    async createBookmark(token, feedId) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.createBookmark(loginUserId, feedId);
        return { status: 201, message: 'Bookmark created successfully' };
    }
    async deleteBookmark(token, feedId) {
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.deleteBookmark(loginUserId, feedId);
        return { status: 204, message: 'Bookmark deleted successfully' };
    }
    async handleBookmark(token, feedId, isBookmarked) {
        if (typeof isBookmarked !== 'boolean') {
            throw new httpError_1.default(400, 'Invalid value for isBookmarked');
        }
        const loginUserId = await this.tokenService.audienceFromToken(token);
        await this.feedService.handleBookmark(loginUserId, feedId, isBookmarked);
        return { status: 201, message: 'Bookmark changed successfully' };
    }
};
exports.FeedController = FeedController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getFeedList", null);
__decorate([
    (0, common_1.Get)('/bookmark'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getBookmarkList", null);
__decorate([
    (0, common_1.Get)('/:feedId'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "getFeedDetails", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_feed_dto_1.CreateFeedDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "createFeed", null);
__decorate([
    (0, common_1.Delete)('/:feedId'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "deleteFeed", null);
__decorate([
    (0, common_1.Put)('/:feedId'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('feedId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, update_feed_dto_1.UpdateFeedDTO]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "updateFeed", null);
__decorate([
    (0, common_1.Post)('/:feedId/comment'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "createFeedComment", null);
__decorate([
    (0, common_1.Put)('/:feedId/comment/:commentId'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('commentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)('content')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "updateFeedComment", null);
__decorate([
    (0, common_1.Delete)('/:feedId/comment/:commentId'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('commentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "deleteFeedComment", null);
__decorate([
    (0, common_1.Post)('/:feedId/like'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('isLiked')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "handleFeedLike", null);
__decorate([
    (0, common_1.Post)('/:feedId/bookmark'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "createBookmark", null);
__decorate([
    (0, common_1.Delete)('/:feedId/bookmark'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "deleteBookmark", null);
__decorate([
    (0, common_1.Post)('/bookmark/:feedId'),
    __param(0, (0, common_1.Headers)('Authorization')),
    __param(1, (0, common_1.Param)('feedId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('isBookmarked')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], FeedController.prototype, "handleBookmark", null);
exports.FeedController = FeedController = __decorate([
    (0, common_1.Controller)('feeds'),
    __metadata("design:paramtypes", [feed_service_1.FeedService,
        verifyToken_1.TokenService])
], FeedController);
//# sourceMappingURL=feed.controller.js.map