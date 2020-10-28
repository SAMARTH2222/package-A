#!/usr/bin/env node

const { Command } = require('commander');
const path = require('path');
const fs = require('fs');
const locale = 'en-US';
const skillDir = '.';
const srcPath = path.join(skillDir, '/src');
const buildPath = path.join(skillDir, '/build');
const compiledSrcPath = path.join(buildPath, '/compiled-src');
const metadataPath = path.join(buildPath, '/metadata');
const inputFilePath = path.join(metadataPath, '/input-file.lst');
const outputFilePath = path.join(metadataPath, '/output-file.lst');
const logsPath = path.join(buildPath, '/logs');
const consoleLogsPath = path.join(logsPath, '/console.log');
const askirExtension = ".askir.json";

const smapiPackageDir = './.ask/smapi-package';
const dialogManagementPath = path.join(smapiPackageDir, '/dialogManagement');
const rawArtifactsPath = path.join(smapiPackageDir, '/rawArtifacts');
const askirFilePath = path.join(dialogManagementPath, '/alexaConversations/', locale, '/sampleDialogs/');
const program = new Command();
program.version('0.0.1');
 
program
  .option('--outDir <outDir>', 'output directory');
 
program.parse(process.argv);

fs.mkdirSync(buildPath, { recursive: true }, (err) => {
  if (err) console.error("Error: " + err);
});

fs.mkdirSync(compiledSrcPath, { recursive: true }, (err) => {
  if (err) console.error("Error: " + err);
});

fs.mkdirSync(metadataPath, { recursive: true }, (err) => {
  if (err) console.error("Error: " + err);
});

fs.mkdirSync(logsPath, { recursive: true }, (err) => {
  if (err) console.error("Error: " + err);
});

fs.writeFile(inputFilePath, "", (err) => {
  if (err) return console.error("Error: " + err);
});

fs.writeFile(outputFilePath, "", (err) => {
  if (err) return console.error("Error: " + err);
});

fs.readdir(srcPath, (err, files) => {
  files.forEach(file => {
    const fileName = file.split(".")[0];
    fs.writeFile(compiledSrcPath + "/" + fileName + askirExtension, "{}", (err) => {
      if (err) return console.error("Error: " + err);
    });

    fs.appendFile(inputFilePath, srcPath + "/" + file + "\n", function (err) {
      if (err) return console.error("Error: " + err);
    });

    fs.appendFile(outputFilePath, compiledSrcPath + "/" + fileName + askirExtension + "\n", function (err) {
      if (err) return console.error("Error: " + err);
    });
  });
});

fs.writeFile(consoleLogsPath, "!!! Compilation Successful !!!", (err) => {
  if (err) return console.error("Error: " + err);
});

console.log("\n\n!!! Compilation successful !!! \n\n");
console.log("Created built resources in ./build folder\n\n");