import dotenv from "dotenv";
import TMClient from "./client/TMClient";

dotenv.config();

const mtClient = new TMClient();

mtClient
  .addMessageResponse([
    {
      targetMessage: "pong",
      responseMessage: "Ping!",
    },
  ])
  .finally();

mtClient.start().finally();
