const { Events } = require("discord.js");

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    console.log(message.author.username, message.guild.name);
  },
};
