function say(word){
	console.log(word)
};
function execute(method,val){
	method(val)
};
execute(say,"hollo")