beejs = {};
beejs.cache = {}

beejs.require = function(id){
	if(beejs.isLoaded(id)){
		return beejs.get(id).exports;
	}else {
		return null;
	}
};
beejs.get = function(id){
	return beejs.cache[id];
};
beejs.isRequested = function(id){
	return beejs.get(id)?true:false;
};
beejs.isCached = function(id){
	return beejs.get(id).id?true:false;
};
beejs.isLoaded = function(id){
	return beejs.get(id)?beejs.get(id).loaded:false;
};

beejs.check = function(deps){
	for (var i = 0; i < deps.length; i++) {
		if(!beejs.isLoaded(deps[i])){
			return false;
		}
	}
	return true;
}

beejs.resolve = function(deps,callback){
	if(beejs.check(deps)){
		callback();
	}else{
		for (var i = 0; i < deps.length; i++) {
			var id = deps[i];
			if(!beejs.isRequested(id)){
				beejs.request(deps[i],function(){
					beejs.resolve(deps,callback);
				});
			}
		}
	}
}

beejs.request = function(id,callback){
	beejs.cache[id] = {};
	var doc = document;
	var head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
	var ele = document.createElement("script");
	ele.type = "text/javascript";
	ele.charset = "utf-8";
	ele.src = id + ".js";
	head.appendChild(ele);
	ele.onload = callback;
};

beejs.use = function(deps,callback){
	beejs.resolve(deps,function(){
		var params = new Array();
		for (var i = 0; i < deps.length; i++) {
			params.push(beejs.get(deps[i]).exports);
		}
		callback.apply(null,params);
	});
};

function define(id,deps,factory){
	var module = {};
	module.id = id;
	module.exports = {};
	module.loaded = false;
	beejs.cache[id] = module;
	beejs.resolve(deps,function(){
		var ret = factory(beejs.require,module.exports,module);
		if(ret){
			module.exports = ret;
		}
		module.loaded = true;
	});
}

