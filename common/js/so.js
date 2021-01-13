function $ready(func){
__domReady(func);

function __clear(timer){
    clearTimeout(timer);
    clearInterval(timer);
    return null;
}

function __attach_event(evt, callback) {
 if (window.addEventListener){window.addEventListener(evt, callback, false);} 
 else if(window.attachEvent){window.attachEvent("on" + evt, callback);}
}
function __domReady(f) {
    // 假如 DOM 已经加载，马上执行函数
    if (__domReady.done) return f();
    // 假如我们已经增加了一个函数
    if (__domReady.timer){
        // 把它加入待执行函数清单中
        __domReady.ready.push(f);
    } else {
        // 为页面加载完毕绑定一个事件，
        // 以防它最先完成。使用addEvent(该函数见下一章)。
        __attach_event("load", __isDOMReady);
        // 初始化待执行函数的数组
        __domReady.ready = [f];
        // 尽可能快地检查DOM是否已可用
        __domReady.timer = setInterval(__isDOMReady, 100);
    }
}
function __isDOMReady() {
    // 如果我们能判断出DOM已可用，忽略
    if (__domReady.done) return false;
    // 检查若干函数和元素是否可用
    if (document && document.getElementsByTagName && document.getElementById && document.body) {
        // 如果可用，我们可以停止检查
        __clear(__domReady.timer);
        __domReady.timer = null;
        // 执行所有正等待的函数
        for ( var i = 0; i < __domReady.ready.length; i++ ) {
            __domReady.ready[i]();
        }
        // 记录我们在此已经完成
        __domReady.ready = null;
        __domReady.done = true;
    }
}
}//end $ready
function headClick(n){
var p=document.getElementById("webSelect");	
var o=p.getElementsByTagName("span");
var input=document.getElementById("SearchType");
if(!p || !o || !input) return;
if(n<0 || n>=o.length)n=0;
run(n);
for(var i=0;i<o.length;i++)Event(i);
function Event(i){o[i].onclick=function(){run(i)}}
function run(i){
for(var j=0;j<o.length;j++)o[j].className="";
o[i].className="s";
input.value=i;}

}//end 

$ready(function(){
headClick(0);	   
 }); 