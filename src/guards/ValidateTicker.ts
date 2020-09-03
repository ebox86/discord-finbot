import {
    Client,
    ArgsOf,
    GuardFunction
  } from "@typeit/discord";
  export function ValidateTicker() {
    const guard: GuardFunction<"message"> = async (
      [message],
      client,
      next
    ) => {
      let m = message.content.split(" ");
      const ticker = m.length > 1 ? m[1] : m[0];
      if (/^[A-Z0-9]{1,4}$/i.test(ticker) && !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(ticker)) {
        console.log("valid ticker passed - " + ticker);
        await next();
      }
    };

    return guard;
  }
