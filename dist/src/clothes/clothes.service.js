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
exports.ClothesService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../user/user.repository");
const clothes_repository_1 = require("./clothes.repository");
let ClothesService = class ClothesService {
    constructor(clothRepository, userRepository) {
        this.clothRepository = clothRepository;
        this.userRepository = userRepository;
    }
    async getClothesSetIdByTemperature(perceivedTemperature, loginUserId) {
        if (loginUserId) {
            await this.userRepository.findOneById(loginUserId);
        }
        const getClothesSetIdByTemperature = await this.clothRepository.getClothesSetIdByTemperature(perceivedTemperature);
        return getClothesSetIdByTemperature;
    }
};
exports.ClothesService = ClothesService;
exports.ClothesService = ClothesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clothes_repository_1.ClothesRepository,
        user_repository_1.UserRepository])
], ClothesService);
//# sourceMappingURL=clothes.service.js.map