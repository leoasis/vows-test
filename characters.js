var util = require("util"),
		events = require("events");

exports.Mario = function (){
	this.health = 100;
};

exports.Mario.prototype = {
	greet: function(){
		return "It's me, Mario!"
	},
	grab: function(star){
		this.invincible = true;
		this.song = "Ta ta ta tarata tararara ta ta ta tarata tararara";
		var me = this;
		star.onPowerVanished(function(){
			me.invincible = false;
			me.song = "";
		});
		star.startPower();
	},
	touch: function(goomba) {
		if (this.invincible)
			goomba.health = 0;
		else
			this.health = 0;
	},
	sing: function(){
		return this.song;
	}
};

function Star(){
	events.EventEmitter.call(this);
};

util.inherits(Star, events.EventEmitter);

Star.prototype.onPowerVanished = function(callback){
		this.on('powerVanished', callback);
};
Star.prototype.startPower = function(){
	var me = this;
	setTimeout(function(){
		me.emit('powerVanished');
	}, 1000);
};

exports.Star = Star;

exports.Goomba = function () {
	this.health = 100;
};

exports.Goomba.prototype = {
	
}