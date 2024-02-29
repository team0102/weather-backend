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
exports.ClothesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const clothes_entity_1 = require("../entities/clothes.entity");
const typeorm_2 = require("typeorm");
let ClothesRepository = class ClothesRepository {
    constructor(clothRepository) {
        this.clothRepository = clothRepository;
    }
    async getClothesSetIdByTemperature(perceivedTemperature) {
        const clothEntities = await this.clothRepository
            .createQueryBuilder('cloth')
            .where(':perceivedTemperature BETWEEN cloth.lowPerceivedTemperature AND cloth.highPerceivedTemperature', { perceivedTemperature })
            .leftJoinAndSelect('cloth.clothesTopId', 'clothesTop')
            .leftJoinAndSelect('cloth.clothesBottomId', 'clothesBottom')
            .leftJoinAndSelect('cloth.clothesCoatId', 'clothesCoat')
            .leftJoinAndSelect('cloth.clothesAccessoryId', 'clothesAccessory')
            .getMany();
        if (!clothEntities || clothEntities.length === 0) {
            throw new common_1.NotFoundException('주어진 온도에 해당하는 옷 세트가 없습니다');
        }
        const clothesDtoArray = clothEntities.map((cloth) => ({
            id: cloth.id,
            clothesTopId: cloth.clothesTopId,
            clothesBottomId: cloth.clothesBottomId,
            clothesCoatId: cloth.clothesCoatId,
            clothesAccessoryId: cloth.clothesAccessoryId,
        }));
        return { status: 200, message: 'Success', data: clothesDtoArray };
    }
};
exports.ClothesRepository = ClothesRepository;
exports.ClothesRepository = ClothesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(clothes_entity_1.ClothEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClothesRepository);
//# sourceMappingURL=clothes.repository.js.map