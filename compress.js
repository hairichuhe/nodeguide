var fs=require("fs");
var zlib=require("zlib");

//压缩input.txt文件为 input.txt.gz
fs.createReadStream("input.txt")
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream("input.txt.gz"));

console.log("程序执行完毕！")