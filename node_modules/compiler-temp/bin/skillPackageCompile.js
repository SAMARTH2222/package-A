#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
program.version('0.0.1');
 
program
  .option('--outDir <outDir>', 'output directory');
 
program.parse(process.argv);
 
console.log('out dir:' + program.outDir + '\n');