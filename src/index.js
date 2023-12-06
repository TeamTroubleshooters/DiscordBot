import { Client } from "discord.js";
import { config } from "dotenv";
config();
const client = new Client({
  intents: ["Guilds", "GuildMessages"],
});

client.on("ready", (c) => {
  console.log(`Logged in as ${c.user.tag}!`);
});

client.login(process.env.BOT_TOKEN);
