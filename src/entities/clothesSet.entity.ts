import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClothTopEntity } from './clothesTop.entity';
import { ClothBottomEntity } from './clothesBottom.entity';
import { ClothAccessoryEntity } from './clothesAccessory.entity';
import { ClothCoatEntity } from './clothesCoat.entity';

@Entity({
  name: 'clothes_set',
})
export class ClothSetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClothTopEntity)
  @JoinColumn({
    name: 'clothesTopId',
    referencedColumnName: 'id',
  })
  clothesTopId: ClothTopEntity;

  @ManyToOne(() => ClothBottomEntity)
  @JoinColumn({
    name: 'clothesBottomId',
    referencedColumnName: 'id',
  })
  clothesBottomId: ClothBottomEntity;

  @ManyToOne(() => ClothCoatEntity)
  @JoinColumn({
    name: 'clothesCoatId',
    referencedColumnName: 'id',
  })
  clothesCoatId: ClothCoatEntity;

  @ManyToOne(() => ClothAccessoryEntity)
  @JoinColumn({
    name: 'clothesAccessoryId',
    referencedColumnName: 'id',
  })
  clothesAccessoryId: ClothAccessoryEntity;


  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
