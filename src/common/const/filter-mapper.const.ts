import {
  Any,
  ArrayContainedBy,
  ArrayContains,
  ArrayOverlap,
  Between,
  Equal,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';

/**
 * where__id__not
 * {
 * where: {
 *    id : Not(value)
 *    }
 * }
 */
export const FILTER_MAPPER = {
  not: Not,
  equal: Equal,
  less_than: LessThan,
  less_than_or_equal: LessThanOrEqual,
  more_than: MoreThan,
  more_than_or_equal: MoreThanOrEqual,
  like: Like,
  i_like: ILike,
  between: Between,
  in: In,
  any: Any,
  is_null: IsNull,
  array_contained_by: ArrayContainedBy,
  array_contains: ArrayContains,
  array_overlap: ArrayOverlap,
};
