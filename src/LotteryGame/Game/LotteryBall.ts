import { Graphics, Text } from "pixi.js";
import { LotteryBallHandler } from "./LotteryBallHandler";
import gsap from "gsap";

/**
 * Class that creates each lottery ball graphic
 */
export class LotteryBall extends Graphics {
    //Lottery ball handler
    private lotteryBallHandler: LotteryBallHandler

    //Number of the lottery ball
    private value: number

    //PIXI text to sit inside lottery ball graphic
    private text: Text = new Text()

    //Whether this particular ball is selected or not
    public selected: boolean = false

    constructor(lotteryBallHandler: LotteryBallHandler, x: number, y: number, value: number) {
        super()
        this.lotteryBallHandler = lotteryBallHandler
        this.value = value
        this.interactive = true
        this.cursor = "pointer"
        this.setupGraphic(x, y)
        this.setupText()
        this.touchEvents();
    }

    /**
     * Setup Touch Events
     */
    private touchEvents(){  
        this.on("pointerdown", () => this.click())
    }

    /**
     * Setup PIXI graphics for the lottery ball
     * @param x
     * @param y 
     */
    private setupGraphic(x: number, y: number){
        const radius: number = 25
        this.beginFill(0xFFFFFF)
        this.lineStyle({color: 0x000000, width: 5, alignment: 1})
        this.drawCircle(0, 0, radius).position.set(x, y)
        this.endFill()
    }

    /**
     * Setup lottery ball value text
     */
    private setupText(){
        this.text = new Text(this.value)
        this.text.anchor.set(0.5)
        this.addChild(this.text)
    }

    /**
     * Click logic for lottery ball
     */
    public click(){
        //If not selected and not 6 selected then select this ball
        if (!this.selected){
            if (this.lotteryBallHandler.amountSelected < 6){
                this.lotteryBallHandler.amountSelected++
                this.selected = true
                this.tint = 0xFFA500
            }
        //Unselect the ball
        }else{
            this.lotteryBallHandler.amountSelected--
            this.selected = false
            this.tint = 0xFFFFFF
        }
    }

    /**
     * Check if this ball if a winning match
     */
    public async checkWinAnim(){
        //Change colour to green if winning match, or red otherwise
        this.tint = this.selected ? 0x00FF00 : 0xFF0000
        //Tween the drawn ball
        await gsap.to(this, {scaleXY: 1.2})
        await gsap.to(this, {scaleXY: 1})
        //Mark as selected
        if (!this.selected) {
            this.selected = true
            this.lotteryBallHandler.amountSelected++
        }
    }

    /** Setter for XY for tweening */ public set scaleXY(scale: number){this.scale.x = this.scale.y = scale}
    /** Getter for XY for tweening */ public get scaleXY(){return this.scale.x}
}