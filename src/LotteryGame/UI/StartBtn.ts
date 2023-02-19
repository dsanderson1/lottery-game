import { LotteryBallHandler } from "../Game/LotteryBallHandler";
import { UIBtn } from "./UIButton";

/**
 * Start button
 */
export class StartBtn extends UIBtn{

    constructor (lotteryBallHandler: LotteryBallHandler, x: number, y: number) {
        super(lotteryBallHandler, x, y)
        this.text.text = "START"
    }

    /**
     * Play/start the game on pointerdown event
     */
    protected touchEvent(){
        this.on("pointerdown", () => this.lotteryBallHandler.start())
    }

}