import { Text } from 'pixi.js'
import { matchAmounts } from '../Game/LotteryBallHandler'

/**
 * Handles displaying the win at the end of play
 */
export class WinHandler extends Text{
    /** Basic paytable for wins */
    private paytable = {0: 0, 1: 0, 2: 0, 3: 50, 4: 100, 5: 200, 6: 500}

    constructor (x: number, y: number) {
        super("WIN: ", {fill: 0x228B22, fontSize: 50, fontWeight: "bold"})
        this.x = x
        this.y = y
        this.anchor.set(0.5)
    }

    /** Change the win of the round */
    public async checkWin(matchAmount: matchAmounts){
        const winMatch: number = this.paytable[matchAmount]
        this.text = "WIN: " + winMatch
    }
}