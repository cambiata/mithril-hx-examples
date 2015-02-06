(function () { "use strict";
var Main = function() { };
Main.main = function() {
	m.module(window.document.querySelector("#testdiv"),new TestModule());
};
var mithril = {};
mithril.Model = function() { };
var Ticker = function() {
	this.count = 1;
	var _g = this;
	var timer = new haxe.Timer(1000);
	timer.run = function() {
		_g.count++;
		m.redraw();
	};
};
Ticker.__interfaces__ = [mithril.Model];
mithril.View = function() { };
var TestModule = function() {
	this.ticker = new Ticker();
};
TestModule.__interfaces__ = [mithril.View];
TestModule.prototype = {
	view: function() {
		return m.m("div",[m.m("p",this.ticker.count)]);
	}
};
var haxe = {};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.prototype = {
	run: function() {
	}
};
mithril.ControllerView = function() { };
mithril.Controller = function() { };
mithril.Module = function() { };
try {
(function(m) {
			m.m =        m;
			m.__module = m.module;
			m.__cm =     null;
			m.module = function(root, module) { m.__cm = module; return m.__module(root, module); }
			if (typeof module !== 'undefined' && module.exports) 
				m.request = function(xhrOptions) { return m.deferred().promise; };
		})(window.m);
} catch(_) {}
try {
GLOBAL.m = require("mithril");
var __varName = GLOBAL.m;
(function(m) {
			m.m =        m;
			m.__module = m.module;
			m.__cm =     null;
			m.module = function(root, module) { m.__cm = module; return m.__module(root, module); }
			if (typeof module !== 'undefined' && module.exports) 
				m.request = function(xhrOptions) { return m.deferred().promise; };
		})(__varName);
} catch(_) {}
Main.main();
})();
