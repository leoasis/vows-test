var vows = require("vows"),
		assert = require("assert");

var characters = require("../characters"),
		Mario = characters.Mario,
		Star = characters.Star,
		Goomba = characters.Goomba;
		
var mario = new Mario(),
		star = new Star();
		
vows.describe("More complex example").addBatch({
	"when Mario grabs the star": {
		topic: function(){
			mario.grab(star);
			return mario;
		},
		"he should be invincible": function(mario){
			assert.isTrue(mario.invincible);
		},
		"he should be singing 'Ta ta ta tarata tararara ta ta ta tarata tararara'": function(mario){
			assert.equal(mario.sing(), "Ta ta ta tarata tararara ta ta ta tarata tararara");
		},
		"given a Goomba": {
			topic: function(mario) {
				return new Goomba();
			},
			"when Mario touches it" : {
				topic: function(goomba, mario) {
					mario.touch(goomba);
					return {mario: mario, goomba: goomba};
				},
				"Goomba should get killed": function(context){
					assert.equal(context.goomba.health, 0);
				},
				"Mario should remain alive": function(context) {
					assert.equal(context.mario.health, 100);
				}
			}
		},
		"when star power vanishes": {
			topic: function(mario){
				var callback = this.callback;
				star.onPowerVanished(function(){
					callback(null, mario);
				});
			},
			"he should become normal again": function(err, mario){
				assert.isFalse(mario.invincible);
			},
			"he should stop singing": function(err, mario){
				assert.isEmpty(mario.sing());
			},
			"given a Goomba": {
				topic: function(mario) {
					return new Goomba();
				},
				"when Mario touches it" : {
					topic: function(goomba, mario) {
						mario.touch(goomba);
						return { mario: mario, goomba: goomba };
					},
					"Goomba should remain alive": function(context){
						assert.equal(context.goomba.health, 100);
					},
					"Mario should get killed": function(context) {
						assert.equal(context.mario.health, 0);
					}
				}
			}
		}
	}
}).export(module);