import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { DictionaryWordValidator } from '../service/dictionary-word.service';
import { Subscription, bufferCount, filter } from 'rxjs';
import { existWords } from './validators/existWords';
import { uniqueLetters } from './validators/uniqueLetters';
import { matchLetters } from '../utils/utils';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';


export interface Words {id: number, word: string, matched: number}
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, NgxEchartsDirective],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class GameComponent implements OnInit, OnDestroy {

  @ViewChild(FormGroupDirective)
  formDir!: FormGroupDirective;


  @Output()
  isGameStarted = new EventEmitter<boolean>(false)

  arr: Words[] = [];
  letterFrequency: { [key: string]: number } = {};

  form = this.fb.group({
    guessedWord: ['', 
    {
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{5}$/),
        uniqueLetters,
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

  win = false;

  #formSubscription!: Subscription;

  options!: EChartsOption;

  constructor(private fb: FormBuilder, private dictionaryWord: DictionaryWordValidator, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.#formSubscription = this.form.statusChanges.pipe(
      bufferCount(2,1),
      filter((prevState: any) => {
        return prevState
      })
    ).subscribe(() => {
      this.updateChartData();
      this.cd.markForCheck()}
    )

    this.updateChartData()
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
      this.arr.push({
        id: this.arr.length,
        word: guessedWord,
        matched: matchLetters(guessedWord, this.secretWord) 
      });

      this.updateLetterFrequency(guessedWord);
      this.updateChartData();
    }


    if (guessedWord === this.secretWord) {
      this.win = true;
    }

    this.formDir.resetForm({
      guessedWord: null
    })
    

  }

  private updateLetterFrequency(word: string) {
    for (const letter of word) {
      this.letterFrequency[letter] = (this.letterFrequency[letter] || 0) + 1;
    }
  }

  private updateChartData() {
    const xAxisData = Object.keys(this.letterFrequency);
    const seriesData = xAxisData.map(letter => this.letterFrequency[letter]);


    this.options = {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        minInterval: 1,
      },
      series: [{
        data: seriesData,
        type: 'bar',
        animationDelay: idx => idx * 10
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5
    };
  }

  reset() {
    this.isGameStarted.emit(false)
    this.arr = []
  }
}

