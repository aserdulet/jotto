import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { LocalStorageService } from "../../service/local-storage.service";
import { addGuessedWordAction, createSecretWordAction, resetGameAction, startGameAction } from "../actions/actions";
import { tap } from "rxjs";

@Injectable()
export class StorageEffect {
    
    updateStorage$ = createEffect(() => 
    this.action$.pipe(
        ofType(startGameAction, createSecretWordAction, addGuessedWordAction, resetGameAction),
        tap(() => {
            this.store.subscribe(state => {
                this.localStorage.set('Jotto', state)
            })
        })
    ), {dispatch: false}
    )

    constructor(private action$: Actions, private store:Store, private localStorage: LocalStorageService<any>) {

    }
}