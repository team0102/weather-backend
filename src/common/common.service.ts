import { Injectable } from '@nestjs/common';
import { BasePaginationDto } from './dto/base-pagination.dto';
import {
  FindManyOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import HttpError from 'src/utils/httpError';
import { FILTER_MAPPER } from './const/filter-mapper.const';

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
     */
    let where: FindOptionsWhere<T> = {};
    let order: FindOptionsOrder<T> = {};

    for (const [key, value] of Object.entries(dto)) {
      //dto의 모든 값을 looping
      if (key.startsWith('where__')) {
        where = {
          ...where,
          ...this.parseWhereFilter(key, value), //where 필터를 새로 만들 때마다 where에 추가
        };
      } else if (key.startsWith('order__')) {
        order = {
          ...order,
          ...this.parseOrderFilter(key, value),
        };
      }
    }
    return {
      where,
      order,
      take: dto.take,
    };
  }

  private parseWhereFilter<T>(key: string, value: any): FindOptionsWhere<T> {
    const options: FindOptionsWhere<T> = {};

    /**
     * 예를들어 where__id__more_than
     * __ 를 기준으로 나눴을때
     *
     * ['where', 'id', 'more_than']으로 나눌 수 있다.
     */
    const split = key.split('__');
    if (split.length !== 2 && split.length !== 3)
      throw new HttpError(400, `Bad request in where filter : ${key}`);

    /**
     * 길이가 2일 경우는 where__id = 3
     *
     * FindOptionWhere로 풀더보면 아래와 같다
     * {
     *   where : {
     *        id : 3
     *    }
     * }
     */
    if (split.length === 2) {
      //  ['where', 'id]
      const [_, field] = split;

      /**
       * field -> 'id'
       * value -> 3
       *
       * {
       *        id : 3
       *    }
       */
      options[field] = value;
    } else {
      /**
       * 길이가 3일 경우에는 Typeorm 유틸리티 적용이 필요한 경우다.
       *
       * where_id_more_than의 경우
       * where은 버려도 되고, 두번째 값은 필터할 키값이 되고
       * 세번째 값은 typeorm 유틸리티가 된다.
       *
       * FILTER_MAPPER에 미리 정의해둔 값들로
       * field 값에 FILTER_MAPPER에서 해당되는 utility를 가져온 후 값에 적용해준다.
       */

      // [where, id, more_than]
      const [_, field, operator] = split;

      // value가 여러개 인 경우 : where__id__between = 3, 4
      // 만약 split 대상 문자가 존재하지 않으면 길이가 무조건 1이다.
      // const values = value.toString().split(',');
      //   if(operator === 'between') {
      //     options[field] = FILTER_MAPPER[operator](values[0], values[1]);
      //   } else {
      //   options[field] = FILTER_MAPPER[operator](value);
      //  }

      // field -> id
      // operator -> more_than
      // FILTER_MAPPER[operator] -> MoreThan
      options[field] = FILTER_MAPPER[operator](value);
    }

    return options;
  }

  private parseOrderFilter<T>(key: string, value: any): FindOptionsOrder<T> {
    return;
  }
}
