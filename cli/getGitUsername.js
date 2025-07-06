import chalk from "chalk";
import boxen from "boxen";
import { execSync } from "child_process";
import enquirerPkg from "enquirer";
const { prompt } = enquirerPkg;

export default async function getGitUsername() {
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
      return name;
    } catch (error) {
      console.error(chalk.red("✖ Failed to set Git username"));
      console.error(error.message);
      return "";
    }
  } else {
    console.log(
      chalk.green(`✔ Git global username is already set to: ${gitUserName}`)
    );
    return gitUserName;
  }
}
