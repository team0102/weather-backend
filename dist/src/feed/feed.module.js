"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedModule = void 0;
const common_1 = require("@nestjs/common");
const feed_service_1 = require("./feed.service");
const feed_controller_1 = require("./feed.controller");
const feed_repository_1 = require("./feed.repository");
const typeorm_1 = require("@nestjs/typeorm");
const feedImages_entity_1 = require("../entities/feedImages.entity");
const feedTags_entity_1 = require("../entities/feedTags.entity");
const feeds_entity_1 = require("../entities/feeds.entity");
const feedComments_entity_1 = require("../entities/feedComments.entity");
const feedLikes_entity_1 = require("../entities/feedLikes.entity");
const tags_entity_1 = require("../entities/tags.entity");
const tag_repository_1 = require("./tag.repository");
const feedTag_repository_1 = require("./feedTag.repository");
const feedComment_repository_1 = require("./feedComment.repository");
const verifyToken_1 = require("../utils/verifyToken");
const bookmarks_entity_1 = require("../entities/bookmarks.entity");
const bookmark_repository_1 = require("./bookmark.repository");
const feedLike_repository_1 = require("./feedLike.repository");
let FeedModule = class FeedModule {
};
exports.FeedModule = FeedModule;
exports.FeedModule = FeedModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                feeds_entity_1.FeedEntity,
                feedImages_entity_1.FeedImageEntity,
                feedTags_entity_1.FeedTagEntity,
                feedComments_entity_1.FeedCommentEntity,
                feedLikes_entity_1.FeedLikeEntity,
                tags_entity_1.TagEntity,
                bookmarks_entity_1.BookmarkEntity,
            ]),
        ],
        controllers: [feed_controller_1.FeedController],
        providers: [
            feed_service_1.FeedService,
            verifyToken_1.TokenService,
            feed_repository_1.FeedRepository,
            tag_repository_1.TagRepository,
            feedTag_repository_1.FeedTagRepository,
            feedComment_repository_1.FeedCommentRepository,
            feedLike_repository_1.FeedLikeRepository,
            bookmark_repository_1.BookmarkRepository,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], FeedModule);
//# sourceMappingURL=feed.module.js.map