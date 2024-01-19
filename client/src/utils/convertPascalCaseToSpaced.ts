import { PASCAL_CASE_REGEX } from "@/regex";

export function convertPascalCaseToSpaced(input: string): string {
  const result = input.replace(PASCAL_CASE_REGEX, "$1 $2");
  return result[0].toUpperCase() + result.slice(1);
}
