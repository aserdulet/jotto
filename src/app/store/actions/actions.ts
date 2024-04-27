import { createAction, props } from "@ngrx/store";
import { Words } from "../../game/game.component";

export const startGameAction = createAction('[StartGame] Start game', props<{gameStatus: boolean}>());
export const selectLanguageAction = createAction('[StartGame] Select Language', props<{ln: string}>());
export const createSecretWordAction = createAction('[StartGame] Generate Secret Word ', props<{secretWord: string}>());

export const resetGameAction = createAction('[Game] Reset Game')