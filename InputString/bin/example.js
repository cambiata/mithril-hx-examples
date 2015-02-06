(function () { "use strict";
var Main = function() { };
Main.main = function() {
	m.module(window.document.querySelector("#testdiv"),new TestModule());
};
var mithril = {};
mithril.Model = function() { };
var User = function(name) {
	this.name = m.prop(name);
};
User.__interfaces__ = [mithril.Model];
User.prototype = {
	name: function(v) {
		return v;
	}
	,uppercaseName: function() {
		return this.name().toUpperCase();
	}
};
mithril.View = function() { };
var TestModule = function() {
	this.user = new User("Thorin Oakenshield");
};
TestModule.__interfaces__ = [mithril.View];
TestModule.prototype = {
	view: function() {
		return m.m("div",[m.m("input",{ oninput : m.withAttr("value",($_=this.user,$bind($_,$_.name))), value : this.user.name()}),m.m("p",this.user.name()),m.m("p",this.user.uppercaseName())]);
	}
};
mithril.ControllerView = function() { };
mithril.Controller = function() { };
mithril.Module = function() { };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
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
