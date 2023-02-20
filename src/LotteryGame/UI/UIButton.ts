import { Graphics } from "pixi.js"
import { Text } from "pixi.js"
import { LotteryBallHandler } from "../Game/LotteryBallHandler"

/**
 * UI Button abstract class
 */
export abstract class UIBtn extends Graphics{
    /** Text of the button */
    protected text: Text = new Text("", {fill: 0xffffff})

    /** Reference to the lottery ball handler */
    protected lotteryBallHandler: LotteryBallHandler

    constructor (lotteryBallHandler: LotteryBallHandler, x: number, y: number) {
        super()
        this.lotteryBallHandler = lotteryBallHandler
        //Setup button properties
        this.interactive = true
        this.cursor = "pointer"

        //Setup class
        this.setupGraphic(x, y, 150, 50)
        this.setupText()
        this.touchEvent()
    }

    /**
     * Setup rectengular graphic for the button
     * @param x pos
     * @param y pos
     * @param width 
     * @param height 
     */
    private setupGraphic(x: number, y: number, width: number, height: number){
        this.beginFill(0x0006b1)
        this.lineStyle({color: 0x000000, width: 5, alignment: 1})
        this.drawRect(0, 0, width, height).position.set(x, y)
        this.endFill()
    }

    /** Setup text for the asset */
    private setupText(){
        this.text.x = 75
        this.text.y = 25
        this.text.anchor.set(0.5)
        this.addChild(this.text)
    }

    /** Abstract method for each touch event  */
    protected abstract touchEvent(): void

}