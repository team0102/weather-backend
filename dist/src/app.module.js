"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const typeORM_config_1 = require("./config/typeORM.config");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("./user/user.module");
const feed_module_1 = require("./feed/feed.module");
const clothes_module_1 = require("./clothes/clothes.module");
const CatchException_1 = require("./utils/CatchException");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync(typeORM_config_1.typeORMConfig),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
                signOptions: { expiresIn: '12h' },
            }),
            user_module_1.UserModule,
            feed_module_1.FeedModule,
            clothes_module_1.ClothesModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: CatchException_1.default,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map