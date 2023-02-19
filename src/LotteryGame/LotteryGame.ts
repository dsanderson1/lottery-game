import { Application } from "pixi.js";
import { LotteryBallHandler } from "./Game/LotteryBallHandler";
import { LuckyDipBtn } from "./UI/LuckyDipBtn";
import { StartBtn } from "./UI/StartBtn";

/**
 * Basic lottery game Live 5 test
 */
export class LotteryGame extends Application {
    constructor() {
        super({width: 1920, height: 1080, backgroundColor: 0xADD8E6, resolution: devicePixelRatio});
        this.initialise()
    }

    /**
     * Initialise the game
     */
    initialise(){
        //Setup the lottery-ball handler
        const lotteryballHandler = new LotteryBallHandler()

        //Setup the lucky dip and start buttons
        const luckyDipBtn = new LuckyDipBtn(lotteryballHandler, 125, 70)
        const startBtn = new StartBtn(lotteryballHandler, 400, 150)

        //Add all to the main stage
        this.stage.addChild(lotteryballHandler, luckyDipBtn, startBtn)
    }
}