#! /usr/bin/env/node

// 'use strict';

// eslint-disable-next-line no-unused-vars
const fs = require("fs");

// import yargs to create the custom commands
const yargs = require('yargs')

// eslint-disable-next-line import/extensions
const lib = require('./utils.js')

// Create add command
yargs.command({
  command: 'substitutes',
  describe: 'Substitutes one or more words in a text file',
  builder: {
    substitute: {
      describe: 'substitutes one occurrence (s) or all occurrences (g)',
      demandOption: true,  // required
      type: 'string',
      default: 's'
    },
    replaced: {
      describe: 'write the word to replace, if several words are to be replaced format then like word1|word2',
      demandOption: true,  // required
      type: 'string'
    },
    replacer: {
      describe: 'write the replacer word',
      demandOption: true,  // required
      type: 'string'
    },
    path: {
      describe: 'File path',
      demandOption: true, // required
      type: 'string'
    },
    printed: {
      describe: 'lines will be printed (p), do not print lines (n), edit the file (i) and do not print lines',
      demandOption: true,  // required
      type: 'string',
      default: 'n' 
    }
    /* script: {
      describe: 'read file with several lines and every line is a command',
      demandOption: true,  // required
      type: 'string',
      default: 'no'
    }, */
  },
  // Function for your command
  handler (argv) {
    // eslint-disable-next-line no-console
    console.log(argv)
    lib.pathExist(argv.path)
    lib.sed(argv.substitute, argv.replaced, argv.replacer, argv.path, argv.printed, argv.script)
  }
});

yargs.parse() // To set above changes
