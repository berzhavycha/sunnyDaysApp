import { PASCAL_CASE_REGEX } from "@/regex";

export function convertPascalCaseToSpaced(input: string): string {
  return input.replace(PASCAL_CASE_REGEX, "$1 $2");
}
