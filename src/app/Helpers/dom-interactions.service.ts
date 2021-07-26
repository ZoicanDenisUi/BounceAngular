import { Injectable } from '@angular/core';
import { Circle } from '../HelpingClasses/circle';
import { randomIntFromInterval } from './mathHelper';

@Injectable({
  providedIn: 'root'
})
export class DomInteractionsService {
  
  private parentDiv:HTMLDivElement;

  constructor() {}

  initialize(dom:HTMLDivElement){
    this.parentDiv = dom
  }
  
  updateCirclePositionInDom (circleDom:HTMLDivElement, x:number, y:number) {
    // eslint-disable-next-line no-param-reassign
    circleDom.style.left = `${x}px`
    // eslint-disable-next-line no-param-reassign
    circleDom.style.top = `${y}px`
  }

  updateCircleRadiusInDom (circleDom:HTMLDivElement, newRadius:number) {
    // eslint-disable-next-line no-param-reassign
    circleDom.style.width = `${newRadius}px`
    // eslint-disable-next-line no-param-reassign
    circleDom.style.height = `${newRadius}px`
  }

  addClickEventToCircle(circle:Circle,fn:(circle:Circle)=>void){
    circle.dom.addEventListener('click',()=>{
      fn(circle)
    })
  }

  addCircleToDom (circleDom:HTMLDivElement) {
    this.parentDiv.append(circleDom)
  }

  removeCircleFromDom (circleDom:HTMLDivElement) {
    this.parentDiv.removeChild(circleDom)
  }


  createCircleDomElement (circleRadius:number):HTMLDivElement {
    const gradientDirection:number = randomIntFromInterval(0, 360)
  
    const colorRed1:number = randomIntFromInterval(0, 255)
    const colorGreen1:number = randomIntFromInterval(0, 255)
    const colorBlue1:number = randomIntFromInterval(0, 255)
  
    const colorRed2:number = randomIntFromInterval(0, 255)
    const colorGreen2:number = randomIntFromInterval(0, 255)
    const colorBlue2:number = randomIntFromInterval(0, 255)
  
    const newDiv:HTMLDivElement = document.createElement('div')
  
    newDiv.classList.add('circle')
    newDiv.style.width = `${circleRadius}px`
    newDiv.style.height = `${circleRadius}px`
    newDiv.style.backgroundImage = `linear-gradient(${gradientDirection}deg, rgba(${colorRed1},${colorGreen1},${colorBlue1}), rgba(${colorRed2},${colorGreen2},${colorBlue2}))`
  
    return newDiv
  }
}
