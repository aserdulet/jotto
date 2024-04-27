import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { SecretWordService } from "../../service/secret-word.service";
import { createSecretWordAction, startGameAction } from "../actions/actions";
import { catchError, map, mergeMap, of, withLatestFrom } from "rxjs";
import { Store, select } from "@ngrx/store";
import { selectFeatureLn } from "../selectors/selectors";
import {generateRandomWord} from '../../utils'

@Injectable()
export class SecretWordEffect {
    populateSecretWord$ = createEffect(() => 
        this.action$.pipe(
            ofType(startGameAction),
            withLatestFrom(this.store.pipe(select(selectFeatureLn))),
            mergeMap(([_, stateValue = 'en']) => this.secretWordService.getWords().pipe( 
                map((words) => createSecretWordAction({secretWord: generateRandomWord(words[stateValue])})),
                catchError(error => {
                    return of({ type: 'FETCH_WORDS_FAILED' });
                })
            ))
        )
    );

    constructor(private action$: Actions, private secretWordService: SecretWordService, private store: Store) {}
}
