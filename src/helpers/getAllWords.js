import fs from "fs";

const getAllWords = async () => {
  let array = fs.readFileSync("words.txt").toString().split("\n");
  array.sort();

  return array;
};

export default getAllWords;
