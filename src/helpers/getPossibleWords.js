import getAllWords from "./getAllWords.js";
import getPastWords from "./getPastWords.js";
import letterFrequency from "./calculateLetterFrequency.js";
import positionFrequencies from "./calculateLetterPositionFrequency.js";

/**
 * Returns whether a word contains a given subset of letters
 * @param {string} word - The word to search through
 * @param {string} letters  - The letters to check if it includes
 * @returns {boolean}
 */
const containsLetter = (word, letters) => {
  let lettersArray = letters.split("");
  for (let i of lettersArray) {
    if (word.includes(i)) {
      return true;
    }
  }

  return false;
};

/**
 * Returns whether a word has all the necessary yellow letters
 * @param {string} word - The word to search through
 * @param {[[string, [number]]]} letters - The letters to check if it includes and the already seen positions
 * @returns
 */
const correctYellowLetters = (word, letters) => {
  for (let char of letters) {
    if (!word.includes(char[0])) {
      return false;
    }
    for (let pos of char[1]) {
      if (word[pos - 1] == char[0]) {
        return false;
      }
    }
  }

  return true;
};

/**
 * Returns whether the word has the green letters in the correct spot
 * @param {string} word The word to be checked
 * @param {[[string, number]]} letters
 */
const correctGreenLetter = (word, letters) => {
  for (let greenLetter of letters) {
    if (word[greenLetter[1] - 1] != greenLetter[0]) {
      return false;
    }
  }

  return true;
};

/**
 * Returns a score representative of how common the letters are
 * @param {string} word - Word to score
 * @param {boolean} removeDuplicateLetters - Choose whether or not to score duplicate letters, default = true
 * @returns {number}
 */
const getCommonLetterScore = (word, removeDuplicateLetters) => {
  if (removeDuplicateLetters == undefined) {
    removeDuplicateLetters = true;
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

const removeScore = (wordsList, wordToRemove) => {
  let newList = [];
  let minScore = 50;
  let minWord = "";
  for (let [word, score] of wordsList) {
    if (word != wordToRemove) {
      newList.push([word, score]);
      if (score < minScore) {
        minScore = score;
        minWord = word;
      }
    }
  }

  return [newList, minWord, minScore];
};

/**
 * Returns a score representative of how common the letters are in their given positions in the word
 * @param {*} word - Word to score
 * @returns
 */
const getCommonLetterScoreWithPosition = (word) => {
  let score = 0;
  for (let i = 0; i < 4; i++) {
    score += positionFrequencies[i][word[i]];
  }

  return score / 100;
};

/**
 * Returns a list of possible words based on letters and past Wordle answers
 * @param {number} listLength - The amount of words it should return
 * @param {boolean} removePastWords - Choose whether to remove past Wordle words from the possible words - Default = false
 * @param {string} grayLetters - String of letters to not include - Default = []
 * @param {[[string, [number]]]} yellowLetters - Letters where the position is not known and the positions it's already been seen - Default = []
 * @param {[[string, number]]} greenLetters - Letters where the position is known - Default = []
 * @returns {[string]}
 */
const getPossibleWords = async (
  listLength = 10,
  removePastWords = false,
  grayLetters = "",
  yellowLetters = "",
  greenLetters = []
) => {
  let i = -1;
  let j = 0;

  let allWords = await getAllWords();
  let possibleWords = [];
  let minListScore = 50;
  let minWord = "";

  if (removePastWords) {
    let pastWords = await getPastWords(false);

    while (j < pastWords.length && i < allWords.length - 1) {
      i++;
      if (pastWords[j] != allWords[i]) {
        let word = allWords[i];
        if (containsLetter(word, grayLetters)) {
          continue;
        }
        if (!correctYellowLetters(word, yellowLetters)) {
          continue;
        }
        if (!correctGreenLetter(word, greenLetters)) {
          continue;
        }
        let letterScore = getCommonLetterScore(word);
        let positionScore = getCommonLetterScoreWithPosition(word);
        let currentWordScore = Number(
          ((letterScore * positionScore) / 10).toFixed(3)
        );
        if (possibleWords.length < listLength) {
          if (currentWordScore < minListScore) {
            minListScore = currentWordScore;
            minWord = word;
          }
          possibleWords.push([word, currentWordScore]);
        } else {
          if (currentWordScore > minListScore) {
            possibleWords.push([word, currentWordScore]);
            let removedScore = removeScore(possibleWords, minWord);
            possibleWords = [];
            for (let word of removedScore[0]) {
              possibleWords.push(word);
            }
            minWord = removedScore[1];
            minListScore = removedScore[2];
          }
        }
      } else {
        j++;
      }
    }
  } else {
    for (let word of allWords) {
      if (containsLetter(word, grayLetters)) {
        continue;
      }
      if (!correctYellowLetters(word, yellowLetters)) {
        continue;
      }
      if (!correctGreenLetter(word, greenLetters)) {
        continue;
      }
      let letterScore = getCommonLetterScore(word);
      let positionScore = getCommonLetterScoreWithPosition(word);
      let currentWordScore = Number(
        ((letterScore * positionScore) / 10).toFixed(3)
      );
      if (possibleWords.length < listLength) {
        if (currentWordScore < minListScore) {
          minListScore = currentWordScore;
          minWord = word;
        }
        possibleWords.push([word, currentWordScore]);
      } else {
        if (currentWordScore > minListScore) {
          possibleWords.push([word, currentWordScore]);
          let removedScore = removeScore(possibleWords, minWord);
          possibleWords = [];
          for (let word of removedScore[0]) {
            possibleWords.push(word);
          }
          minWord = removedScore[1];
          minListScore = removedScore[2];
        }
      }
    }
  }

  possibleWords.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1;
    } else {
      return 1;
    }
  });
  return possibleWords;
};

export default getPossibleWords;
