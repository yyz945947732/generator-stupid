# <%= projectName %>

> <%- description %>

<p>
  <a href="https://www.npmjs.com/package/<%= projectName %>">
    <img src="https://img.shields.io/npm/v/<%= projectName %>.svg" alt="Version" />
  </a>
  <%_ if (coverage) { _%>
  <a href="https://coveralls.io/github/<%= username %>/<%= projectName %>?branch=master">
    <img
      src="https://coveralls.io/repos/github/<%= username %>/<%= projectName %>/badge.svg?branch=master"
      alt="Coverage Status"
    />
  </a>
  <%_ } _%>
  <a href="https://github.com/<%= username %>/<%= projectName %>/pulls">
    <img
      src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"
      alt="PRs Welcome"
    />
  </a>
  <a href="https://github.com/<%= username %>/<%= projectName %>/blob/master/LICENSE">
    <img
      src="https://img.shields.io/badge/license-MIT-blue.svg"
      alt="GitHub license"
    />
  </a>
</p>

## Install

```bash
npm install --save <%= projectName %>
```

## LICENSE

[MIT](https://github.com/<%= username %>/<%= projectName %>/blob/master/LICENSE)

---

This project is created using [generator-stupid](https://github.com/yyz945947732/generator-stupid).
