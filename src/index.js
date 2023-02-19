import { LotteryGame } from "./LotteryGame/LotteryGame";

//After load start the game and add to body
window.addEventListener("load", function () {
    const lotteryGame = new LotteryGame()
    document.body.appendChild(lotteryGame.view)
});