import chalk from "chalk";
import boxen from "boxen";
import ora from "ora";
import { execSync } from "child_process";
import enquirerPkg from "enquirer";

const { prompt } = enquirerPkg;
const Select = enquirerPkg.Select;

const terminalText = chalk.white.bold("oh my git!");
const cursorBlock = chalk.bgHex("#f25c05")(" ");

const logo = `${terminalText} ${cursorBlock}`;
const description = chalk.gray("A minimal CLI interface for developers.");
const content = `${logo}\n\n${description}`;
console.log(
  boxen(content, {
    padding: 2,
    borderStyle: "round",
    borderColor: "#444444",
  })
);

let gitUserName = "";
try {
  gitUserName = execSync("git config --global user.name", {
    encoding: "utf8",
  }).trim();
} catch {
  gitUserName = "";
}
if (!gitUserName) {
  console.log(
    boxen(chalk.yellow("Git global username not found!"), {
      padding: 1,
      borderColor: "red",
      margin: 1,
    })
  );

  const { name } = await prompt({
    type: "input",
    name: "name",
    message: "Enter your name for Git config:",
    validate: (value) => value.trim() !== "" || "Name cannot be empty!",
  });

  try {
    execSync(`git config --global user.name "${name}"`);
    console.log(chalk.green(`✔ Git username set globally to: ${name}`));
  } catch (error) {
    console.error(chalk.red("✖ Failed to set Git username"));
    console.error(error.message);
  }
} else {
  console.log(
    chalk.green(`✔ Git global username is already set to: ${gitUserName}`)
  );
}
// 2️⃣ Git menu options
const gitMenu = new Select({
  name: "action",
  message: "Choose a Git action:",
  choices: [
    { name: "init", message: "Initialize Git repo (git init)" },
    { name: "addAll", message: "Add all files (git add .)" },
    { name: "addFile", message: "Add specific file (git add filename)" },
    { name: "commit", message: "Commit with message (git commit -m)" },
    { name: "exit", message: "Exit" },
  ],
});

const selected = await gitMenu.run();

// 3️⃣ Perform Git command with spinners
const runCommand = (cmd, successMsg, failMsg) => {
  const spinner = ora(`Running: ${cmd}`).start();
  try {
    execSync(cmd, { stdio: "ignore" }); // suppress command output
    spinner.succeed(successMsg);
  } catch (e) {
    spinner.fail(failMsg);
    console.error(chalk.red(e.message));
  }
};

switch (selected) {
  case "init":
    runCommand(
      "git init",
      "✔ Git repo initialized",
      "✖ Failed to initialize git repo"
    );
    break;

  case "addAll":
    runCommand("git add .", "✔ All files staged", "✖ Failed to stage files");
    break;

  case "addFile":
    const { fileName } = await prompt({
      type: "input",
      name: "fileName",
      message: "Enter the filename to add:",
    });
    runCommand(
      `git add ${fileName}`,
      `✔ File '${fileName}' staged`,
      `✖ Failed to stage '${fileName}'`
    );
    break;

  case "commit":
    const { message } = await prompt({
      type: "input",
      name: "message",
      message: "Enter commit message:",
      validate: (msg) => msg.trim() !== "" || "Message cannot be empty!",
    });
    runCommand(
      `git commit -m "${message}"`,
      `✔ Commit created: "${message}"`,
      "✖ Commit failed"
    );
    break;

  case "exit":
    console.log(chalk.cyan("Exiting CLI..."));
    process.exit(0);
    break;
}
