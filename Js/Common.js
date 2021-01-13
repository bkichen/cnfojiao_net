function $onload(func) {
  var old = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {  
    window.onload = function() {
      old();
      func();
    }
  }
}//end $onload
function picsizeA(me,ow,oh){
	if(!me)return;
	var ow=ow || 210,oh=oh|| 210,tw=me.width,th=me.height,nw=tw,nh=th;
	while(nw>ow || nh>oh){nw--;nh=th*nw/tw;}
	me.style.width=nw+'px';
	me.style.height=nh+'px';
	}
//搜索数据
function CheckWebSearch()
{   
    if ($('#SearchKeywords').val().length<1 || $('#SearchKeywords').val()=="请输入关键字...")
    {
        alert("请输入大于等于1位数的搜索关键字!")
        $('#SearchKeywords').focus()
        return;
    }
    var type = $('#SearchType').val();
    var key =escape($('#SearchKeywords').val());

    if(type==1 || type ==0)//产品搜索
    {//window.open('/product/productsearch.html?key='+key,'_blank');
        location.href='http://www.'+domainName+'/product/search.html?key='+key;
    }
    if(type==2)//供求搜索
    {//window.open('/trade/tradesearch.html?key='+key,'_blank');
        location.href='http://www.'+domainName+'/trade/tradesearch.html?key='+key;
    }
    if(type==3)//企业搜索
    {//window.open('/company/search.html?key='+key,'_blank');
     location.href='http://www.'+domainName+'/company/search.html?key='+key;
    }
    if(type==4)//新闻搜索
    {//window.open('http://news.'+domainName+'/search.html?keywords='+key,'_blank');
      location.href ='http://news.'+domainName+'/search.html?keywords='+key;
    }
	
}
function CheckWebSearchphp()
{   
    if ($('#SearchKeywords').val().length<2 || $('#SearchKeywords').val()=="请输入关键字...")
    {
        alert("请输入大于等于2位数的搜索关键字!")
        $('#SearchKeywords').focus()
        return;
    }
    var type = $('#SearchType').val();
    var key =$('#SearchKeywords').val();

    if(type==0)//产品搜索
    {//window.open('/product/productsearch.html?key='+key,'_blank');
        location.href='http://www.'+domainName+'/product/search.html?key='+key;
    }
    if(type==1)//供求搜索
    {//window.open('/trade/tradesearch.html?key='+key,'_blank');
        location.href='http://www.'+domainName+'/trade/search.html?key='+key;
    }
    if(type==2)//企业搜索
    {//window.open('/company/search.html?key='+key,'_blank');
     location.href='http://www.'+domainName+'/company/search.html?key='+key;
    }
    if(type==3)//新闻搜索
    {//window.open('http://news.'+domainName+'/search.html?keywords='+key,'_blank');
      location.href ='http://news.'+domainName+'/search.html?keywords='+key;
    }
	
}
//设置当前选中样式
function SetClass(flag)
{
    $('#li'+flag).attr('class','s');
}
//设置关于我们当前选中样式
function SetAboutClass(flag)
{
    $('#ab'+flag).attr('class','s');
}
//产品搜索
function ProductSearch()
{
    if($('#prokey').val()=='')
    {
        alert('请输入搜索关键字');
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
//企业目录搜索
function CompanySearch()
{
    var areaID= $('#slcarea').val();
    var key = $('#txtcomsearch').val();
    if(key =='')
    {
        alert('请输入搜索关键字');
        return;
    }
    if(areaID >0)
    {
        location.href ='/company/search.html?key='+key+'&provinID='+areaID;
    }
    else
    {
        location.href ='/company/search.html?key='+key;
    }
}
//人才登录
function PerLogin()
{
    if($('#txtpername').val()=='')
    {
        alert('请输入登录名');
        return;
    }
    if($('#txtperpwd').val()=='')
    {
        alert('请输入登录密码');
        return;
    }
    AjaxRequest.Post('btPerLogin',function(content)
    {        
        if(content['Url']=='0')
        {
            location.href='/job/personal.html';
        }
        else
        {
            alert(content['Tip']);
        }
    });
}
//修改人才信息
function EditPerInfo()
{
    if ($('#txtname').val()=='')
    {
        alert("对不起，请填写您的姓名!")
        $('#txtname').focus()
        return ;
    }
    var year =$('#txtyear').val();
    var month =$('#txtmonth').val();
    var day =$('#txtday').val();
    if ($('#txtyear').val()=='')
    {
        alert("对不起，请填写您的出生年份!")
        $('#txtyear').focus()
        return ;
    }    
    if ($('#txtmonth').val()=='')
    {
        alert("对不起，请填写您的出生月份!")
        $('#txtmonth').focus()
        return ;
    }
    if ($('#txtday').val()=='')
    {
        alert("对不起，请填写您的出生日期!")
        $('#txtday').focus()
        return ;
    }
    if(isNaN(year) || year==0)
    {
        alert('出生年份必须为不为0的数字!');
        return;
    }
    if(isNaN(month) || month==0 || month>12)
    {
        alert('出生月份必须为1-12的数字!');
        return;
    }
    if(isNaN(day) || day ==0 || day >31)
    {
        alert('出生日期必须为1-31的数字!');
        return;
    }
    if ($('#slcplace').val()=="")
    {
        alert("对不起，请填写您的户籍所在地!")
        $('#slcplace').focus()
        return ;
    }
    if ($('#txtcity').val()=='')
    {
        alert("对不起，请填写您的具体城市!")
        $('#txtcity').focus()
        return ;
    }
    if ($('#slcjobtype').val()=='')
    {
        alert("对不起，请选择职位类别!")
        $('#slcjobtype').focus()
        return ;
    }
    if ($('#txtschool').val()=='')
    {
        alert("对不起，请填写您的毕业学校!")
        $('#txtschool').focus()
        return false
    }
    if ($('#txtexpress').val()=='')
    {
        alert("对不起，请填写您的所学专业!")
        $('#txtexpress').focus()
        return ;
    }
    if ($('#txttelephone').val()=='')
    {
        alert("对不起，请填写您的联系电话!")
        $('#txttelephone').focus()
        return ;
    }
    if ($('#txtaddress').val()=='')
    {
        alert("对不起，请填写您的联系地址!")
        $('#txtaddress').focus()
        return ;
    }
    if ($('#txtzip').val()=='')
    {
        alert("对不起，请填写您的邮政编码!")
        $('#txtzip').focus()
        return ;
    }
    if ($('#txtJobExper').val()=='')
    {
        alert("对不起，请填写您的工作经验!")
        $('#txtJobExper').focus()
        return ;
    }

    if ($('#txtResume').val()=='')
    {
        alert("对不起，请填写您的个人简历!")
        $('#txtResume').focus()
        return ;
    }
    if ($('#txtTargetJobType').val()=='')
    {
        alert("对不起，请填目标工作岗位!")
        $('#txtTargetJobType').focus()
        return ;
    }
    var sa1= $('#txtHopeSalary1').val();
    var sa2 =$('#txtHopeSalary2').val();
    if ($('#txtHopeSalary1').val()=='')
    {
        alert("对不起，请填写您的希望待遇!")
        $('#txtHopeSalary1').focus()
        return ;
    }
    if ($('#txtHopeSalary2').val()=='')
    {
        alert("对不起，请填写您的希望待遇!")
        $('#txtHopeSalary2').focus()
        return ;
    }
    if(isNaN(sa1) ||isNaN(sa2))
    {
        alert('期望待遇必须为数字!');
        return;
    }
    AjaxRequest.Post('btOK',function(content)
    {      
        alert(content['Tip']);  
        if(content['Url']=='0')
        {
            location.href='/job/personal.html';
        }
    });
}
//修改密码
function ChangePwd()
{
    if($('#txtoldpwd').val()=='')
    {
        alert('请输入旧密码');
        return;
    }
    if($('#txtnewpwd1').val()=='')
    {
        alert('请输入新密码');
        return;
    }
    if($('#txtnewpwd2').val()=='')
    {
        alert('请再次输入新密码');
        return;
    }
    if($('#txtnewpwd2').val() != $('#txtnewpwd1').val())
    {
        alert('2次密码不一致');
        return;
    }
    AjaxRequest.Post('btOK',function(content)
    {      
        alert(content['Tip']);  
        if(content['Url']=='0')
        {
            location.href='/job/password.html';
        }
    });
}
//人才注册
function PersonReg()
{
    if($('#txtname').val()=='')
    {
        alert('请输入用户名');
        return;
    }
    if($('#txtpwd').val()=='')
    {
        alert('请输入密码');
        return;
    }
    if($('#txtpwd2').val()=='')
    {
        alert('请再次输入密码');
        return;
    }
    if($('#txtpwd').val() != $('#txtpwd2').val())
    {
        alert('2次密码不一致');
        return;
    }
    if($('#slcquestion').val()=='')
    {
        alert('请选择提示问题');
        return;
    }
    if($('#txtanswer').val()=='')
    {
        alert('请输入答案');
        return;
    }
    AjaxRequest.Post('btOK',function(content)
    {      
        alert(content['Tip']);  
        if(content['Url']=='0')
        {
            location.href='/job/personal.html';
        }
    });
}
//意见与反馈
function FeedBack()
{
    if ($('#Title').val()=='')
    {
        alert("请输入主题!")
        $('#Title').focus();
        return;
    }
    if ($('#Content').val()=='')
    {
        alert("请输入内容!")
        $('#Content').focus();
        return;
    }
    if ($('#FeedbackName').val()=='')
    {
        alert("请输入姓名!")
        $('#FeedbackName').focus();
        return;
    }
    if ($('#CompanyName').val()=='')
    {
        alert("请输入公司名称!")
        $('#CompanyName').focus();
        return;
    }
    if ($('#Email').val()=='')
    {
        alert("请输入电子邮箱!")
        $('#Email').focus();
        return;
    }
    if ($('#Tel').val()=='')
    {
        alert("请输入联系电话!")
        $('#Tel').focus();
        return;
    }
    if ($('#txtqq').val()=='')
    {
        alert("请输入联系qq!")
        $('#txtqq').focus();
        return;
    }  
    if ($('#checkcode').val()=='')
    {
        alert("请输入验证码!")
        $('#checkcode').focus();
        return;
    }
    AjaxRequest.Post('btOK',function(content)
    {      
        alert(content['Tip']);  
        if(content['Url']=='0')
        {
            location.href='/about/feedback.html';
        }
    });
}
//友情链接申请
function AppHeadLink()
{
    if ($('#Title').val()=='')
    {
        alert("请输入站点名称!")
        $('#Title').focus();
        return ;
    }
    if ($('#Url').val()=='')
    {
        alert("请输入站点网址!")
        $('#Url').focus();
        return ;
    }
    if ($('#Content').val()=='')
    {
        alert("请输入内容!")
        $('#Content').focus();
        return ;
    }
    if ($('#FeedbackName').val()=='')
    {
        alert("请输入姓名!")
        $('#FeedbackName').focus();
        return ;
    }
    if ($('#CompanyName').val()=='')
    {
        alert("请输入公司名称!")
        $('#CompanyName').focus();
        return ;
    }
    if ($('#Email').val()=='')
    {
        alert("请输入电子邮箱!")
        $('#Email').focus();
        return ;
    }
    if ($('#Tel').val()=='')
    {
        alert("请输入联系电话!")
        $('#Tel').focus();
        return ;
    }
    if ($('#txtqq').val()=='')
    {
        alert("请输入联系qq!")
        $('#txtqq').focus();
        return ;
    }  
    if ($('#checkcode').val()=='')
    {
        alert("请输入验证码!")
        $('#checkcode').focus();
        return ;
    }
    AjaxRequest.Post('btOK',function(content)
    {      
        alert(content['Tip']);  
        if(content['Url']=='0')
        {
            location.href='/about/applink.html';
        }
    });
}
//招商发布
function JoinAdd()
{
    $('#txtflag').val(0);
    if($('#txtagentname').val()=='')
    {
        alert('请填写品牌名称');
        return;
    }
    if($('#txtagentcomname').val()=='')
    {
        alert('请填写企业名称');
        return;
    }
    if($('#txtagentcontact').val()=='')
    {
        alert('请填写联系人');
        return;
    }
    if($('#txtagentmobile').val()=='')
    {
        alert('请填写联系电话');
        return;
    }
    AjaxRequest.Post('btOK',function(content)
    {      
        alert(content['Tip']);  
        if(content['Url']=='0')
        {
            location.href='/agent/joinagent.html';
        }
    });
}
//无刷新更新城市
function freshCity(id)
{
    if(id>0)
    {
        AjaxRequest.Get('/agent/joinagent.html?provinID='+id,'ap_city');
    }
}
//无刷新更新地区
function freshTown(id)
{
    if(id>0)
    {
        AjaxRequest.Get('/agent/joinagent.html?cityID='+id,'ap_town');
    }
}
//无刷新更新地区一
function freshCityOne(id)
{
    if(id>0)
    {
        AjaxRequest.Get('/agent/agentlist.html?provinID='+id,'ap_city');
    }
}
//无刷新更新地区二
function freshCityTwo(id)
{
    if(id>0)
    {
        AjaxRequest.Get('/agent/agentlist.html?provinID='+id,'ap_city2');
    }
}
//申请代理
function AgentClinet()
{
    $('#txtflag').val(1);
    if($('#txtclientname').val()=='')
    {
        alert('请填写姓名');
        return;
    }
    if($('#ProvinceID').val()=='0')
    {
        alert('请选择省份');
        return;
    }
    if($('#CityID').val()=='0')
    {
        alert('请选择城市');
        return;
    }
    if($('#TownID').val()=='0')
    {
        alert('请选择地区');
        return;
    }
    if($('#txtclientmobile').val()=='')
    {
        alert('请输入手机号码');
        return;
    }
    if($('#txtclientintro').val()=='')
    {
        alert('请输入代理详情');
        return;
    }
    AjaxRequest.Post('btOK',function(content)
    {      
        alert(content['Tip']);  
        if(content['Url']=='0')
        {
            location.href='/agent/joinagent.html';
        }
    });
}
//招商信息搜索
function agentSearch()
{
    var str='';
    if($('#agentsearch').val()!=''&& $('#agentsearch').val()!='输入关键字')
    {
        str ='s|'+$('#agentsearch').val();
    }
    if($('#slcproone').val()!='0' && $('#slcproone').val()!='999999')
    {
        str+='_z|'+$('#slcproone').val();
    }    
    if($('#slccityone').val()!='0')
    {
        str+='_zc|'+$('#slccityone').val();
    }
    if($('#slcprotwo').val()!='0' && $('#slcprotwo').val()!='999999')
    {
        str+='_c|'+$('#slcprotwo').val();
    }
    if($('#slccitytwo').val()!='0')
    {
        str+='_cc|'+$('#slccitytwo').val();
    }
    if(str !='')
    {
        location.href='/agent/agentsearch.html?condi='+str;
    }
}
function topbanner()
{
	$('.topbanner i').click(function()
	{
		$(this).parent().hide();
		$('.topbanner_A').show();
        clearTimeout(time) 
	});
	$('.topbanner_A i').click(function()
	{
		$(this).parent().hide();
		 clearTimeout(time) 
	});
	function time()
	{
		$('.topbanner').hide();
		$('.topbanner_A').show();
	}
	setTimeout(time,30000);
}