import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AppComponent } from './app.component';
import { DomInteractionsService } from './Helpers/dom-interactions.service';
import { BounceAnimationComponent } from './bounce-animation/bounce-animation.component';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import {APP_BASE_HREF} from '@angular/common';
import { GameComponent } from './game/game.component';
import { AboutComponent } from './about/about.component';
import { ExpandOnHoverDirective } from './directives/expand-on-hover.directive';


@NgModule({
  declarations: [
    AppComponent,
    BounceAnimationComponent,
    HistoryComponent,
    NavbarComponent,
    GameComponent,
    AboutComponent,
    ExpandOnHoverDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [DomInteractionsService,{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
