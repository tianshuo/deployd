var chain = function(fn) {
	var queue = [];
	var executing = false;
	var lastResult = [];

	var execute = function() {
		var func = queue.shift();
		var args = [_next];
		if (func) {
			executing = true;
			args.push.apply(args, lastResult.length ? lastResult : arguments);
			func.apply(this, args);
		}
	}

	var _next = function() {
		executing = false;
		lastResult = arguments;
		execute();
	}

	var _chain = function(fn) {
		queue.push(fn);	

		if (!executing) {
			execute();
		}

		return {chain: _chain};	
	};

	return _chain(fn);
};