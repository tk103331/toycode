var Stream = function(){
    var Stream = function(arr){
        this._data = arr;
        this._opers = [];
    };
    Stream.of = function(){
        if(arguments.length === 0 && arguments[0] instanceof Array){
            return new Stream(arguments[0]);
        }else{
            return new Stream(arguments);
        }
    };
    Stream.prototype.filter = function(func){
        this._opers.push({type:"filter",func:func});
        return this;
    };
    Stream.prototype.peek = function(func){
        this._opers.push({type:"peek",func:func});
        return this;
    };
    Stream.prototype.map = function(func){
        this._opers.push({type:"map",func:func});
        return this;
    };
    Stream.prototype.sorted = function(func){
        this._opers.push({type:"sorted",func:func});
        return this;
    };
    Stream.prototype.any = function(func){
        var _temp = this.collect();
        var _result = false;
        for (var i = 0; i < _temp.length; i++) {
            if(func(_temp[i]) === true){
                _result = true;
                break;
            }
        }
        return _result;
    };
    Stream.prototype.all = function(func){
        var _temp = this.collect();
        var _result = true;
        for (var i = 0; i < _temp.length; i++) {
            if(func(_temp[i]) === false){
                _result = false;
                break;
            }
        }
        return _result;
    };
    Stream.prototype.none = function(func){
        return !this.any(func);
    };
    Stream.prototype.count = function(){
        return this.collect().length;
    };
    Stream.prototype.reduce = function(func){
        var _temp = this.collect();
        var _result = _temp[0];
        for (var i = 1; i < _temp.length; i++) {
            _result = func(_result,_temp[i]);
        }
        return _result;
    };
    Stream.prototype.forEach = function(func){
        var _temp = this.collect();
        var _result = _temp[0];
        for (var i = 1; i < _temp.length; i++) {
            func(_temp[i]);
        }
    };
    Stream.prototype.collect = function(){
        var _result = this._data;
        for (var n = 0; n < this._opers.length; n++) {
            var op = this._opers[n];
            if(op.type === "filter"){
                var _temp = [];
                for (var i = 0; i < _result.length; i++) {
                    if(op.func(_result[i]) === true){
                        _temp.push(_result[i]);
                    }
                }
                _result = _temp;
            }else if(op.type === "peek"){
                var _temp = [];
                for (var i = 0; i < _result.length; i++) {
                    if(op.func(_result[i]) === false){
                        _temp.push(_result[i]);
                    }
                }
                _result = _temp;
            }else if(op.type === "map"){
                var _temp = [];
                for (var i = 0; i < _result.length; i++) {
                    _temp.push(op.func(_result[i]));
                }
                _result = _temp;
            }else if(op.type === "sorted"){
                var _temp = _result;
                for (var i = 0; i < _temp.length; i++) {
                    for (var j = i + 1; j < _temp.length; j++) {
                        if(op.func(_temp[i],_temp[j]) > 0){
                            var _t = _temp[i];
                            _temp[i] = _temp[j];
                            _temp[j] = _t;
                        }
                    }
                }
                _result = _temp;
            }
        }
        return _result;
    };
    return Stream;
}();