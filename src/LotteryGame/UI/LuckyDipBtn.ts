import { LotteryBallHandler } from "../Game/LotteryBallHandler";
import { UIBtn } from "./UIButton";

/**
 * Lucky dip button
 */
export class LuckyDipBtn extends UIBtn{

    constructor (lotteryBallHandler: LotteryBallHandler, x: number, y: number) {
        super(lotteryBallHandler, x, y)
        this.text.text = "LUCKY DIP"
    }

    /**
     * Call lucky dip on pointer down event
     */
    protected touchEvent(){
        this.on("pointerdown", () => this.lotteryBallHandler.luckyDip())
    }

}