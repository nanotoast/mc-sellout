const tmi = require("tmi.js");
require("dotenv").config();

const rconSend = require("./rconmsg");

const mcPlayer = "phantomace";

const client = new tmi.Client({
  options: { debug: true },
  connection: { reconnect: true },
  identity: {
    username: process.env.BOT_NAME,
    password: process.env.BOT_OAUTH,
  },
  channels: [process.env.JOIN_CHANNEL],
});

client.connect();

// Function for bits with switch statement for values

client.on("cheer", (channel, userstate, message) => {
  console.log(userstate.bits);
  switch (Number(userstate.bits)) {
    case 100:
      rconSend("execute positioned as " + mcPlayer + " run setblock ~ ~ ~ cobweb");
      break;
    case 150:
      rconSend("title phantomace title " + `"` + message + `"`);
      break;
    case 200:
      rconSend("give " + mcPlayer + " iron_sword 1");
      break;
    case 300:
      rconSend("give " + mcPlayer + " iron_pickaxe 1");
      break;
    case 400:
      rconSend("give " + mcPlayer + " flint_and_steel 1");
      break;
    case 500:
      rconSend("give " + mcPlayer + " steakc 5");
      break;
    case 600:
      rconSend("minecraft:effect give " + mcPlayer + " speed 180 2");
      break;
    case 700:
      rconSend("give " + mcPlayer + " lava_bucket 1");
      break;
    case 800:
      rconSend("give " + mcPlayer + " arrow 16");
      break;
    case 900:
      rconSend("give " + mcPlayer + " bow 1");
      break;
    case 1000:
      rconSend("give " + mcPlayer + " enderpearl 1");
      break;
    case 5000:
      rconSend("give " + mcPlayer + " totem_of_undying 1");
      break;
    case 10000:
      rconSend("heal " + mcPlayer);
      break;
    default:
      rconSend("spawnmob chicken 1 " + mcPlayer);
  }
});

// Tips - Gets tip value from Streamlabs' message in chat.  Would be a little more reliable using Streamlabs API, but this should work.

client.on("message", (channel, tags, message) => {
  if (tags.username === "streamlabs") {
    if (message.includes("just tipped")) {
      var tipValue = message.split(" ")[3];
      var tipFormatted = tipValue.replace(/\D/g, "");
      console.log(Number(tipFormatted));
      switch (Number(tipFormatted)) {
        case 100:
          rconSend("give " + mcPlayer + " sea_pickle 2304");
          break;
        case 300:
          rconSend("tp " + mcPlayer + " ~ ~ ~3");
          break;
        case 400:
          rconSend("minecraft:effect give " + mcPlayer + " speed 120 100");
          break;
        case 500:
          rconSend("minecraft:effect give " + mcPlayer + " mining_fatigue 180 4");
          break;
        case 600:
          rconSend("minecraft:effect give " + mcPlayer + " slowness 120 4");
          break;
        case 700:
          rconSend("execute positioned as " + mcPlayer + " run setblock ~ ~-1 ~ air");
          break;
        case 1000:
          rconSend("minecraft:effect give " + mcPlayer + " blindness 120");
          setTimeout(() => {
            rconSend("spawnmob phantom 2 " + mcPlayer);
          }, 2000);
          break;
        case 1500:
          rconSend("sudo " + mcPlayer + " top");
          break;
        case 2000:
          rconSend("execute at " + mcPlayer + " run summon tnt ~ ~ ~ {Fuse:40}");
          break;
        case 2500:
          rconSend("minecraft:effect give " + mcPlayer + " jump_boost 100 60");
          break;
        case 10000:
          rconSend("spawnmob wither 1 " + mcPlayer);
          break;
        case 14400:
          rconSend("spawnmob enderdragon 1 " + mcPlayer);
          break;
        default:
          rconSend("spawnmob chicken 1 " + mcPlayer);
      }
    }
  }
});

// Subs

client.on("submysterygift", (channel, username, numbOfSubs, methods, userstate) => {
  console.log(numbOfSubs);
  switch (Number(numbOfSubs)) {
    case 1:
      rconSend("spawnmob zombie 1 " + mcPlayer);
      break;
    case 2:
      rconSend("spawnmob silverfish 3 " + mcPlayer);
      break;
    case 3:
      rconSend("minecraft:effect give " + mcPlayer + " blindness 60");
      break;
    case 4:
      rconSend("minecraft:effect give " + mcPlayer + " levitation 15");
      break;
    case 5:
      rconSend("spawnmob creeper 1 " + mcPlayer);
      break;
    case 6:
      rconSend("minecraft:effect give " + mcPlayer + " nausea 30 5");
      break;
    case 10:
      rconSend("thor " + mcPlayer);
      break;
    case 100:
      rconSend("clearinventory " + mcPlayer);
      break;
    default:
      rconSend("spawnmob chicken 1 " + mcPlayer);
  }
});

// Admin stuff

client.on("message", (channel, tags, message, self) => {
  if (self) return;
  let isMod = false;

  if (message === "!restart") {
    if (tags.badges) {
      isMod = "moderator" in tags.badges || "broadcaster" in tags.badges;

      if (isMod == true) {
        rconSend("restart");
      }
    }
  }
});

// Tests

// client.on("message", (channel, tags, message, self) => {
//   if (message === "!tador") {
//     rconSend(`title phantomace title "We're no strangers to love..."`);
//   }
// });
