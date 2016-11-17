function execute(method,val) {
	method(val)
};
execute(function(word){console.log(word)},"hello");