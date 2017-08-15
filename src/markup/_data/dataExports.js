"use strict";

const path = require("path");

// ここに JSON ファイルの名前を書く
const jsonNames = [
  "path",
  "site"
];

function getData() {
  const data = {};
  const iz = jsonNames.length;
  let i = 0;

  while(i < iz) {
    let fileName = jsonNames[i];
    let filePath =  path.resolve(__dirname, `${fileName}.json`);
    if(require.cache[filePath]) {
      delete require.cache[filePath];
    }
    data[fileName] = require(filePath);
    i = i + 1;
  }

  return data;
}

module.exports = getData;
