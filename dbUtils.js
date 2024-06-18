const fs = require("fs").promises; 
const path = require("path");

const PATH_DB = path.join(__dirname, "db", "data.json");
const ENCODING = "utf-8";


const readFile = async () => {
  try {
    const content = await fs.readFile(PATH_DB, ENCODING);
    return JSON.parse(content);
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err; 
  }
};

const writeFile = async (content) => {
  try {
    const updateFile = JSON.stringify(content, null, 2);
    await fs.writeFile(PATH_DB, updateFile, ENCODING);
  } catch (err) {
    throw err;
  }
};

module.exports = { readFile, writeFile };
