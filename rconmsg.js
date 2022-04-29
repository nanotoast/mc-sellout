const Rcon = require("modern-rcon");
require("dotenv").config();

const rcon = new Rcon(process.env.RCON_IP, process.env.RCON_PASSWORD);

const rconSend = function (command) {
  rcon
    .connect()
    .then(() => {
      return rcon.send(command);
    })
    .then(() => {
      return rcon.disconnect();
    });
};

module.exports = rconSend;
