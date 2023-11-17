import fs from "fs";

/**
 * Gets all words from the text document of words
 * @returns {[string]}
 */
const getAllWords = async () => {
  let array = fs.readFileSync("words.txt").toString().split("\n");
  array.sort();

  return array;
};

export default getAllWords;
