import { R3TargetBinder } from '@angular/compiler';
import { AfterViewInit, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Circle } from './DomClasses/circle';
import { DomInteractionsService } from './DomClasses/dom-interactions.service';
import { MathHelperService } from './Helpers/math-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

    readonly bounceAnimation = [
        {color: 'coral'},
        {color: 'rgb(250, 238, 76)', transform: 'translateX(-45px) translateY(25px) scale(1.2)'},
        {color: 'rgb(61, 236, 114)', transform: 'translateX(45px) translateY(25px) scale(0.8)'},
        {color: 'rgb(58, 158, 204)', transform: 'translateX(45px) translateY(-25px) scake(1.4)'},
        {color: 'rgb(221, 56, 180)', transform: 'translateX(-45px) translateY(-25px) scale(0.6)'},
        {color: 'coral'}
    ];


    animateTitle(event:any){
        event.target.animate(this.bounceAnimation, {
            duration: 2000,
            iterations: 3
        });
        
    };

}
