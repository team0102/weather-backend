import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WeatherEntity } from './weather.entity';
import { FeedEntity } from './feeds.entity';

@Entity({
  name: 'weatherCondition',
})
export class WeatherConditionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  condition: string;

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

  @OneToMany(() => WeatherEntity, (weather) => weather.weatherCondition)
  weather: WeatherEntity[];

  @OneToMany(() => FeedEntity, (feed) => feed.weatherCondition)
  feed: FeedEntity[];
}
