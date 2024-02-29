import { ClothSetEntity } from './clothesSet.entity';
export declare class ClothTopEntity {
    id: number;
    type: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    clothTop: ClothSetEntity[];
}
