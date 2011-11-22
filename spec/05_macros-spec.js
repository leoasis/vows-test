var vows = require("vows"),
		assert = require("assert"),
		http = require("http");

var client = {
	get: function (path, callback) {
		callback(null, {status: 200});
	},
	post: function (path, callback) {
		callback(null, {status: 405});
	}
};

var api = {
	get: function (path) {
		return function () {
			client.get(path, this.callback);
		};
	},
	post: function (path) {
		return function () {
			client.post(path, this.callback);
		};
	}
};	
	
vows.describe("Macros test").addBatch({
	"typical way": { 
		topic: function () {
	    client.get('/resources/42', this.callback);
	  },
	  'should respond with a 200 OK': function (e, res) {
	    assert.equal (res.status, 200);
	  }
	},
	"improved way": {
		topic: function () {
	    client.get('/resources/42', this.callback);
	  },
	  'should respond with a 200 OK': assertStatus(200)
	},
	'GET /': {
		topic: api.get('/'),
		'should respond with a 200 OK': assertStatus(200)
	},
	'POST /': {
		topic: api.post('/'),
	  'should respond with a 405 Method not allowed': assertStatus(405)
	},
	'GET  /':                   respondsWith(200),
	'POST /':                   respondsWith(405)
	
}).export(module);

function assertStatus(code) {
    return function (e, res) {
        assert.equal (res.status, code);
    };
}

//
// Send a request and check the response status.
//
function respondsWith(status) {
    var context = {
        topic: function () {
            // Get the current context's name, such as "POST /"
            // and split it at the space.
            var req    = this.context.name.split(/ +/), // ["POST", "/"]
                method = req[0].toLowerCase(),         // "post"
                path   = req[1];                       // "/"

            // Perform the contextual client request,
            // with the above method and path.
            client[method](path, this.callback);
        }
    };
    // Create and assign the vow to the context.
    // The description is generated from the expected status code
    // and status name, from node's http module.
    context['should respond with a ' + status + ' '
           + http.STATUS_CODES[status]] = assertStatus(status);

    return context;
}