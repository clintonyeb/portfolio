"use strict";

const Hapi = require("hapi");
const Path = require("path");

const server = new Hapi.Server();
server.connection({
  host: "0.0.0.0",
  port: +process.env.PORT || 8000
});

const plugins = [
  {
    register: require("inert")
  }
];

const routes = [
     {
      method: "GET",
      path: "/",
      handler: function(request, reply) {
        reply.file(__dirname + "/index.html");
      }
    },
    {
      method: "GET",
      path: "/views/{type}/{filename}",
      handler: function (request, reply) {
        reply.file(
          __dirname +
            "/views/" +
            request.params.type +
            "/" +
            request.params.filename
        );
      }
    },
    {
      method: "GET",
      path: "/views/css/themes/default/assets/fonts/{name}",
      handler: function (request, reply) {
        reply.file(
          __dirname +
            "/views/css/themes/default/assets/fonts/" +
            request.params.name
        );
      }
    }
]

server.register(plugins, err => {
  if (err) throw err;

  server.route(routes);

  server.start(err => {
    if (err) throw err;

    console.log("info", "Server running at: " + server.info.uri);
  });
});
