import displayLogo from "./cli/banner.js";
import getGitUsername from "./cli/getGitUsername.js";
import gitMenu from "./cli/gitMenu.js";
import runGitCommand from "./cli/runGitCommand.js";
import {
  promptAddFile,
  promptCommitMessage,
  promptAddRemoteOrigin,
} from "./cli/prompts.js";
import chalk from "chalk";

displayLogo();

const gitUserName = await getGitUsername();

const selected = await gitMenu();

switch (selected) {
  case "init":
    runGitCommand(
      "git init",
      "Git repo initialized",
      "✖ Failed to initialize git repo"
    );
    break;
  case "addAll":
    runGitCommand("git add .", "All files staged", "✖ Failed to stage files");
    break;
  case "addFile":
    const { fileName } = await promptAddFile();
    runGitCommand(
      `git add ${fileName}`,
      `File '${fileName}' staged`,
      `✖ Failed to stage '${fileName}'`
    );
    break;
  case "commit":
    const { message } = await promptCommitMessage();
    runGitCommand(
      `git commit -m "${message}"`,
      `Commit created: "${message}"`,
      "✖ Commit failed"
    );
    break;
  case "addRemote":
    const { remoteUrl } = await promptAddRemoteOrigin();
    runGitCommand(
      `git remote add origin ${remoteUrl}`,
      `✔ Remote origin set to: ${remoteUrl}`,
      "✖ Failed to set remote origin"
    );
    break;
  case "exit":
    console.log(chalk.cyan("Exiting CLI..."));
    process.exit(0);
}
