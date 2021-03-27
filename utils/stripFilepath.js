const { basename } = require("path");

const stripFilePath = (filePath) => {
  return basename(filePath);
};

module.exports = stripFilePath;
