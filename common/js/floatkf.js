(function(){
	/*不展示的网站*/
	if(domainID==100)return;
	/*不展示的网站 结束*/
	var bg='http://style.'+domainName+'/common/images/bg_floatkfb.gif';
		var qqhtm='';
		var d1=[15,23,33,53,63,73,83,93,103,113,115,117,120,123,128,133,137,139,143,148,153,163,183,193,194,203,213,223,243,249,253,255,263,277,283,293,303,313,323,331,333,343,348,353,363,373,383,393,413,415];
		var d1_2=[3,18,20,29,38,39,40,45,46,59,68,69,79,89,99,109,118,119,123,149,168,179,180,194,199,206,209,216,221,226,239,249,259,268,269,277,279,285,289,299,309,319,335,339,349,359,369,372,389,399,403,409];
		var d1_3=[11,26,32,36,56,66,76,96,106,116,123,126,131,146,150,156,326,336,345,346,355,356,366,376,386,396,398,406,165,176,182,186,194,196,201,205,233,246,247,249,256,266,273,276,277,278,306,316];
		var d1_4=[7,10,19,50,70,88,90,102,110,123,125,140,142,169,170,175,185,188,190,194,200,210,225,227,230,240,245,249,250,258,260,270,271,277,280,288,290,296,300,302,310,315,320,325,330,337,340,350,360,370,371,390,400];
	   var d2=[21,4,57,41,14,67,51,44,77,71,54,87,81,64,97,91,74,107,101,84,147,111,104,157,121,114,187,141,124,197,151,144,217,171,154,237,181,164,257,191,174,267,211,184,287,231,204,307,241,214,317,251,224,327,281,234,347,291,244,357,301,254,367,311,264,377,321,274,387,341,284,397,351,294,407,361,304,394,381,314,404,391,324,414,401,334,236,411,344,160,129,354,189,166,364,384,172,374,173,362,134,158,6,17,30,37,60,65,82,177,207,219,220];
	   var qqno=[],qqname=['一','二','三','四','五','六','七','八','九','十'];
	    domainID=Number(domainID);
		if(qq!='')qqno=qq.split(',');
		else if($.inArray(domainID,d1)!=-1)qqno=[36010040,36010040]
		else if($.inArray(domainID,d1_2)!=-1)qqno=[2906282805,2906282805];
		else if($.inArray(domainID,d1_3)!=-1)qqno=[2906757877,2906757877];
		else if($.inArray(domainID,d1_4)!=-1)qqno=[2010882718,2010882718];
		else if($.inArray(domainID,d2)!=-1)qqno=[1404900516,1404900516];
        else qqno=[711282,6623358];
		for(var i=0;i<qqno.length;i++){
			qqhtm+='<li><span><a href="http://wpa.qq.com/msgrd?v=3&uin='+qqno[i]+'&site=qq&menu=yes" >客服'+qqname[i]+'</a></span></li>'
			}
	    //var tel='<li>0592-3799732<br />3799732</li>'+'<li>0592-3799732</li>';
                var tel;
		if(domainID > 416){
                   tel=getTel() || '<li>0592-3833222</li>'+'<li>0592-3833222</li>';
                }
                else{
		if(domainID = 204){
                   tel=getTel() || '<li>0592-3833222</li>';			
			    }
			    else{
                   tel=getTel() || '<li>0592-3833222<br />3799732</li>'+'<li>0592-3833222</li>';
					 }		   
                }
		var cT=110;
		
	
	var echo=function(){
		var css='<style type="text/css">'+
'.FloatKFB dd .bar,.FloatKFB dd .barIn,.FloatKFB dd .con .bor,.FloatKFB dd .con .borIn,.FloatKFB dd .con ul.qq li,.FloatKFB dd .con ul.qq li span,.FloatKFB dd .con ul.qq li a,.FloatKFB dd .con h4,.FloatKFB dd .con h4 span{background:url('+bg+') no-repeat;}'+
'.FloatKFB {position:absolute;top:'+cT+'px;margin-top:0px; right:0px; overflow: hidden;}'+
'.FloatKFB dl{ display:block; overflow:hidden; white-space:nowrap;letter-spacing:-6px; font-size:0px;}'+
'.FloatKFB dt,.FloatKFB dd{ display:inline-block; overflow:hidden; letter-spacing:normal; font-size:12px; vertical-align: middle; margin:0px; padding:0px;line-height:18px;}'+
'.FloatKFB dt{ *display:inline;width:1em;background:#4fadfe; padding:5px; white-space: normal; background:#e6f4ff;border:solid 1px #8ab3df;border-right:0px;}'+
'.FloatKFB dd{ *display:inline; width:100px;white-space:normal; margin-right:10px;}'+
'.FloatKFB dd .bar{height:25px; background-position:right -98px; line-height:25px; color:#266da8; text-align:center; padding-right:4px;}'+
'.FloatKFB dd .con h4,.FloatKFB dd .con ul{display:inline-block;overflow:hidden;}'+
'.FloatKFB dd .con h4,.FloatKFB dd .con ul{display:block;border-left:#8ab3df 1px solid; border-right:#8ab3df 1px solid; background-color:#fff;}'+
'.FloatKFB dd .con h4{background-position:0px -26px; margin-top:1px; line-height:21px; color:#266da8; text-align:center; cursor:pointer}'+
'.FloatKFB dd .con h4 span{ display:block; height:21px; background-position:right -124px }'+
'.FloatKFB dd .con ul{ text-align:left;margin:0px; padding:0px 5px 0px 12px;}'+
'.FloatKFB dd .con ul.qq{ padding:5px 5px 0px;}'+
'.FloatKFB dd .con ul.qq li{background-position:right -124px; padding:0px 3px 0px 0px;margin:0px 0px 5px;vertical-align:bottom;height:21px; overflow:hidden;}'+
'.FloatKFB dd .con ul.qq li span{display:block;cursor:pointer;overflow:hidden;background-position:0px -26px; height:21px;}'+
'.FloatKFB dd .con ul.qq li a{display:block; background-position:-182px -205px; padding-left:27px; line-height:22px; color:#666; cursor:pointer; }'+
'.FloatKFB dd .con ul.tel{}'+
'.FloatKFB dd .con ul.tel li{text-align:right;}'+
'.FloatKFB dd .con .bor { clear:both; height:6px; background-position:0 -92px; overflow:hidden }'+
'.FloatKFB dd .con .borIn{ float:right; height:5px; width:6px; background-position:-195px -92px; overflow:hidden }'+
'</style>';
var html='<div class="FloatKFB" id="FloatKFB">'+
'<dl>'+
'<dt>客服中心</dt>'+
'<dd style="display:none">'+
'<div class="bar"><h3 class="barIn">在线客服</h3></div>'+
'<div class="con">'+
'<ul class="qq">'
+qqhtm+
'</ul>'+
'<ul class="tel">'
+tel+
'</ul>'+
'<div class="bor"><div class="borIn"></div></div>'+
'</div>'+
'</dd>'+
'</dl>'+
'</div>';
document.writeln(css+html);
		}//end echo
	function Event(){
		var dd=cO.getElementsByTagName("dd")[0];
		if(!dd)return;
		cO.onmouseover=function(){
			dd.style.display="";}
		cO.onmouseout=function(){dd.style.display="none";}
		}//end Event
	function move(){
		var t=cO.offsetTop+Math.ceil((hO.scrollTop-cO.offsetTop+cT)/10);
		if(t<cT){cO.style.top=cT+'px';}else{cO.style.top=t+'px';speed=10;}
		setTimeout(function(){move();},speed);
	}//end move
	function isIE6(){return navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 6.0")=="-1"?false:true;} //end isIE6
	function getTel(){
		var tels=get(),tel='';
		if(!tels)return false;
	  for(var i in tels){
		var tmp=tels[i];
		tmp=tmp.replace(String.fromCharCode(32)+String.fromCharCode(32),null);
		tmp=tmp.replace(String.fromCharCode(32),'<br/>');
		tel+=tmp+'</li><li>';
	   }
	  tel='<li class="f">'+tel+'</li>';
	  return tel;
		function get(){
		var x=[];
		var o=document.getElementById("fm_tel");
		if(!o)return false;
		var ous=o.getElementsByTagName("u");
		if(!ous)return false;
		for(var i=0;i<ous.length;i++){
			x[i]=String(ous[i].innerHTML);
			}
		return x;
		}//end get
	}//end getTel
	try{
	echo();
	var cO=document.getElementById("FloatKFB");if(!cO)return;
	var hO=document.documentElement || document.body,bO=document.body || document.documentElement;
	if($.browser.safari)hO=$('body')[0];
	Event();
	move();
	}catch(err){}
})();
$('#FloatKFB').mouseover (function(){
	$(this).find('dt').hide()
	$(this).find('dd').show()
})
$('#FloatKFB').mouseout(function(){
	$(this).find('dd').hide()
	$(this).find('dt').show()
})