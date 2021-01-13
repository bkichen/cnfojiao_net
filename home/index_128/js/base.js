document.onkeydown = function (e) {
    if (!e) e = window.event;
    {
        if ((e.keyCode || e.which) == 13)
        {
            var u = document.getElementById("UserID");
            if (u != null)
            { return Checklogin(); }
            else {
                if ($('#SearchKeywords').val() != '') {
                    CheckWebSearch();
                }
                else {
                    ProductSearch();
                }
            }
            return false;
        }
    }
}
function Checklogin() {
    if (document.formLogin.UserID.value == "") {
        alert("请输入用户名! ")
        document.formLogin.UserID.focus()
        return false
    }
    else if (document.formLogin.Password.value == "") {
        alert("请输入密码! ")
        document.formLogin.Password.focus()
        return false
    }
    return true;
}


(function ($) {
    $.fn.turn = function (settings) {
        settings = $.extend({
            direction: 1,
            num: 1,
            duration: 3000
        }, settings);

        var ul = $(this).find("ul");
        if (settings.direction == 0 || settings.direction == 2) {
            var height = $(this).find("li").outerHeight();
            var width = 0;
        }
        if (settings.direction == 1 || settings.direction == 3) {
            var height = 0;
            var width = $(this).find("li").outerWidth();
        }

        $(this).find("span a").eq(0).click(function () {
            turn(0);
        });
        $(this).find("span a").eq(1).click(function () {
            turn(1);
        });
        $(this).hover(function () {
            clearInterval(change);
        }, function () {
            change = setInterval(function () { turn(Math.floor(settings.direction / 2)) }, settings.duration);
        }).trigger("mouseleave");

        function turn(x) {
            if (!$(ul).is(":animated")) {
                if (x == 0) {
                    $(ul).animate({ left: -width, top: -height }, "slow", function () {
                        $(ul).css({ "left": "0", "top": "0" });
                        $(ul).children().each(function (i) {
                            if (i == settings.num) { return false; }
                            $(ul).children().filter(":first").appendTo(ul);
                        });
                    });
                } else if (x == 1) {
                    $(ul).css({ "left": -width, "top": -height });
                    $(ul).children().each(function (i) {
                        if (i == settings.num) { return false; }
                        $(ul).children().filter(":last").prependTo(ul);
                    });
                    $(ul).animate({ left: 0, top: 0 }, "slow");
                }
            }
        }
    }
})(jQuery);


function freshCity(id, c) {
    AjaxRequest.Get('/logistics.html?provinId=' + id, c);
}
function freshTown(id, c) {
    AjaxRequest.Get('/logistics.html?cityId=' + id, c);
}
function freshCity2(id, c) {
    AjaxRequest.Get('/logistics.html?provinId2=' + id, c);
}
function freshTown2(id, c) {
    AjaxRequest.Get('/logistics.html?cityId2=' + id, c);
}
function lc_freshCity(id, c) {
    AjaxRequest.Get('/index.html?provinId=' + id, c);
}
function lc_freshTown(id, c) {
    AjaxRequest.Get('/index.html?cityId=' + id, c);
}
function lc_freshCity2(id, c) {
    AjaxRequest.Get('/index.html?provinId2=' + id, c);
}
function lc_freshTown2(id, c) {
    AjaxRequest.Get('/index.html?cityId2=' + id, c);
}

function CheckAlign() {
    var beg = $('#con_begin');
    var end = $('#con_end');
    var begTabNum = beg.find("table").length;
    var endTabNum = end.find("table").length;
    //alert(begTabNum + ',' + endTabNum);
    var num = 0;
    var o;
    if (begTabNum > endTabNum) {
        num = begTabNum - endTabNum;
        o = end.find("table:eq(0)");
        for (var i = 0; i < num; i++) {
            end.append(o);
        }
    }
    if (endTabNum > begTabNum) {
        num = endTabNum - begTabNum;
        o = beg.find("table:eq(0)");
        for (var i = 0; i < num; i++) {
            beg.append(o);
        }
    }
}

//无刷新更新城市
function freshJob(id) {
    if (id > 0) {
        AjaxRequest.Get('/freight/carlist.html?provinID=' + id, 'ap_city');
    }
}
function frashTown(city) {
    AjaxRequest.Get('/freight/carlist.html?cityid=' + city, 'ap_town');
}
function frashZip(town) {
    AjaxRequest.Get('/freight/carlist.html?townid=' + town, 'ap_zip');
}

function freshJob1(id) {
    if (id > 0) {
        AjaxRequest.Get('/freight/carlist.html?provinID=' + id, 'ap_city1');
    }
}
function frashTown1(city) {
    AjaxRequest.Get('/freight/carlist.html?cityid=' + city, 'ap_town1');
}
function frashZip1(town) {
    AjaxRequest.Get('/freight/carlist.html?townid=' + town, 'ap_zip1');
}

//function setSou(str) {
//    //   document.getElementById("div1").innerText=str;
//    document.getElementById("div1").innerHTML = "&gt " + str;
//}


function Searc() {
    var fprovin = $('#ProvinceID'), fcity = $('#CityID'), ftown = $('#slctown');
    var tprovin = $('#ProvinceID1'), tcity = $('#CityID1'), ttown = $('#slctown1');
    var isreturn = $('#isreturn'), carCase = $('#carCase'), carType = $('#carType');
    var goby = $('#goby'), CarName = $('#CarName');

    if (fprovin.val() == '0' || fcity.val() == '0') {
        alert('请选择出发地的省份和城市！');
        return;
    }
    if (tprovin.val() == '0' || tcity.val() == '0') {
        alert('请选择到达地的省份和城市！');
        return;
    }

    var url = '';
    if (parseInt(ftown.val()) > 0 && parseInt(ttown.val()) > 0) {
        url = 'tt-' + ftown.val() + '-' + ttown.val();
    } else if (parseInt(ftown.val()) > 0 && parseInt(tcity.val()) > 0) {
        url = 'tc-' + ftown.val() + '-' + tcity.val();
    } else if (parseInt(fcity.val()) > 0 && parseInt(ttown.val()) > 0) {
        url = 'ct-' + fcity.val() + '-' + ttown.val();
    } else {
        url = 'cc-' + fcity.val() + '-' + tcity.val();
    }

    var page = '';
    if (parseInt(isreturn.val()) >= 0) {
        page += "a" + isreturn.val();
    }
    if (parseInt(carCase.val()) > 0) {
        page += (page == '' ? '' : '-') + "b" + carCase.val();
    }
    if (parseInt(carType.val()) > 0) {
        page += (page == '' ? '' : '-') + "c" + carType.val();
    }
    if ($.trim(goby.val()) != '') {
        page += (page == '' ? '' : '-') + "tu" + goby.val();
    }
    if ($.trim(CarName.val()) != '') {
        page += (page == '' ? '' : '-') + "no" + CarName.val();
    }

    if (page != '') {
        url += '/' + page;
    }
    url = url + '.html';
    url = '/freight/carlist/' + url;
    
    location.href = url;
}

function godddslist_Searc() {
    var fprovin = $('#ProvinceID'), fcity = $('#CityID'), ftown = $('#slctown');
    var tprovin = $('#ProvinceID1'), tcity = $('#CityID1'), ttown = $('#slctown1');
    var sendMethod = $('#sendmethod'), goodsType = $('#GoodsType'), goodsName = $('#GoodsName');

    if (fprovin.val() == '0' || fcity.val() == '0') {
        alert('请选择出发地的省份和城市！');
        return;
    }
    if (tprovin.val() == '0' || tcity.val() == '0') {
        alert('请选择到达地的省份和城市！');
        return;
    }

    var url = '';
    if (parseInt(ftown.val()) > 0 && parseInt(ttown.val()) > 0) {
        url = 'tt-' + ftown.val() + '-' + ttown.val();
    } else if (parseInt(ftown.val()) > 0 && parseInt(tcity.val()) > 0) {
        url = 'tc-' + ftown.val() + '-' + tcity.val();
    } else if (parseInt(fcity.val()) > 0 && parseInt(ttown.val()) > 0) {
        url = 'ct-' + fcity.val() + '-' + ttown.val();
    } else {
        url = 'cc-' + fcity.val() + '-' + tcity.val();
    }

    var page = '';
    if (parseInt(sendMethod.val()) > 0) {
        page += "a" + sendMethod.val();
    }
    if (parseInt(goodsType.val()) > 0) {
        
        page += (page == '' ? '' : '-') + "b" + goodsType.val();
    }
    if ($.trim(goodsName.val()) != '') {
        page += (page == '' ? '' : '-') + goodsName.val();
    }

    if (page != '') {
        url += '/' + page;
    }
    url = url + '.html';
    url = '/freight/godddslist/' + url;

    location.href = url;
}


//function godddslist_freshJob(id) {
//    if (id > 0) {
//        AjaxRequest.Get('/freight/godddslist.html?provinID=' + id, 'ap_city');
//    }
//}
//function godddslist_frashTown(city) {
//    AjaxRequest.Get('/freight/godddslist.html?cityid=' + city, 'ap_town');
//}
//function godddslist_frashZip(town) {
//    AjaxRequest.Get('/freight/godddslist.html?townid=' + town, 'ap_zip');
//}

//function godddslist_freshJob1(id) {
//    if (id > 0) {
//        AjaxRequest.Get('/freight/godddslist.html?provinID=' + id, 'ap_city1');
//    }
//}
//function godddslist_frashTown1(city) {
//    AjaxRequest.Get('/freight/godddslist.html?cityid=' + city, 'ap_town1');
//}
//function godddslist_frashZip1(town) {
//    AjaxRequest.Get('/freight/godddslist.html?townid=' + town, 'ap_zip1');
//}

//function godddslist_setSou(str) {
//    //   document.getElementById("div1").innerText=str;
//    document.getElementById("div1").innerHTML = "&gt " + str;
//}

//function godddslist_setInputValue(GoodsName) {
//    $("#GoodsName").val(GoodsName);
//}

function ads_freshCity(id, c) {
    AjaxRequest.Get('/addgoodssource.html?provinId=' + id, c);
}
function ads_freshTown(id, c) {
    AjaxRequest.Get('/addgoodssource.html?cityId=' + id, c);
}
function ads_freshCity2(id, c) {
    AjaxRequest.Get('/addgoodssource.html?provinId2=' + id, c);
}
function ads_freshTown2(id, c) {
    AjaxRequest.Get('/addgoodssource.html?cityId2=' + id, c);
}
function ads_ValidForLong() {
    var chk = $('#valid_long');
    var o = $('#valid');
    if (chk.attr("checked")) {
        o.val('长期货源').attr("disabled", true);
    } else {
        o.val('2015-09-19').attr("disabled", false);
    }
}
function ads_AddGoodsSource() {
    var goTown = $('#gotown');
    if (goTown.val() == '0:') {
        alert('请选择出发地的省份城市区镇！');
        goTown.focus();
        return false;
    }

    var toTown = $('#totown');
    if (toTown.val() == '0:') {
        alert('请选择到达地的省份城市区镇！');
        toTown.focus();
        return;
    }

    var goodsName = $('#goodsname');
    if (goodsName.val() == '') {
        alert('请填写货物名称！');
        goodsName.focus();
        return;
    }

    //var num = $('#member');
    //if (num.val() == '') {
    //    alert('请填写货物数量！');
    //    num.focus();
    //    return false;
    //}

    //var bule = $('#bule');
    //if (bule.val() == '') {
    //    alert('请填写货物重量！');
    //    bule.focus();
    //    return false;
    //}

    //var bkou = $('#bkou');
    //if (bkou.val() == '') {
    //    alert('请填写货物体积！');
    //    bkou.focus();
    //    return false;
    //}

    var companyname = $('#companyname');
    if (companyname.val() == '') {
        alert('请填写公司名称！');
        com.focus();
        return false;
    }

    var connName = $('#connname');
    if (connName.val() == '') {
        alert('请填写发货人姓名！');
        connName.focus();
        return false;
    }

    var connMobile = $('#connmobile');
    if (connMobile.val() == '') {
        alert('请填写发货人手机号码！');
        connMobile.focus();
        return false;
    }

    //AjaxRequest.Post('btOK', function (content) {
    //    alert(content['Tip']);
    //    if (content['Url'] != '') {
    //        location.href = content['Url'];
    //    }
    //});
    PostData("form1", "add");
}
function ads_ChangeSendType() {
    var sType = $('#carriage');
    if (sType.val() == '同城接送') {
        $('#con_need_tit').css("display", "none");
        $('#con_need_con').css("display", "none");
    } else {
        $('#con_need_tit').css("display", "");
        $('#con_need_con').css("display", "");
    }
}
function ads_CountExplain() {
    var explain = $('#explain');
    var infoCount = $('#infoCount');

    if (explain.val().length >= 30) {
        explain.val(explain.val().substring(0, 30));
    }
    infoCount.text(explain.val().length);
}
function ads_CountNotice() {
    var notice = $('#motice');
    if (notice.val().length >= 25) {
        notice.val(notice.val().substring(0, 25));
    }
}
function ads_CountCompanyName() {
    var companyname = $('#companyname');
    if (companyname.val().length > 25) {
        companyname.val(companyname.val().substring(0, 25));
    }
}
function SelRoute(r) {
    //$('#SendRoute').val(r);

    if (r != '') {
        location.href = '/logisticsios/' + r + '/p1.html';
    } else {
        location.href = '/logisticsios/p1.html';
    }
}
///////////////货运信息使用///////////////
function GetCitys(id, con, con2, cid) {
    if (id > 0) {
        AjaxGet("/api/api_area.aspx?act=get_citys_by_proid&proid=" + id, con, function () {
            $('#' + con2).html("<option value='0'>所有城镇</option>");
            if (cid > 0) { $('#' + con).val(cid); }
        });
    }
    else {
        $('#' + con).html("<option value='0'>请选择城市</option>");
        $('#' + con2).html("<option value='0'>所有城镇</option>");
    }
}
function GetTowns(id, con, tid) {
    if (id > 0) {
        AjaxGet("/api/api_area.aspx?act=get_towns_by_cityid&cityid=" + id, con, function () {
            if (tid > 0) { $('#' + con).val(tid); }
        });
    }
    else {
        $('#' + con).html("<option value='0'>所有城镇</option>");
    }
}
//ajax无刷新获取数据
function AjaxGet(url, item, callback) {
    $.ajax
    (
        {
            url: url,
            success: function (data) {
                var o = document.getElementById(item);
                if (o) {
                    $('#' + item).html($.trim(data));
                }
                if (callback != null)//如果有回调函数
                {
                    callback(data);
                }
            }
        }
    );
}
