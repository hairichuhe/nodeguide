var util=require("util");
console.log(util.isRegExp(/some/));
console.log(util.isRegExp(new RegExp('some')));
console.log(util.isRegExp({}))