import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { DomInteractionsService } from './Helpers/dom-interactions.service';
import { BounceAnimationComponent } from './bounce-animation/bounce-animation.component';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BounceAnimationComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [DomInteractionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
