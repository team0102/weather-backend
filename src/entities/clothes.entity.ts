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
import { ClothSetEntity } from './clothesSet.entity';

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

  @OneToOne(() => ClothSetEntity)
  @JoinColumn({
    name: 'clothesSetId',
    referencedColumnName: 'id',
  })
  clothesSetId: ClothSetEntity;

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
