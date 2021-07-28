import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Round } from '../HelpingClasses/round';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  {

  roundObserver:Subject<Round> = new Subject<Round>() ;

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
    
  constructor() { }

}
