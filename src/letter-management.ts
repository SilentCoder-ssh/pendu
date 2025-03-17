import { displayLetter, pendu, resetWord } from "./dom";
import { getWord } from "./get-word";

export const createAlphabet = () =>
  Array.from(Array(26), (_, i) => String.fromCharCode(i + 65));
export const removeLetters = (array: string[], letters: string[]) =>
  [...array].filter((letter) => !letters.includes(letter));
export const alphabet = createAlphabet();

export const displayMaskWord = (maskWord: string[]) => {
  [...maskWord].forEach((e) => displayLetter(e, wordElement, "alphabetLetter"));
};

export const isWin = () =>
  pendu.maskWord.join("").toLowerCase() === pendu.word.toLowerCase();

export const generatePendu = async () => await getWord();

export const updateMaskWord = (letter: string) => {
  resetWord();
  let maskWordCopy = pendu.maskWord;
  const word = pendu.word;

  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter.toLowerCase()) {
      maskWordCopy[i] = word[i];
    }
  }

  pendu.maskWord = maskWordCopy;
  displayMaskWord(maskWordCopy);
};

const wordElement = (document.querySelector("#word") as HTMLElement)!;
