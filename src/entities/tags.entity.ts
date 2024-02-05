import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { FeedTagEntity } from './feedTags.entity';
  
  @Entity({
    name: 'tags',
  })
  export class TagEntity {
    @PrimaryGeneratedColumn({
      type: 'int',
    })
    id: number;
  
    @Column({
      type: 'varchar',
      length: 100,
    })
    content: string;
  
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

    // @OneToMany(() => FeedTagEntity, (feedTag) => feedTag.tag, { cascade: ['insert']})
    // feedTag: FeedTagEntity[]
  }
  