import {
    Client,
    ArgsOf,
    GuardFunction
  } from "@typeit/discord";
  export function NotCommand() {
    const guard: GuardFunction<"message"> = async (
      [message],
      client,
      next
    ) => {
      let commands: string[] = [];
      Client.getCommands().forEach(element => {
        commands.push(element.commandName as string);
      });
      if (!commands.includes(message.content)) {
        console.log("its not a command, process quote");
        await next();
      }
    };

    return guard;
  }
