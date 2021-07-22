import { Injectable } from '@angular/core';
import { MathHelperService } from '../Helpers/math-helper.service';
import { Circle } from './circle';

@Injectable({
  providedIn: 'root'
})
export class DomInteractionsService {

  constructor(private mathHelper:MathHelperService) { }

  updateCirclePositionInDom(circle:Circle,x:number,y:number){
    circle.dom.style.left=x+"px"
    circle.dom.style.top=y+"px"

    circle.x = x
    circle.y = y
  }

  updateCircleRadiusInDom(circle:Circle,newRadius:number){
      circle.dom.style.width = newRadius+"px"
      circle.dom.style.height = newRadius+"px"
      circle.circleRadius = newRadius
  }

  addCircleToDom(circle:Circle,dom:HTMLDivElement){
    dom.append(circle.dom)
  }

  removeCircleFromDom(circle:Circle,dom:HTMLDivElement){
    dom.removeChild(circle.dom)
 }


  createCircleDomElement(circleRadius:number){

      const gradientDirection = this.mathHelper.randomIntFromInterval(0,360)
      
      const colorRed1 = this.mathHelper.randomIntFromInterval(0,255)
      const colorGreen1 = this.mathHelper.randomIntFromInterval(0,255)
      const colorBlue1 = this.mathHelper.randomIntFromInterval(0,255)

      const colorRed2 = this.mathHelper.randomIntFromInterval(0,255)
      const colorGreen2 = this.mathHelper.randomIntFromInterval(0,255)
      const colorBlue2 = this.mathHelper.randomIntFromInterval(0,255)

      const newDiv = document.createElement("div");
      newDiv.classList.add("circle")
      newDiv.style.width=circleRadius+"px"
      newDiv.style.height=circleRadius+"px"
      newDiv.style.backgroundImage = `linear-gradient(${gradientDirection}deg, rgba(${colorRed1},${colorGreen1},${colorBlue1}), rgba(${colorRed2},${colorGreen2},${colorBlue2}))`

      return newDiv
  }
}
