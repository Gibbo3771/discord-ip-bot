import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadWebhooksFromFile } from "./config/webhooks.js";

// Some globals to setup
global.__dirname = path.dirname(fileURLToPath(import.meta.url));

let currentIp = "";

const ipifyUrl = "https://api.ipify.org?format=json";
const checkInterval = 15000;
const cacheFilePath = path.resolve(__dirname, "cache/data.json");

const assignIp = async () => {
  const {
    data: { ip },
  } = await axios.get(ipifyUrl);
  const oldIp = currentIp;
  currentIp = ip;
  return ip !== oldIp;
};

const send = () => {
  const data = {
    username: "IP Bot",
    content: `The current server IP is **${currentIp}**`,
  };
  const webhooks = loadWebhooksFromFile();
  for (const url of webhooks.urls) {
    axios.post(url, data);
  }
};

const writeKnownIpToCache = () => {
  try {
    fs.writeFileSync(cacheFilePath, JSON.stringify({ ip: currentIp }), {
      flag: "w",
    });
  } catch (error) {
    console.error("Error writing cache: ", error);
  }
};

const readLastKnownIpFromCache = () => {
  try {
    const file = fs.readFileSync(cacheFilePath);
    const { ip } = JSON.parse(file);
    currentIp = ip;
  } catch (error) {
    fs.writeFileSync(cacheFilePath, JSON.stringify({ ip: null }), {
      flag: "w",
    });
  }
};

const execute = async () => {
  const didChange = await assignIp();
  if (didChange) {
    writeKnownIpToCache();
    send();
  }
};

const init = async () => {
  await execute();
  readLastKnownIpFromCache();
  setInterval(async () => {
    try {
      await execute();
    } catch (error) {
      console.error(error);
    }
  }, checkInterval);
};

init();
