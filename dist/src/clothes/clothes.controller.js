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
exports.ClothesController = void 0;
const common_1 = require("@nestjs/common");
const get_temperature_dto_1 = require("./dto/get-temperature.dto");
const clothes_service_1 = require("./clothes.service");
const verifyToken_1 = require("../utils/verifyToken");
let ClothesController = class ClothesController {
    constructor(clothesService, tokenService) {
        this.clothesService = clothesService;
        this.tokenService = tokenService;
    }
    async getClothesSetIdByWeather(weatherDto, token) {
        const { temperature } = weatherDto;
        let loginUserId;
        if (token) {
            try {
                loginUserId = await this.tokenService.audienceFromToken(token);
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid token');
            }
        }
        const result = await this.clothesService.getClothesSetIdByTemperature(temperature, loginUserId);
        return {
            status: 200,
            message: 'Success get Clothes',
            data: result.data,
        };
    }
};
exports.ClothesController = ClothesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_temperature_dto_1.WeatherDto, String]),
    __metadata("design:returntype", Promise)
], ClothesController.prototype, "getClothesSetIdByWeather", null);
exports.ClothesController = ClothesController = __decorate([
    (0, common_1.Controller)('clothes'),
    __metadata("design:paramtypes", [clothes_service_1.ClothesService,
        verifyToken_1.TokenService])
], ClothesController);
//# sourceMappingURL=clothes.controller.js.map