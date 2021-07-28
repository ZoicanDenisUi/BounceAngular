import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionType, Circle } from '../HelpingClasses/circle';
import { DomInteractionsService } from '../Helpers/dom-interactions.service';
import { Round } from '../HelpingClasses/round';
import { randomIntFromInterval } from '../Helpers/mathHelper';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-bounce-animation',
  templateUrl: './bounce-animation.component.html',
  styleUrls: ['./bounce-animation.component.css']
})
export class BounceAnimationComponent implements AfterViewInit{

  @ViewChild('bounceDiv') bounceDiv!: ElementRef<HTMLDivElement>   

  @Input() roundObserver!:Subject<Round>;
  
  isStartButtonEnable:boolean = true
  timeInSeconds:number = 0 
  intervalsPassed:number = 0
  bounceInterval:any 
  circlesElements:Circle[] = []
  ballCountInput:string = ""

  progressValue:number = 0

  ballClickedCount:number = 0

  readonly FRAMSECOUNT = 60;
  readonly SIXTY_FPS  = 1000 / 60


  constructor(private domInteractions:DomInteractionsService){

  }

  ngAfterViewInit(){
      this.domInteractions.initialize(document.querySelector('#bounceDiv')!);
  }

  animateBalls(event:any){
    const ballsNumber:number = parseInt(this.ballCountInput.valueOf())
    if(this.isStartButtonEnable){
        event.target.innerText = "Stop"

        this.timeInSeconds = 0
        this.ballClickedCount = 0
        this.intervalsPassed = 0

        const {width:widthBounceDiv,height:heightBounceDiv} = this.bounceDiv.nativeElement.getBoundingClientRect();
        const topBounceDiv = this.bounceDiv.nativeElement.offsetTop
        const leftBounceDiv = this.bounceDiv.nativeElement.offsetLeft

        for(let i=0;i<ballsNumber;i++){
            const circleRadius = randomIntFromInterval(40,100)
            const newCircle:Circle = new Circle(this.domInteractions.createCircleDomElement(circleRadius),circleRadius,widthBounceDiv,heightBounceDiv,leftBounceDiv,topBounceDiv)
            this.circlesElements.push(newCircle)
            this.domInteractions.addClickEventToCircle(newCircle,(circle:Circle)=>{
                circle.actionType = ActionType.ScaleDown
            })
            this.domInteractions.addCircleToDom(newCircle.dom)
        }
        

        this.bounceInterval = setInterval(()=>{
            if(this.circlesElements.length == 0){
                clearInterval(this.bounceInterval)
                this.progressValue = 0
                this.roundObserver.next(new Round(ballsNumber,this.ballClickedCount,this.timeInSeconds))
                
                this.isStartButtonEnable = !this.isStartButtonEnable
                event.target.innerText = "Bounce"
            }

            const widthBounceDiv = this.bounceDiv.nativeElement.offsetWidth
            const heightBounceDiv = this.bounceDiv.nativeElement.offsetHeight

            const topBounceDiv = this.bounceDiv.nativeElement.offsetTop  //20
            const leftBounceDiv = this.bounceDiv.nativeElement.offsetLeft //10
            const rightBounceDiv = leftBounceDiv+widthBounceDiv
            const bottomBounceDiv = topBounceDiv+heightBounceDiv
            
            this.circlesElements = this.circlesElements.filter((circle)=>{
                if(circle.actionType==ActionType.Remove){
                    this.ballClickedCount += 1
                    this.progressValue = this.ballClickedCount*100/ballsNumber
                    this.domInteractions.removeCircleFromDom(circle.dom)
                    return false
                } else if(circle.actionType == ActionType.ScaleDown){
                    circle.scaleDown()
                    this.domInteractions.updateCircleRadiusInDom(circle.dom,circle.circleRadius)
                    this.domInteractions.updateCirclePositionInDom(circle.dom,circle.x,circle.y)
                    if(circle.circleRadius < 10)
                        circle.actionType = ActionType.Remove
                    return true;
                } else {
                    return true
                }
            })
            
            this.circlesElements.forEach((circle)=>{
                circle.moveCircle(leftBounceDiv,rightBounceDiv,topBounceDiv,bottomBounceDiv)
                this.domInteractions.updateCirclePositionInDom(circle.dom,circle.x,circle.y)
            })

            this.intervalsPassed++
            this.timeInSeconds =  this.intervalsPassed/this.FRAMSECOUNT | 0

        },this.SIXTY_FPS)
        this.isStartButtonEnable = !this.isStartButtonEnable
        } else {
            event.target.innerText = "Bounce"
            clearInterval(this.bounceInterval)
            this.roundObserver.next(new Round(ballsNumber,this.ballClickedCount,this.timeInSeconds))
            const removeInterval = setInterval(()=>{
            this.circlesElements.forEach((circle)=>{
                circle.scaleDown()
                this.domInteractions.updateCircleRadiusInDom(circle.dom,circle.circleRadius)
                this.domInteractions.updateCirclePositionInDom(circle.dom,circle.x,circle.y)
            })
            this.circlesElements = this.circlesElements.filter((circle)=>{
                if(circle.circleRadius < 10)
                {
                    this.domInteractions.removeCircleFromDom(circle.dom)
                    return false;
                } else {
                    return true;
                }
            })

            if(!this.circlesElements.length){
                this.isStartButtonEnable = !this.isStartButtonEnable
                this.progressValue = 0
                clearInterval(removeInterval)
            }

            },this.SIXTY_FPS)
    }    
}


}
