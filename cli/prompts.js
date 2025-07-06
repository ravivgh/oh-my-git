import enquirerPkg from "enquirer";
const { prompt } = enquirerPkg;

export async function promptAddFile() {
  return await prompt({
    type: "input",
    name: "fileName",
    message: "Enter the filename to add:",
    validate: (msg) => msg.trim() !== "" || "Filename cannot be empty!",
  });
}

export async function promptCommitMessage() {
  return await prompt({
    type: "input",
    name: "message",
    message: "Enter commit message:",
    validate: (msg) => msg.trim() !== "" || "Message cannot be empty!",
  });
}

export async function promptAddRemoteOrigin() {
  return await prompt({
    type: "input",
    name: "remoteUrl",
    message: "Enter remote origin URL:",
    validate: (url) =>
      url.startsWith("https") ||
      url.startsWith("git@") ||
      "Enter a valid remote URL",
  });
}
