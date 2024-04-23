import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DictionaryWordValidator } from '../service/dictionary-word.service';
import { Subscription, filter } from 'rxjs';
import { existWords } from './validators/existWords';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class GameComponent implements OnInit, OnDestroy {



  arr: string[] = [];

  form = this.fb.group({
    guessedWord: ['', 
    {
      validators: [
        Validators.maxLength(5),
        Validators.minLength(5),
        existWords(this.arr)
      ],
      asyncValidators: [
        this.dictionaryWord.validate.bind(this.dictionaryWord)
      ],
      updateOn: 'blur'
    }
    ],
  })

  secretWord = 'world';

  #formSubscription!: Subscription;


  constructor(private fb: FormBuilder, private dictionaryWord: DictionaryWordValidator, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.#formSubscription = this.form.statusChanges.pipe(
      filter((prevState: any) => {
        return prevState
      })
    ).subscribe(() => this.cd.markForCheck())
  }

  ngOnDestroy(): void {
    this.#formSubscription.unsubscribe();
  }

  onSubmit():void {
    const {guessedWord} = this.form.value

    if (this.form.invalid) {
      return
    }

    if (guessedWord) {
      this.arr.push(guessedWord);
    }
  }
}
