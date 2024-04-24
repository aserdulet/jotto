import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Words } from "../game.component";

export const existWords = (existentWords: Words[] = []): ValidatorFn => {

    return (control: AbstractControl<string | null>): ValidationErrors | null => {

        const foundExistentWords = existentWords.find(
            w => w.word.toLocaleLowerCase() === control.value?.toLocaleLowerCase()
        )

        return !foundExistentWords 
                ? null
                : {existWords: {existentWords: foundExistentWords.word}}
    }
}