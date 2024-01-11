import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClothSetEntity } from './clothesSet.entity';

@Entity({
  name: 'clothes_accessory',
})
export class ClothAccessoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 2000,
  })
  image: string;

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

  @OneToMany(() => ClothSetEntity, (clothAccessory) => clothAccessory.clothesAccessoryId)
  clothAccessory: ClothSetEntity[];
}
