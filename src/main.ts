import nextStep from './asset/hangmans-visual';
import { getWord } from './get-word';
import './style.css'
import "virtual:uno.css";

const btn = document.querySelector("button")! as HTMLButtonElement;

btn.addEventListener("click", async (_) => {
  nextStep();
  console.log(await getWord());
});
