var util=require("util");

function Base(){
	this.name="base";
	this.base=1991;
	this.sayHello=function(){
		console.log("hello "+this.name)
	}
};

Base.prototype.showName=function(){
	console.log(this.name)
}

function Sub(){
	this.name="sub"
}

util.inherits(Sub,Base);
var objbase=new Base();
objbase.showName();
objbase.sayHello();
console.log(objbase);

var objsub=new Sub();
objsub.showName();
// objsub.sayHello();
console.log(objsub)