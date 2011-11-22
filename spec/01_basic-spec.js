var vows = require("vows"),
		assert = require("assert");

var characters = require("../characters"),
		Mario = characters.Mario;
		
vows.describe("Basic example").addBatch({
  "when creating a new Mario": {
    topic: new Mario(),
		"it should greet saying he's Mario": function(topic){
			assert.equal(topic.greet(), "It's me, Mario!");
    }
  }
}).export(module);
