import getAllWords from "./getAllWords.js";

/**
 * Calculates the frequency of each letter in each position in the list of words
 * @returns {object}
 */
const calculateLetterPositionFrequency = () => {
  const allWords = getAllWords();

  let frequencies = [{}, {}, {}, {}, {}];
  for (let word of allWords) {
    for (let i = 0; i < 5; ++i) {
      if (!frequencies[i][word[i]]) {
        frequencies[i][word[i]] = 1;
      } else {
        frequencies[i][word[i]] = frequencies[i][word[i]] + 1;
      }
    }
  }

  return frequencies;
};

const positionFrequencies = [
  {
    a: 296,
    b: 432,
    c: 440,
    d: 311,
    e: 129,
    f: 318,
    g: 279,
    h: 239,
    i: 74,
    j: 73,
    k: 91,
    l: 271,
    m: 298,
    n: 118,
    o: 108,
    p: 386,
    q: 39,
    r: 268,
    s: 724,
    t: 376,
    u: 75,
    v: 109,
    w: 228,
    x: 4,
    y: 47,
    z: 24,
  },
  {
    a: 930,
    b: 32,
    c: 82,
    d: 43,
    e: 660,
    f: 12,
    g: 24,
    h: 271,
    i: 673,
    j: 4,
    l: 360,
    m: 71,
    n: 168,
    o: 911,
    p: 113,
    q: 10,
    r: 456,
    s: 40,
    t: 122,
    u: 534,
    v: 27,
    w: 81,
    x: 33,
    y: 65,
    z: 6,
    k: 29,
  },
  {
    r: 475,
    a: 605,
    b: 128,
    e: 397,
    h: 39,
    i: 516,
    l: 388,
    o: 484,
    s: 248,
    u: 313,
    y: 68,
    k: 90,
    m: 209,
    n: 410,
    t: 280,
    d: 178,
    z: 52,
    g: 139,
    f: 87,
    p: 169,
    w: 98,
    v: 121,
    c: 184,
    x: 67,
    q: 4,
    j: 8,
  },
  {
    g: 176,
    c: 210,
    f: 100,
    s: 257,
    t: 447,
    e: 1228,
    o: 262,
    a: 339,
    n: 386,
    d: 218,
    r: 310,
    u: 154,
    v: 61,
    i: 284,
    z: 41,
    p: 196,
    l: 365,
    b: 99,
    h: 73,
    y: 41,
    k: 243,
    m: 188,
    w: 70,
    j: 4,
    x: 5,
  },
  {
    h: 192,
    a: 178,
    i: 45,
    k: 143,
    t: 360,
    e: 595,
    y: 665,
    m: 77,
    d: 431,
    s: 1764,
    r: 401,
    z: 12,
    o: 150,
    g: 61,
    n: 203,
    u: 13,
    b: 24,
    x: 30,
    l: 202,
    w: 28,
    f: 44,
    c: 48,
    p: 91,
  },
];

export default positionFrequencies;
