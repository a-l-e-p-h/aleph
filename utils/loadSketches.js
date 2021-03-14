const fs = require("fs");
const path = require("path");

const loadSketches = () => {
  const sketches = [];
  fs.readdir(path.resolve(__dirname, "../sketches"), (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.forEach((file) => sketches.push(file));
    }
  });
  return sketches;
};

module.exports = loadSketches;
