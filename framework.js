var http = require("http");
var fs = require("fs");
var url = require("url");

//创建服务器
http.createServer(function(req,res){
	var pathName=url.parse(req.url).pathname;

	//输出请求文件名
	console.log("receive for:"+pathName+"receive");
	console.log("读取的文件的名字是："+pathName.substr(1))

	//从文件系统中请求获取文件的内容
	fs.readFile(pathName.substr(1),function(err,data){
		if(err){
			console.log(err);

			res.writeHead(404,{"content-Type":"text/html"})
		}else{
			res.writeHead(200,{"content-Type":"text/html"});
			res.write(data.toString())
		}

		res.end();
	})
}).listen("8081")

console.log("httpserver listen in 8081")