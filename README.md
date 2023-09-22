# generator-stupid

> generating a project with tsup, biome, vitest

## Features

generating a tiny project use:

- 🚀 [vitest](https://vitest.dev/) for test.
- 🦌 [biome](https://biomejs.dev/) for format, lint.
- 📦 [tsup](https://tsup.egoist.dev/) for build.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-stupid using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-stupid
```

Then generate your new project:

```bash
yo stupid
```

## What do you get?

Scaffolds out a complete generator directory structure for you:

```text
.
├── src/
│    └── index.ts
├── test/
│    └── index.test.ts
├── types/
│    └── index.d.ts          
├── .editorconfig
├── .gitignore
├── biome.json
├── LICENSE
├── package.json
├── README.md
├── tsconfig.json
└── tsup.config.ts

```

## LICENSE

[MIT](https://github.com/yyz945947732/generator-stupid/blob/master/LICENSE)