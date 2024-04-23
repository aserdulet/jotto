import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const existWords = (existentWords: string[] = []): ValidatorFn => {

    return (control: AbstractControl<string | null>): ValidationErrors | null => {

        const foundExistentWords = existentWords.find(
            word => word.toLocaleLowerCase() === control.value?.toLocaleLowerCase()
        )

        return !foundExistentWords 
                ? null
                : {existWords: {existentWords: foundExistentWords}}
    }
}