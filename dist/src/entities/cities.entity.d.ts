import { UserEntity } from './users.entity';
export declare class CityEntity {
    id: number;
    cityName: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity[];
}
