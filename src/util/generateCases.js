const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

function generateCases(currentPath, nome) {
  const templatePath = path.join("src", "templates", "tests", "cases.txt");
  const templateSuite = fs.readFileSync(templatePath, "utf-8");
  const templateSuiteComNome = templateSuite.replace(
    /\${NAMECLASS}/g,
    `${nome}`
  ).replace(/\${NAMECLASSLOWER}/g, `${nome.toLowerCase()}`);

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
