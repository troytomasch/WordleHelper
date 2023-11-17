import getAllWords from "./getAllWords.js";

/**
 * Calculates the frequency of each letter in the list of words
 * @returns {object}
 */
const calculateLetterFrequency = async () => {
  const allWords = await getAllWords();

  let frequency = {};
  for (let word of allWords) {
    for (let letter of word) {
      if (!frequency[letter]) {
        frequency[letter] = 1;
      } else {
        frequency[letter] = frequency[letter] + 1;
      }
    }
  }

  return frequency;
};

/**
 * Object containing the frequency of the letters in the word list
 */
const letterFrequency = {
  a: 2348,
  r: 1910,
  g: 679,
  h: 814,
  b: 715,
  c: 964,
  i: 1592,
  k: 596,
  f: 561,
  t: 1585,
  s: 3033,
  e: 3009,
  y: 886,
  o: 1915,
  m: 843,
  n: 1285,
  d: 1181,
  l: 1586,
  u: 1089,
  v: 318,
  z: 135,
  p: 955,
  x: 139,
  w: 505,
  j: 89,
  q: 53,
};

export default letterFrequency;
