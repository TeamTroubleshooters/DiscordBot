const {EmbedBuilder} = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("A template for setup embed?"),
  async execute(interaction) {
    const exEmbed = new EmbedBuilder()
        .seColor("#00ff00")
        .setTitle("Title")
        .setDescription("Description")
        .addFields(
           { name: "Field 1", value: "Value 1", inline: true },
              { name: "Field 2", value: "Value 2", inline: true },
              { name: "Field 3", value: "Value 3", inline: true }, 
        )
        .setFooter("Footer")
        .setTimestamp()

    const message = await interaction.reply({ embeds: exEmbed });
  },
};
