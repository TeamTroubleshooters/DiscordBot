import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}!`);
});

client.on("messageCreate", (message) => {
  message.reply("Pong!");
});

client.login(process.env.BOT_TOKEN);
