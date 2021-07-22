
import { MathHelperService } from '../Helpers/math-helper.service';
import { DomInteractionsService } from './dom-interactions.service';

export enum Direction {
    Left,
    Right
}

export class Circle {
    circleRadius: number
    x: number
    y: number
    step: number
    direction: Direction
    slope: number
    dom: HTMLDivElement

    // Must inject
    mathHelper:MathHelperService
    domInteractions:DomInteractionsService

    constructor(width:number,height:number,left:number,top:number){

        // Must inject
        this.mathHelper = new MathHelperService()
        this.domInteractions = new DomInteractionsService(this.mathHelper)

        this.circleRadius = this.mathHelper.randomIntFromInterval(40,100)
        this.x = left+this.mathHelper.randomIntFromInterval(0,width-this.circleRadius)
        this.y = top+this.mathHelper.randomIntFromInterval(0,height-this.circleRadius)
        this.step = this.mathHelper.randomIntFromInterval(1,10),
        this.direction = this.mathHelper.randomIntFromInterval(0,1),
        this.slope = Math.random()

        this.dom = this.domInteractions.createCircleDomElement(this.circleRadius)
    }

    moveCircle(left:number,right:number,top:number,bottom:number){

        // Calculate new x, y, slope and direction
        let circleRadius = this.circleRadius
        let direction = this.direction
        
        if(direction == 0){
            this.x += this.step
        } else {
            this.x -= this.step
        }

        this.y += this.slope*this.step

        if(this.x > right - circleRadius){ // Hit the right border
            this.direction = (direction+1)%2
            this.x = right - circleRadius
        } else if (this.x < left){ // Hit the left border
            this.direction = (direction+1)%2
            this.x = left
        }

        if(this.y > bottom - circleRadius){ // Hit the bottom border
            this.slope *= -1;
            this.y = bottom - circleRadius
            
        }  else if(this.y < top){ // Hit the top border
            this.slope *= -1;
            this.y =  top
        }

        this.domInteractions.updateCirclePositionInDom(this,this.x,this.y)
    }
  }