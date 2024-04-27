import { createReducer, on } from "@ngrx/store";
import { Words } from "../../game/game.component";
import { createSecretWordAction, resetGameAction, selectLanguageAction, startGameAction } from "../actions/actions";


export interface GameState {
    gameStatus: boolean;
    secretWord: string;
    guessedWords: Words[];
    ln: string;
  }

export const initialState: GameState = {
    gameStatus: false,
    secretWord: '',
    guessedWords: [],
    ln: 'en'
  }

  export const gameReducer = createReducer(
    initialState,
    on(resetGameAction, () => {
      return initialState
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
    })

  
  )