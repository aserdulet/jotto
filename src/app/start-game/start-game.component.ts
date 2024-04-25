import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, of, pluck, takeUntil, tap } from 'rxjs';
import { MaterialModule } from '../material/material.module';
import { Store } from '@ngrx/store';
import { selectLanguageAction, startGameAction } from '../store/actions/actions';

@Component({
  selector: 'app-start-game',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, FormsModule],
  templateUrl: './start-game.component.html',
  styleUrl: './start-game.component.scss'
})
export class StartGameComponent implements OnInit, OnDestroy {

  @Output()
  isGameStarted = new EventEmitter<boolean>(false);

  languages$ = of(['EN', 'RO', 'BG'])

  form = this.fb.group({
    selectLn: new FormControl('EN', [Validators.required])
  })

  #unsubscribe$ = new Subject<void>();
  constructor(private fb: FormBuilder, private store: Store) {

  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(pluck('selectLn'), takeUntil(this.#unsubscribe$)).subscribe(value => {
      if (value) {
        this.store.dispatch(selectLanguageAction({ln: value}))
      }
      }
    )
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }

  onSubmit() {
    if(this.form.invalid) {
      return
    }
    this.store.dispatch(startGameAction({gameStatus: true}))
    this.isGameStarted.emit(true);

  }

}
