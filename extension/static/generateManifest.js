const fs = require("node:fs");
const packageJson = require("../../package.json");

const args = process.argv;

let data;

if (args[2] === "--chrome") {
  data = require("./manifestChrome.json");
} else {
  data = require("./manifestFirefox.json");
}

const ciVersion = process.env.VERSION;

if (ciVersion && ciVersion.startsWith("v")) {
  data.version = ciVersion.slice(1);
} else {
  data.version = packageJson.version;
  console.warn("Using package.json version.");
}

data.description = packageJson.description;

const pathToFile = "extension/static/assets/manifest.json";

fs.writeFile(pathToFile, JSON.stringify(data, null, 2), function (err) {
  if (err) {
    console.log("Error occurred while writing to file: ", err);
  } else {
    console.log("manifest.json successfully generated");
  }
});
