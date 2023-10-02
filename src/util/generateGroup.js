const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const getGroupTemplate = require("../templates/tests/group");

function generateGroup(currentPath, nome) {
  const templateSuiteComNome = getGroupTemplate(nome);

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
