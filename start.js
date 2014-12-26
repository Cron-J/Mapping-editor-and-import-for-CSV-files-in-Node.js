var static = require('node-static');
var express = require("express"),
    app = express();
var fileServer = new static.Server('./');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {    	
        fileServer.serve(request, response, function (e, res) {
	        if (e && (e.status === 404)) { // If the file wasn't found       
		        fileServer.serveFile('./client/view/index2.html', 404, {}, request, response);
	        }
        });
    }).resume();
}).listen(3000);

