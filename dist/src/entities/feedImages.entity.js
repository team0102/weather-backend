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
exports.FeedImageEntity = void 0;
const typeorm_1 = require("typeorm");
const feeds_entity_1 = require("./feeds.entity");
let FeedImageEntity = class FeedImageEntity {
};
exports.FeedImageEntity = FeedImageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], FeedImageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 2000,
    }),
    __metadata("design:type", String)
], FeedImageEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], FeedImageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], FeedImageEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        type: 'timestamp',
        default: null,
    }),
    __metadata("design:type", Date)
], FeedImageEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => feeds_entity_1.FeedEntity, { cascade: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'feedId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", feeds_entity_1.FeedEntity)
], FeedImageEntity.prototype, "feed", void 0);
exports.FeedImageEntity = FeedImageEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'feed_images',
    })
], FeedImageEntity);
//# sourceMappingURL=feedImages.entity.js.map