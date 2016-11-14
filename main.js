//引入events模块
var events = require("events");

//创建事件处理程序
var eventEmitter = new events.EventEmitter();

//创建事件处理程序
var connectHandler = function connected() {
	console.log("链接成功");

	//触发data_received 事件
	eventEmitter.emit("data_receive")
}

//绑定connection事件
eventEmitter.on('connection',connectHandler);

//使用匿名函数绑定data_receive事件
eventEmitter.on('data_receive',function(){
	console.log('数据接收成功。')
}) 

//触发connection事件
eventEmitter.emit('connection');

console.log("事件执行完毕。")