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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const feed_repository_1 = require("./feed.repository");
const tag_repository_1 = require("./tag.repository");
const feedTag_repository_1 = require("./feedTag.repository");
const typeorm_1 = require("typeorm");
const feedComment_repository_1 = require("./feedComment.repository");
const bookmark_repository_1 = require("./bookmark.repository");
const feedLike_repository_1 = require("./feedLike.repository");
const httpError_1 = require("../utils/httpError");
let FeedService = class FeedService {
    constructor(feedRepository, tagRepository, feedTagRepository, feedCommentRepository, feedLikeRepository, bookmarkRepository, dataSource) {
        this.feedRepository = feedRepository;
        this.tagRepository = tagRepository;
        this.feedTagRepository = feedTagRepository;
        this.feedCommentRepository = feedCommentRepository;
        this.feedLikeRepository = feedLikeRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.dataSource = dataSource;
    }
    async getFeedList(userId) {
        const feedList = await this.feedRepository.getFeedListWithDetails();
        const processedFeedList = await Promise.all(feedList
            .filter((feed) => feed.user !== null)
            .map(async (feed) => {
            const isAuthor = userId && feed.user.id === userId;
            const likeCount = feed.feedLike.length;
            const commentCount = feed.feedComment.length;
            const isLiked = feed.feedLike.some((like) => like.user && like.user.id === userId);
            const isBookmarked = feed.bookmark.some((bookmark) => bookmark.user && bookmark.user.id === userId);
            const { id, nickname, profileImage } = feed.user;
            const imageUrl = feed.feedImage.length > 0 ? feed.feedImage[0].imageUrl : null;
            const { content, lowTemperature, highTemperature, createdAt, updatedAt, } = feed;
            return {
                id: feed.id,
                imageUrl,
                content,
                lowTemperature,
                highTemperature,
                weatherConditionId: feed.weatherCondition.id,
                createdAt,
                updatedAt,
                author: { id, nickname, profileImage },
                isAuthor,
                likeCount,
                commentCount,
                isLiked,
                isBookmarked,
            };
        }));
        return processedFeedList;
    }
    async getFeedDetails(userId, feedId) {
        const feedDetails = await this.feedRepository.getFeedWithDetailsById(feedId);
        if (!feedDetails || feedDetails.deletedAt || !feedDetails.user)
            throw new httpError_1.default(404, 'Feed does not exist');
        const isAuthor = feedDetails.user && feedDetails.user.id === userId;
        const likeCount = feedDetails.feedLike.length;
        const commentCount = feedDetails.feedComment.length;
        const isLiked = feedDetails.feedLike.some((like) => like.user && like.user.id === userId);
        const isBookmarked = feedDetails.bookmark.some((bookmark) => bookmark.user && bookmark.user.id === userId);
        const { id, nickname, profileImage } = feedDetails.user;
        const imageUrl = feedDetails.feedImage.length > 0
            ? feedDetails.feedImage[0].imageUrl
            : null;
        const comment = feedDetails.feedComment.map((comment) => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            deletedAt: comment.deletedAt,
            author: comment.user
                ? {
                    id: comment.user.id,
                    nickname: comment.user.nickname,
                    profileImage: comment.user.profileImage,
                }
                : null
        }));
        const processedFeed = {
            id: feedDetails.id,
            imageUrl,
            content: feedDetails.content,
            weatherConditionId: feedDetails.weatherCondition.id,
            lowTemperature: feedDetails.lowTemperature,
            highTemperature: feedDetails.highTemperature,
            createdAt: feedDetails.createdAt,
            updatedAt: feedDetails.updatedAt,
            author: { id, nickname, profileImage },
            comment,
            isAuthor,
            likeCount,
            commentCount,
            isLiked,
            isBookmarked,
        };
        return processedFeed;
    }
    async createFeed(loginUserId, feedData) {
        const { content } = feedData;
        const tags = this.extractTagsFromContent(content);
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const savedFeed = await this.feedRepository.createFeed(loginUserId, feedData);
            const savedFeedId = savedFeed.id;
            const savedTagIds = await this.saveTagsAndGetIds(tags);
            const savedFeedTag = await this.feedTagRepository.createFeedTags(savedFeedId, savedTagIds);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.error(error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateFeed(loginUserId, feedId, feedData) {
        const { content } = feedData;
        const tags = this.extractTagsFromContent(content);
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const existingFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
            if (!existingFeed || existingFeed.deletedAt || !existingFeed.user)
                throw new httpError_1.default(404, 'Feed does not exist');
            if (existingFeed.user.id !== loginUserId)
                throw new httpError_1.default(403, 'Invalid user');
            const updateFeed = await this.feedRepository.updateFeed(feedId, feedData);
            const savedTagIds = await this.saveTagsAndGetIds(tags);
            const existingFeedTagIds = existingFeed.feedTag?.map((feedTag) => feedTag.id) || [];
            const tagsToAdd = savedTagIds.filter((tagId) => !existingFeedTagIds.includes(tagId));
            const feedTagsToDelete = existingFeedTagIds.filter((feedTagId) => !savedTagIds.includes(feedTagId));
            await this.feedTagRepository.createFeedTags(feedId, tagsToAdd);
            await this.feedTagRepository.deleteFeedTags(feedTagsToDelete);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async saveTagsAndGetIds(tags) {
        const savedTagIds = [];
        for (const tagValue of tags) {
            const foundTag = await this.tagRepository.findTagByContent(tagValue);
            if (!foundTag) {
                const savedTag = await this.tagRepository.createTag(tagValue);
                savedTagIds.push(savedTag.id);
            }
            else {
                savedTagIds.push(foundTag.id);
            }
        }
        return savedTagIds;
    }
    extractTagsFromContent(content) {
        const tagRegex = /#(\S+)/g;
        const matches = content.match(tagRegex);
        return matches ? matches.map((match) => match.slice(1)) : [];
    }
    async deleteFeed(loginUserId, feedId) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
            if (!findFeed || findFeed.deletedAt || !findFeed.user)
                throw new httpError_1.default(404, 'Feed does not exist');
            if (!findFeed.user || findFeed.user.id !== loginUserId)
                throw new httpError_1.default(403, 'Invalid User');
            if (findFeed.feedTag) {
                findFeed.feedTag.forEach(async (feedTag) => {
                    const deleteFeedTagIds = [];
                    deleteFeedTagIds.push(feedTag.id);
                    await this.feedTagRepository.deleteFeedTags(deleteFeedTagIds);
                });
            }
            if (findFeed.feedLike) {
                findFeed.feedLike.forEach(async (feedLike) => {
                    const deledtedFeedLikeIds = [];
                    deledtedFeedLikeIds.push(feedLike.id);
                    await this.feedLikeRepository.deleteFeedLikesByIds(deledtedFeedLikeIds);
                });
            }
            if (findFeed.bookmark) {
                findFeed.bookmark.forEach(async (bookmark) => {
                    await this.bookmarkRepository.deleteBookmark(bookmark.id);
                });
            }
            if (findFeed.feedComment) {
                findFeed.feedComment.forEach(async (comment) => {
                    await this.feedCommentRepository.deleteFeedComment(comment.id);
                });
            }
            await this.feedRepository.deletedFeed(findFeed);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            console.log(error);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createFeedComment(loginUserId, feedId, content) {
        const existingFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
        if (!existingFeed || existingFeed.deletedAt || !existingFeed.user)
            throw new httpError_1.default(404, 'Feed does not exist');
        await this.feedCommentRepository.createFeedComment(loginUserId, feedId, content);
    }
    async updateFeedComment(loginUserId, feedId, commentId, content) {
        const existingFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
        if (!existingFeed || existingFeed.deletedAt || !existingFeed.user)
            throw new httpError_1.default(404, 'Feed does not exist');
        const existingFeedComment = await this.feedCommentRepository.getFeedCommentById(commentId);
        if (!existingFeedComment || existingFeedComment.deletedAt || !existingFeedComment.user)
            throw new httpError_1.default(404, 'Comment does not exist');
        if (existingFeedComment.user.id !== loginUserId)
            throw new httpError_1.default(403, 'Invalid User');
        await this.feedCommentRepository.updateFeedComment(commentId, content);
    }
    async deleteFeedComment(loginUserId, feedId, commentId) {
        const existingFeedComment = await this.feedCommentRepository.getFeedCommentById(commentId);
        if (!existingFeedComment)
            throw new httpError_1.default(404, 'Comment does not exist');
        if (existingFeedComment.user.id !== loginUserId)
            throw new httpError_1.default(403, 'Invalid User');
        const existingFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
        if (!existingFeed || existingFeed.deletedAt || !existingFeed.user)
            throw new httpError_1.default(404, 'Feed does not exist');
        await this.feedCommentRepository.deleteFeedComment(commentId);
    }
    async handleBookmark(loginUserId, feedId, isBookmarked) {
        const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
        if (!findFeed || findFeed.deletedAt || !findFeed.user)
            throw new httpError_1.default(404, 'Feed does not exist');
        if (isBookmarked) {
            const findBookmark = await this.bookmarkRepository.isBookmarked(loginUserId, feedId);
            if (!findBookmark) {
                throw new httpError_1.default(400, 'Invalid request');
            }
            await this.bookmarkRepository.deleteBookmark(findBookmark.id);
        }
        else {
            const existingBookmarked = await this.bookmarkRepository.isBookmarked(loginUserId, feedId);
            if (existingBookmarked) {
                throw new httpError_1.default(400, 'Invalid request');
            }
            await this.bookmarkRepository.createBookmark(loginUserId, feedId);
        }
    }
    async createBookmark(loginUserId, feedId) {
        const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
        if (!findFeed || findFeed.deletedAt || !findFeed.user)
            throw new httpError_1.default(404, 'Feed does not exist');
        const isBookmarked = await this.bookmarkRepository.isBookmarked(loginUserId, feedId);
        if (isBookmarked)
            throw new httpError_1.default(400, 'Feed already bookmarked');
        await this.bookmarkRepository.createBookmark(loginUserId, feedId);
    }
    async deleteBookmark(loginUserId, feedId) {
        const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
        if (!findFeed || findFeed.deletedAt || !findFeed.user)
            throw new httpError_1.default(404, 'Feed does not exist');
        const isBookmarked = await this.bookmarkRepository.isBookmarked(loginUserId, feedId);
        if (!isBookmarked)
            throw new httpError_1.default(404, 'Bookmark does not exist');
        await this.bookmarkRepository.deleteBookmark(isBookmarked.id);
    }
    async getBookmarkList(loginUserId) {
        const bookmarkList = await this.bookmarkRepository.getBookmarkList(loginUserId);
        const filteredBookmarkList = bookmarkList.filter((bookmark) => {
            return bookmark.feed !== null && bookmark.user !== null;
        });
        const processedBookmarkList = await Promise.all(filteredBookmarkList.map(async (bookmark) => {
            const { content, lowTemperature, highTemperature, weatherCondition } = bookmark.feed;
            const { nickname, profileImage } = bookmark.feed.user;
            const imageUrl = bookmark.feed.feedImage.length > 0
                ? bookmark.feed.feedImage[0].imageUrl
                : null;
            return {
                id: bookmark.id,
                createdAt: bookmark.createdAt,
                feed: {
                    id: bookmark.feed.id,
                    imageUrl,
                    content,
                    lowTemperature,
                    highTemperature,
                    weatherConditionId: weatherCondition.id,
                    createdAt: bookmark.feed.createdAt,
                    updatedAt: bookmark.feed.updatedAt,
                },
                author: { id: bookmark.feed.user.id, nickname, profileImage },
            };
        }));
        return processedBookmarkList;
    }
    async handleFeedLike(isLiked, loginUserId, feedId) {
        const findFeed = await this.feedRepository.getFeedWithDetailsById(feedId);
        if (!findFeed || findFeed.deletedAt || !findFeed.user)
            throw new httpError_1.default(404, 'Feed does not exist');
        if (isLiked) {
            const findFeedLike = await this.feedLikeRepository.findFeedLikeByFeedIdAndUserId(loginUserId, feedId);
            if (!findFeedLike) {
                throw new httpError_1.default(400, 'Invalid request');
            }
            await this.feedLikeRepository.deleteFeedLike(findFeedLike.id);
        }
        else {
            const existingFeedLike = await this.feedLikeRepository.findFeedLikeByFeedIdAndUserId(loginUserId, feedId);
            if (existingFeedLike) {
                throw new httpError_1.default(400, 'Invalid request');
            }
            await this.feedLikeRepository.createFeedLike(loginUserId, feedId);
        }
    }
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [feed_repository_1.FeedRepository,
        tag_repository_1.TagRepository,
        feedTag_repository_1.FeedTagRepository,
        feedComment_repository_1.FeedCommentRepository,
        feedLike_repository_1.FeedLikeRepository,
        bookmark_repository_1.BookmarkRepository,
        typeorm_1.DataSource])
], FeedService);
//# sourceMappingURL=feed.service.js.map