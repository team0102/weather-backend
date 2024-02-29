import { TagEntity } from 'src/entities/tags.entity';
import { Repository } from 'typeorm';
export declare class TagRepository {
    private readonly tagRepository;
    constructor(tagRepository: Repository<TagEntity>);
    createTag(tag: string): Promise<TagEntity>;
    findTagByContent(tag: string): Promise<TagEntity>;
}
