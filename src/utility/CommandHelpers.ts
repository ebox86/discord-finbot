import {
    Client,
    ArgsOf
  } from "@typeit/discord";
  export function IsCommand(command: string) {
    let commands: string[] = [];
    Client.getCommands().forEach(element => {
      commands.push(element.commandName as string);
    });
    if (commands.includes(SanitizeCommandName(command))) {
        return true;
    } else {
        return false;
    }
  }

export function SanitizeCommandName(command: string) {
    return command.split(" ")[0].toLowerCase();
  }

export function ConvertUnixTimestamp(unixTimestamp: string) {
  var d = new Date(unixTimestamp);
  return d.toLocaleString();
}
