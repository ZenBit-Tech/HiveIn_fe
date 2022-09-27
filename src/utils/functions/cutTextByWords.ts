/* eslint-disable import/prefer-default-export */
export const cutTextByWords = (text: string, countWords: number) => {
  return `${text.split(" ").slice(0, countWords).join(" ")}...`;
};
