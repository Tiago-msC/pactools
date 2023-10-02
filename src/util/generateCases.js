const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const getCasesTemplate = require("../templates/tests/cases");

function generateCases(currentPath, nome) {
  const templateSuiteComNome = getCasesTemplate(nome);

  shell.mkdir("-p", path.join(currentPath, "Testes", "Cases"));
  fs.writeFile(
    path.join(currentPath, "Testes", "Cases", `${nome}TestCases.prw`),
    templateSuiteComNome,
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );
}

module.exports = generateCases;
