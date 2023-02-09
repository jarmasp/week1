#! /usr/bin/env/node

// imports file system to read files
const fs = require("fs");
// eslint-disable-next-line no-unused-vars
const { listeners } = require("process");

function pathExist(path) {
  if (fs.existsSync(path)) {
    // eslint-disable-next-line no-console
    return true;
  }
  // eslint-disable-next-line no-console
  return false;
}

// eslint-disable-next-line consistent-return
function sed(substitute, replaced, replacer, path, printed) {

  if (pathExist(path) === true) {

    fs.copyFile(path, `copy${path}`, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`source file was copied to: ${path}`);
    });

    if (substitute === "g") {

      const data = fs.readFileSync(path, "utf8");

      const string = data.toString();

      let newData = string.replaceAll(replaced, replacer);
      
      newData = newData.toString();

      if (printed === 'p') {
        // eslint-disable-next-line no-console
        console.log(newData);
      } else if (printed === 'i') {
        fs.writeFileSync(path, newData, err => {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
          }
          // file written successfully
        });
      } else if (printed === 'n') {
        // eslint-disable-next-line no-console
        console.log('No print option was selected')
      }

      // eslint-disable-next-line no-console
    } else if (substitute === "s") {

      let data = fs.readFileSync(path, "utf8");

      data = data.toString(); 
      
      // eslint-disable-next-line no-param-reassign
      replaced = RegExp(`^${replaced}*`, 'gm')

      let newData = data.replace(replaced, replacer);

      newData = newData.toString();

      if (printed === 'p') {
        // eslint-disable-next-line no-console
        console.log(newData);
      } else if (printed === 'i') {
        fs.writeFileSync(path, newData, err => {
          if (err) {
            // eslint-disable-next-line no-console
            console.error(err);
          }
          // file written successfully
        });
      } else if (printed === 'n') {
        // eslint-disable-next-line no-console
        console.log('No print option was selected')
      }
    }

  } else {
    // eslint-disable-next-line consistent-return, no-console
    return console.log("invalid path");
  }
}

module.exports = { pathExist, sed }