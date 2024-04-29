import { createAction, props } from "@ngrx/store";
import { Words } from "../../game/game.component";
import { GameState } from "../reducer/game.reducer";


export const loadStorageAction = createAction('[AppComponent] App load storage to store', props<{gameState: GameState}>())

export const startGameAction = createAction('[StartGame] Start game', props<{gameStatus: boolean}>());
export const selectLanguageAction = createAction('[StartGame] Select Language', props<{ln: string}>());
export const createSecretWordAction = createAction('[StartGame] Generate Secret Word ', props<{secretWord: string}>());
export const addGuessedWordAction = createAction('[Game] Add guessed words', props<{guessedWords: Words}>());

export const resetGameAction = createAction('[Game] Reset Game')