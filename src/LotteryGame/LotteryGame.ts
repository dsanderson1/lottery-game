import { Application, Container } from "pixi.js";
import { LotteryBallHandler } from "./Game/LotteryBallHandler";
import { LuckyDipBtn } from "./UI/LuckyDipBtn";
import { StartBtn } from "./UI/StartBtn";
import { UIHandler } from "./UI/UIHandler";

/**
 * Basic lottery game Live 5 test
 */
export class LotteryGame extends Application {

    /** Main Container for the game */
    private lotteryContainer: Container = new Container()

    constructor() {
        super({width: 1920, height: 1080, backgroundColor: 0xADD8E6, resizeTo: window});
        this.stage.addChild(this.lotteryContainer)
        this.lotteryContainer.x = 100
        this.lotteryContainer.y = 100
        this.initialise()
    }

    /**
     * Initialise the game
     */
    initialise(){
        //Setup the lottery-ball and UI handler
        const lotteryballHandler = new LotteryBallHandler()
        const uiHandler = new UIHandler(lotteryballHandler)

        //Add all to the main container
        this.lotteryContainer.addChild(lotteryballHandler, uiHandler)
    }
}