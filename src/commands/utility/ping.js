const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the latency of the bot!"),
  async execute(interaction) {
    const message = await interaction.reply({ content: "Pinging..." });
    await message.edit(`Pong! check **${interaction.client.ws.ping} ms**`);
  },
};
