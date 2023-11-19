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
 * @param {string} letters - The letters to check if it includes
 * @returns
 */
const correctYellowLetters = (word, letters) => {
  let lettersArray = letters.split("");
  for (let i of lettersArray) {
    if (!word.includes(i)) {
      return false;
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
 * @param {number} minLetterScore - Minimum letter score it needs to be counted - Default = 11
 * @param {number} minPositionScore - Minimum letter with position score it needs to be counted - Default = 20
 * @param {boolean} removePastWords - Choose whether to remove past Wordle words from the possible words - Default = false
 * @param {[string]} grayLetters - Letters to remove to not include - Default = []
 * @returns {[string]}
 */

/**
 * Returns a list of possible words based on letters and past Wordle answers
 * @param {number} minLetterScore - Minimum letter score it needs to be counted - Default = 11
 * @param {number} minPositionScore - Minimum letter with position score it needs to be counted - Default = 20
 * @param {boolean} removePastWords - Choose whether to remove past Wordle words from the possible words - Default = false
 * @param {string} grayLetters - String of letters to not include - Default = []
 * @param {string} yellowLetters - Letters where the position is not known - Default = []
 * @param {[[string, number]]} greenLetters - Letters where the position is known - Default = []
 * @param {[string]} pastWord - Past words you have entered - Default = []
 * @returns {[string]}
 */
const getPossibleWords = async (
  minLetterScore = 11,
  minPositionScore = 20,
  removePastWords = false,
  grayLetters = "",
  yellowLetters = "",
  greenLetters = [],
  pastWords = []
) => {
  //   if (minLetterScore == undefined) {
  //     minLetterScore = 11;
  //   }

  //   if (minPositionScore == undefined) {
  //     minPositionScore = 20;
  //   }

  //   if (removePastWords == undefined) {
  //     removePastWords = false;
  //   }

  //   if (grayLetters == undefined) {
  //     grayLetters = [];
  //   }

  //   if (yellowLetters == undefined) {
  //     yellowLetters = [];
  //   }

  //   if (greenLetters == undefined) {
  //     greenLetters = [];
  //   }

  //   if (pastWords == undefined) {
  //     pastWords = [];
  //   }

  let i = -1;
  let j = 0;

  let allWords = await getAllWords();
  let possibleWords = [];
  if (removePastWords) {
    let pastWords = await getPastWords(false);
    while (j < pastWords.length && i < allWords.length - 1) {
      i++;
      console.log(`${pastWords[j]} ${allWords[i]}`);
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
        if (letterScore < minLetterScore) {
          continue;
        }
        let positionScore = getCommonLetterScoreWithPosition(word);
        if (positionScore < minPositionScore) {
          continue;
        }
        if (pastWords.includes(word)) {
          continue;
        }
        possibleWords.push([word, letterScore, positionScore]);
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
      if (letterScore < minLetterScore) {
        continue;
      }
      let positionScore = getCommonLetterScoreWithPosition(word);
      if (positionScore < minPositionScore) {
        continue;
      }
      if (pastWords.includes(word)) {
        continue;
      }
      possibleWords.push([word, letterScore, positionScore]);
    }
  }

  return possibleWords;
};

console.log(
  await getPossibleWords(
    4,
    8,
    false,
    "gnomsabrity",
    "e",
    [["d", 1]],
    ["gnome", "saber", "deity"]
  )
);

export default getPossibleWords;
