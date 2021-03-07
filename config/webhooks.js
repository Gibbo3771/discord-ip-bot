import fs from "fs";
import path from "path";

export const loadWebhooksFromFile = () => {
  const webhookFilePath = path.resolve(__dirname, "webhooks.json");
  try {
    const file = fs.readFileSync(webhookFilePath);
    return JSON.parse(file);
  } catch (error) {
    if (error.errno === -2) {
      throw new Error(
        "The webhooks.json file could not be found, ensure it exists at " +
          webhookFilePath
      );
    }
  }
};
