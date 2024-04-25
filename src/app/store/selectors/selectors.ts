import { createSelector } from "@ngrx/store";
import { GameState } from "../reducer/game.reducer";

export interface AppState {
    game: any
}

export const selectFeature = (state: AppState) => state.game;

export const selectFeatureGameStatus = createSelector(
    (state: any) => state.game,
    (feature: GameState) => feature.gameStatus
)

export const selectFeatureLn = createSelector(
    (state: any) => state.game,
    (feature: GameState) => feature.ln
)