//加入收藏

function AddFavorite(sURL, sTitle)
{
    
    sURL = encodeURI(sURL);
    try
    {
        
        window.external.addFavorite(sURL, sTitle);
        
    }
    catch (e)
    {
        
        try
        {
            
            window.sidebar.addPanel(sTitle, sURL, "");
            
        }
        catch (e)
        {
            
            alert("加入收藏失败，请使用Ctrl+D进行添加,或手动在浏览器里进行设置.");
            
        }
        
    }
    
}

//设为首页

function SetHome(url)
{
    
    if (document.all)
    {
        
        document.body.style.behavior = 'url(#default#homepage)';
        
        document.body.setHomePage(url);
        
    }
    else
    {
        
        alert("您好,您的浏览器不支持自动设置页面为首页功能,请您手动在浏览器里设置该页面为首页!");
        
    }
    
}
