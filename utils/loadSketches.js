const fs = require("fs").promises;
const path = require("path");

const loadSketches = async () => {
  try {
    const fileNames = await fs.readdir(path.resolve(__dirname, "../sketches"));
    return fileNames.map((fileName) =>
      path.resolve(__dirname, "../sketches", fileName)
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = loadSketches;
