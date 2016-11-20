// hello.js
function hello (){
	var name;
	this.setName=function(nName){
		name=nName;
	};
	this.sayHello=function(){
		console.log("hello "+name)
	}
};
module.exports=hello;