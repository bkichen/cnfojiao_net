$(".show1").slide({
    mainCell: ".bd ul",
    effect: "left",
    autoPlay: false,
    trigger: "click", scroll: 4, vis: 4,
    defaultIndex: 0
});
$(".show2").slide({
    mainCell: ".bd ul",
    effect: "left",
    autoPlay: false,
    trigger: "click", scroll: 4, vis: 4,
    defaultIndex: 1
});
$(".show3").slide({
    mainCell: ".bd ul",
    effect: "left",
    autoPlay: false,
    trigger: "click", scroll: 4, vis: 4,
    defaultIndex: 2
});
$('.productSort').each(function () {
    var topHeight = $(this).find(".top").height();
    if (topHeight < 20) {
        // alert(topHeight)
        $(this).find(".top").css({ "height": "19px" });
        $(this).find(".supplier").css({ "height": "167px", "line-height": "26px" });
        $(this).find(".pho").css({ "padding-top": "0px", "height": "187px" });
    }
    else if (topHeight < 39) {
        // alert(topHeight)
        $(this).find(".top").css({ "height": "38px" });
        $(this).find(".supplier").css({ "height": "186px" });
        $(this).find(".supplier li p").css({ "line-height": "16px", "height": "16px" });
        $(this).find(".pho").css({ "padding-top": "0px", "height": "206px" });
    }
    else if (topHeight < 58) {
        $(this).find(".top").css({ "height": "57px" });
        $(this).find(".supplier").css({ "height": "205px" });
        $(this).find(".pho").css({ "padding-top": "0px", "height": "225px" });
    }
    else if (topHeight < 100) {
        $(this).find(".top").css({ "height": "96px" });
        $(this).find(".supplier").css({ "height": "258px" });
        $(this).find(".pho").css({ "padding-top": "0px", "height": "278px" });
    };

});
$(function () {
    return;
    (function () {
        function f(a, s, m) {
            m.w = m.w ? parseFloat(m.w) : 0; m.h = m.h ? parseFloat(m.h) : 0; if (m.w && m.w < s.w) { s.h = m.w * s.h / s.w; s.w = m.w; }
            if (m.h && m.h < s.h) { s.w = m.h * s.w / s.h; s.h = m.h; }
            var p = a.style ? 'px' : 0; a = a.style || a; a.width = s.w + p; a.height = s.h + p;
        }
        return function (a, w, h) { if (!a) return; for (var i = 0; i < a.length; i++) { var v = a[i]; if (v.naturalWidth) f(v, { w: v.naturalWidth, h: v.naturalHeight }, { w: w, h: h }); else (function (v) { var _ = new Image(); _.onload = function () { f(v, { w: this.width, h: this.height }, { w: w, h: h }); }; _.src = v.src; })(v) } }
    })()($('.pho img').get(), 217, 187)
})


(function($){
$.fn.turn = function(settings){
		settings = $.extend({
			direction:1,
			num:1,
			duration :3000
		},settings);	

		var ul=$(this).find("ul");
		if(settings.direction==0||settings.direction==2){
			var height=$(this).find("li").outerHeight();
			var width=0;
		}
		if(settings.direction==1||settings.direction==3){
			var height=0;
			var width=$(this).find("li").outerWidth();
		}

		$(this).find("span a").eq(0).click(function(){
			turn(0);
		});
		$(this).find("span a").eq(1).click(function(){
			turn(1);
		});
		$(this).hover(function(){
			clearInterval(change);
		},function(){
			change=setInterval(function(){turn(Math.floor(settings.direction/2))} , settings.duration);
		}).trigger("mouseleave");
		
		function turn(x){
			if(!$(ul).is(":animated")){
				if (x==0)
				{
					$(ul).animate({left: -width,top:-height}, "slow",function(){
						$(ul).css({"left":"0","top":"0"});
						$(ul).children().each(function(i){
							if(i==settings.num){return false;}
							$(ul).children().filter(":first").appendTo(ul);
						});
					});
				}else if(x==1){
					$(ul).css({"left":-width,"top":-height});
					$(ul).children().each(function(i){
						if(i==settings.num){return false;}
						$(ul).children().filter(":last").prependTo(ul);
					});
					$(ul).animate({left: 0,top:0}, "slow");
				}
			}
		}
	}
})(jQuery);

	


