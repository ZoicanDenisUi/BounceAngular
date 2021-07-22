import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Circle } from '../DomClasses/circle';
import { DomInteractionsService } from '../DomClasses/dom-interactions.service';
import { MathHelperService } from '../Helpers/math-helper.service';

@Component({
  selector: 'app-bounce-animation',
  templateUrl: './bounce-animation.component.html',
  styleUrls: ['./bounce-animation.component.css']
})
export class BounceAnimationComponent {

  @ViewChild('bounceDiv') bounceDiv!: ElementRef<HTMLDivElement>  
  @ViewChild('ballCountInput') ballCountInput!: ElementRef<HTMLInputElement>  

  isStartButtonEnable:boolean = true
  bounceInterval:any 
  circlesElements:Circle[] = []

  readonly animationInterval = 16.6


  constructor(private mathHelper:MathHelperService,private domInteractions:DomInteractionsService){

  }

  

  animateBalls(event:any){
    if(this.isStartButtonEnable){
        event.target.value = "Stop"
        let ballsNumber:number = parseInt(this.ballCountInput.nativeElement.value)

        let {width:widthBounceDiv,height:heightBounceDiv,left:leftBounceDiv,top:topBounceDiv} = this.bounceDiv.nativeElement.getBoundingClientRect();
        
        for(let i=0;i<ballsNumber;i++){
            const newCircle:Circle = new Circle(widthBounceDiv,heightBounceDiv,leftBounceDiv,topBounceDiv)
            this.circlesElements.push(newCircle)
            this.domInteractions.addCircleToDom(newCircle,this.bounceDiv.nativeElement)
        }
        

        this.bounceInterval = setInterval(()=>{
            let {top:topBounceDiv,left:leftBounceDiv,bottom:bottomBounceDiv,right:rightBounceDiv} = this.bounceDiv.nativeElement.getBoundingClientRect();
            this.circlesElements.forEach((circle)=>{
                circle.moveCircle(leftBounceDiv,rightBounceDiv,topBounceDiv,bottomBounceDiv)
            })
        },this.animationInterval)
        this.isStartButtonEnable = !this.isStartButtonEnable
    } else {
        event.target.innerText = "Bounce"
        clearInterval(this.bounceInterval)
        const removeInterval = setInterval(()=>{
            this.circlesElements.forEach((circle)=>{
                let newRadius = (circle.circleRadius-2)
                let newX = circle.x+1
                let newY = circle.y+1

                this.domInteractions.updateCircleRadiusInDom(circle,newRadius)
                this.domInteractions.updateCirclePositionInDom(circle,newX,newY)
            
            })
            this.circlesElements = this.circlesElements.filter((circle)=>{
                if(circle.circleRadius > 10)
                {
                    return true;
                } else {
                    this.domInteractions.removeCircleFromDom(circle,this.bounceDiv.nativeElement)
                    return false;
                }
            })

            if(!this.circlesElements.length){
                this.isStartButtonEnable = !this.isStartButtonEnable
                clearInterval(removeInterval)
            }

        },this.animationInterval)
    }    
}


}
