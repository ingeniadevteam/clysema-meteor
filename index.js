"use strict";

const simpleDDP = require("simpleddp");
const ws = require("isomorphic-ws");
const simpleDDPLogin = require("simpleddp-plugin-login").simpleDDPLogin;
const validation =  require("./validation");

module.exports = async (app) => {
  let config, opts;
  // get a validated config object
  try {
    config = await app.modules.jsonload(`${app.path}/config/meteor.json`);
    app.config.meteor = await validation(config);
  } catch (e) {
    throw e;
  }

  opts = {
      endpoint: app.modules.env.isDevelopment ?
        `ws://${app.config.meteor.server}:${app.config.meteor.port}/websocket` :
        `wss://${app.config.meteor.server}:${app.config.meteor.port}/websocket`,
      SocketConstructor: ws,
      reconnectInterval: 5000
  };

  // create the server
  const server = new simpleDDP(opts, [simpleDDPLogin]);
  // connect
  server.connect();

  server.on('connected', () => {
    app.modules.logger.log("debug", "connected to meteor", opts.endpoint);
    // login
    let userAuth;
    server.login({
      password: app.config.meteor.creds.password,
      user: { email: app.config.meteor.creds.email }
    }).then((doc) => {
      app.modules.logger.log("info", "meteor userId", doc.id);
    }).catch(e => {
      app.modules.logger.log("error", "meteor", e.message);
    });
  });

  server.on('disconnected', () => {
    app.modules.logger.log("warn", "meteor disconnected");
  });

  // setup the exit hook
  app.exitHook(() => {
    try {
      server.disconnect();
      app.modules.logger.log("info", "meteor disconnected");
    } catch (e) {
      app.modules.logger.log("error", e.message);
    }
  });

  return server;
};
