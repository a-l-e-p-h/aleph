const { basename } = require("path");

/**
 * Uses node's path.basename to return the bare file name (with extension)
 *
 * @param {String} filePath
 * @returns {String} - bare file path
 */
const stripFilePath = (filePath) => {
  return basename(filePath);
};

module.exports = stripFilePath;
