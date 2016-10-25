define("c",["a","b"],function(require,exports,module){
	var a = require("a");
	var b = require("b");

	module.exports.ccc = function(){
		console.log(this.name);
		a.aaa();
		b.bbb();
	};
	module.exports.name = "CCCC";
});