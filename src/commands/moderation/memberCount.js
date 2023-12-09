const {
  SlashCommandBuilder,
  PermissionsBitField,
  VoiceChannel,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercountvc")
    .setDescription(
      "Creates a voice channel named after the current member count."
    )
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("The type of channel to create.")
        .setRequired(true)
        .addChoices(
          {
            name: "Voice Channel",
            value: "ChannelType.GuildVoice",
          },
          {
            name: "Stage Channel",
            value: "ChannelType.GuildStageVoice",
          },
          {
            name: "Text Channel",
            value: "ChannelType.GuildText",
          },
          {
            name: "Announcement Channel",
            value: "ChannelType.GuildAnnouncement",
          }
        )
    ),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    ) {
      return await interaction.reply(
        "You do not have permission to use this command."
      );
    }

    const channelName = `Members: ${interaction.guild.memberCount}`;
    const existingChannel = interaction.guild.channels.cache.find(
      (channel) => channel.name === channelName && channel.type === VoiceChannel
    );

    if (existingChannel) {
      return await interaction.reply(
        "A voice channel with the same name already exists."
      );
    }

    try {
      let channelType = interaction.options.getString("type");
      if (channelType === "ChannelType.GuildVoice") {
        channelType = ChannelType.GuildVoice;
      } else if (channelType === "ChannelType.GuildStageVoice") {
        channelType = ChannelType.GuildStageVoice;
      } else if (channelType === "ChannelType.GuildText") {
        channelType = ChannelType.GuildText;
      } else if (channelType === "ChannelType.GuildAnnouncement") {
        channelType = ChannelType.GuildAnnouncement;
      } else {
        return await interaction.reply(
          "You must provide a valid channel type."
        );
      }
      const newChannel = await interaction.guild.channels.create({
        name: channelName,
        type: channelType,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [
              PermissionsBitField.Flags.Connect,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });
      await interaction.reply(`Created channel ${newChannel}.`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "An error occurred while creating the voice channel."
      );
    }
  },
};
