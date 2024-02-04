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
// import { WeatherEntity } from './weather.entity';

@Entity({
  name: 'clothes',
})
export class ClothEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => WeatherEntity)
  // @JoinColumn({
  //   name: 'weatherId',
  //   referencedColumnName: 'id',
  // })
  // weatherId: WeatherEntity;

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
