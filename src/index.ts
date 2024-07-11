import { input } from "@inquirer/prompts";
import { createHttpRequest } from "./create/create";

async function main() {
  const action = await input({ message: "[Action] Create (C) / History (H)" });

  switch (action.toLowerCase()) {
    case "c":
    case "create":
      await createHttpRequest();
      break;
    case "h":
    case "history":
      break;
    default:
      console.log("Invalid action");
      break;
  }
}

main();
