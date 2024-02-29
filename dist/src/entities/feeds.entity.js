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
exports.FeedEntity = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const feedImages_entity_1 = require("./feedImages.entity");
const feedComments_entity_1 = require("./feedComments.entity");
const feedTags_entity_1 = require("./feedTags.entity");
const feedLikes_entity_1 = require("./feedLikes.entity");
const bookmarks_entity_1 = require("./bookmarks.entity");
const weatherCondition_entity_1 = require("./weatherCondition.entity");
let FeedEntity = class FeedEntity {
};
exports.FeedEntity = FeedEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], FeedEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 2000,
    }),
    __metadata("design:type", String)
], FeedEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], FeedEntity.prototype, "lowTemperature", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], FeedEntity.prototype, "highTemperature", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], FeedEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], FeedEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], FeedEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'userId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", users_entity_1.UserEntity)
], FeedEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => weatherCondition_entity_1.WeatherConditionEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'weatherConditionId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", weatherCondition_entity_1.WeatherConditionEntity)
], FeedEntity.prototype, "weatherCondition", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedImages_entity_1.FeedImageEntity, (feedImage) => feedImage.feed, { cascade: ['insert', 'update'] }),
    __metadata("design:type", Array)
], FeedEntity.prototype, "feedImage", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedComments_entity_1.FeedCommentEntity, (feedComment) => feedComment.feed),
    __metadata("design:type", Array)
], FeedEntity.prototype, "feedComment", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedLikes_entity_1.FeedLikeEntity, (feedLike) => feedLike.feed, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], FeedEntity.prototype, "feedLike", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedTags_entity_1.FeedTagEntity, (feedTag) => feedTag.feed, { cascade: ['insert', 'update'] }),
    __metadata("design:type", Array)
], FeedEntity.prototype, "feedTag", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmarks_entity_1.BookmarkEntity, (bookmark) => bookmark.feed, { cascade: ['remove'] }),
    __metadata("design:type", Array)
], FeedEntity.prototype, "bookmark", void 0);
exports.FeedEntity = FeedEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'feeds',
    })
], FeedEntity);
//# sourceMappingURL=feeds.entity.js.map