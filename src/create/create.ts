import { input, editor } from "@inquirer/prompts";
import { render } from "prettyjson";

export async function createHttpRequest() {
  // Ask for the URL
  const url = await input({ message: "[URL] : " });

  // Ask the method
  const method = await input({
    message: "[Method] (GET): ",
    default: "get",
    required: false,
  });

  // Ask the body if necessary
  let body;

  if (["post", "put", "patch"].includes(method.toLowerCase())) {
    body = await editor({
      message: "[Body] : ",
      default: "{}",
      postfix: ".json",
      waitForUseInput: false,
    });
  }

  // Generate options request
  const options: RequestInit = { method };

  if (body) {
    options.body = body;
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  // Do the request
  const start = Date.now();
  const response = await fetch(url, options);
  const end = Date.now();
  const data = await response.json();

  const { status } = response;

  console.log(`[${status}] - ${end - start} ms`);
  console.log(render(data, {}));
}
