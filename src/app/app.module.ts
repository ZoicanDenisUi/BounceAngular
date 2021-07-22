import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DomInteractionsService } from './DomClasses/dom-interactions.service';
import { MathHelperService } from './Helpers/math-helper.service';
import { BounceAnimationComponent } from './bounce-animation/bounce-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    BounceAnimationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MathHelperService,DomInteractionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
