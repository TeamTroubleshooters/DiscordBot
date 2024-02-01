const {EmbedBuilder} = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const channelID = "1202558613164400721";
module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("A template for setup embed?"),
  async execute(interaction) {
    const exEmbed = new EmbedBuilder()
        .setTitle("Title")
        .setDescription("Description")
        .addFields(
           { name: "Field 1", value: "Value 1", inline: true },
              { name: "Field 2", value: "Value 2", inline: true },
              { name: "Field 3", value: "Value 3", inline: true }, 
        )
        .setFooter({text: "Footer"})
        .setTimestamp()

    // const message = await interaction.reply({ embeds: exEmbed });
    //send embed to channel
    const channel = await interaction.client.channels.fetch(channelID);
    channel.send({ embeds: [exEmbed] });
  },
};
