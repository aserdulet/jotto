import { AbstractControl, ValidationErrors } from "@angular/forms";

export const uniqueLetters = (control:AbstractControl<string | null>): ValidationErrors | null => {

    const splittedgW = control.value

    const letterCounts: {[key: string]: number} = {}
    let totalReps = 0;
    
    if (splittedgW) {
        for (const char of splittedgW) {
            if (letterCounts[char]) {
                letterCounts[char]++
            } else {
                letterCounts[char] = 1

            }
        }

        for (const char in letterCounts) {

            if (letterCounts[char] > 1) {
                totalReps += letterCounts[char]
            }
        }
    }
    return totalReps === 0 
            ? null
            : {uniqueLetters: {isNotUnique: totalReps}}
}