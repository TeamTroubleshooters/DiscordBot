import { SlashCommandBuilder } from "@discordjs/builders";

const sayCommand = new SlashCommandBuilder()
  .setName("say")
  .setDescription("Replies with your input!")
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("The input to echo back")
      .setRequired(true)
      .addChoices(
        { name: "Hello", value: "hello.." },
        { name: "Test", value: "Test" }
      )
  );

export default sayCommand.toJSON();
