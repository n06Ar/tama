import dotenv from "dotenv";
import TMClient from "./client/TMClient";
import messages from "./config/messages";

dotenv.config();

const mtClient = new TMClient();

mtClient.addMessageResponse(messages);

mtClient
  .addMessageResponse([
    {
      targetMessage: "pong",
      responseMessage: "Ping!",
    },
  ])
  .finally();

mtClient.start();
