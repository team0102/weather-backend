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
exports.ClothEntity = void 0;
const typeorm_1 = require("typeorm");
const clothesTop_entity_1 = require("./clothesTop.entity");
const clothesBottom_entity_1 = require("./clothesBottom.entity");
const clothesCoat_entity_1 = require("./clothesCoat.entity");
const clothesAccessory_entity_1 = require("./clothesAccessory.entity");
let ClothEntity = class ClothEntity {
};
exports.ClothEntity = ClothEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ClothEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], ClothEntity.prototype, "lowPerceivedTemperature", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], ClothEntity.prototype, "highPerceivedTemperature", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], ClothEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], ClothEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clothesTop_entity_1.ClothTopEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'clothesTopId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", clothesTop_entity_1.ClothTopEntity)
], ClothEntity.prototype, "clothesTopId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clothesBottom_entity_1.ClothBottomEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'clothesBottomId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", clothesBottom_entity_1.ClothBottomEntity)
], ClothEntity.prototype, "clothesBottomId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clothesCoat_entity_1.ClothCoatEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'clothesCoatId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", clothesCoat_entity_1.ClothCoatEntity)
], ClothEntity.prototype, "clothesCoatId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clothesAccessory_entity_1.ClothAccessoryEntity),
    (0, typeorm_1.JoinColumn)({
        name: 'clothesAccessoryId',
        referencedColumnName: 'id',
    }),
    __metadata("design:type", clothesAccessory_entity_1.ClothAccessoryEntity)
], ClothEntity.prototype, "clothesAccessoryId", void 0);
exports.ClothEntity = ClothEntity = __decorate([
    (0, typeorm_1.Entity)({
        name: 'clothes',
    })
], ClothEntity);
//# sourceMappingURL=clothes.entity.js.map