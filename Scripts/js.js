
 $(function(){
	if($(window).width()<1024){
		//$(".slideout").height($(window).height());
		$(".nav-toggle").click(function () { 
		 	$("body").toggleClass("open-toggle") 
		  });
	 }	 
})
$(function () { clickevent();topchose()});
//绑定a事件
function clickevent() {
    $('a').each(function () {
        var ar = $(this).attr("area");
        if (ar != undefined && ar != '') {
            var p = $(this).attr('href');
            var a = ar.split('*');
            $(this).attr('href', 'javascript:void(0)');
            var title = $(this).html();
            $(this).bind('click', function () {
                if (window.top != window.self) {
                    parent.layer.close(parent.layer.index);
                    parent.layer.open(
                        {
                            area: [a[0] + 'px', a[1] + 'px'],
                            type: 2,
                            title: title,
                            content: p
                        });
                }
                else {
                    layer.open(
                        {
                            area: [a[0] + 'px', a[1] + 'px'],
                            type: 2,
                            title: title,
                            content: p
                        });
                }
            });
        }
    });
}
//确认窗口
var Confirm = function (msg, callback) {
    layer.confirm(msg,
        {
            btn: ['确定', '取消'] //可以无限个按钮
        }, function (index, layero) {
            if (callback != null) {
                callback();
                layer.close(layer.index);
            }
        }, function (index) {
            layer.close(layer.index);
        });
}
//提示弹出
var Tip = function (message, tiptype, callback) {
    layer.alert(message, { icon: tiptype }, function (index) {
        layer.close(index);
        if (callback != null) {
            callback()
        }
    });
};
//无刷新请求
function AjaxGet(url, panel, callback) {
    $.get(url, { __AjaxPanelIDs: panel },
        function (content, textStatus) {
            if (textStatus != "success") {
                Tip('出错了!', '-1')
            }
            else {
                $('#' + panel).html($.trim(content));
                if (callback != null) {
                    callback(content)
                }
            }
        })
}
//AjaxPost提交
function AjaxPost(url, frm, callback) {
    $('.easyui-combobox').each(function () {
        var cbxname = $(this).attr('cbxname');
        if (cbxname != undefined && cbxname != '') {
            var text = $(this).find("option:selected").text();
            $("#" + cbxname).val(text);
        }
    });
    $('#' + frm).ajaxSubmit({
        type: "post",  //提交方式    
        url: url, //请求url 
        error: function (request) {
            Tip('出错了!', '2')
        },
        success: function (r) {
            if (r.msg == '' || r.msg == null) {
                if (r.url != null && r.url != '') {
                    if (r.parent) {
                        parent.location.href = r.url
                    }
                    else {
                        location.href = r.url
                    }
                }
                if (r.focus_input != '') {
                    $('#' + r.focus_input).focus();
                }
                if (callback != null) {
                    callback()
                }
            }
            else
            {
                Tip(r.msg, r.succ ? '1' : '0',
                    function () {
                        if (r.url != null && r.url != '') {
                            if (r.parent) {
                                parent.location.href = r.url
                            }
                            else {
                                location.href = r.url
                            }
                        }
                        if (callback != null) {
                            callback()
                        }
                        if (r.focus_input != '') {
                            $('#' + r.focus_input).focus();
                        }
                    })
            }            
        }
    })
}
//初始化下拉框
function initcombox() {
    $('.easyui-combobox').each(function () {
        var id = $(this).attr('id');
        var url = $(this).attr('url');
        var bind = $(this).attr('bind');
        var cbxname = $(this).attr('cbxname');
        var bd = {};
        if (bind != undefined && bind != '') {
            bind = bind.replace(/'/g, '"');
            bd = JSON.parse(bind);
        }
        var fault = $(this).attr('fault');
        if (url != '' && url != undefined) {
            binddownlist(url, bd.bindKey, bd.bindValue, fault, id);
        }
    });
}
//绑定下拉框
function binddownlist(url, keyid, keyvalue, fault, control) {
    $.ajax({
        type: "get",
        url: url,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.succ) {
                var ddl = $('#' + control);
                //删除节点  
                $("#" + control + " option").remove();
                //转成Json对象  
                var result = eval(data.data);
                ddl[0].options.add(new Option("请选择", "0"));
                $.each(result, function (key, value) {
                    var k = ''; var v = ''; var getone = false;
                    for (var key in value) {
                        if (key == keyid) {
                            k = value[key];
                            getone = true;
                        }
                        if (key == keyvalue) {
                            v = value[key];
                            if (getone) { break; }
                        }
                    }
                    if (k != '' && v != '') {
                        var op = new Option(v, k);
                        ddl[0].options.add(op);
                    }
                });
                $(ddl).val(fault);
            }
        },
        complete: function (aa, bb) {
            arr = aa;
        }
    });
}
function searchdata(dm)
{
    // if ($('#schkey').val() == '')
    // {
    //     alert("请输入搜索关键字!")
    //     $('#schkey').focus()
    //     return;
    // }

    if ($('#schkey').val().length<2)
    {
        alert("请输入大于等于2位数的搜索关键字!")
        $('#schkey').focus()
         return;
    }
    
    var type = 0;
    $('#webSelect span').each(function ()
    {
        if ($(this).hasClass('s'))
        {
            type = $(this).index();
        }
    });
    var key = $('#schkey').val();
    if (type == 0)//产品搜索
    {
        location.href = 'http://www.' + dm + '/product/search.html?key=' + escape(key);
    }
    if (type == 1)//供求搜索
    {
        location.href = 'http://www.' + dm + '/trade/tradesearch.html?key=' + escape(key);
    }
    if (type == 2)//企业搜索
    {
        location.href = 'http://www.' + dm + '/company/search.html?key=' + escape(key);
    }
    if(type==3)//新闻搜索
    {
        location.href ='http://news.'+ dm +'/search.html?key='+ escape(key);
    }
}

function searchdataphp(dm)
{
    // if ($('#schkey').val() == '')
    // {
    //     alert("请输入搜索关键字!")
    //     $('#schkey').focus()
    //     return;
    // }

    if ($('#schkey').val().length<1)
    {
        alert("请输入大于等于1位数的搜索关键字!")
        $('#schkey').focus()
        return;
    }
    var type = 0;
    $('#webSelect span').each(function ()
    {
        if ($(this).hasClass('s'))
        {
            type = $(this).index();
        }
    });
    var key = $('#schkey').val();
    if (type == 0)//产品搜索
    {
        location.href = 'http://www.' + dm + '/product/search.html?key=' +key;
    }
    if (type == 1)//供求搜索
    {
        location.href = 'http://www.' + dm + '/trade/search.html?key=' + key;
    }
    if (type == 2)//企业搜索
    {
        location.href = 'http://www.' + dm + '/company/search.html?key=' + key;
    }
}

function ProductSearch()
{
    // if($('#prokey').val()=='')
    // {
    //     alert('请输入搜索关键字');
    //     return;
    // }
    if($('#prokey').val().length<2)
    {
        alert('请输入大于等于2位数的搜索关键字');
        return;
    }
    var type = $('#slctype').val();
    var key = $('#prokey').val();
    if(type >0)
    {
        location.href='http://www.' + domainName + '/product/search.html?key='+escape(key)+'&type='+type;
    }
    else
    {
        location.href='http://www.' + domainName + '/product/search.html?key='+escape(key);
    }
}

function ProductSearchphp()
{
    // if($('#prokey').val()=='')
    // {
    //     alert('请输入搜索关键字');
    //     return;
    // }
    if($('#prokey').val().length<2)
    {
        alert('请输入大于等于2位数的搜索关键字');
        return;
    }
    var type = $('#slctype').val();
    var key = $('#prokey').val();
    if(type >0)
    {
        location.href='http://www.' + domainName + '/product/search.html?key='+key+'&type='+type;
    }
    else
    {
        location.href='http://www.' + domainName + '/product/search.html?key='+key;
    }
}

function CompanySearchphp()
{
    if($('#txtcomsearch').val().length<2)
    {
        alert('请输入大于等于2位数的搜索关键字');
        return;
    }
    var key = $('#txtcomsearch').val();
        location.href='http://www.' + domainName + '/company/search.html?key='+key;
}


function topchose() {
    $('#webSelect span').click(function ()
    {
        $('#webSelect span').each(function () { $(this).removeClass('s'); });
        $(this).addClass('s');
    });
}
//设置当前选中样式
function SetClass(flag, vip)
{
    if (vip > 0)
    {
        $('#a' + flag).attr('class', 's');
        $('#al' + flag).attr('class', 'sub s');
    }
    else
    {
        $('#li' + flag).attr('class', 'n s');
    }
}
function setmenu(v) {
        $('#' + v).addClass('s');
    }
function schchoose() {
    $('#search dt').click(function () {
        var k = $(this).attr('d');
        $('#qt').val(k);
        $('#search dt').each(function () { $(this).removeClass('s'); });
        $(this).addClass('s');
    });
}
function picsizeA(me, ow, oh) {
    if (!me) return;
    var ow = ow || 210, oh = oh || 210, tw = me.width, th = me.height, nw = tw, nh = th;
    while (nw > ow || nh > oh) { nw--; nh = th * nw / tw; }
    me.style.width = nw + 'px';
    me.style.height = nh + 'px';
}