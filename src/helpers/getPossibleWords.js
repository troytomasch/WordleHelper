import getAllWords from "./getAllWords.js";
import getPastWords from "./getPastWords.js";
import letterFrequency from "./calculateLetterFrequency.js";

/**
 * Returns whether a word contains a given subset of letters
 * @param {*} word - The word to search through
 * @param {*} letters  - The letters to check if it includes
 * @returns {boolean}
 */
const containsLetter = (word, letters) => {
  for (let i of letters) {
    if (word.includes(i)) {
      return true;
    }
  }

  return false;
};

const getCommonLetterScore = (word, removeDuplicateLetters) => {
  if (removeDuplicateLetters == undefined) {
    removeDuplicateLetters = false;
  }

  let score = 0;
  let seen = {};
  for (let letter of word) {
    if (removeDuplicateLetters) {
      if (!seen[letter]) {
        seen[letter] = 1;
      } else {
        continue;
      }
    }
    score += letterFrequency[letter];
  }

  return score / 1000;
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
