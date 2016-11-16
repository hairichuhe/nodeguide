var fs=require("fs");
var data='';

//创建可读流
var readStream = fs.createReadStream("input.txt");

//设置编码为utf-8
readStream.setEncoding("UTF8");

//处理流事件
readStream.on("data",function(chunk){
	data+=chunk;
});

readStream.on("end",function(){
	console.log(data)
});

readStream.on('error',function(err){
	console.log(err)
});

console.log("程序执行完毕")