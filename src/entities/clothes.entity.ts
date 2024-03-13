import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClothTopEntity } from './clothesTop.entity';
import { ClothBottomEntity } from './clothesBottom.entity';
import { ClothCoatEntity } from './clothesCoat.entity';
import { ClothAccessoryEntity } from './clothesAccessory.entity';

@Entity({
  name: 'clothes',
})
export class ClothEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
  })
  lowPerceivedTemperature: number;

  @Column({
    type: 'integer',
  })
  highPerceivedTemperature: number;

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
}
