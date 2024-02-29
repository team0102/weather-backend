import { ClothTopEntity } from './clothesTop.entity';
import { ClothBottomEntity } from './clothesBottom.entity';
import { ClothAccessoryEntity } from './clothesAccessory.entity';
import { ClothCoatEntity } from './clothesCoat.entity';
export declare class ClothSetEntity {
    id: number;
    clothesTopId: ClothTopEntity;
    clothesBottomId: ClothBottomEntity;
    clothesCoatId: ClothCoatEntity;
    clothesAccessoryId: ClothAccessoryEntity;
    createdAt: Date;
    updatedAt: Date;
}
