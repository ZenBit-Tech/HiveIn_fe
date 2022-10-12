/* eslint-disable import/prefer-default-export */
export const cutTextByWords = (text: string, countWords: number) => {
  const arrayWord = text.split(" ");

  return arrayWord.length <= countWords
    ? text
    : `${arrayWord.slice(0, countWords).join(" ")}...`;
};
