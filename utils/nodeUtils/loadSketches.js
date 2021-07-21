const fs = require("fs").promises;
const path = require("path");

/**
 * Reads the user's sketches folder and returns an array of sketch paths. 
 * 
 * @see stripFilePath if you need bare file namesas
 * 
 * @returns {Array} - array of file paths to local sketches
 */
const loadSketches = async (subfolder) => {
  try {
    const fileNames = await fs.readdir(path.resolve(__dirname, `../../sketches/${subfolder}`));
    return fileNames.map((fileName) =>
      path.resolve(__dirname, `../../sketches/${subfolder}`, fileName)
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = loadSketches;
