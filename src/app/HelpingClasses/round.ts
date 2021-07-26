export class Round {
    static roundNumber:number = 0

    currentRound:number 
    
    constructor(public ballsCount:number,public ballsClicked:number,public timeInSeconds:number){
        this.currentRound = Round.roundNumber++
    }

    
  }