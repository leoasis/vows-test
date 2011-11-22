var vows = require("vows"),
		assert = require("assert"),
		path = require("path");
		
vows.describe("Parallel contexts").addBatch({
	'/dev/stdout': {
    topic:    function () { path.exists('/dev/stdout', this.callback) },
    'exists': function (result) { assert.isTrue(result) }
  },
  '/dev/tty': {
    topic:    function () { path.exists('/dev/tty', this.callback) },
    'exists': function (result) { assert.isTrue(result) }
  },
  '/dev/null': {
    topic:    function () { path.exists('/dev/null', this.callback) },
    'exists': function (result) { assert.isTrue(result) }
  }
}).export(module);