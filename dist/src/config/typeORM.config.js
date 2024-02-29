"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
exports.typeORMConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../entities/*.{js,ts}'],
        synchronize: true,
        logging: false,
        cache: true,
    }),
    dataSourceFactory: async (options) => {
        const dataSource = await new typeorm_1.DataSource(options).initialize();
        return dataSource;
    },
};
//# sourceMappingURL=typeORM.config.js.map