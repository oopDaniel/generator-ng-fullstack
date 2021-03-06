"use strict";

const Base = require('yeoman-generator').Base;
const chalk = require('chalk');
const yosay = require('yosay');
const MainGenerator = require('../_ng/full/generator').MainGenerator;

module.exports = class NgFullstack extends Base {
    constructor(args, options, config) {
        super(args, options, config);

        this.generator = new MainGenerator(this);
    }

    initializing() {
      this.pkg = require('../package.json');
    }

    prompting() {
      this.generator.sayHello();
    }

    writing() {
      this.generator.writing();
    }

    install() {
      this.generator.install();
    }

    prompUser() {
      this.generator.promptUser();
    }

    promptServer() {
      this.generator.promptServer();
    }

    promptClient() {
      this.generator.promptClient();
    }

    promptUserTranspilerServer() {
      this.generator.promptTranspilerServer();
    }
}
