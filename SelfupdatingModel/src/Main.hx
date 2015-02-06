package;

import haxe.Timer;
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

class Ticker implements Model {

	public var count:Int = 1;
	
	public function new() {
		var timer = new Timer(1000);
		timer.run = function() {
			this.count++;
			M.redraw();
		}
	}	
 }
 
 class TestModule implements View {
	 var ticker:Ticker;
	 
	public function new() {
		 this.ticker = new Ticker();
	}
	 
	public function view() {
		m('div', [
			m('p', this.ticker.count),
		]);
	}
 }