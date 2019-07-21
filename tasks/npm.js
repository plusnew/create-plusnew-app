const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const DEPENDENCIES = ['plusnew'];
const DEV_DEPENDENCIES = [
  "@plusnew/simulate-dom-events",
  "@types/enzyme",
  "@types/jasmine",
  "awesome-typescript-loader",
  "clean-webpack-plugin",
  "css-loader",
  "enzyme",
  "enzyme-adapter-plusnew",
  "file-loader",
  "html-webpack-plugin",
  "identity-obj-proxy",
  "istanbul-instrumenter-loader",
  "jasmine-core",
  "jest",
  "karma",
  "karma-chrome-launcher",
  "karma-coverage-istanbul-reporter",
  "karma-jasmine",
  "karma-sourcemap-loader",
  "karma-webpack",
  "mini-css-extract-plugin",
  "node-sass",
  "sass-loader",
  "script-ext-html-webpack-plugin",
  "ts-jest",
  "tslint",
  "tslint-config-airbnb",
  "typescript",
  "webpack",
  "webpack-cli",
  "webpack-dev-server",
];

function changeProjectname(dest, projectName) {
  const packagePath = path.join(dest, 'package.json');
  const package = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (package.name === '') {
    package.name = projectName;
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));
  }
}

function installDependencies(dest) {
  installDependency(dest, false, DEPENDENCIES);
  installDependency(dest, true, DEV_DEPENDENCIES);
}

function installDependency(dest, dev, packages) {
  spawnSync('npm', ['install', ...packages, dev ? '--save-dev' : '--save'], { cwd: dest, stdio: 'inherit' });
}

module.exports = function(dest, projectName) {
  changeProjectname(dest, projectName);
  installDependencies(dest);
}
