/*首页特效代码*/
/*搜索框文字效果*/
$(function(){
	$("#inputSearch").focus(function(){
		$(this).addClass("focus");
		if($(this).val() == this.defaultValue){
			$(this).val("");
		}
	}).blur(function(){
		$(this).removeClass("focus");
		if($(this).val() == ""){
			$(this).val(this.defaultValue);
		}
	}).keyup(function(e){
		if(e.which == 13){
			alert("回车提交表单成功!");
		}
	});
});

/*网页换肤*/
/*$(function(){
	var $li = $("#skin li");
	$li.click(function(){
		$(this).addClass("selected")
		.siblings().removeClass("selected");
		$("#cssfile").attr("href","css/skin/"+ (this.id) + ".css");
		$.cookie("MyCssSkin", this.id, {path: "/", expires: 10});
	});
	var cookie_skin = $.cookie("MyCssSkin");
	if(cookie_skin){
		$("#" + cookie_skin).addClass("selected")
		.siblings().removeClass("selected");
		$("#cssfile").attr("href","css/skin/"+ cookie_skin + ".css");
		$.cookie("MyCssSkin", cookie_skin, {path: "/", expires: 10});
	}
});
*/

$(function(){
	var $li = $("#skin li");
	$li.click(function(){
		switchSkin(this.id);
	});
	var cookie_skin = $.cookie("MyCssSkin");
	if(cookie_skin){
		switchSkin(cookie_skin);
	}
	function switchSkin(skinName){
		$("#" + skinName).addClass("selected")
			.siblings().removeClass("selected");
		$("#cssfile").attr("href","css/skin/" + skinName + ".css");
		$.cookie("MyCssSkin", skinName, {path: "/", expires: 10});
	}
});

/*导航效果*/
$(function(){
	$("#nav li").hover(function(){
		$(this).find(".jnNav").show();
	},function(){
		$(this).find(".jnNav").hide();
	});
});

/*左侧商品分类热销效果*/
$(function(){
	$(".jnCatainfo .promoted").append('<s class="hot"></s>');
});

/*右侧上部产品广告效果*/
$(function(){
	var $imgrolls = $("#jnImageroll div a");
	$imgrolls.css("opacity",0.7);
	var len = $imgrolls.length;
	var index =0;
	var adTimer = null;
	
	$("#jnImageroll div a").mouseover(function(){
		index = $("#jnImageroll div a").index(this);
		showImg(index);
	}).eq(0).mouseover();
	
	
	$("#jnImageroll").hover(function(){
		if(adTimer){
			clearInterval(adTimer);
		}
	},function(){
		adTimer = setInterval(function(){
			showImg(index);
			index++;
			if(index == len){
				index = 0;
			}
		},3000);
	}).trigger("mouseleave");
	
	function showImg(index){
		var $rollobj = $("#jnImageroll");
		var $rollllist = $rollobj.find("div a");
		var newhref = $rollllist.eq(index).attr("href");
		$("#JS_imgWrap").attr("href",newhref)
						.find("img").eq(index).stop(true,true).fadeIn()
						.siblings().fadeOut();
		$rollllist.removeClass("chos").css("opacity",0.7)
					.eq(index).addClass("chos").css("opacity",1);
	}
});

/*右侧最新动态模块内容添加超链接提示*/
$(function(){
	var x = 10;
	var y = 20;
	$("a.tooltip").mouseover(function(e){
		this.myTitle = this.title;
		this.title = "";
		var tooltip = "<div id='tooltip'>"+ this.myTitle +"</div>";
		$("body").append(tooltip);
		$("#tooltip").
			css({
				"top": (e.pageY + y) + "px",
				"left": (e.pageX + x) + "px"
			}).show("fast");
	}).mouseout(function(){
		this.title = this.myTitle;
		$("#tooltip").remove();
	}).mousemove(function(e){
		$("#tooltip").
			css({
				"top": (e.pageY + y) + "px",
				"left": (e.pageX + x) + "px"
			});
	});
});

/*右侧下部品牌活动横向滚动效果*/
$(function(){
	$("#jnBrandTab li a").click(function(){
		$(this).parent().addClass("chos")
				.siblings().removeClass("chos");
		var index = $("#jnBrandTab li a").index(this);
		showBrandList(index);
		return false;
	}).eq(0).click();
	//显示不同的模块
	function showBrandList(index){
		var $rollobj = $("#jnBrandList");
		var rollWidth = $rollobj.find("li").outerWidth();
		rollWidth = rollWidth * 4;
		$rollobj.stop(true,true).animate({left: -rollWidth * index}, 1000);
	}
});

/*右侧下部光标滑过产品列表效果*/
$(function(){
	$("#jnBrandList li").each(function(index){
		var $img = $(this).find("img");
		var img_w = $img.width();
		var img_h = $img.height();
		var spanHtml = '<span style="position:absolute;top:0;left:5px;width:' + img_w + 'px;height:' + img_h + 'px;" class="imageMask"></span>';
		$(spanHtml).appendTo(this);
		$("#jnBrandList").find(".imageMask").live("hover", function(){
			$(this).addClass("imageOver")
				.parent().siblings().
				find(".imageMask").removeClass("imageOver");
		});
	});
});


/*详细页特效代码*/

/*产品图片放大镜效果*/
$(function(){
	$(".jqzoom").jqzoom({
		zoomType: "standard", //是否将原图用半透明覆盖
		lens: true, //不在原图上显示镜头
		preloadImages: false, 
		alwaysOn: false,
		zoomWidth: 340,
		zoomHeight: 340,
		xOffset: 10,
		yOffset: 0,
		position: 'right'
	});
});

/*单击产品小图片切换大图*/
$(function(){
	$("#jnProitem ul.imgList li a").bind("click",function(){
		var imgSrc= $(this).find("img").attr("src");
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0, i);
		var imgSrc_big = imgSrc + "_big" + unit;
		$("#thickImg").attr("href", imgSrc_big);
	});
});

/*产品属性介绍的选项卡*/
$(function(){
	var $div_li = $("div.tab_menu ul li");
	$div_li.click(function(){
		$(this).addClass("selected")
				.siblings().removeClass("selected");
		var index = $div_li.index(this);
		
		$("div.tab_box > div")
				.eq(index).show()
				.siblings().hide();
	}).hover(function(){
		$(this).addClass("hover")
	},function(){
		$(this).removeClass("hover");
	});
});

/*右侧产品颜色切换*/
$(function(){
	$(".color_change ul li img").click(function(){
		$(this).addClass("hover")
				.parent().siblings().find("img").removeClass("hover");
		var imgSrc= $(this).attr("src");
		var i = imgSrc.lastIndexOf(".");
		var unit = imgSrc.substring(i);
		imgSrc = imgSrc.substring(0,i);
		var imgSrc_small = imgSrc + "_one_small" + unit;
		var imgSrc_big = imgSrc + "_one_big" + unit;
		$("#bigImg").attr("src", imgSrc_small);
		$("#thickImg").attr("href", imgSrc_big);
		var alt = $(this).attr("alt");
		$(".color_change strong").text(alt);
		var newImgSrc = imgSrc.replace("images/pro_img/", "");
		$("#jnProitem .imgList li").hide();
		$("#jnProitem .imgList").find(".imgList_" + newImgSrc).show();
	});
});

/*右侧产品尺寸切换*/
$(function(){
	$(".pro_size li").click(function(){
		$(this).addClass("cur")
				.siblings().removeClass("cur");
		var size = $(this).text();
		$(this).parents("ul").siblings("strong").text(size);
	});
});

/*右侧产品数量和价格联动*/
$(function(){
	var $span = $(".pro_price strong");
	var price = $span.text();
	$("#num_sort").change(function(){
		var num = $(this).val();
		var amount = num * price;
		$span.text(amount);
	}).change();
});

/*右侧给产品评分的效果*/
$(function(){
	$("ul.rating li a").click(function(){
		var title = $(this).attr("title");
		alert("您给此商品的评价是:" + title);
		var cl = $(this).parent().attr("class");
		$(this).parent().parent().removeClass("nostar")
				.addClass("rating " + cl + "star");
		$(this).blur();
		return false;
	});
});

/*右侧放入购物车*/
$(function(){
	var $product = $(".jnProDetail");
	$("#cart a").click(function(){
		var pro_name = $product.find("h4:first").text();
		var pro_size = $product.find(".pro_size strong").text();
		var pro_color = $product.find(".color_change strong").text();
		var pro_num = $product.find("#num_sort").val();
		var pro_price = $product.find(".pro_price strong").text();
		var dialog = "感谢您的购买。<div style='font-size:12px;font-weight:400;'>您购买的产品是："+pro_name+"；"+
				"尺寸是："+pro_size+"；"+
				"颜色是："+pro_color+"；"+
				"数量是："+pro_num+"；"+
				"总价是："+pro_price +"元。</div>";
		$("#jnDialogContent").html(dialog);
		$("#basic-dialog-ok").modal();
		return false;
	});
});
