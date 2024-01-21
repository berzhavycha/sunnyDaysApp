import { PASCAL_CASE_REGEX } from '@/regex';
import { upperCaseFirstLetter } from './upperCaseFirstLetter';

export function convertPascalCaseToSpaced(input: string): string {
  const result = input.replace(PASCAL_CASE_REGEX, '$1 $2');
  return upperCaseFirstLetter(result);
}
