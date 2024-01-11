import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WeatherConditionEntity } from './weatherCondition.entity';
import { ClothEntity } from './clothes.entity';

@Entity({
  name: 'weather',
})
export class WeatherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
  })
  temperature: number;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  tempetatureSensitivity: number;

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

  @ManyToOne(() => WeatherConditionEntity)
  @JoinColumn({
    name: 'weatherConditionId',
    referencedColumnName: 'id',
  })
  weatherCondition: WeatherConditionEntity;

  @OneToMany(() => ClothEntity, (clothes) => clothes.weatherId)
  clothes: ClothEntity[];
}
