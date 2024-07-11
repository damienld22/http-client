import { input } from "@inquirer/prompts";
import { render } from "prettyjson";

export async function createHttpRequest() {
  const url = await input({ message: "[URL] : " });

  const start = Date.now();
  const response = await fetch(url);
  const end = Date.now();
  const data = await response.json();

  const { status } = response;

  console.log(`[${status}] - ${end - start} ms`);
  console.log(render(data, {}));
}
