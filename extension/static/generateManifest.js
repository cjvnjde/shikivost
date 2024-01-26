const parse = require('json-templates');
const fs = require('fs');
const data = require('./manifestTemplate.json');
const packageJson = require('../../package.json');

const template = parse(data);

const manifest = template({
  VERSION: packageJson.version,
  DESCRIPTION: packageJson.description,
});
const pathToFile = 'extension/static/assets/manifest.json';

fs.writeFile(pathToFile, JSON.stringify(manifest, null, 2), function (err) {
  if (err) {
    console.log('Error occurred while writing to file: ', err);
  } else {
    console.log('manifest.json successfully generated');
  }
});
