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
exports.WeatherConditionEntity = void 0;
const typeorm_1 = require("typeorm");
const feeds_entity_1 = require("./feeds.entity");
let WeatherConditionEntity = class WeatherConditionEntity {
};
exports.WeatherConditionEntity = WeatherConditionEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WeatherConditionEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 100,
    }),
    __metadata("design:type", String)
], WeatherConditionEntity.prototype, "condition", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 2000,
    }),
    __metadata("design:type", String)
], WeatherConditionEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], WeatherConditionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], WeatherConditionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => feeds_entity_1.FeedEntity, (feed) => feed.weatherCondition),
    __metadata("design:type", Array)
], WeatherConditionEntity.prototype, "feed", void 0);
exports.WeatherConditionEntity = WeatherConditionEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'weatherCondition',
    })
], WeatherConditionEntity);
//# sourceMappingURL=weatherCondition.entity.js.map