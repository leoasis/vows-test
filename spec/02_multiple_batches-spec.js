var vows = require("vows")
		assert = require("assert");
		
vows.describe("multiple Batches").addBatch({
	"I'm batch number 1": {
		topic: 45,
		"a vow for batch 1": function(topic) {
			assert.equal(45, topic);
		}
	}
}).addBatch({
	"And I'm batch number 2 (i go after 1)": {
		topic: 46,
		"a vow for batch 2": function(topic) {
			assert.equal(46, topic);
		}
	}
}).export(module);