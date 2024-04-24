import { createReducer } from "@ngrx/store";
import { Words } from "../../game/game.component";


export interface GameState {
    gameStatus: boolean;
    secretWord: string;
    guessedWords: Words[];
  }

export const initialState: GameState = {
    gameStatus: false,
    secretWord: '',
    guessedWords: []
  }

  export const gameReducer = createReducer(
    initialState,
  )