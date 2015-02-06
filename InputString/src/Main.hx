package;

import js.Browser;
import js.Lib;
import mithril.M;

/**
 * ...
 * @author Jonas Nyström
 */

class Main 
{	
	static function main() 
	{
		M.module(Browser.document.querySelector('#testdiv'), new TestModule());		
	}	
}

class User implements Model {
	
	@prop public var name : String;
	
	public function new(name) {
		this.name = M.prop(name);
	}
	
	public function uppercaseName():String {
		return this.name().toUpperCase();		
	}
 }
 
 class TestModule implements View {
	 var user:User;
	 
	public function new() {
		 this.user = new User('Thorin Oakenshield');
	}
	 
	public function view() {
		m('div', [
			m("input", {
				oninput: M.withAttr("value", this.user.name),
				value: this.user.name()
			}),
			m('p', this.user.name()),
			m('p', this.user.uppercaseName()),
		]);
	}
 }
 
