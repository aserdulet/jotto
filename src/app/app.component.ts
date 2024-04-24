import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StartGameComponent } from './start-game/start-game.component';
import { GameComponent } from './game/game.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StartGameComponent, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jotto';

  isGameStarted = false;

  constructor(private store: Store) {

  }

  gameStarted(ev: boolean) {

    this.isGameStarted = ev;
  }
}
