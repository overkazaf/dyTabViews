/**
 * 
 * @authors John Nong (overkazaf@gmail.com)
 * @date    2015-05-08 16:08:31
 * @version $Id$
 */
(function ($){
	$.fn.draggable = function (options){
		var opts = $.extend({}, $.fn.draggable.defaults, options);
		var ctx = $(opts.context);
		var dragList = [];
		this.each(function (i, cont){
			var Drag = {
				draggedItem : null,
				movedItem : null,
				init : function (){
					var obj = ctx.find(opts.handlerClass);
					var movedItem = $(opts.movedItem);
					Drag.draggedItem = obj;
					Drag.movedItem = movedItem;
					obj.on('mousedown', Drag.start);
				},
				start : function (ev){
					var obj = Drag.draggedItem;
					var mi = Drag.movedItem;
					var x = ev.pageX;
					var y = ev.pageY;
					var disX = x - $(mi).offset().left - $(mi).width()/2;
					var disY = y - $(mi).offset().top;
					obj.data('disX', disX);
					obj.data('disY', disY);
					$(document).on('mousemove', Drag.drag);
					$(document).on('mouseup', Drag.end);

					return false;
				},
				drag : function (ev){
					var x = ev.pageX;
					var y = ev.pageY;
					var obj = Drag.draggedItem;
					var movedItem = Drag.movedItem;
					var nx = x - obj.data('disX');
					var ny = y - obj.data('disY');
					movedItem.css({
						left : nx + 'px',
						top : ny + 'px'
					});
					return false;
				},
				end : function (){
					$(document).off('mousemove', Drag.drag);
					$(document).off('mouseup', Drag.end);
				}
			};

			Drag.init();
			dragList.push(Drag);
		});
		return this;
	};

	$.fn.draggable.defaults = {
		context : '#drag',
		movedItem : '#drag',
		handlerClass : '.ui-box-header'
	};
})(jQuery);
