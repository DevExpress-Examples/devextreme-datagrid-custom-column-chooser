const DIGIT_CHARS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
 
export function captionize(name) {
    const captionList = [];
    let i;
    let char;
    let isPrevCharNewWord = false;
    let isNewWord = false;

    for (i = 0; i < name.length; i++) {
        char = name.charAt(i);
        isNewWord =
            (char === char.toUpperCase() &&
                char !== "-" &&
                char !== ")" &&
                char !== "/") ||
            char in DIGIT_CHARS;
        if (char === "_" || char === ".") {
            char = " ";
            isNewWord = true;
        } else if (i === 0) {
            char = char.toUpperCase();
            isNewWord = true;
        } else if (!isPrevCharNewWord && isNewWord) {
            if (captionList.length > 0) {
                captionList.push(" ");
            }
        }
        captionList.push(char);
        isPrevCharNewWord = isNewWord;
    }
    return captionList.join("");
}