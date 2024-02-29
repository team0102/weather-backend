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
exports.BookmarkRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bookmarks_entity_1 = require("../entities/bookmarks.entity");
const typeorm_2 = require("typeorm");
let BookmarkRepository = class BookmarkRepository {
    constructor(bookmarkRepository) {
        this.bookmarkRepository = bookmarkRepository;
    }
    async isBookmarked(userId, feedId) {
        const findBookmark = await this.bookmarkRepository.findOne({
            where: {
                user: { id: userId },
                feed: { id: feedId },
            },
        });
        return findBookmark;
    }
    async createBookmark(userId, feedId) {
        const result = await this.bookmarkRepository.save({
            user: { id: userId },
            feed: { id: feedId },
        });
        return result;
    }
    async deleteBookmark(id) {
        const result = await this.bookmarkRepository.delete({ id });
        console.log(result);
    }
    async getBookmarkList(userId) {
        const result = await this.bookmarkRepository.find({
            relations: {
                feed: {
                    user: true,
                    feedImage: true,
                    weatherCondition: true,
                },
            },
            order: { createdAt: 'DESC' },
            where: {
                feed: {
                    deletedAt: null,
                    user: {
                        deletedAt: null,
                    },
                },
                user: {
                    id: userId,
                },
            },
        });
        return result;
    }
};
exports.BookmarkRepository = BookmarkRepository;
exports.BookmarkRepository = BookmarkRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bookmarks_entity_1.BookmarkEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookmarkRepository);
//# sourceMappingURL=bookmark.repository.js.map