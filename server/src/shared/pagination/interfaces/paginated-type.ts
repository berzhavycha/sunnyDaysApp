import { PaginationInfo } from '../types';

export interface PaginatedType<T> {
  edges: T[];
  paginationInfo: PaginationInfo;
}
