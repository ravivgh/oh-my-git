import enquirerPkg from "enquirer";
const Select = enquirerPkg.Select;

export default async function gitMenu() {
  const menu = new Select({
    name: "action",
    message: "Choose a Git action:",
    choices: [
      { name: "init", message: "Initialize Git repo (git init)" },
      { name: "addAll", message: "Add all files (git add .)" },
      { name: "addFile", message: "Add specific file (git add filename)" },
      { name: "commit", message: "Commit with message (git commit -m)" },
      {
        name: "addRemote",
        message: "Add remote origin (git remote add origin)",
      },
      { name: "exit", message: "Exit" },
    ],
  });

  return await menu.run();
}
