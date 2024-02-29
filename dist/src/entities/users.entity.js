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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const cities_entity_1 = require("./cities.entity");
const socialAccountProviders_entity_1 = require("./socialAccountProviders.entity");
const userFollows_entity_1 = require("./userFollows.entity");
const userBlocks_entity_1 = require("./userBlocks.entity");
const feeds_entity_1 = require("./feeds.entity");
const feedComments_entity_1 = require("./feedComments.entity");
const feedLikes_entity_1 = require("./feedLikes.entity");
const bookmarks_entity_1 = require("./bookmarks.entity");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "locationInformationAgree", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "socialAccountUid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 2000,
        nullable: true,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 0,
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "temperatureSensitivity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], UserEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cities_entity_1.CityEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'cityId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => socialAccountProviders_entity_1.SocialAccountProviderEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'socialAccountProviderId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], UserEntity.prototype, "socialAccountProvider", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userFollows_entity_1.UserFollowEntity, (userFollow) => userFollow.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "userFollow", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userFollows_entity_1.UserFollowEntity, (userFollower) => userFollower.followUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userFollower", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userBlocks_entity_1.UserBlockEntity, (userBlock) => userBlock.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "userBlock", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => userBlocks_entity_1.UserBlockEntity, (userBlocker) => userBlocker.blockUser),
    __metadata("design:type", Array)
], UserEntity.prototype, "userBlocker", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feeds_entity_1.FeedEntity, (feed) => feed.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "feed", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedComments_entity_1.FeedCommentEntity, (feedComment) => feedComment.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "fefeedCommented", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feedLikes_entity_1.FeedLikeEntity, (feedLike) => feedLike.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "feedLike", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmarks_entity_1.BookmarkEntity, (bookmark) => bookmark.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "bookmark", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'users',
    })
], UserEntity);
//# sourceMappingURL=users.entity.js.map