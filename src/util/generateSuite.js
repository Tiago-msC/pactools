const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const getSuiteTemplate = require("../templates/tests/suite");

function generateSuite(currentPath, nome) {
  const templateSuite = getSuiteTemplate(nome);

  shell.mkdir("-p", path.join(currentPath, "Testes", "Suite"));
  fs.writeFile(
    path.join(currentPath, "Testes", "Suite", `${nome}TestSuite.prw`),
    templateSuite,
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );
}

module.exports = generateSuite;
