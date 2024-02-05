import {
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { FeedEntity } from './feeds.entity';
import { TagEntity } from './tags.entity';
  
  @Entity({
    name: 'feed_tags',
  })
  export class FeedTagEntity {
    @PrimaryGeneratedColumn({
      type: 'int',
    })
    id: number;
  
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
    
    @ManyToOne(() => FeedEntity, { cascade: true})
    @JoinColumn({
      name: 'feedId',
      referencedColumnName: 'id',
    })
    feed: FeedEntity;

    @ManyToOne(() => TagEntity, { cascade: true})
    @JoinColumn({
      name: 'tagId',
      referencedColumnName: 'id',
    })
    tag: TagEntity;
  }
  