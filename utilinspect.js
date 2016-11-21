var util=require("util");
function Person() {
	this.name="aaa";
	this.toString=function(){
		console.log(this.name)
	}
}
var obj=new Person();
console.log(util.inspect(obj))
console.log(util.inspect(obj,true))