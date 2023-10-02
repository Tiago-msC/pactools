const fs = require("fs");
const path = require("path");
const shell = require("shelljs");

function generateGroup(currentPath, nome) {
  const templatePath = path.join("src", "templates", "tests", "group.txt");
  const templateSuite = fs.readFileSync(templatePath, "utf-8");
  const templateSuiteComNome = templateSuite.replace(
    /\${NAMECLASS}/g,
    `${nome}`
  );

  shell.mkdir("-p", path.join(currentPath, "Testes", "Group"));
  fs.writeFile(
    path.join(currentPath, "Testes", "Group", `${nome}TestGroup.prw`),
    templateSuiteComNome,
    (err) => {
      if (err) {
        return console.log(err);
      }
    }
  );
}

module.exports = generateGroup;
