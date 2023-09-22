"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-stupid:app", () => {
  beforeEach(() => {
    const answers = {
      projectName: "generator-stupid",
      description: "generator project with tsup、biome、vitest",
      username: "yyz945947732",
      email: "945947732@qq.com"
    };
    return helpers
      .run(path.join(__dirname, "../generators/app"))
      .withPrompts(answers);
  });

  it("creates files", () => {
    const files = [
      "README.md",
      "package.json",
      "LICENSE",
      "tsup.config.ts",
      "tsconfig.json",
      "biome.json",
      ".gitignore",
      ".editorconfig",
      "src/index.ts",
      "src/index.ts",
      "types/index.d.ts",
      "test/index.test.ts"
    ];
    assert.file(files);
  });

  it("fills the README with project data", () => {
    assert.fileContent("README.md", "# generator-stupid");
    assert.fileContent("README.md", "npm install --save generator-stupid");
    assert.fileContent(
      "README.md",
      "https://www.npmjs.com/package/generator-stupid"
    );
    assert.fileContent(
      "README.md",
      "https://coveralls.io/github/yyz945947732/generator-stupid?branch=master"
    );
    assert.fileContent(
      "README.md",
      "https://github.com/yyz945947732/generator-stupid/pulls"
    );
    assert.fileContent(
      "README.md",
      "https://github.com/yyz945947732/generator-stupid/blob/master/LICENSE"
    );
  });

  it("fills the LICENSE with project data", () => {
    assert.fileContent("LICENSE", "Copyright (c) yyz945947732");
  });

  it("fills the package.json with project data", () => {
    assert.fileContent("package.json", '"name": "generator-stupid"');
    assert.fileContent(
      "package.json",
      '"description": "generator project with tsup、biome、vitest"'
    );
    assert.fileContent(
      "package.json",
      '"homepage": "https://github.com/yyz945947732/generator-stupid"'
    );
    assert.fileContent(
      "package.json",
      '"author": "yyz945947732 <945947732@qq.com>"'
    );
    assert.fileContent(
      "package.json",
      '"url": "https://github.com/yyz945947732/generator-stupid/issues"'
    );
    assert.fileContent("package.json", '"email": "945947732@qq.com"');
    assert.fileContent(
      "package.json",
      '"url": "git+https://github.com/yyz945947732/generator-stupid.git"'
    );
  });
});
