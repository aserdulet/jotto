export const matchLetters = (guessedWord: string, secretWord: string): number => {

    let count = 0

    for (let i = 0; i < guessedWord.length; i++) {
        let char = guessedWord[i];
        for (let k = 0; k < secretWord.length; k++) {
            if (char ===  secretWord[k]){
                count ++
            }
        }
    }
    return count;
}