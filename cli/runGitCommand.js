import ora from "ora";
import chalk from "chalk";
import { execSync } from "child_process";

export default function runGitCommand(cmd, successMsg, failMsg) {
  const spinner = ora(`Running: ${cmd}`).start();
  try {
    execSync(cmd, { stdio: "ignore" });
    spinner.succeed(successMsg);
  } catch (e) {
    spinner.fail(failMsg);
    console.error(chalk.red(e.message));
  }
}
