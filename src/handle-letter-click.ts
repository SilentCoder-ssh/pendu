import nextStep from "./asset/hangmans-visual";
import { updateMaskWord } from "./letter-management";

export default function handleLetterClick(element: HTMLElement) {
  element.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const value = target.textContent;
    if (!value) return;
    element.remove();

    updateMaskWord(value)
    nextStep();
    
    console.log(value);
  });
}
