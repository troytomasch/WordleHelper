import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

const getPastWords = async (getNewWords) => {
  if (getNewWords) {
    const request = await axios.get(
      "https://www.rockpapershotgun.com/wordle-past-answers"
    );
    const $ = cheerio.load(request.data);
    const list = $(".inline");
    let pastWords = [];
    list.find("li").each((index, element) => {
      const word = $(element).text();
      pastWords.push(word.toLowerCase());
    });

    return pastWords;
  }

  let array = fs.readFileSync("pastWords.txt").toString().split("\n");
  return array;
};

export default getPastWords;
