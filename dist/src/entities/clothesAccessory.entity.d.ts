import { ClothSetEntity } from './clothesSet.entity';
export declare class ClothAccessoryEntity {
    id: number;
    type: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    clothAccessory: ClothSetEntity[];
}
