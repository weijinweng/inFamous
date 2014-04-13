var https = require('http').createServer(onRequest);
var url = require('url');
var route = require('./server/router');
var handlers = require('./server/handler');
var database = require('./server/database');
var io = require('socket.io').listen(https);
var nodemailer = require('nodemailer');
var crypto = require("crypto");
io.set('log level', 1);
//creates SMTP client to GMAIL toffeebot
var transport = nodemailer.createTransport("SMTP", {
				service: "Gmail",
				auth: {
					user: "toffeebot@gmail.com",
					pass: "caramelbitch"
					}
				});

https.listen(8080);


//email template
//transport.sendMail(mailOptions, function(error, response)
//			{
//				if(error){
//					console.log(error);
//				}else{
//					console.log("Mssage sent: " + response.message);
//				}
//			});

//clients container array
var clients = {};
//handles urls
var handler = []
	handler["/"] = handlers.front;
	handler["/front"] = handlers.front;
	handler["static"] = handlers.staticFile;
	handler["/login"] = handlers.login;
	handler["/verify"] = handlers.verify;
	handler["/iforgot"] = handlers.iforgot;
	handler["/error"] = handlers.error;
	handler["/almost-there"] = handlers.verified;
	handler["/logout"] = handlers.logout;
	handler["/home"] = handlers.home;

function onRequest(req,res)
	{
		//get request url
		var pathname = url.parse(req.url).pathname;
		//routes to handler
		route.router(req,res,pathname,handler, clients);
	}

	


io.sockets.on('connection', function (socket) {	
	socket.on('websiteCreation',function(name)
	{
		socket.emit('creationSuccess');
	});












});