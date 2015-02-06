(function () { "use strict";
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var cols = [new Column("column A"),new Column("column B"),new Column("column C")];
	m.module(window.document.querySelector("#testdiv"),new Columns(cols));
	var cols2 = [new Column("column Q"),new Column("column X"),new Column("column Y"),new Column("column Z")];
	m.module(window.document.querySelector("#testdiv2"),new Columns(cols2));
};
var mithril = {};
mithril.View = function() { };
mithril.View.__name__ = true;
mithril.View.prototype = {
	__class__: mithril.View
};
var Columns = function(children) {
	this.dragSourceElement = null;
	if(children != null && children.length > 0) this.cols = children; else this.cols = [new Column("Column A")];
};
Columns.__name__ = true;
Columns.__interfaces__ = [mithril.View];
Columns.prototype = {
	view: function() {
		var _g = this;
		return m.m(".columns",{ ondragstart : function(e) {
			var el = e.target;
			e.dataTransfer.setData("text/html",el.innerHTML);
			_g.dragSourceElement = el;
		}, ondragenter : function(e1) {
			var el1 = e1.target;
			if(el1.classList != null) el1.classList.add("over");
		}, ondragover : function(e2) {
			e2.preventDefault();
			e2.dataTransfer.dropEffect = "move";
			return false;
		}, ondragleave : function(e3) {
			var el2 = e3.target;
			if(el2.classList == null) return;
			el2.classList.remove("over");
		}, ondrop : function(e4) {
			e4.stopPropagation();
			var el3 = e4.target;
			if(_g.dragSourceElement != el3) {
				var srcColTag = _g.dragSourceElement.textContent;
				var srcCol = _g.cols.filter(function(col) {
					return col.tag == srcColTag;
				})[0];
				if(srcCol == null) return false;
				var targetColTag = el3.textContent;
				var targetCol = _g.cols.filter(function(col1) {
					return col1.tag == targetColTag;
				})[0];
				if(targetCol == null) return false;
				var srcColIdx = HxOverrides.indexOf(_g.cols,srcCol,0);
				var targetColIdx = HxOverrides.indexOf(_g.cols,targetCol,0);
				var moveCol = _g.cols.splice(srcColIdx,1)[0];
				_g.cols.splice(targetColIdx,0,moveCol);
				m.redraw();
			}
			return false;
		}, ondragend : function(e5) {
			var el4 = e5.target;
			var _g1 = 0;
			var _g11 = el4.parentElement.querySelectorAll(".column");
			while(_g1 < _g11.length) {
				var col2 = _g11[_g1];
				++_g1;
				(js.Boot.__cast(col2 , Element)).classList.remove("over");
			}
		}},(function($this) {
			var $r;
			var _g2 = [];
			{
				var _g12 = 0;
				var _g21 = $this.cols;
				while(_g12 < _g21.length) {
					var col3 = _g21[_g12];
					++_g12;
					_g2.push(col3.view());
				}
			}
			$r = _g2;
			return $r;
		}(this)));
	}
	,__class__: Columns
};
var Column = function(tag) {
	this.tag = tag;
};
Column.__name__ = true;
Column.__interfaces__ = [mithril.View];
Column.prototype = {
	view: function() {
		return m.m(".column[draggable=true]",this.tag);
	}
	,__class__: Column
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = true;
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
};
mithril.Model = function() { };
mithril.Model.__name__ = true;
mithril.ControllerView = function() { };
mithril.ControllerView.__name__ = true;
mithril.ControllerView.prototype = {
	__class__: mithril.ControllerView
};
mithril.Controller = function() { };
mithril.Controller.__name__ = true;
mithril.Controller.prototype = {
	__class__: mithril.Controller
};
mithril.Module = function() { };
mithril.Module.__name__ = true;
mithril.Module.prototype = {
	__class__: mithril.Module
};
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
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
