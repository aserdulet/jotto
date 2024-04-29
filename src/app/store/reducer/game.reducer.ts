import { createReducer, on } from "@ngrx/store";
import { Words } from "../../game/game.component";
import { addGuessedWordAction, createSecretWordAction, loadStorageAction, resetGameAction, selectLanguageAction, startGameAction } from "../actions/actions";


export interface GameState {
    gameStatus: boolean;
    secretWord: string;
    guessedWords: Words[];
    ln: string;
  }


  const {game}:any = JSON.parse(localStorage.getItem('Jotto') ?? '{}')

export const initialState: GameState = game || {
    gameStatus: false,
    secretWord: '',
    guessedWords: [],
    ln: 'en'
  }

  export const gameReducer = createReducer(
    initialState,
    on(resetGameAction, () => {
      return {
        gameStatus: false,
        secretWord: '',
        guessedWords: [],
        ln: 'en'
      }
    }),
    on(selectLanguageAction, (state, action) => {
      return {
        ...state,
        ln: action.ln.toLocaleLowerCase()
      }
    }),
    on(startGameAction, (state, action) => {
      return {
        ...state,
        gameStatus: action.gameStatus
      }
    } ),
    on(createSecretWordAction, (state, action) => {
      return {
        ...state,
        secretWord: action.secretWord
      };
    }),
    on(addGuessedWordAction, (state, action) => {
      return {
        ...state,
        guessedWords: [...state.guessedWords, action.guessedWords]
      }
    }),
    on(loadStorageAction, (state, action) => {
      return {
        ...state,
        ...action.gameState
      }
    })

  
  )