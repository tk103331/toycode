var Stream = function(){
    var Stream = function(arr){
        this._data = arr;
        this._opers = [];
    };
    Stream.of = function(){
        if(arguments.length === 1 && arguments[0] instanceof Array){
            return new Stream(arguments[0]);
        }else{
            var _temp = [];
            for (var i = 0; i < arguments.length; i++) {
                _temp.push(arguments[i]);
            }
            return new Stream(arguments);
        }
    };
    Stream.range = function(start,end,step,closed){
        start = start || 0;
        end = end || 100;
        step = step || 1;
        closed = closed === true;
        var _arr = [];
        if(start > end && step < 0){
            if(closed){
                for(var i = end; i >= start; i = i + step){
                    _arr.push(i);
                } 
            }else{
                for(var i = end; i > start; i = i + step){
                    _arr.push(i);
                } 
            }
        }else if(start < end && step > 0){
            if(closed){
                for(var i = start; i <= end; i = i + step){
                    _arr.push(i);
                }
            }else{
                for(var i = start; i < end; i = i + step){
                    _arr.push(i);
                }                
            }
        }
        return new Stream(_arr);
    };
    Stream.iterate = function(func,init,limit,skip){
        init = init || 0;
        limit = limit || 100;
        skip = skip || 0;
        var _temp = init;
        var _arr = [];
        while (true) {
            if(skip > 0){
                skip--;
            }else if(_arr.length >= limit){
                break;
            }else if(_arr.length < limit){
                _arr.push(_temp);
            }
            _temp = func(_temp);
        }
        return new Stream(_arr);
    };
    Stream.generate = function(func,limit,skip){
        limit = limit || 100;
        skip = skip || 0;
        var _arr = [];
        while (true) {
            var _temp = func();
            if(skip > 0){
                skip--;
                continue;
            }else if(_arr.length >= limit){
                break;
            }else if(_arr.length < limit){
                _arr.push(_temp);
            }
        }
        return new Stream(_arr);
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
    Stream.prototype.flatMap = function(func){
        this._opers.push({type:"flatMap",func:func});
        return this;
    };
    Stream.prototype.sorted = function(func){
        this._opers.push({type:"sorted",func:func});
        return this;
    };
    Stream.prototype.limit = function(num){
        this._opers.push({type:"limit",num:num});
        return this;
    };
    Stream.prototype.skip = function(num){
        this._opers.push({type:"skip",num:num});
        return this;
    };
    Stream.prototype.distinct = function(func){
        this._opers.push({type:"distinct",func:func});
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
    Stream.prototype.group = function(func){
        var _temp = this.collect();
        var _result = {};
        for (var i = 0; i < _temp.length; i++) {
            var _key = func(_temp[i]);
            if(!_result[_key]){
                _result[_key] = [];
            }
            _result[_key].push(_temp[i]);
        }
        return _result;
    };
    Stream.prototype.partition = function(func){
        var _temp = this.collect();
        var _result = {"true":[],"false":[]};
        for (var i = 0; i < _temp.length; i++) {
            if(func(_temp[i]) === true){
                _result["true"].push(_temp[i]);
            }else if(func(_temp[i]) === false){
                _result["false"].push(_temp[i]);
            }
        }
        return _result;
    };
    Stream.prototype.first = function(func){
        var _temp = this.collect();
        for (var i = 0; i < _temp.length; i++) {
            if(func(_temp[i]) === true){
                return _temp[i];
            }
        }
    };
    Stream.prototype.last = function(func){
        var _temp = this.collect();
        for (var i = _temp.length-1; i >= 0; i--) {
            if(func(_temp[i]) === true){
                return _temp[i];
            }
        }
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
            }else if(op.type === "flatMap"){
                var _temp = [];
                for (var i = 0; i < _result.length; i++) {
                    var _arr = op.func(_result[i]);
                    if(_arr instanceof Array){
                        for (var j = 0; j < _arr.length; j++) {
                            _temp.push(_arr[j]);
                        }
                    }else{
                        _temp.push(_arr);
                    }
                }
                _result = _temp;
            }else if(op.type === "sorted"){
                var _temp = [];
                for(var i in _result){
                    _temp[i] = _result[i];
                }
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
            }else if(op.type === "limit"){
                var _temp = [];
                for (var i = 0; i < op.num && i < _result.length; i++) {
                    _temp.push(_result[i]);
                }
                _result = _temp;
            }else if(op.type === "skip"){
                var _temp = [];
                for (var i = op.num; i < _result.length; i++) {
                    _temp.push(_result[i]);
                }
                _result = _temp;
            }else if(op.type === "distinct"){
                var _temp = [];
                for (var i = 0; i < _result.length; i++) {
                    var found = false;
                    for(var j = 0; j < _temp.length; j++){
                        if(op.func(_temp[j],_result[i]) === true){
                            found = true;
                            break;
                        }
                    }
                    if(!found){
                        _temp.push(_result[i]);
                    }
                }
                _result = _temp;
            }
        }
        return _result;
    };
    return Stream;
}();
