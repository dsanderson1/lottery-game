import { Container, Text } from "pixi.js";
import { LotteryBallHandler } from "../Game/LotteryBallHandler";
import { LuckyDipBtn } from "./LuckyDipBtn";
import { StartBtn } from "./StartBtn";

/**
 * Handle the UI Buttons
 */
export class UIHandler extends Container {

    private lotteryBallHandler: LotteryBallHandler
    private logoText: Text

    constructor(lotteryBallHandler: LotteryBallHandler) {
        super();
        this.lotteryBallHandler = lotteryBallHandler
        this.logoText = new Text("Lottery", {fontFamily: "cursive", fill: 0xA020F0, fontSize: 50, fontWeight: "bold"})
        this.initialise()
    }

    /**
     * Initialise the game
     */
    initialise(){
        this.logoText.x = 60
        this.logoText.y = -100
        
        //Setup the lucky dip and start buttons
        const luckyDipBtn = new LuckyDipBtn(this.lotteryBallHandler, 350, -20)
        const startBtn = new StartBtn(this.lotteryBallHandler, 350, 50)
        this.addChild(luckyDipBtn, startBtn, this.logoText)
    }
}