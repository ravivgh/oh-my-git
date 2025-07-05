import enquirer from "enquirer";
const { prompt } = enquirer;
import ora from "ora";
import chalk from "chalk";
import boxen from "boxen";

console.log(
  boxen(chalk.blue.bold("🚀 Welcome to My CLI Tool!"), {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "cyan",
  })
);

const answers = await prompt([
  {
    type: "input",
    name: "username",
    message: "What is your name?",
    validate: (value) =>
      value.trim() !== ""
        ? true
        : chalk.red.bold.underline("Name cannot be empty!"),
  },
  {
    type: "select",
    name: "language",
    message: "Pick your language:",
    choices: ["JavaScript", "Python", "Go"],
  },
  {
    type: "multiselect",
    name: "features",
    message: "Choose CLI features:",
    choices: ["Init Repo", "Commit", "Push", "Pull"],
  },
  {
    type: "confirm",
    name: "confirm",
    message: "Do you want to continue?",
  },
]);

if (!answers.confirm) {
  console.log(chalk.yellow("⚠️ Operation canceled."));
  process.exit(0);
}

const spinner = ora("Processing your setup...").start();
await new Promise((res) => setTimeout(res, 2000));
spinner.succeed("✅ Setup complete!");

console.log(
  boxen(
    `
${chalk.green.bold("User:")} ${chalk.white(answers.username)}
${chalk.green.bold("Language:")} ${chalk.white(answers.language)}
${chalk.green.bold("Features:")} ${chalk.white(answers.features.join(", "))}
    `.trim(),
    {
      padding: 1,
      borderStyle: "double",
      borderColor: "green",
    }
  )
);
