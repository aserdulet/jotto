import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { StartGameComponent } from './start-game/start-game.component';
import { GameComponent } from './game/game.component';
import { Store } from '@ngrx/store';
import { selectFeature, selectFeatureGameStatus } from './store/selectors/selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StartGameComponent, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'jotto';

  isGameStarted = false;

  gameStatus: any;
  constructor(private store:Store, private cd: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.store.select(selectFeatureGameStatus).subscribe(v => {
      this.gameStatus = v

      this.cd.markForCheck()
    })
  }

  gameStarted(ev: boolean) {

    this.isGameStarted = ev;
  }
}
