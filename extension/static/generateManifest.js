const fs = require("node:fs");
const packageJson = require("../../package.json");

const args = process.argv;

let data;

if (args[2] === "--chrome") {
  data = require("./manifestChrome.json");
} else {
  data = require("./manifestFirefox.json");
}

data.version = packageJson.version;
data.description = packageJson.description;

const pathToFile = "extension/static/assets/manifest.json";

fs.writeFile(pathToFile, JSON.stringify(data, null, 2), function (err) {
  if (err) {
    console.log("Error occurred while writing to file: ", err);
  } else {
    console.log("manifest.json successfully generated");
  }
});
