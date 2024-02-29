"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const user_repository_1 = require("./user.repository");
const userFollow_repository_1 = require("./userFollow.repository");
const users_entity_1 = require("../entities/users.entity");
const userFollows_entity_1 = require("../entities/userFollows.entity");
const verifyToken_1 = require("../utils/verifyToken");
const city_repository_1 = require("./city.repository");
const cities_entity_1 = require("../entities/cities.entity");
const kakao_strategy_1 = require("./strategy/kakao.strategy");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const redis_user_module_1 = require("./redis/redis.user.module");
const userBlocks_entity_1 = require("../entities/userBlocks.entity");
const userBlock_repository_1 = require("./userBlock.repository");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                users_entity_1.UserEntity,
                userFollows_entity_1.UserFollowEntity,
                userBlocks_entity_1.UserBlockEntity,
                cities_entity_1.CityEntity,
            ]),
            redis_user_module_1.RedisUserModule.register(),
            config_1.ConfigModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
                    signOptions: {
                        expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule.register({ defaultStrategy: 'kakao' }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            user_repository_1.UserRepository,
            userFollow_repository_1.UserFollowRepository,
            userBlock_repository_1.UserBlockRepository,
            verifyToken_1.TokenService,
            city_repository_1.CityRepository,
            kakao_strategy_1.KakaoStrategy,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [
            user_service_1.UserService,
            user_repository_1.UserRepository,
            userFollow_repository_1.UserFollowRepository,
            userBlock_repository_1.UserBlockRepository,
            city_repository_1.CityRepository,
            kakao_strategy_1.KakaoStrategy,
            jwt_strategy_1.JwtStrategy,
            passport_1.PassportModule,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map