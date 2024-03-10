import { CAMEL_CASE_REGEX } from '@/regex';
import { upperCaseFirstLetter } from './upperCaseFirstLetter';

export function convertCamelToSpacedPascal(input: string): string {
  const result = input.replace(CAMEL_CASE_REGEX, ' ');
  return upperCaseFirstLetter(result);
}
