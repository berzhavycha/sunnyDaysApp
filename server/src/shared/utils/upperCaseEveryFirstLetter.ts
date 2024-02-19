import { FIRST_LETTER_REGEX } from "../regex";

export const upperCaseEveryFirstLetter = (text: string): string => {
    return text.replace(FIRST_LETTER_REGEX, (match) => match.toUpperCase());
};
