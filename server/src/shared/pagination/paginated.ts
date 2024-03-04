import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

import { PaginationInfo } from './types';
import { PaginatedType } from './interfaces';

export function Paginated<T>(classRef: Type<T>): Type<PaginatedType<T>> {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedTypeClass implements PaginatedType<T> {
        @Field(() => [classRef])
        edges: (T | null)[];

        @Field(() => PaginationInfo)
        paginationInfo: PaginationInfo;
    }

    @ObjectType({ isAbstract: true })
    class ConcretePaginatedTypeClass extends PaginatedTypeClass { }

    return ConcretePaginatedTypeClass;
}
