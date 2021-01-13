function changeHeight(){
	bottomBorder("productCate","dl");
	var leftObj=document.getElementById('autohLeft');
	var rightObj=document.getElementById('hotShow');
	var rightUlObj=rightObj.getElementsByTagName('ul')[0];
	var rLi=rightUlObj.getElementsByTagName('li');
	var h=leftObj.offsetHeight-36-25;
	rightObj.style.height=h+'px';
	rightObj.style.overflow='hidden';
	rLiH=rLi[0].offsetHeight;
	rightUlObj.style.height=(Math.floor(h/rLiH)*rLiH)+'px';
	rightUlObj.style.overflow='hidden';
}//公共页自适应高度
function bottomBorder(id,tag){
	var op=document.getElementById(id);
	var o=op.getElementsByTagName(tag);
	o[o.length-1].className="s";
	}//end bottomBorder





function auoTry(t,padding,lineHeight,colLastone){
	var l=document.getElementById(t+"_l"),r=document.getElementById(t+"_r"),col=colLastone || 0,lp=10;
	    try{setHeight();}catch(err){}
		try{lastone();}catch(err){}
	function setHeight(){
		if(!l || !r)return;
	    var ul=r.getElementsByTagName("ul")[0];
	    if(!ul)return;
	    padding=Number(padding);
		lineHeight=Number(lineHeight);
		var h=Number(l.scrollHeight+padding);
		try{r.style.overflow="hidden";}catch(err){}
		try{ul.style.overflow="hidden";}catch(err){}
		try{r.style.height=h+"px";}catch(err){}
		try{ul.style.height=Math.abs(parseInt(h/lineHeight)*lineHeight)+"px";}catch(err){}
		try{if(h % lineHeight>20 && t!="t17" && t!="t61"){lp+=10;l.style.paddingBottom=lp+"px";setHeight();}}catch(err){}
		}
	function lastone(){
		var cate=document.getElementById(t+"_sup") || document.getElementById(t+"_l"),dl;
		try{dl=cate.getElementsByTagName("dl");}catch(err){}
		if(!dl)return;
		if(col){
			var supp=dl.length % col;
		    if(supp != 0)dl[dl.length-1].className="sup_"+supp;
		}
		else{	
			dl[dl.length-1].className="s";
			}
		//end if
		}//end lastone
	}//end auoTry
function gh(){
	if($(".leftB"))return;
	var lh=$(".merB .conB").attr("scrollHeight")-20;
	var rh=lh,th=$(".quoB .conB .tableTitle").attr("scrollHeight");
	$(".quoB .conB").css({"height":rh+"px","overflow":"hidden"});
	$(".quoB .conBIn").css({"height":parseInt(rh/th)*th+"px","overflow":"hidden"});
	}
function gh2(){
	var lh=$(".leftB").attr("scrollHeight"),lineHeight=24,pt;
	var rh=lh-($(".newsB .barB").attr("scrollHeight")+2*1)-2*7-2*1;
	var rih=parseInt(rh/lineHeight)*lineHeight;
	if(rh-rih>5){pt=parseInt((rh-rih)/2);}
	$(".newsB .conB").css("height",rh+"px");
	$(".newsB .conB ul").css({"height":rih+"px","overflow":"hidden","paddingTop":pt+"px"});
	}
function autoHeightB(a,b,p,liH,fH){
	if(!a || !b)return;
	var aH=a.attr('scrollHeight');
	var bH=aH-p;
	b.css({'height':bH+'px'});
	var fH=typeof(fH)=='number'?fH:b.children('ul').children('li').eq(0).attr('scrollHeight');
	b.children('ul').css({'height':(parseInt((bH-fH)/liH)*liH)+'px','overflow':'hidden'});
	}
function autoStart(){
var p8=(domainID=='277')?70:50;	
auoTry("t6",52,25,0);	
auoTry("t7",-5,95,2);
auoTry("t8",p8,101,2);
auoTry("t17",80,125,0);
auoTry("t22",0,95,2);
auoTry("t33",0,0,2);
auoTry("t61",-121,23,4);
auoTry("t62",-20,95,2);
auoTry("t65",-220,55,2);
auoTry("t66",-230,95,2);
auoTry("t73",-293,95,2);
auoTry("t98",-213,95,0);
gh();
gh2();
autoHeightB($('.MerListA').parent(),$('.MerListA').parent().parent().children('.mainPartALC').children('.company'),28+2*10+1,24,0);
autoHeightB($('.MerListA').parent(),$('.MerListA').parent().parent().children('.mainPartARC').children('.bookA').children('.conB'),28+1*10+1,24,0);
autoHeightB($('.MerListA').parent(),$('.MerListA').parent().parent().children('.mainPartARC').children('.bookA').children('.conB'),28+1*10+1,24,0);
/*277*/
autoHeightB($('.merB').parent(),$('.merB').parent().next().children('.newsListA'),39+2*10+1,24,0);
autoHeightB($('.merB').parent(),$('.merB').parent().parent().children('.mainPartBLA').children('.jobA').children('.JobListA'),27+2*10+1,22,0);
/*16*/
autoHeightB($('#i16_m_1'),$('#i16_l_1'),22,24);
autoHeightB($('#i16_m_1'),$('#i16_r_1'),22,24,0);
}//autostart
try{
$(document).ready(function(){autoStart();try{changeHeight();}catch(err){}});
}
catch(err){}
try{
window.onload=function(){autoStart();try{changeHeight();}catch(err){}}
}
catch(err){}
$(function(){if(domainID==230)$('.picC').eq(1).hide();});
//$(function(){$('<div class="newYear2014"></div><style>body .bigadA p{margin-bottom:1px;}</style>').insertBefore('.head');})//ɾ�����м��ɳ���������