import { Text } from 'pixi.js'
import { matchAmounts } from './LotteryBallHandler'
import gsap from 'gsap'

/**
 * Handles displaying the win at the end of play
 */
export class WinHandler extends Text{
    /** Basic paytable for wins */
    private paytable = {0: 0, 1: 1, 2: 2, 3: 50, 4: 100, 5: 200, 6: 500}

    constructor (x: number, y: number) {
        super("", {fill: 0x228B22, fontSize: 50, fontWeight: "bold", fontFamily: "cursive"})
        this.x = x
        this.y = y
        this.initialise()
    }

    /**
     * Initialise the win handler
     */
    private initialise(){
        this.anchor.set(0.5)
        this.scale.set(0)
    }

    /** Change the win of the round */
    public async checkWin(matchAmount: matchAmounts){
        //Get the win amount from paytable object
        const winMatch: number = this.paytable[matchAmount]
        //If win
        if (winMatch){
            //Set text
            this.text = "WIN: " + winMatch
            //Tween in the win
            await gsap.to(this, {scaleXY: 1.2, duration: 0.5})
            await gsap.to(this, {scaleXY: 1, yoyo: true, repeat: 5})
            gsap.to(this, {scaleXY: 0, duration: 0.5})
        }else{
            this.text = "NO WIN"
            await gsap.to(this, {scaleXY: 1.2, duration: 0.5})
            await gsap.to(this, {scaleXY: 0, duration: 0.5, delay: 1})
        }

    }

    /** Setter for XY for tweening */ public set scaleXY(scale: number){this.scale.x = this.scale.y = scale}
    /** Getter for XY for tweening */ public get scaleXY(){return this.scale.x}
}