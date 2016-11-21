var http=require("http");
var url=require("url");

function start(route){
	function onRequest(request,response){
		var pathName=url.parse(request.url).pathname;
		console.log("receive for"+pathName+"received");

		route(pathName);

		response.writeHead(200,{"content-Type":"text/plain"});
		response.write("hello word");
		response.end();
	}
	http.createServer(onRequest).listen("8888");
	console.log("server has start")
}

exports.start=start;