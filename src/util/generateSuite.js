const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

function generateSuite(currentPath, nome) {
  const templatePath = path.join("src", "templates", "tests", "suite.txt");
  const templateSuite = fs.readFileSync(templatePath, "utf-8");
  const templateSuiteComNome = templateSuite.replace(
    /\${NAMECLASS}/g,
    `${nome}`
  );

  shell.mkdir("-p", path.join(currentPath, "Testes", "Suite"));
  fs.writeFile(
    path.join(currentPath, "Testes", "Suite", `${nome}TestSuite.prw`),
    templateSuiteComNome,
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );
}

module.exports = generateSuite;
