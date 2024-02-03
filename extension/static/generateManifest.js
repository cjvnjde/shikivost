const fs = require('node:fs');
const data = require('./manifestTemplate.json');
const packageJson = require('../../package.json');

data.version = packageJson.version;
data.description = packageJson.description;
data.manifest_version = 2;

const pathToFile = 'extension/static/assets/manifest.json';

fs.writeFile(pathToFile, JSON.stringify(data, null, 2), function (err) {
  if (err) {
    console.log('Error occurred while writing to file: ', err);
  } else {
    console.log('manifest.json successfully generated');
  }
});
