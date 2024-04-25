import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormBuilder, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { DictionaryWordValidator } from '../service/dictionary-word.service';
import { Subject, bufferCount, filter, takeUntil } from 'rxjs';
import { existWords } from './validators/existWords';
import { uniqueLetters } from './validators/uniqueLetters';
import { matchLetters } from '../utils/utils';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { Store } from '@ngrx/store';
import { resetGameAction, startGameAction } from '../store/actions/actions';


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

  #unsubscribe$ = new Subject<void>();

  options!: EChartsOption;

  constructor(private fb: FormBuilder, private dictionaryWord: DictionaryWordValidator, private cd: ChangeDetectorRef, private store: Store) {

  }

  ngOnInit(): void {
    this.form.statusChanges.pipe(
      bufferCount(2,1),
      filter((prevState: any) => {
        return prevState
      }),
      takeUntil(this.#unsubscribe$)
    ).subscribe(() => {
      this.updateChartData();
      this.cd.markForCheck()}
    )

    this.updateChartData()

    this.dictionaryWord.getLanguage().pipe(takeUntil(this.#unsubscribe$)).subscribe(v => this.dictionaryWord.language = v)
  }
  

  ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete()
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
  configChart: {[key: string]: boolean} = {
    showOptions: false,
    sort: false,
    highest: false
  };

  private updateLetterFrequency(word: string) {
    for (const letter of word) {
      this.letterFrequency[letter] = (this.letterFrequency[letter] || 0) + 1;
    }
  }

  private updateChartData(configChart: {[key:string]: boolean} = {sort: false, highest: false, showOptions: false}) {
    const lettersData =  Object.keys(this.letterFrequency);
    const xAxisData = configChart['sort'] ? lettersData.sort() : lettersData
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
        data: configChart['highest'] ? seriesData.sort((a,b) => a-b) : seriesData,
        type: 'bar',
        animationDelay: idx => idx * 10
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: idx => idx * 5
    };
  }

  reset() {
    this.store.dispatch(resetGameAction())}
  testReset() {
    this.store.dispatch(startGameAction({gameStatus: false}))
  }

  configureChart(instruction: string = 'default'): void {

    switch(instruction) {
      case 'toggle options':
        this.configChart['showOptions'] = !this.configChart['showOptions']
        break;
      case 'sort':
        this.configChart['sort'] = !this.configChart['sort']
        this.updateChartData(this.configChart);
        break;
      case 'highest':
        this.configChart['highest'] = !this.configChart['highest']
        this.updateChartData(this.configChart);  
        break;
      default:
        this.updateChartData()  
    }
  }
}

