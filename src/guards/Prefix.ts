import {
    Client,
    ArgsOf,
    GuardFunction
  } from "@typeit/discord";
  export function Prefix(text: string, replace: boolean = true) {
    const guard: GuardFunction<"message"> = async (
      [message],
      client,
      next
    ) => {
      const startWith = message.content.startsWith(text);
      if (replace) {
        message.content = message.content.split(text).join("");
      }
      if (startWith) {
        await next();
      }
    };

    return guard;
  }
