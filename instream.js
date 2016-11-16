var fs=require("fs");
var data="晓军博客地址：www.wangxiaojun.top";

//创建一个可写入的流到output.txt中
var writeStream = fs.createWriteStream("output.txt");

//使用utf8写入数据
writeStream.write(data,"UTF8");

//标记文件末尾
writeStream.end();

//处理事件流
writeStream.on("finish",function(){
	console.log("写入完成")
})

writeStream.on("error",function(err){
	console.log(err)
})

console.log("程序执行完毕")