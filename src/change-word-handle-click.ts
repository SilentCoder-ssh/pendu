import { displayPendu } from "./dom"

(document.querySelector('#change-word') as HTMLButtonElement)!.addEventListener("click", async (e: MouseEvent) => {
    displayPendu()
})
