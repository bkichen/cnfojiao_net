// JavaScript Document
$(document).ready(function () { playA(); });
function playA() {
    if (!$('.playerA')[0]) return;
    var time = 3000, t = 500, i = 0, pid;
    Select();
    start();
    pid = setInterval(start, time);
    $('.playerA li').each(function () { hover($(this)); })
    $('.playerA p span').each(function (n) { hover($(this)); $(this).click(function () { i = n; start(); css($(this)); }); })

    function start() {
        if (i >= $('.playerA li').length) i = 0;
        $('.playerA ul').animate({ 'left': i * 232 * -1 + 'px' }, t);
        css($('.playerA p span').eq(i));
        i++;
    }
    function Select() {
        var o = document.createElement('p'), htm = '';
        for (var i = 0; i < $('.playerA li').length; i++) {
            htm += '<span>' + (i + 1) + '</span>';
        }
        o.innerHTML = htm;
        $('.playerA')[0].appendChild(o);
    }
    function hover(me) {
        if (!me[0]) return;
        me.hover(function () { clearInterval(pid); try { $('.playerAA ul').clearQueue(); } catch (err) { }; }, function () { pid = setInterval(start, time); });
    }
    function css(me) {
        me.parent().children().removeClass('s');
        me.addClass('s');
    }
}	