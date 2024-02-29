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
exports.UserFollowEntity = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let UserFollowEntity = class UserFollowEntity {
};
exports.UserFollowEntity = UserFollowEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserFollowEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], UserFollowEntity.prototype, "isFollowingBack", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], UserFollowEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], UserFollowEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UserEntity, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'userId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], UserFollowEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.UserEntity, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({
        name: 'followUserId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", Object)
], UserFollowEntity.prototype, "followUser", void 0);
exports.UserFollowEntity = UserFollowEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'userFollows',
    })
], UserFollowEntity);
//# sourceMappingURL=userFollows.entity.js.map