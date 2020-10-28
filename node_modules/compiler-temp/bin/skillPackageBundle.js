#!/usr/bin/env node

const { Command } = require('commander');
const { execSync } = require('child_process');
const del = require('del');
const path = require('path');
const fse = require('fs-extra');
const locale = 'en-US';

const askirExtension = ".askir.json";

const tmpPath = "/Users/dsamarth/Downloads/tmp";

const skillPath = '.';
const srcPath = path.join(skillPath, '/src');
const buildPath = path.join(skillPath, '/build');
const compiledSrcPath = path.join(buildPath, '/compiled-src');
const metadataPath = path.join(buildPath, '/metadata');
const inputFilePath = path.join(metadataPath, '/input-file.lst');
const outputFilePath = path.join(metadataPath, '/output-file.lst');
const logsPath = path.join(buildPath, '/logs');
const consoleLogsPath = path.join(logsPath, '/console.log');

const askPath = './.ask';
const smapiPackagePath = path.join(askPath, '/smapi-package');
const smapiPackageAskPath = path.join(smapiPackagePath, '/.ask');
const smapiPackageDialogManagementPath = path.join(smapiPackagePath, '/dialogManagement');
const smapiPackageACPath = path.join(smapiPackageDialogManagementPath, '/alexaConversations');
const smapiPackageResponseTemplatesPath = path.join(smapiPackageACPath + '/', locale, '/responseTemplates');
const smapiPackageSampleDialogsPath = path.join(smapiPackageACPath + '/', locale, '/sampleDialogs');
const smapiPackageSrcPath = path.join(smapiPackagePath, '/src');
const smapiPackageBuildPath = path.join(smapiPackagePath, '/build');
const smapiPackageLambdaPath = path.join(smapiPackagePath, '/lambda');
const smapiPackageInfrastructurePath = path.join(smapiPackagePath, '/infrastructure');
const smapiPackageCompiledSrcPath = path.join(smapiPackageBuildPath, '/compiled-src');
const smapiPackageMetadataPath = path.join(smapiPackageBuildPath, '/metadata');
const smapiPackageInputFilePath = path.join(smapiPackageMetadataPath, '/input-file.lst');
const smapiPackageOutputFilePath = path.join(smapiPackageMetadataPath, '/output-file.lst');
const smapiPackageLogsPath = path.join(smapiPackageBuildPath, '/logs');
const smapiPackageConsoleLogsPath = path.join(smapiPackageLogsPath, '/console.log');

const smapiPackageGitIgnorePath = path.join(smapiPackagePath, '/.gitignore');
const smapiPackageNpmIgnorePath = path.join(smapiPackagePath, '/.npmignore');
const smapiPackageAskResourcesPath = path.join(smapiPackagePath, '/ask-resources.json');
const smapiPackageLicensePath = path.join(smapiPackagePath, '/LICENSE.txt');
const smapiPackagePackageJsonsPath = path.join(smapiPackagePath, '/package*.json');

const program = new Command();
program.version('0.0.1');
 
program
  .option('--outDir <outDir>', 'output directory');
 
program.parse(process.argv);

del.sync([smapiPackagePath, tmpPath], { force: true });

fse.mkdirSync(smapiPackagePath, { recursive: true }, (err) => {
  if (err) console.error("Error: " + err);
});
fse.copySync(skillPath, tmpPath, { overwrite: true },  function (err) {
  if (err) console.error(err);
});
fse.copySync(tmpPath, smapiPackagePath, { overwrite: true },  function (err) {
  if (err) console.error(err);
});

fse.copySync(smapiPackageCompiledSrcPath, smapiPackageSampleDialogsPath, { overwrite: true },  function (err) {
  if (err) console.error(err);
});

del.sync([tmpPath, smapiPackageAskPath, smapiPackageBuildPath, smapiPackageLambdaPath, smapiPackageInfrastructurePath, smapiPackageSrcPath,
  smapiPackageGitIgnorePath, smapiPackageNpmIgnorePath, smapiPackageAskResourcesPath, smapiPackageLicensePath, smapiPackagePackageJsonsPath], { force: true });

  console.log("\n\n!!! Bundling successful !!! \n\n");
  console.log("Created SMAPI Package to deploy at ./.ask/smapi-package \n\n");