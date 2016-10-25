define("test",["c"],function(require,exports,module){
	var c = require("c");

	return {
		name:"TEST",
		test:function(){
			console.log(this.name);
			c.ccc();
		}
	};
});