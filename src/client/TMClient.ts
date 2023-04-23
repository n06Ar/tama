import { Client, Events, GatewayIntentBits } from "discord.js";
import TMMessageEvent from "../type.d/TMMessageEvent";

const TOKEN: string = process.env.DISCORD_TOKEN;
class TMClient {
  /**
   * Discord Client Instance.
   * @private
   */
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  /**
   * Start Discord Client
   */
  async start() {
    try {
      this.client.once(Events.ClientReady, () => {
        console.log(`Logged in as ${this.client.user.tag}!`);
      });

      await this.client.login(TOKEN);
    } catch (error) {
      console.error({ error });
    }
  }

  async addMessageResponse(massageEvents: TMMessageEvent[]) {
    massageEvents.forEach((event) => {
      this.client.on(Events.MessageCreate, (message) => {
        if (message.author.bot) return;

        if (message.content === event.targetMessage) {
          message.channel.send(event.responseMessage).catch((e) => {
            console.error(e);
          });
        }
      });
    });
  }
}

export default TMClient;
