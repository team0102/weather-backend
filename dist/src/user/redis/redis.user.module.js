"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RedisUserModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisUserModule = void 0;
const common_1 = require("@nestjs/common");
const redis_user_service_1 = require("./redis.user.service");
const config_1 = require("@nestjs/config");
let RedisUserModule = RedisUserModule_1 = class RedisUserModule {
    static register() {
        return {
            module: RedisUserModule_1,
            providers: [
                redis_user_service_1.RedisUserService,
                {
                    provide: 'REDIS_HOST',
                    useFactory: (configService) => configService.get('REDIS_HOST'),
                    inject: [config_1.ConfigService],
                },
                {
                    provide: 'REDIS_PORT',
                    useFactory: (configService) => configService.get('REDIS_PORT'),
                    inject: [config_1.ConfigService],
                },
                {
                    provide: 'REDIS_PASSWORD',
                    useFactory: (configService) => configService.get('REDIS_PASSWORD'),
                    inject: [config_1.ConfigService],
                },
            ],
            exports: [redis_user_service_1.RedisUserService],
        };
    }
};
exports.RedisUserModule = RedisUserModule;
exports.RedisUserModule = RedisUserModule = RedisUserModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], RedisUserModule);
//# sourceMappingURL=redis.user.module.js.map