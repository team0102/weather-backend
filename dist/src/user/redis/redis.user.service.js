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
exports.RedisUserService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisUserService = class RedisUserService {
    constructor(REDIS_HOST, REDIS_PORT, REDIS_PASSWORD) {
        this.REDIS_HOST = REDIS_HOST;
        this.REDIS_PORT = REDIS_PORT;
        this.REDIS_PASSWORD = REDIS_PASSWORD;
        this.client = new ioredis_1.Redis({
            host: this.REDIS_HOST,
            port: this.REDIS_PORT,
            password: this.REDIS_PASSWORD,
        });
    }
    getClient() {
        return this.client;
    }
    async set(key, value, expirationTime) {
        await this.client.set(key, value, 'EX', expirationTime);
    }
    async get(key) {
        const result = await this.client.get(key);
        return result;
    }
};
exports.RedisUserService = RedisUserService;
exports.RedisUserService = RedisUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('REDIS_HOST')),
    __param(1, (0, common_1.Inject)('REDIS_PORT')),
    __param(2, (0, common_1.Inject)('REDIS_PASSWORD')),
    __metadata("design:paramtypes", [String, Number, String])
], RedisUserService);
//# sourceMappingURL=redis.user.service.js.map