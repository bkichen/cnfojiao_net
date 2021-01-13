if(typeof($onload)!='function')
{function $onload(func) {
  var old = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {  
    window.onload = function() {
      old();
      func();
    }
  }
}
}//end $onload
function picsizeA(me,ow,oh){
	if(!me)return;
	var ow=ow || 210,oh=oh|| 210,tw=me.width,th=me.height,nw=tw,nh=th;
	while(nw>ow || nh>oh){nw--;nh=th*nw/tw;}
	me.style.width=nw+'px';
	me.style.height=nh+'px';
}//end picsizeA
function picnavA(me,o){
	if(!me || !o)return;
	var w=me.attr('clientWidth'),h=me.attr('clientHeight');
	o.children('.p').css({'height':h+'px'});
	o.children('.n').css({'height':h+'px'});
	o.css({'width':w+'px','height':h+'px','margin-left':w/2*-1+'px'});
	}
//搜索数据
$onload(function(){
	picnavA($('.picA img'),$('.picnavA'));
	
	});
/**/

var AjaxRequest = {}; //AJAX
var AjaxTip = {}; //AJAX提示框
var Dialog = {}; //对话框
var StringHelper = {}; //字符串剔除
var DomNode = {}; //节点操作

//打开URL
function GoUrl(url) {
    location.href = url;
}

//Ajax GET方法
AjaxRequest.Get = function (url, panelIDs) {
    url = url || (document.forms[0] && document.forms[0].action) || StringHelper.Clear(location.href, '#');
    var IDs = Array.prototype.slice.apply(arguments).slice(1 || 0);
    var callback = IDs[IDs.length - 1];
    if (typeof callback == 'function') {
        IDs = IDs.slice(0, IDs.length - 1);
    }
    else {
        callback = null;
    }

    var panelStrings = IDs.length > 0 ? IDs.join(',') : '__DefaultAjaxPanleID'; //panelIDs为空不更新

    $.ajax
    (
        {
            type: 'get',
            dataType: 'json',
            cache: false,
            url: url,
            data: '__AjaxPanelIDs=' + panelStrings,
            success:
            function (content) {
                //显示提示信息
                if (content['Status'] == 'Success') {
                    //如果需要更新ajaxpanel就更新
                    for (var i = 0; i < IDs.length; i++) {
                        var o = document.getElementById(IDs[i]);
                        if (o) {
                            document.getElementById(IDs[i]).innerHTML = $.trim(content['Panels'][IDs[i]]);
                        }
                    }
                    //url && document.forms[0] && (document.forms[0].action = url);
                }
                if (callback != null)//如果有回调函数
                {
                    callback(content);
                }
            },
            complete:
            function () {

            },
            beforeSend:
            function () {

            },
            error:
            function (XMLHttpRequest, textStatus, errorThrown) {

            },
            timeout:
            function () {

            }


        }
    );
};
//--AJAX POST 方法
AjaxRequest.Post = function (buttonName, panelIDs) {

    var f;
    for (var i = 0; i < document.forms.length; i++) 
    {
        if (document.forms[i].elements[buttonName] || (document.forms[i].elements['ButtonProxy'] && document.forms[i].elements['ButtonProxy'].value == [buttonName])) 
        {
            f = document.forms[i];            
            break;
        }
    }

    if (!f) {
        f = document.forms[0];
    }

    var url = (f && f.action) || StringHelper.Clear(location.href, '#');
    var IDs = Array.prototype.slice.apply(arguments).slice(1 || 0);
    var callback = IDs[IDs.length - 1];
    if (typeof callback == 'function') {
        IDs = IDs.slice(0, IDs.length - 1);
    }
    else {
        callback = null;
    }

    var panelStrings = IDs.length > 0 ? IDs.join(',') : '__DefaultAjaxPanleID';
    var data = [];
    data.push({ name: buttonName, value: buttonName });
    data.push({ name: '__AjaxPanelIDs', value: panelStrings });
    var options =
    {
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        type: 'post',
        dataType: 'json',
        url: url,
        data: data,
        cache: false,
        success:
        function (content) {
            if (callback != null)//如果有回调函数
            {
                callback(content);
                return;
            }

            if (content['Status'] == 'Success') {

                //如果需要更新ajaxpanel就更新
                for (var i = 0; i < IDs.length; i++) {
                    document.getElementById(IDs[i]).innerHTML = $.trim(content['Panels'][IDs[i]]);
                }


                if (content['Url'] == '_notip') {
                    return;
                }

            }


        },
        complete:
        function () {
            $('input[name=' + buttonName + ']').attr('disabled', ''); //按钮设置为可用
            AjaxTip.Hide();
        },
        beforeSend:
        function () {
            $('input[name=' + buttonName + ']').attr('disabled', 'disabled'); //按钮设置为不可用
            

        },
        error:
        function () {
            
        },
        timeout:
        function () {
            
        },
        resetForm: false
    };
    $('#' + f.id).ajaxSubmit(options);
    return false;
};

AjaxRequest.UpdateAjaxPanels = function (content, ajaxPanelIDs) {
    var IDs = Array.prototype.slice.apply(arguments).slice(1 || 0);
    for (var i = 0; i < IDs.length; i++) {
        document.getElementById(IDs[i]).innerHTML = $.trim(content['Panels'][IDs[i]]);
    }
}

//字符串剔除方法
StringHelper.Clear = function (str, charString) {
    str = str.substring(0, str.indexOf(charString)) || str;
    return str;
};


//================对话框
//确定框
Dialog.Confirm = function (message, callbackOk) {

    var ContentHtml = "<table width=\"310\" border=\"0\" align=\"center\" cellpadding=\"0\"  cellspacing=\"0\"><tbody><tr><td height=\"73\" align=\"center\" valign=\"bottom\" style=\"border-top: 1px solid rgb(255, 255, 255);\"><table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" width=\"96%\" class=\"reg\">  <tbody><tr><td width=\"29%\"  height=\"28\" align=\"center\"><img src=\"/Common/Component/Dialog/safe_unknow.gif\" width=\"48\" height=\"48\" /></td><td width=\"71%\" align=\"left\">" + message + "</td></tr></tbody></table></td></tr></tbody></table><div class=\"caozuoqu\"><input name=\"_btDialogOK\" id=\"_btDialogOK\" type=\"button\" value=\"确 定\" class=\"btn-1\" /><input name=\"_btDialogCanel\" id=\"_btDialogCanel\" type=\"button\"  value=\"取 消\" class=\"btn-1\"/></div>";

    ShowDialog({
        Width: "336",
        Height: "165",
        Title: "确认提示",
        skin: "blue",
        FrameURL: "http://www.baidu.com",
        ContentFlag: "1",
        Contents: ContentHtml
    }, callbackOk);
}


//==============对话框函数 start===============
//提示框
/*
参数说明：
message要显示的文字说明，
tiptype提示类型，如：Alert等，
callback按确定后，要执行的回调。
*/
//弹出内嵌页面的对话框
/*
title:对话框标题
width:对话框宽度
height:对话框高度
url:对话框内嵌页面地址

*/
Dialog.Show = function (title, width, height, url) {
    ShowDialog({
        Width: width,
        Height: height,
        Title: title,
        skin: "blue",
        FrameURL: url,
        ContentFlag: "0",
        Contents: "<div>框架内页内容</div>"
    });

    //var iframe  = document.getElementById('_markdiagiframe');
    //if (iframe.attachEvent){    iframe.attachEvent("onload", function(){        alert("Local iframe is now loaded.");    });} else {    iframe.onload = function(){        alert("Local iframe is now loaded.");    };}

}

//关闭对话框
Dialog.Close = function () {
    if ($("#_diawindow").length > 0) {
        $("#_diawindow").remove();
    }
    if ($("#_markdiag").length > 0) {
        $("#_markdiag").remove();
    };
}



//==============对话框函数 end===============

//==============Ajax提示 start===============
//提示信息，Show
AjaxTip.Show = function (content, className) {
    $('#__AjaxTip').html(content);
    $('#__AjaxTip').show();
    new FixPosition('__AjaxTip', { right: 5, top: 5 });
    return;
};

//提示信息，隐藏
AjaxTip.Hide = function () {
    $('#__AjaxTip').hide();
    return;
};


//==============Ajax提示 end===============


//==============DOM节点常用操作 start===============
DomNode.IsNode = function (el /* :HTMLElement */) {
    if (el && typeof el == 'object' && el.nodeType == 1)
        return true;
    return false;
};

DomNode.IsDocumentFragment = function (el /* :HTMLElement */) {
    return el && typeof el == 'object' && el.nodeType == 11;
};

DomNode.IsNodeOrDocumentFragment = function (el /* :HTMLElement */) {
    return this.IsNode(el) || this.IsDocumentFragment(el) || false;
};

DomNode.IsTextNode = function (el /* :HTMLElement */) {
    if (el && typeof el == 'object' && el.nodeType == 3)
        return true;
    return false;
};

DomNode.CreateNode = function (tag /* :String */) {
    return document.createElement(tag);
};

DomNode.CreateTextNode = function (str /* :String */) {
    return document.createTextNode(str);
};

DomNode.AddNode = function (node /* :HTMLElement */, target /* :HTMLElement */) {
    target = target || document.body;
    if (this.IsNodeOrDocumentFragment(node) || this.IsTextNode(node)) {
        if (node.parentNode && this.IsNode(node.parentNode)) return false;
        target.appendChild(node);
    }
    else {
        this.AddNode(this.CreateTextNode(node.toString()), target);
    }
    return true;
};

DomNode.RemoveNode = function (node /* :HTMLElement */, target /* :HTMLElement */) {
    if (!node || !node.parentNode || (node.parentNode && node.parentNode.nodeType != 1)) return null;
    return node.parentNode.removeChild(node);
};


DomNode.CreateInput = function (name /* :String */) {
    var el;
    try {
        el = this.CreateNode('<input name="' + name + '">');
    }
    catch (e) {
        el = this.CreateNode('input');
        el.name = name;
    }
    return el;
};

DomNode.AddButtonToForm = function (buttonName, buttomvalue, formID) {
    var f = document.forms[formID];
    if (!f.elements[buttonName]) {
        var but = DomNode.CreateInput(buttonName);
        but.type = 'hidden';
        DomNode.AddNode(but, f);
    }

    f.elements[buttonName].value = buttomvalue;
};

DomNode.AddButtonProxyToForm = function (buttonName, formID) {
    var f = document.forms[formID];
    if (!f.elements['ButtonProxy']) {
        var but = DomNode.CreateInput('ButtonProxy');
        but.type = 'hidden';
        DomNode.AddNode(but, f);
    }

    f.elements['ButtonProxy'].value = [buttonName];
};

//==============DOM节点常用操作 end===============

//==============表单提交 start===============
function Submit(ButtonName, formID) {
    var f;
    if (!formID) {
        for (var i = 0; i < document.forms.length; i++) {
            if (document.forms[i].elements[ButtonName] || (document.forms[i].elements['ButtonProxy'] && document.forms[i].elements['ButtonProxy'].value == [buttonName])) {
                f = document.forms[i];
                break;
            }
        }

        if (!f) {
            f = document.forms[0];
        }
    }
    else {
        f = document.forms[formID];
    }
    DomNode.AddButtonProxyToForm(ButtonName, f.id);

    $('input[name=' + ButtonName + ']').attr('disabled', 'disabled');
    if (!f.action) { f.action = StringHelper.Clear(location.href, '#'); }
    f.submit();
}
//==============表单提交 end===============

//==============固定div在页面的位置 start===============
/*  
*author:sohighthesky  
*from:http://hi.csdn.net/sohighthesky  
*Date:2009-11-1  
*/
/*  
*target 要固定的元素对象，也可以是元素的id  
*pos:object/string 指定固定到的位置，类型为object时，使用json方式如{right:200,bottom:50} ，为string时可选参数如下：  
*cc,正中间,lc  左边,rc 右边  
*lt  左上角,ct 上边,rt  右上角  
*lb 左下角,cb 底部,rb 右下角 
<script type="text/javascript">  
var divs=document.getElementById("div1").getElementsByTagName("div");  
var length=divs.length;  
for(var i=0;i<length-2;i++) {  
var cur=divs[i];  
new fixPosition(cur,cur.getAttribute("pos"));  
}  
new fixPosition(divs[length-2],{left:60,top:160});  
new fixPosition(divs[length-1],{right:200,bottom:50});  
</script>  
*/
var FixPosition = function (target, pos) {
    this.target = this.g(target);
    this.pos = pos;
    this.init(); //
};

FixPosition.prototype = {
    isScroll: navigator.userAgent.indexOf("MSIE 6") != -1 || (window.ActiveXObject && document.compatMode != "CSS1Compat"),
    ae: function (e, call) {
        if (window.addEventListener)
            window.addEventListener(e, call, false);
        else
            window.attachEvent("on" + e, call);
    },
    g: function (id) {
        return typeof (id) == "string" ? document.getElementById(id) : id;
    },
    setPos: function () {//设置位置
        var de;
        if (document.compatMode == "CSS1Compat") de = document.documentElement;
        else de = document.body;

        if (typeof (this.pos) == "string") {//
            if (!this.isScroll) {
                switch (this.pos.charAt(0)) {
                    case "l":
                        this.target.style.left = "0px";
                        break;
                    case "r":
                        this.target.style.right = "0px";
                        break;
                    default:
                        this.target.style.left = (de.clientWidth - this.target.clientWidth) / 2 + "px";
                        break;
                }
                switch (this.pos.charAt(1)) {
                    case "t":
                        this.target.style.top = "0px";
                        break;
                    case "b":
                        this.target.style.bottom = "0px";
                        break;
                    default:
                        this.target.style.top = (de.clientHeight - this.target.clientHeight) / 2 + "px";
                        break;
                }
            } else {
                switch (this.pos.charAt(0)) {
                    case "l":
                        this.target.style.left = de.scrollLeft + "px";
                        break;
                    case "r":
                        this.target.style.left = de.scrollLeft + de.clientWidth - this.target.clientWidth + "px";
                        break;
                    default:
                        this.target.style.left = de.scrollLeft + ((de.clientWidth - this.target.clientWidth) / 2) + "px";
                        break;
                }
                switch (this.pos.charAt(1)) {
                    case "t":
                        this.target.style.top = de.scrollTop + "px";
                        break;
                    case "b":
                        this.target.style.top = de.scrollTop + de.clientHeight - this.target.clientHeight + "px";
                        break;
                    default:
                        this.target.style.top = de.scrollTop + ((de.clientHeight - this.target.clientHeight) / 2) + "px";
                        break;
                }
            }
        } else {
            if (!this.isScroll) {
                for (var p in this.pos)
                    this.target.style[p] = this.pos[p] + "px";
            } else {
                for (var p in this.pos) {
                    switch (p.toLowerCase()) {
                        case "left":
                            this.target.style.left = de.scrollLeft + this.pos[p] + "px";
                            break;
                        case "right":
                            this.target.style.left = de.scrollLeft + de.clientWidth - this.target.clientWidth - this.pos[p] + "px";
                            break;
                        case "top":
                            this.target.style.top = de.scrollTop + this.pos[p] + "px";
                            break;
                        case "bottom":
                            this.target.style.top = de.scrollTop + de.clientHeight - this.target.clientHeight - this.pos[p] + "px";
                            break;
                    }
                }
            }
        }
    },


    init: function () {
        if (!this.pos)
            throw Error("Invalid arguments [pos].");
        if (!this.isScroll)
            this.target.style.position = "fixed";
        else
            this.target.style.position = "absolute";
        var timer, o = this;

        this.ae("resize", function () {//支持fixed的浏览器窗体大小改变时也重置位置，防止中间无法居中
            clearTimeout(timer);
            timer = setTimeout(function () {
                o.setPos();
            }, 30);
        });
        if (this.isScroll) {//滚动
            this.ae("scroll", function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    o.setPos();
                }, 30);
            });
        }
        this.setPos();
    }
}

//==============固定div在页面的位置 end===============

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//操作Cookie
jQuery.cookie = function (name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie 
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}; 
