"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const askName = require("inquirer-npm-name");
const _ = require("lodash");
const chalk = require("chalk");
const yosay = require("yosay");

function parseScopedName(name) {
  const nameFragments = name.split("/");
  const parseResult = {
    scopeName: "",
    localName: name
  };

  if (nameFragments.length > 1) {
    parseResult.scopeName = nameFragments[0];
    parseResult.localName = nameFragments[1];
  }

  return parseResult;
}

function makeGeneratorName(name) {
  const parsedName = parseScopedName(name);
  name = parsedName.localName;
  name = _.kebabCase(name);
  name = name.indexOf("generator-") === 0 ? name : "generator-" + name;
  return parsedName.scopeName ? `${parsedName.scopeName}/${name}` : name;
}

module.exports = class extends Generator {
  initializing() {
    this.props = {
      projectName: "",
      description: "",
      username: "",
      email: ""
    };
  }

  prompting() {
    this.log(
      yosay(`Welcome to the super ${chalk.red("generator-stupid")} generator!`)
    );

    return askName(
      {
        name: "projectName",
        message: "Your project name",
        default: makeGeneratorName(path.basename(process.cwd())),
        filter: makeGeneratorName
      },
      this
    )
      .then(props => {
        this.props.projectName = props.projectName;
      })
      .then(this._askFor.bind(this));
  }

  _askFor() {
    const prompts = [
      {
        name: "description",
        message: "Description",
        when: !this.props.description
      },
      {
        name: "username",
        message: "Author's Name",
        when: !this.props.username,
        default: this.user.git.name(),
        store: true
      },
      {
        name: "email",
        message: "Author's Email",
        when: !this.props.email,
        default: this.user.git.email(),
        store: true
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = _.merge(this.props, props);
    });
  }

  writing() {
    const folders = ["src", "test", "types"];
    const files = [
      "README.md",
      "package.json",
      "LICENSE",
      "tsup.config.ts",
      "tsconfig.json",
      "biome.json",
      ".gitignore",
      ".editorconfig"
    ];
    folders.forEach(folder =>
      this.fs.copy(this.templatePath(folder), this.destinationPath(folder))
    );
    files.forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      )
    );
  }
};
