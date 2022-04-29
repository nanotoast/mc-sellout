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

// Function for bits with case's for values

client.on("cheer", (channel, userstate, message) => {
  console.log(userstate.bits);
  switch (Number(userstate.bits)) {
    case 100:
      rconSend("");
      break;
    case 200:
      rconSend("give " + mcPlayer + " iron_sword 1");
      break;
    case 300:
      rconSend("give " + mcPlayer + " iron_pick 1");
      break;
    case 400:
      rconSend("give " + mcPlayer + " flint_and_steel 1");
      break;
    case 500:
      rconSend("give " + mcPlayer + " steak 5");
      break;
    case 600:
      //speed 3
      break;
    case 700:
      break;
    case 800:
      // 16 arrows?
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
  if (tags.username.toLowerCase === "streamlabs") {
    if (message.includes("just tipped")) {
      var tipValue = message.split(" ")[3];
      var tipFormatted = tipValue.replace(/^\D+/g, "");
      switch (Number(tipFormatted)) {
        case 100:
          rconSend("$1 dono");
          break;
        case 200:
          rconSend("$2 dono");
          break;
        case 300:
          rconSend("tp " + mcPlayer + " ^ ^ ^3");
          break;
        case 2000:
          //primed tnt?
          rconSend("");
          break;
        case 10000:
          rconSend("spawnmob wither 1 " + mcPlayer);
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
    case 5:
      rconSend("spawnmob creeper 1 " + mcPlayer);
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
