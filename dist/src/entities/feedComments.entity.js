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
exports.FeedCommentEntity = void 0;
const typeorm_1 = require("typeorm");
const feeds_entity_1 = require("./feeds.entity");
const users_entity_1 = require("./users.entity");
let FeedCommentEntity = class FeedCommentEntity {
};
exports.FeedCommentEntity = FeedCommentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], FeedCommentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 1000,
    }),
    __metadata("design:type", String)
], FeedCommentEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], FeedCommentEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], FeedCommentEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], FeedCommentEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feeds_entity_1.FeedEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'feedId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", feeds_entity_1.FeedEntity)
], FeedCommentEntity.prototype, "feed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'userId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", users_entity_1.UserEntity)
], FeedCommentEntity.prototype, "user", void 0);
exports.FeedCommentEntity = FeedCommentEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'feed_comments',
    })
], FeedCommentEntity);
//# sourceMappingURL=feedComments.entity.js.map