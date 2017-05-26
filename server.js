"use strict";

const Hapi = require("hapi");
const Path = require("path");
const NodeMailer = require('nodemailer');

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
    handler: function(request, reply) {
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
    handler: function(request, reply) {
      reply.file(
        __dirname +
          "/views/css/themes/default/assets/fonts/" +
          request.params.name
      );
    }
  },
  {
    method: "POST",
    path: "/contact",
    handler: function(request, reply) {
      const mailer = request.server.app.mailer;
      let data = request.payload;

      let mail = {
        from: '<clinton@tinglingcode.com>',
        to: 'clintonmethis@gmail.com',
        subject: "Contact - Website",
        text: `Message from ${data.name},\nEmail: ${data.email} \nMessage: ${data.message}`
      };

      mailer.sendMail(mail, (err, info) => {
        if (err) {
          return;
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
      });

      return reply();
    }
  }
];

server.register(plugins, err => {
  if (err) throw err;

  server.route(routes);

  server.app.mailer = new Mailer();

  server.start(err => {
    if (err) throw err;

    console.log("info", "Server running at: " + server.info.uri);
  });
});

function Mailer() {
  this.transporter = NodeMailer.createTransport({
    host: "smtp.tinglingcode.com",
    port: 587,
    secure: false,
    auth: {
      user: "clinton@tinglingcode.com",
      pass: "holyspirit33"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  this.sendMail = function(options, callback) {
    this.transporter.sendMail(options, callback);
  };
}
