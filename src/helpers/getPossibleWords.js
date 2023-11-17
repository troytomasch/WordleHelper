import getAllWords from "./getAllWords.js";
import getPastWords from "./getPastWords.js";

const containsLetter = (word, letters) => {
  for (let i of letters) {
    if (word.includes(i)) {
      return true;
    }
  }

  return false;
};

const getPossibleWords = async (removePastWords, letters) => {
  if (letters == undefined) {
    letters = [];
  }

  let i = 0;
  let j = 0;

  let allWords = await getAllWords();
  let possibleWords = [];
  if (removePastWords) {
    let pastWords = await getPastWords(false);
    while (j < pastWords.length && i < allWords.length) {
      if (pastWords[j] != allWords[i]) {
        if (!containsLetter(allWords[i], letters)) {
          possibleWords.push(allWords[i]);
        }
        i++;
      } else {
        i++;
        j++;
      }
    }
  } else {
    for (let word of allWords) {
      if (!containsLetter(word, letters)) {
        console.log(word);
        possibleWords.push(word);
      }
    }
  }

  return possibleWords;
};

export default getPossibleWords;
