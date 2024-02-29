import { ClothTopEntity } from './clothesTop.entity';
import { ClothBottomEntity } from './clothesBottom.entity';
import { ClothCoatEntity } from './clothesCoat.entity';
import { ClothAccessoryEntity } from './clothesAccessory.entity';
export declare class ClothEntity {
    id: number;
    lowPerceivedTemperature: number;
    highPerceivedTemperature: number;
    createdAt: Date;
    updatedAt: Date;
    clothesTopId: ClothTopEntity;
    clothesBottomId: ClothBottomEntity;
    clothesCoatId: ClothCoatEntity;
    clothesAccessoryId: ClothAccessoryEntity;
}
