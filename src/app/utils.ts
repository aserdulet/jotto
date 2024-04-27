export const generateRandomWord = (words: string[]): string => {

    if (words.length === 0) {
        return 'world'
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}