const argv = require('minimist')(process.argv);
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { execFile } = require('child_process');
const log = console.log;
const questionArg = 'question';
const inputArg = 'input';
const lineSeparator = '\n';
const dataSeparator = ' ';
const extensionIn = '.in';
const extensionOut = '.out';

const quiz = async () => {
    if (argv && argv.hasOwnProperty(questionArg) && argv.hasOwnProperty(inputArg)) {
        const questionNumber = argv.question;
        const input = argv.input;
        const inputPath = `./data/input/${questionNumber}/${input}${!input.includes(extensionIn) ? extensionIn : ''}`;
        if (fs.existsSync(inputPath)) {
            const file = fs.readFileSync(inputPath);
            const data = file.toString().trim().split(lineSeparator).map(line => line.split(dataSeparator));
            const questionPath = `./src/processors/${questionNumber}.js`;

            if (fs.existsSync(questionPath)) {
                const question = eval(fs.readFileSync(questionPath).toString());
                const answer = question(data);
                const answerFolderPath = `./data/output/${questionNumber}/`;
                if (!fs.existsSync(answerFolderPath)) {
                    await mkdirp(answerFolderPath);
                }
                const answerFilePath = `${answerFolderPath}${input.replace(extensionIn, '')}${extensionOut}`;
                fs.writeFileSync(answerFilePath, answer);
                const {error, stdout, stderr} = await execFile('code', [answerFilePath]);
                log(chalk.green(`Output written to ${answerFilePath}`));
            } else {
                log(chalk.red(`Question file does not exist (${questionPath})`));
            }
        } else {
            log(chalk.red(`Input file does not exist (${inputPath})`));
        }
    } else {
        log(chalk.red('Please provide a question and input file (e.g. npm run go -- --question 1 --input a_example.in'));
    }
}

module.exports = quiz;