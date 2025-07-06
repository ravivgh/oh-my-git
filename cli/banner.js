import chalk from "chalk";
import boxen from "boxen";

function displayLogo() {
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
}

export default displayLogo;
