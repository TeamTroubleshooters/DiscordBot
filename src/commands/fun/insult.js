const { SlashCommandBuilder } = require("discord.js");
const { roast } = require("../../assets/roast.json");

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
    const insult = roast[Math.floor(Math.random() * roast.length)];
    await interaction.reply({ content: `${user} ${insult}` });
  },
};
