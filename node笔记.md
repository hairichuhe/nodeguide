# node笔记
（阅读地址：[node教程](http://fis.baidu.com/fis3/docs/beginning/intro.html)）

# 应用创建
## 引入模块
require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http，实例如下: 
```
var http = require("http");
```

## 创建服务器
使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据。

实例如下，在你项目的根目录下创建一个叫 server.js 的文件，并写入以下代码：

```
var http = require('http');

http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello World"
	response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```
打开浏览器8888端口将看到返回的数据

# npm使用介绍
NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

    允许用户从NPM服务器下载别人编写的第三方包到本地使用。
    允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
    允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

## 基础使用说明
由于新版的nodejs已经集成了npm，所以之前npm也一并安装好了。同样可以通过输入 "npm -v" 来测试是否成功安装。命令如下，出现版本提示表示安装成

如果你安装的是旧版本的 npm，可以很容易得通过 npm 命令来升级，命令如下：
```
npm install npm -g
```
 查看全局安装的命令：
```
$ npm ls -g
```
## Package.json 属性说明


    name - 包名。

    version - 包的版本号。

    description - 包的描述。

    homepage - 包的官网 url 。

    author - 包的作者姓名。

    contributors - 包的其他贡献者姓名。

    dependencies - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。

    repository - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。

    main - main 字段是一个模块ID，它是一个指向你程序的主要项目。就是说，如果你包的名字叫 express，然后用户安装它，然后require("express")。

    keywords - 关键字

## 卸载模块

```
$ npm update express
```

## 搜索模块

```
$ npm search express
```

# Node.js 回调函数

Node.js 异步编程的直接体现就是回调。

异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。

回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。

例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

## 阻塞代码实例
创建一个文件 input.txt 
创建 main.js 文件, 代码如下：
```
var fs = require("fs");

var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("程序执行结束!");
```

## 非阻塞代码实例
```
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log("程序执行结束!");
```

# 事件循环
Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。

Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。

Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。

Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

[什么是进程，什么事线程](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)

## 事件驱动程序
![](event_loop.jpg)

理解：事件产生器发送事件，事件循环器往事件处理器里面加事件，事件形成队列，当某个事件执行完的时候，就触发某个事件对于的回调函数。

node.js 有多个内置模块，事件模块是其中之一，可以通过引入events模块，并通过实例化eventemitter(事件产生器)类来绑定和监听事件实例如下：
```
//引入events模块
var events = require('events');
//创建事件发射器
var eventEmitter = new events.EventEmitter();
```

绑定事件处理程序
```
eventEmitter.on("eventName",enentHandler)
```

触发事件
```
eventEmitter.emit("eventName");
```

## 实例
创建mian.js文件
```
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
```
[main.js文件地址](main.js)


## node应用程序是如何工作的

 在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。

接下来让我们来重新看下前面的实例，创建一个 input.txt ,文件内容如下：
```
晓军博客地址：www.wangxiaojun.top
```
创建read.js代码如下：
```
```
[read.js文件地址](read.js)


 以上程序中 fs.readFile() 是异步函数用于读取文件。 如果在读取文件过程中发生错误，错误 err 对象就会输出错误信息。

如果没发生错误，readFile 跳过 err 对象的输出，文件内容就通过回调函数输出。

执行以上代码，执行结果如下：

```
程序执行完毕！
晓军博客地址：www.wangxiaojun.top
```

接下来我们删除 input.txt 文件，执行结果如下所示：
```
程序执行完毕
Error: ENOENT, open 'input.txt'
```

# EventEmitter
ndoe.js所有的异步i/o操作在完成时都会发送一个事件到事件队列。
node.js里面的许多对象都会分发事件：一个net.server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。 

理解：就像一个女人生了一个机器人，在某个指令下达的时候，他从事一些事情，等等，等同于java中的一个类；注意,他没有自由的权利，得手动触发。

## EventEmitter 类