import { Repository } from 'typeorm';
import { CityEntity } from 'src/entities/cities.entity';
export declare class CityRepository {
    private readonly cityTypeormRepository;
    constructor(cityTypeormRepository: Repository<CityEntity>);
    findCityByCityId(cityId: number): Promise<CityEntity | null>;
}
