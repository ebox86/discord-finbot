import {
    Client,
    ArgsOf,
    GuardFunction
  } from "@typeit/discord";
import { IsCommand, SanitizeCommandName } from "../utility/CommandHelpers";
  export function NotCommand() {
    const guard: GuardFunction<"message"> = async (
      [message],
      client,
      next
    ) => {
      let command = SanitizeCommandName(message.content);
      if (!IsCommand(command)) {
        console.log(command + " is not a command, process quote");
        await next();
      }
    };
    return guard;
  }
