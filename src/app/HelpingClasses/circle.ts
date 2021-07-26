import { randomIntFromInterval } from '../Helpers/mathHelper';


export enum ActionType {
    Remove,
    ScaleDown,
    Nothing
}

export class Circle {
    circleRadius: number
    x: number
    y: number
    step: number
    direction: number
    slope: number
    dom: HTMLDivElement
    actionType: ActionType



    constructor (dom:HTMLDivElement, circleRadius:number, width:number, height:number, left:number, top:number) {
        this.actionType = ActionType.Nothing
        this.step = randomIntFromInterval(1, 10)
        this.direction = randomIntFromInterval(0, 1)
        this.slope = Math.random()
  
        this.dom = dom
        this.circleRadius = circleRadius
  
        this.x = left + randomIntFromInterval(0, width - this.circleRadius)
        this.y = top + randomIntFromInterval(0, height - this.circleRadius)
      }

      scaleDown ():void {
        const newRadius:number = (this.circleRadius - 2)
        const newX:number = this.x + 1
        const newY:number = this.y + 1
  
        this.circleRadius = newRadius
  
        this.x = newX
        this.y = newY
      }
  
      moveCircle (left:number, right:number, top:number, bottom:number):void {
        // Calculate new x, y, slope and direction
        const circleRadius:number = this.circleRadius
        const direction:number = this.direction
  
        if (direction === 0) {
          this.x += this.step
        } else {
          this.x -= this.step
        }
  
        this.y += this.slope * this.step
  
        if (this.x > right - circleRadius) { // Hit the right border
          this.direction = (direction + 1) % 2
          this.x = right - circleRadius
        } else if (this.x < left) { // Hit the left border
          this.direction = (direction + 1) % 2
          this.x = left
        }
  
        if (this.y > bottom - circleRadius) { // Hit the bottom border
          this.slope *= -1
          this.y = bottom - circleRadius
        } else if (this.y < top) { // Hit the top border
          this.slope *= -1
          this.y = top
        }
      }
      
  }