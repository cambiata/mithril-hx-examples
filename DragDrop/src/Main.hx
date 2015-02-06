package;

import js.Browser;
import js.html.Element;
import js.html.Event;
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
		var cols = [
			new Column('column A'), 
			new Column('column B'), 
			new Column('column C')
		];		
		M.module(Browser.document.querySelector('#testdiv'), new Columns(cols));	
		
		var cols2 = [
			new Column('column Q'),
			new Column('column X'), 
			new Column('column Y'), 
			new Column('column Z')
		];	
		M.module(Browser.document.querySelector('#testdiv2'), new Columns(cols2));	
	}	
}

 class Columns implements View {
	
	 var cols:Array<Column>;
	 public function new(children:Array<Column>) {	
		this.cols = (children != null && children.length > 0) ? children : [new Column('Column A')];
	}

	var dragSourceElement:Element = null;
	
	public function view() {
		m('.columns', {
			ondragstart: function(e) {
				 var el:Element = cast e.target;
				 e.dataTransfer.setData("text/html", el.innerHTML);
				 this.dragSourceElement = el;				
			 },			 
			ondragenter: function(e:Event) {
				var el:Element = cast e.target;
				if (el.classList != null) el.classList.add("over");
			},
			ondragover: function(e) {
				e.preventDefault(); 
				e.dataTransfer.dropEffect = "move";  
				return false;
			},
			ondragleave:function(e:Event) {
				var el:Element = cast e.target;	
				if (el.classList == null) return;
				el.classList.remove("over");  
			},
			ondrop: function(e) {
				e.stopPropagation(); 
				var el:Element = cast e.target;
				if (this.dragSourceElement != el) {

					//trace([for (col in this.cols) col.tag]);
					
					var srcColTag = this.dragSourceElement.textContent;					
					var srcCol:Column = this.cols.filter(function(col) return col.tag == srcColTag)[0];
					if (srcCol == null) return false;
					
					var targetColTag = el.textContent;			
					var targetCol:Column = this.cols.filter(function(col) return col.tag == targetColTag)[0];
					if (targetCol == null) return false;
					
					var srcColIdx = this.cols.indexOf(srcCol);
					var targetColIdx = this.cols.indexOf(targetCol);					
					var moveCol = this.cols.splice(srcColIdx, 1)[0];
					this.cols.insert(targetColIdx, moveCol);
					
					//trace([for (col in this.cols) col.tag]);
					
					M.redraw();
				}
				return false;
			},
			ondragend: function( e:Event) {
				var el:Element = cast e.target;
				for (col in el.parentElement.querySelectorAll('.column')) cast(col, Element).classList.remove('over');
			}					
		} ,  
		
			[  for (col in cols) col.view()	]
		
		);
	}	
 }

 
 class Column implements View {
	public var tag:String;
	 
	public function new( tag:String) {		
		this.tag = tag;
	}
	
	 public function view() {
		 m('.column[draggable=true]', this.tag);		 
	 }
}
 
 
