const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("insult")
    .setDescription("Replies with an insult!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to insult")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const insult = await fetch(
      "https://evilinsult.com/generate_insult.php?lang=en&type=json"
    );
    const { insult: text } = await insult.json();
    await interaction.reply({ content: `${user} ${text}` });
  },
};
