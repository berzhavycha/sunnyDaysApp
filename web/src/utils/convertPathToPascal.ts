export const convertPathToPascal = (path: string): string => {
  const words = path.slice(1).split('-');
  const formattedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return formattedWords.join(' ');
};
