var fs=require("fs");

//创建一个可读流
var readStream=fs.createReadStream("input.txt");

//创建一个可写流
var writeStream=fs.createWriteStream("pipe.txt");

//管道操作读写 将input.txt写入到pite.txt
readStream.pipe(writeStream);

console.log("程序执行完毕！")