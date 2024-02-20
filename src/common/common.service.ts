import { Injectable } from '@nestjs/common';
import { BasePaginationDto } from './dto/base-pagination.dto';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class CommonService {
  paginate<T>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {}

  private async cursorPaginate<T>(
    dto: BasePaginationDto,
    repository: Repository<T>,
    overrideFindOptions: FindManyOptions<T> = {},
    path: string,
  ) {}

  private composeFindOptions<T>(dto: BasePaginationDto): FindManyOptions<T> {
    /**
     * 나중에 where 필터들을 자동으로 파싱할 수 있을만한 기능 제작
     * 1) where로 시작한다면 필터 로직을 적용한다.
     * 2) order로 시작하면 정렬 로직을 적용한다.
     * 3) 필터 로직을 적용한다면 '__' 기준으로 split 했을 때 3개의 값으로 나뉘는지
     *    2개의 값으로 나뉘는지 확인한다.
     *    3-1) 3개의 값으로 나뉜다면 FILTER_MAPPER에서 해당되는 operator 함수를 찾아서 적용한다.
     *         where__id__more_than -> id보다 큰 값 필터링
     *    3-2) 2개의 값으로 나뉜다면 정확한 값을 필터하는 것이기 때문에 operator 없이 적용한다.
     *         where__id -> 그 id의 값만
     * 4) order의 경우 3-2와 같이 적용한다.
     *
     *
     */
  }
}
