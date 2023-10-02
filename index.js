#!/usr/bin/env node

const program = require('commander');
const package = require('./package.json');
const inquirer = require('inquirer');
const shell = require('shelljs');
const generateSuite = require('./src/util/generateSuite');
const generateGroup = require('./src/util/generateGroup');
const generateCases = require('./src/util/generateCases');
const chalk = require('chalk');

program
  .version(package.version)
  .description('CLI para agilizar o processo de criação de projetos em TLPP e ADVPR')
  // .option('-n, --nome <nome>', 'Nome do projeto')
  .parse(process.argv);

// deve da o comando pactools create api
program
    .command('create')
    .description('Cria um novo projeto que pode ser uma API ou arquivos para testes')
    .action((type, name) => {
        const currentDirectory = process.cwd();
        console.log(currentDirectory);
        inquirer
      .prompt([
        {
          type: 'list',
          name: 'tipo',
          message: 'O que você quer criar?',
          choices: [
            // { name: 'API', value: 1 },
            { name: 'Arquivo de testes', value: 2 },
          ],
          pageSize: 2,
        },
        {
          type: 'input',
          name: 'nome',
          message: 'Digite o nome da API:',
          when: (answers) => answers.tipo === 1,
          validate: value => value ? true : 'Digite um nome válido'
        },
        {
          type: 'input',
          name: 'namespace',
          message: 'Digite o namespace da API:',
          default: (answers) => `backoffice.revitalization.${String(answers.nome).toLowerCase()}`,
          when: (answers) => answers.tipo === 1,
          validate: value => value ? true : 'Digite um namespace válido'
        },
        {
          type: 'input',
          name: 'endpoint',
          message: 'Digite o endpoint da API:',
          default: (answers) => `/api/mude/${String(answers.nome).toLowerCase()}/`,
          when: (answers) => answers.tipo === 1,
        },
        {
          type: 'confirm',
          name: 'criarTestes',
          message: 'Você deseja que seja criado os arquivos de testes?',
          when: (answers) => answers.tipo === 1,
        },
        {
          type: 'input',
          name: 'nome',
          message: 'Qual é o nome da API que você deseja criar os testes?',
          validate: value => value ? true : 'Digite um nome válido'
        }
      ])
      .then((answers) => {
        const tipo = answers.tipo;
        const nome = answers.nome;
        const namespace = answers.namespace;
        const endpoint = answers.endpoint;
        const criarTestes = answers.criarTestes;

        // const templateSuite = fs.readFileSync('./templates/suite.txt', 'utf-8');

        if (tipo === 1) {
          console.log("Em desenvolvimento");

          if (criarTestes) {
            // generateFileTests(currentDirectory, nome);
          }
        } else if (tipo === 2) {
          generateFileTests(currentDirectory, nome);
        }
      })
    });

program.parse(process.argv);

function generateFileTests(currentDirectory, nome) {
  generateSuite(currentDirectory, nome);
  generateGroup(currentDirectory, nome);
  generateCases(currentDirectory, nome);

  console.log(`\n${chalk.gray('🎉 Foram criados as seguintes pastas e arquivos:')}\n`);
  console.log(`${chalk.green('📁 Testes')} ${chalk.yellowBright('(ADVPR)')}`);
  console.log(chalk.green('├── 📁 Suite'));
  console.log(chalk.green(`│   ├── 📄 ${nome}TestSuite.prw`));
  console.log(chalk.green('├── 📁 Group'));
  console.log(chalk.green(`│   ├── 📄 ${nome}TestGroup.prw`));
  console.log(chalk.green('└── 📁 Cases'));
  console.log(chalk.green(`    ├── 📄 ${nome}TestCases.prw`));
  console.log('\n');
}
