import {nextStep, clearCanvas} from "./asset/hangmans-visual";
import { displayPendu } from "./dom";
import { isWin, updateMaskWord } from "./letter-management";

export default function handleLetterClick(element: HTMLElement) {
  element.addEventListener("click", async (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const value = target.textContent;
    if (!value) return;
    element.remove();

    updateMaskWord(value)
    nextStep(isWin());
    
    const victory = isWin(); 

    if (victory) {
      await displayPendu()
    }
    
    console.log(value);
  });
}
