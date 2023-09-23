"use strict";
const Generator = require("yeoman-generator");
const path = require("path");
const askName = require("inquirer-npm-name");
const _ = require("lodash");
const chalk = require("chalk");
const yosay = require("yosay");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  initializing() {
    this.props = {
      projectName: "",
      description: "",
      username: "",
      email: "",
      coverage: true
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
        default: "tiny-project"
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
        default: this.user.git.name()
      },
      {
        name: "email",
        message: "Author's Email",
        when: !this.props.email,
        default: this.user.git.email()
      },
      {
        name: "coverage",
        message: "Use test coverage?",
        type: "confirm",
        default: true
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = _.merge(this.props, props);
    });
  }

  writing() {
    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        `Your generator must be inside a folder named ${this.props.projectName}\nI'll automatically create this folder.`
      );
      mkdirp.sync(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

    const folders = ["src", "test", "types"];
    const files = [
      "README.md",
      "package.json",
      "LICENSE",
      "tsup.config.ts",
      "tsconfig.json",
      "biome.json",
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
    this.fs.copy(
      this.templatePath("gitignore"),
      this.destinationPath(".gitignore")
    );

    if (this.props.coverage) {
      this.fs.copy(
        this.templatePath(".github"),
        this.destinationPath(".github")
      );
      this.fs.copy(
        this.templatePath("vitest.config.ts"),
        this.destinationPath("vitest.config.ts")
      );
      const pkg = this.fs.readJSON(this.destinationPath("package.json"), {});
      _.merge(pkg, {
        scripts: {
          "test:cov": "vitest run --coverage"
        },
        devDependencies: {
          "@vitest/coverage-istanbul": "^0.34.4"
        }
      });
      this.fs.writeJSON(this.destinationPath("package.json"), pkg);
    }
  }
};
