//搜索数据
function CheckWebSearch()
{
    if ($('#SearchKeywords').val()=='' || $('#SearchKeywords').val()=="请输入关键字...")
    {
        alert("请输入搜索关键字!")
        $('#SearchKeywords').focus()
        return;
    }
    var type = $('#SearchType').val();
    var key =$('#SearchKeywords').val();
    if(type==1 || type ==0)//产品搜索
    {
        location.href='http://www.'+domainName+'/product/so?q='+key;
    }
    if(type==2)//供求搜索
    {
        location.href='http://www.'+domainName+'/trade/so?q='+key;
    }
    if(type==3)//企业搜索
    {
        location.href='http://www.'+domainName+'/company/search.html?key='+key;
    }
    if(type==4)//新闻搜索
    {
        location.href ='http://news.'+domainName+'/search.html?keywords='+key;
    }
    return true;
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

    if(type==0 || type==1)//产品搜索
    {//window.open('/product/productsearch.html?key='+key,'_blank');
        location.href='http://www.'+domainName+'/product/search.html?key='+key;
    }
    if(type==2)//供求搜索
    {//window.open('/trade/tradesearch.html?key='+key,'_blank');
        location.href='http://www.'+domainName+'/trade/search.html?key='+key;
    }
    if(type==3)//企业搜索
    {//window.open('/company/search.html?key='+key,'_blank');
     location.href='http://www.'+domainName+'/company/search.html?key='+key;
    }
    if(type==4)//新闻搜索
    {//window.open('http://news.'+domainName+'/search.html?keywords='+key,'_blank');
      location.href ='http://news.'+domainName+'/search.html?key='+key;
    }
	
}
//设置当前选中样式
function SetClass(flag)
{
    $('#li'+flag).attr('class','s');
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
        location.href='/product/productsearch.html?key='+key+'&type='+type;
    }
    else
    {
        location.href='/product/productsearch.html?key='+key;
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
//行业术语搜索
function GlosSearch()
{
    if($('#gloskey').val()=='')
    {
        alert('请输入搜索关键字');
        return;
    }
    location.href ='/glossary/search.html?key='+$('#gloskey').val();
}
//行业知识搜索
function KnowSearch()
{
    if($('#knowkey').val()=='')
    {
        alert('请输入搜索关键字');
        return;
    }
    location.href ='/knowledge/search.html?key='+$('#knowkey').val();
}
//词典搜索
function DictSearch()
{
    if($('#dictkey').val()=='')
    {
        alert('请输入搜索关键字');
        return;
    }
    location.href ='/dict/search.html?key='+$('#dictkey').val();
}
//保存招标信息
function SaveBidding()
{
    $('#ZBtype2').val('');
    if($('#Projectname').val()=='')
    {
        alert('请输入信息标题');
        return;
    }
    if($('#txtbtime').val()=='')
    {
        alert('请输入报名开始时间');
        return;
    }
    if($('#txtetime').val()=='')
    {
        alert('请输入报名结束时间');
        return;
    }
    if($('#bidconame').val()=='')
    {
        alert('请输入招标单位');
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
    var ids='';
    $("input[name='ZBtype']").each(function()
    {
        if($(this).attr('checked')==true)
        {
            ids =ids +$(this).val()+',';
        }
    });
    if(ids =='')
    {
        alert('请选择类别');
        return;
    }
    $('#ZBtype2').val(ids);
    if($('#zbinfo').val()=='')
    {
        alert('请输入内容');
        return;
    }
    AjaxRequest.Post('btOK',function(content)
    {
        alert(content['Tip']);
        if(content['Url']=='0')
        {
            location.href='/bidding/bidding-add.html';
        }
    });  
}