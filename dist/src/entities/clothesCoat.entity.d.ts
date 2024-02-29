import { ClothSetEntity } from './clothesSet.entity';
export declare class ClothCoatEntity {
    id: number;
    type: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    clothCoat: ClothSetEntity[];
}
