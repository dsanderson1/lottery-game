import { Container } from "pixi.js";
import { WinHandler } from "../UI/WinHandler";
import { LotteryBall } from "./LotteryBall";
export type matchAmounts = 0 | 1 | 2 | 3 | 4 | 5 | 6

/**
 * Handles the creation and lucky dips/starting of the lottery game
 */
export class LotteryBallHandler extends Container{

    // Config of the lottery balls
    private config: {amount: number, ballsPerCol: number, rowSpacing: number, colSpacing: number} = {amount: 59, ballsPerCol: 10, rowSpacing: 70, colSpacing: 60}

    //Store the lottery balls
    private lotteryBalls: LotteryBall[] = []

    /** Amount of lottery balls currently selected */
    public amountSelected: number = 0

    /** Where the game is currently in progress */
    private inProgress: boolean = false

    /** Win handler */
    private winHandler: WinHandler
    
    constructor () {
        super()
        
        //Setup win handler
        this.winHandler = new WinHandler(480, 250)
        this.addChild(this.winHandler)

        this.setupBalls();
    }

    /**
     * Setup the lottery balls based off the config
     */
    private setupBalls(){
        //Initial x and y positions
        let x: number = 50
        const startY: number = 100

        //To count which row of lottery ball
        let rowCount: number = 0

        //Loop for how ever many lottery balls there are on config
        for (let i = 1; i <= this.config.amount; i++){
            rowCount++
            const y: number = startY + (rowCount * this.config.rowSpacing)
            const ball: LotteryBall = new LotteryBall(this, x, y, i)
            this.addChild(ball)
            this.lotteryBalls.push(ball)

            //If the row count has been reached then add to the x positioning
            if (rowCount === this.config.ballsPerCol) {
                rowCount = 0
                x += this.config.colSpacing
            }
        }
    }

    /**
     * Selects random unique lottery balls
     */
    public luckyDip(){
        //If not already in progres 
        if (!this.inProgress){
            //Clear and get random unique balls
            this.resetBalls()
            this.randomBalls().forEach(rb=>rb.click())
        }
    }

    /**
     * Starts the lottery game
     */
    public async start() {
        //If not already playing
        if (!this.inProgress) {
            //Setup promises for the ball animations
            let promises: Promise<void>[] = []

            //Count how many balls have matches
            let winCount: matchAmounts = 0

            //If the correct amount has been selected then start game
            if (this.amountSelected === 6) {
                this.inProgress = true

                //Get winning ball
                this.randomBalls().forEach(rb => {
                    rb.selected && winCount++
                    promises.push(rb.checkWinAnim())
                })
                //Wait to complate
                await Promise.all(promises)

                //Show win amount if any
                this.winHandler.checkWin(winCount)
                this.inProgress = false
            //Reset balls if its post play
            } else if (this.amountSelected > 6 || winCount > 5) {
                this.resetBalls()
            }
        }
    }

    /**
     * Get random balls for both lucky dip and play
     * @returns Array of random unique balls
     */
    private randomBalls(){
        let randomBalls: LotteryBall[] = [];
        //While there are less than 6 random balls, keep trying
        while(randomBalls.length < 6){
            //Get random ball
            const randomBall = this.lotteryBalls[Math.floor(Math.random() * this.lotteryBalls.length)]
            //If its unique then store in the array
            if(randomBalls.indexOf(randomBall) === -1){
                randomBalls.push(randomBall)
            }
        }
       return randomBalls
    }

    /**
     * Reset the selected/highlighted buttons
     */
    private resetBalls(){
        this.lotteryBalls.forEach(lb=>lb.selected && lb.click())
    }
}