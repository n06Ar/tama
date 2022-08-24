import { App } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: 3000,
});

app.message("*", async ({ message }) => {
  console.log(message);
});

app.message("hello", async ({ message, say }) => {
  if ("user" in message) {
    await say(`Hello <@${message.user}>!`);
  }
});
(async () => {
  await app.start();

  console.log("Start Tama");
})();
