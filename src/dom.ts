import { alphabet, displayMaskWord, generatePendu } from "./letter-management";

import handleLetterClick from "./handle-letter-click";

const isAlphabetLetter = /^[a-z]$/i;
const hyphenOrApostrophe = /[-']/;
const alphabetElement = (document.querySelector("#alphabet") as HTMLElement)!;
const wordElement = (document.querySelector('#word') as HTMLElement)!

export interface Pendu {
  maskWord: string[];
  word: string;
}


let pendu: Pendu;

export function displayLetter(letter: string, parent: HTMLElement, id: string) {
  const div = document.createElement("div");
  const span = document.createElement("span");

  const divLetter = parent.appendChild(div);
  divLetter.appendChild(span).textContent = letter;

  // styles
  divLetter.id = isAlphabetLetter.test(letter)
    ? id
    : hyphenOrApostrophe
    ? "hyphenOrApostrophe"
    : "";

  handleLetterClick(divLetter);
}

export const displayAlphabet = () => {
  [...alphabet].forEach((e) =>
    displayLetter(e, alphabetElement, "designLetter")
  );
};

export const resetWord = () => {
  wordElement.innerHTML = ""

}

export const displayPendu = async () => {
  resetWord()
  displayAlphabet();
  pendu = await generatePendu();
  displayMaskWord(pendu.maskWord);
};

export { pendu };
