var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var stage = new JTopo.Stage(canvas);
var scene = new JTopo.Scene(stage);
var nodes = [];//存放节点
var currentNode = null;//表示当前鼠标右键选中的节点 
var canvasLeft = getLeft(canvas);//画布的左定点距页面左边的距离
var canvasTop = getTop(canvas);//画布的左定点距页面上边的距离
var baseNetwork = null;	//基础网络
var link1 = null;
var selectedNode = null;
//资源设置
var $dragTooltip = $(".drag-tooltip");
var jsonResult = {};
// 定义效果
var effect = JTopo.Effect.spring({
    minLength: 100 // 节点之间最短距离
});
var resConfig = {
	baseNetConfiguration: {		//基础网络设置
		resourceAllocation: {
			"名称": "基础网络",
			"描述": "无",
			"ID": "vxnet-0"
		}
	},	
	hostConfiguration: {	//主机配置
		resourceAllocation: {
			"名称": "",
			"描述": "无",
			"映像": "CentOS 6.6 64bit",
			"主机类型": "普通型",
			"CPU数量": 1,
			"CPU拓扑结构": "1, 1, 1",
			"CPU指令集": "默认",
			"内存": "1G",
			"SSH登录方式": "SSH密钥",
			"用户名": "root",
		},
		advancedOptions: {
			"Hostname": "无",
			"用户数据": "无"
		}
	},	
	privateNetConfiguration:{	//私有网络设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"类型": "受管",
			"网络地址": "192.168.100.0/24",
			"管理地址": "192.168.100.1",	
		},
		advancedOptions: {
			"DHCP": "启用",
			"DHCP起始地址": "192.168.100.2",
			"DHCP结束地址": "192.168.100.254"
		}
	},
	publicNetIPConfiguration:{	//公网IP设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"计费模式": "按带宽计费",
			"带宽上限": "1 Mbps",
		},
		advancedOptions: {
			"IP组": "BGP多线",
			"绑定方式": "外部绑定"
		}
	},
    routerConfiguration:{	//路由器设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"类型": "小型"
		},
		advancedOptions: {
			"Open VPN": "关闭",
			"PPTP": "关闭",
			"DNS 服务": "关闭",
			"MSS": "1460"
		}
	},
	loadBalanceConfiguration:{	//负载均衡器设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"类型": "公网",
			"最大连接数": "5,000"
		}
	},
	diskConfiguration:{	//硬盘设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"类型": "性能型",
			"容量": "10GB"
		}
	},
	nasConfiguration:{	//NAS设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"类型": "性能型",
			"配置": "小型",
			"IP": "自动分配"
		}
	},
    relationalSqlConfiguration:{	//关系型数据库设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"版本": "MySQL-5.5",
			"类型": "性能型",
			"配置": "1核2G",
			"容量": "10",
			"自动备份": "关闭",
			"用户名": "username",
			"密码": "********"
		},
		advancedOptions: {
			"IP": "自动分配",
			"主节点": "自动分配",
			"从节点": "自动分配"
		}
	},
	cacheConfiguration:{	//缓存设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"版本": "Redis3.0.5  (集群)",
			"类型": "性能型",
			"内存": "1GB",
			"配置组": "cpg-3hl3a6kt",
		},
		advancedOptions: {
			"节点(组)数量": 3,
			"每组从节点数量": 1,
			"IP": "自动分配",
			"主节点": "自动分配",
			"从节点": "自动分配",
		}
	},
    mongoDBConfiguration:{	//MongoDB设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"版本": "3.0",
			"配置": "2核4G",
			"存储": "10GB",
			"自动备份": "关闭",
		},
		advancedOptions: {
			"节点(组)数量": 3,
			"每组从节点数量": 1,
			"IP": "自动分配",
			"主节点": "自动分配",
			"从节点": "自动分配",
			"用户名": "username",
			"密码": "********"
		}
	},
    hadoopConfiguration:{	//Hadoop设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"版本": "2.6.0",
			"类型": "性能型",
			"从节点配置": "2核8G",
			"从节点存储": "10G",
			"配置组": "hdppg-r1styyer",
		},
		advancedOptions: {
			"Worker节点数量": 3,
			"IP": "自动分配",
			"HDFS 主节点": "自动分配",
			"Yarn 主节点": "自动分配",
			"从节点": "自动分配"
		}
	},
    sparkConfiguration:{	//Spark设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"版本": "1.6.0",
			"类型": "性能型",
			"Worker节点配置": "2核8G",
			"Worker节点存储": "10G"
		},
		advancedOptions: {
			"HDFS存储节点": "使用",
			"Worker节点数量": "3",
			"IP": "自动分配",
			"Spark主节点": "自动分配",
			"Hadoop主节点": "自动分配",
			"Work节点": "自动分配"
		}
	},
    zookeeperConfiguration:{	//ZooKeeper
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"版本": "3.4.6",
			"类型": "性能型",
			"Worker节点配置": "1核2G",
		},
		advancedOptions: {
			"节点数量": 3,
			"IP": "自动分配",
			"节点": "自动分配"
		}
	},
	fireWallConfiguration:{	//防火墙设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"使用已有资源": "是",
			"源资源 ID": "sg-fyazh58h"
		}
	},
	secretKeyConfiguration:{ //密钥设置
		resourceAllocation:{
			"名称": "",
			"描述": "无",
			"使用已有资源": "是",
			"源资源 ID": ""
		}
	}	
}

$(document).ready(function(){
	
	showResourceList();
	
	resourceDrag();	

	tabToggle();
	
	modalButton();
	
	
});


/*实现点击资源名称，展示资源子列表*/
function showResourceList(){
	var $lis = $(".resource-li>a");
	$lis.click(function(){
		var $resourceDetail =  $(this).next();
		var $otherResourceDetail  = $(this).parent().siblings().children(".resource-detail");
		if($resourceDetail.css("display") == "none"){
			$resourceDetail.slideDown();
			 $otherResourceDetail.slideUp();
		}else{
			$resourceDetail.slideUp();
		}
	});	
}

/*实现每一项资源的拖拽功能*/
function resourceDrag(){
	var resourceNum = {
		hostNum : 0,	//主机数
		privateNetNum : 0,	//私有网络数
		publicNetIPNum : 0,	//公网IP数
		routerNum : 0,	//路由器数
		loadBalanceNum : 0,	//负载均衡器数
		diskNum : 0,	//硬盘数
		nasNum : 0, //NAS数
		relationalSqlNum : 0,	//关系型数据库数
		cacheNum : 0,	//缓存数
		mongoDBNum : 0,	//MongoDB数
		hadoopNum : 0,	//Hadoop数
		sparkNum : 0,	//Spark数
		zookeeperNum : 0,	//ZooKeeper
		firewallNum : 0,	//防火墙数
		secretKeyNum : 0	//密钥数
	};
	var resourceType = 0;	//资源类型:1-主机，2-私有网络，3-公网IP，4-路由器，5-负载均衡器，6-硬盘，7-NaS, 8-关系型数据库，9-缓存，10-MongoDB，11-Hadoop，12-Spark，13-ZooKeeper，14-防火墙，15-密钥
	var configuration = null;	//每项资源的详细配置项
	$(".drag-li").draggable({
		start: function(){
			$(this).addClass("drag-li-moving");
		},
		stop: function(event, ui){
			$(this).removeClass("drag-li-moving");
		},
		appendTo: "body",
		helper: "clone",
		cursor: "pointer",
		cursorAt: {
			left: 4
		}
	});
	 $("#canvas").droppable({
	 	accept: ".drag-li",
	 	drop: function(event, ul){
	 		var newNode = null;//当前新连接的节点
	 		var clientX = ul.position.left;
	 		var clientY = ul.position.top;
	 		var left = clientX - canvasLeft;
	 		var top = clientY - canvasTop;
	 		var img = ul.draggable.children(".iconfont")[0].className.split(" ")[1].split("-")[1];
	 		var imgSrc = "./imgs/" + img + ".png";
	 		var resourceName = ul.draggable.children(".resource-name").text();
	 		var content = "新建" + resourceName;
	 		var result = resetResource(resourceName, resConfig);
	 		var jsonExpress = {};
	 		var node1 = null;
	 		var flag = 0;
	 		resourceType = result.resourceType;
	 		configuration = result.configuration;
	 		if(nodes.length < 2){
	 			if(baseNetwork == undefined){
	 					baseNetwork = Node(100, 250, '基础网络', './imgs/siyouwangluo.png', 0, 						resConfig.baseNetConfiguration);
	 					nodes.push(baseNetwork);
	 					baseNetwork.jsonExpress = {
	 						id: 1,
	 						name: baseNetwork.text,
	 						type: 0,
	 						configuration: resConfig.baseNetConfiguration,
	 						children: []
	 					}
	 					baseNetwork.id = baseNetwork.jsonExpress.id;
	 					jsonResult = baseNetwork.jsonExpress;
	 					if(resourceType == 1 || resourceType == 4 || resourceType == 5){
	 						content = setResourceNum(resourceNum, content, resourceType);
			 				node1 = Node(left, top, content, imgSrc, resourceType, configuration);
			 				selectedNode = node1;
			 				node1.jsonExpress = {
			 					id: 11,
			 					name: node1.text,
			 					type: resourceType,
			 					configuration: node1.configuration,
			 					x: node1.x,
			 					y: node1.y,
			 					children: []
			 				};
			 				node1.id = node1.jsonExpress.id;
			 				jsonResult.children.push(node1.jsonExpress);
					 		flag = $(".current").children(".tab-name").text().indexOf("资源配置");
							if(flag != -1){
								resourceConfigure(node1.configuration, true);
							}else{
								resourceConfigure(node1.configuration, false);
							}
							nodes.push(node1);
							
							if(nodes.length == 2){		
								link1 = Link(baseNetwork, node1);
							}	
					 		tabToggle(configuration);
	 					}else{
	 						setTooltip("请拖入一个主机或者路由器或者负载均衡器加入到基础网络中");
	 					}	
	 				}else{
	 					if(selectedNode != baseNetwork){
	 						setTooltip("请选中基础网络!");
	 					}else{
	 						content = setResourceNum(resourceNum, content, resourceType);
	 						if(judge(selectedNode, resourceType)){
	 							node1 = Node(left, top, content, imgSrc, resourceType,  configuration);
		 						node1.jsonExpress = {
				 					id: 11,
				 					name: node1.text,
				 					type: resourceType,
				 					configuration: node1.configuration,
				 					x: node1.x,
				 					y: node1.y,
				 					children: []
				 				};
			 					node1.id = node1.jsonExpress.id;
	 							selectedNode = node1;
						 		jsonParse(selectedNode, node1, jsonResult);	
						 		flag = $(".current").children(".tab-name").text().indexOf("资源配置");
								if(flag != -1){
									resourceConfigure(node1.configuration, true);
								}else{
									resourceConfigure(node1.configuration, false);
								}
								nodes.push(node1);
								if(nodes.length == 2){		
									link1 = Link(baseNetwork, node1);
								}	
						 		tabToggle(configuration);
	 						}		
	 					}					
		 			}
	 			}else{			
	 				if(selectedNode != null){
	 					if(judge(selectedNode, resourceType)){
		 					content = setResourceNum(resourceNum, content, resourceType);
		 					newNode = Node(left, top, content, imgSrc, resourceType, configuration);
		 					jsonParse(selectedNode, newNode, jsonResult);
					 		flag = $(".current").children(".tab-name").text().indexOf("资源配置");
							if(flag != -1){
								resourceConfigure(newNode.configuration, true);
							}else{
								resourceConfigure(newNode.configuration, false);
							}
					 		nodes.push(newNode);
					 		tabToggle(configuration);
	 					}	
	 				}else{
	 					setTooltip("请选中一个目标节点进行操作!");
	 				}	
	 			}
	 		if(newNode){
	 			Link(selectedNode, newNode);
			}
	 		contextMenu(resourceNum);
	 		toolBar(resourceNum, jsonResult);	
	 		// 定义效果
            var effect = JTopo.Effect.spring({
                minLength: 150 // 节点之间最短距离
            });
              // 效果作用对象
            for(var i=1; i<nodes.length; i++){
                // 相互作用
                effect.addNode(nodes[i-1], nodes[i]);
                effect.addNode(nodes[i], nodes[i-1]);
            }
            effect.play();
            console.log(effect);
	 	}
	 });
}

//获取元素的纵坐标（相对于窗口）
function getTop(e){
  var offset=e.offsetTop;
  if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
  return offset;
}

//获取元素的横坐标（相对于窗口）
function getLeft(e){
  var offset=e.offsetLeft;
  if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
  return offset;
}

/*实现画布上方工具栏的功能*/
function toolBar(resourceNum, jsonResult){
	var $qingkong = $(".btn-clear");
	var $fangda = $(".btn-amplify");
	var $suoxiao = $(".btn-lessen");
	var $tijiao = $(".btn-submit");
	var $daocu = $(".btn-export");
	var $fangdaTooltip = $(".fangdaTooltip");
	var $suoxiaoTooltip = $(".suoxiaoTooltip");
	
	$qingkong.on("click", function(){
		console.log(1);
		scene.clear();
		baseNetwork = null;
		nodes.length = 0;
		link1 = null;
		selectedNode = null;
		$(".configuration-ul").empty();
		if(resourceNum){
			resourceNum.hostNum = 0;	
			resourceNum.privateNetNum = 0;	
		    resourceNum.publicNetIPNum = 0;	
			resourceNum.routerNum = 0;	
			resourceNum.loadBalanceNum = 0;	
			resourceNum.diskNum = 0;	
			resourceNum.nasNum = 0;	
			resourceNum.relationalSqlNum = 0;	
			resourceNum.cacheNum = 0;	
			resourceNum.mongoDBNum = 0;	
			resourceNum.hadoopNum = 0;	
			resourceNum.sparkNum = 0;	
			resourceNum.zookeeperNum = 0;	
			resourceNum.firewallNum = 0;	
			resourceNum.secretKeyNum = 0;	
		};
		jsonResult = {};
		$("#dialog").show();
		
	});
	
	$fangda.on("click", function(){
		if(nodes.length > 0){
			var width = nodes[0].width;
			var height = nodes[0].height;
			for(var i = 0; i < nodes.length; i++){
				var nodeI = nodes[i];
				if(width < 35 && height < 35){
					nodeI.setSize(width + 1,　height + 1);
				}else{
					nodeI.setSize(35, 35);
					$fangdaTooltip.fadeIn();
					setTimeout(function(){
						$fangdaTooltip.fadeOut();
					}, 1500);
				}
			}
		}
	});
	
	$suoxiao.on("click", function(){
		if(nodes.length > 0){
				var width = nodes[0].width;
				var height = nodes[0].height;
				for(var i = 0; i < nodes.length; i++){
				var nodeI = nodes[i];
				var height = nodeI.height;
				var width = nodeI.width;
				if(width > 23 && height > 23){
					nodeI.setSize(width - 1,　height - 1);
				}else{
					nodeI.setSize(23,　23);
					$suoxiaoTooltip.fadeIn();
					setTimeout(function(){
						$suoxiaoTooltip.fadeOut();
					}, 1500);
				}
			}
		}	
	});
	
	 $tijiao.click(function(){
	 	console.log(jsonResult);
	 });
	
	$daocu.on("click", function(){
		stage.saveImageInfo();
	});
}

/*创建节点*/
function Node(x, y, content, img, resourceType, configuration){	
		var  node = new JTopo.Node();
		node.text = content;
		node.setImage(img, true);
		node.setLocation(x, y);	
		node.textPosition = "Bottom_Center";
		node.fontColor = "0, 0, 0";
		node.font = "10px Aeria";
		node.addEventListener("mouseup", function(event){
			 currentNode = this;
             handler(event, event.pageX - canvasLeft, event.pageY - canvasTop);
		});
		node.resourceType = resourceType;
		node.configuration = configuration;
		node.configuration.resourceAllocation["名称"] = node.text;
		node.addEventListener("click", function(event){
			var flag = $(".current").children(".tab-name").text().indexOf("资源配置");
			if(flag != -1){
				resourceConfigure(node.configuration, true);
			}else{
				resourceConfigure(node.configuration, false);
			}
			tabToggle(configuration);
		});
		scene.add(node);
		return node;		
}

/*创建连线*/
 function Link(nodeA, nodeZ){
        var link = new JTopo.FoldLink(nodeA, nodeZ);
        link.direction = "horizontal";//线条的方向
        link.lineWidth = 1.5; // 线宽
        link.bundleOffset = 60; // 折线拐角处的长度
        link.strokeColor = "#38255C"; 
        scene.add(link);
        return link;
 }

/*节点右键生成菜单,点击左键菜单消失*/
function handler(event, left, top){
	if(event.button == 2){
		$("#contextmenu").css({
			left: left + 20,
			top: top + 10
		}).show();
	}
	stage.addEventListener('click', function(event){
		if(event.button == 0){
			$("#contextmenu").hide();
		}
	})
}

/*右键菜单各项功能*/
function contextMenu(resourceNum){
	$("#contextmenu a").click(function(){
		var content = $(this).text();	
		if(content == "删除该节点"){
			$("#contextmenu").hide();
			$(".configuration-ul").empty();
			if(currentNode.text == "基础网络"){
				baseNetwork = null;
			}
        	jsonResult = removeNode(currentNode, jsonResult, resourceNum);
 			console.log(jsonResult);
        }
		if(content  == "撤销上一次操作"){
            currentNode.restore();
        }else{
            currentNode.save();
        }
		
		if(content == "顺时针旋转"){
			currentNode.rotate += 0.5;
		}else if(content == "逆时针旋转"){
			currentNode.rotate -= 0.5;
		}else if(content == "放大"){
			currentNode.scaleX += 0.2;
            currentNode.scaleY += 0.2;
		}else if(content == "缩小"){
			currentNode.scaleX -= 0.2;
            currentNode.scaleY -= 0.2;
		}
		
		$("#contextmenu").hide();
	})
}

/*切换配置项的tab列表*/
function tabToggle(configuration){
		var $tabs = $(".tab");
		$tabs.click(function(){
			$(this).addClass("current");
			$(this).siblings().removeClass("current");
			if(configuration){
				if($(this).children(".tab-name").text().indexOf("资源配置") != -1){
					resourceConfigure(configuration, true);
				}else{
					resourceConfigure(configuration, false);
				}
			}	
		});
		$tabs.hover(function(){
			$(this).addClass("hover"); 
		},function(){
			$(this).removeClass("hover");
		});
}

/*根据资源类型修改资源配置项和高级选项*/
function resourceConfigure(configuration, tabFlag){
	var configurationUl= $(".configuration-ul");
	var configurationItem = "";//要添加的资源的配置项
	var resourceAllocation = configuration.resourceAllocation;
	var advancedOptions = configuration.advancedOptions;
	var title = resourceAllocation["名称"];
	var $that = {};
	configurationUl.empty();
	if(nodes.length > 0){
			if(tabFlag){
			for(var key in resourceAllocation){
				configurationItem += "<li class='configuration-item ziyuanpeizhi-item'><span class='configuration-key'>" + key　+ "</span><div class='configuration-value'><span class='name-value'>" + resourceAllocation[key] + "</span><span class='iconfont icon-bianji'></span></li></div>";
			}
		}else{
			for(var key in advancedOptions){
				configurationItem += "<li class='configuration-item ziyuanpeizhi-item'><span class='configuration-key'>" + key　+ "</span><div class='configuration-value'><span class='name-value'>" + advancedOptions[key] + "</span><span class='iconfont icon-bianji'></span></div></li>";
			}
		}
		configurationItem = $(configurationItem);
		configurationUl.append(configurationItem);
		$(".icon-bianji").click(function(){
			$(".layer").fadeIn();
			$(".modal").fadeIn();
			$(".header-title").html(title);
			var controlName = 				$(this).parents(".ziyuanpeizhi-item").find(".configuration-key").html();
			var controlDescription = 				$(this).parents(".ziyuanpeizhi-item").find(".name-value").html();
			 $that = $(this);
			$(".control-name").val(controlName);
			$(".control-description").val(controlDescription);
		});
		$(".sure").click(function(){
				$(".modal").fadeOut();
				$(".layer").fadeOut();
				var key = $(".control-name").val();
				var value = $(".control-description").val();
				if($that.length > 0){
					$that.parents(".ziyuanpeizhi-item").find(".name-value").html(value);
				}
				if(key == "名称" && selectedNode != null){
					selectedNode.text = value;
					selectedNode.jsonExpress.name = value;
					resourceAllocation["名称"] = value;
					jsonParse(selectedNode);
				}
		});
	}
}

/*对象深度克隆*/
function clone(obj){  
       var o;  
       if(typeof obj == "object"){  
           if(obj === null){  
               o = null;  
           }else{  
               if(obj instanceof Array){  
                   o = [];  
                  for(var i = 0, len = obj.length; i < len; i++){  
                       o.push(clone(obj[i]));  
                   }  
               }else{  
                   o = {};  
                   for(var k in obj){  
                       o[k] = clone(obj[k]);  
                   }  
               }  
           }  
          }else{  
           o = obj;  
       }  
       return o;  
}  

/*选中一个节点,并绑定事件*/
scene.addEventListener("click", function(){
	selectedNode = this.selectedElements[0];
	jsonParse(selectedNode);
});

/*根据资源名称获取资源的配置项和数目及类型*/
function resetResource(resourceName, resConfig){
				var resourceType = 0;
				var configuration = null;
	switch(resourceName){
	 			case "主机": 
	 				resourceType = 1;
	 				configuration = clone(resConfig.hostConfiguration);
	 			break;
	 			case "私有网络":
	 				resourceType = 2;
	 				configuration = clone(resConfig.privateNetConfiguration);
	 			break;
	 			case "公网IP":
		 			resourceType = 3;
	 				configuration = clone(resConfig.publicNetIPConfiguration);
	 			break;
	 			case "路由器":
	 				resourceType = 4;
	 				configuration = clone(resConfig.routerConfiguration);
	 			break;
	 			case "负载均衡器":
	 				resourceType = 5;
	 				configuration = clone(resConfig.loadBalanceConfiguration);
	 			break;
	 			case "硬盘":
	 				resourceType = 6;
	 				configuration = clone(resConfig.diskConfiguration);
	 			break;
	 			case "NAS":
	 				resourceType = 7;
	 				configuration = clone(resConfig.nasConfiguration);
	 			break;	
	 			case "关系型数据库":
	 				resourceType = 8;
	 				configuration = clone(resConfig.relationalSqlConfiguration);
	 			break;	
	 			case　"缓存":
	 				resourceType = 9;
	 				configuration = clone(resConfig.cacheConfiguration);
	 			break;	
	 			case "MongoDB":
	 				resourceType = 10;
	 				configuration = clone(resConfig.mongoDBConfiguration);
	 			break;
	 			case "Hadoop":
	 				resourceType = 11;
	 				configuration = clone(resConfig.hadoopConfiguration);
	 			break;
	 			case "Spark":
	 				resourceType = 12;
	 				configuration = clone(resConfig.sparkConfiguration);
	 			break;
	 			case "ZooKeeper":
	 				resourceType = 13;
	 				configuration = clone(resConfig.zookeeperConfiguration);
	 			break;
	 			case "防火墙":
	 				resourceType = 14;
	 				configuration = clone(resConfig.fireWallConfiguration);
	 			break;
	 			case "密钥":
	 				resourceType = 15;
	 				configuration = clone(resConfig.secretKeyConfiguration);
	 			break;
	 		}
	return{
		resourceType: resourceType,
		configuration: configuration
	}
}

/*设置资源数目和节点文本*/
function setResourceNum(resourceNum, content, resourceType){
		switch(resourceType){
			case 1:
    			content += ++resourceNum.hostNum;
    		break;
    		case 2:
				content += ++resourceNum.privateNetNum;
			break;	
			case 3:
				content += ++resourceNum.publicNetIPNum;
			break;
			case 4:
				content += ++resourceNum.routerNum;
			break;
			case 5:
				content += ++resourceNum.loadBalanceNum;
			break;
			case 6:
				content += ++resourceNum.diskNum;
			break;
			case 7:
				content += ++resourceNum.nasNum;
			break;
			case 8:
				content += ++resourceNum.relationalSqlNum;
			break;
 			case 9:
				content += ++resourceNum.cacheNum;
			break;
			case 10:
				content += ++resourceNum.mongoDBNum;
			break;
			case 11:
				content += ++resourceNum.sparkNum;
			break;
			case 12:
				content += ++resourceNum.zookeeperNum;
			break;
			case 13:
				content += ++resourceNum.firewallNum;
			break;
			case 14:
				content += ++resourceNum.firewallNum;
			break;	
			case 15:
				content += ++resourceNum.secretKeyNum;
			break;
		}
		return content;				
}

/*判断节点之间的依赖关系,能否添加到网络拓扑中*/
function judge(selectNode, resourceType){
	var type = selectNode.resourceType;
	var result;
	switch(type){
		case 0:
			result = ([1, 4, 5].indexOf(resourceType) != -1);
			if(result == false){
				setTooltip("请拖入一个主机,路由器,负载均衡器到基础网络中!");
			}
		break;
		case 1:
			result = ([6, 3, 14, 15].indexOf(resourceType) != -1);
			if(result == false){
				setTooltip("请拖入一个硬盘,公网IP,防火墙,密钥到主机中!");
			}
		break;
		case 2:
			result = ([1, 5, 7, 8, 9, 10, 11, 12, 13].indexOf(resourceType) != -1);
			if(result == false){
			setTooltip("请拖入一个主机,负载均衡器,NAS,关系型数据库,缓存,MongoDB,Hadoop,Spark,ZooKeeper到私有网络中!");
			}
		break;
		case 3:
			result = false;
			setTooltip("公网IP只能加入到主机和负载均衡器中,不能为它添加子节点!");
		break;
		case 4:
			result = ([2, 3, 14].indexOf(resourceType) != -1);
			if(result == false){
				setTooltip("请拖入一个硬盘,公网IP,防火墙,密钥到路由器中!");
			}
		break;
		case 5:
			result = ([3, 14].indexOf(resourceType) != -1);
			if(result == false){
				setTooltip("请拖入一个防火墙,公网IP到负载均衡器中!");
			}
		break;
		case 6:
			result = false;
			setTooltip("硬盘只能加入到主机和私有网络中,不能为它添加子节点!");
		break;
		case 7:
			result = (resourceType == 6);
			if(result == false){
				setTooltip("请拖入一个硬盘到NAS中!");
			}
		case 8:
			result = false;
			setTooltip("关系型数据库只能加入到私有网络中,不能为它添加子节点!");
		break;
		case 9:
			result = false;
			setTooltip("缓存只能加入到私有网络中,不能为它添加子节点!");
		break;
		case 10:
			result = false;
			setTooltip("MongoDB只能加入到私有网络中,不能为它添加子节点!");
		break;
		case 11:
			result = false;
			setTooltip("Hadoop只能加入到私有网络中,不能为它添加子节点!");
		break;
		case 12:
			result = false;
			setTooltip("Spark只能加入到私有网络中,不能为它添加子节点!");
		break;
		case 13:
			result = false;
			setTooltip("ZooKeeper只能加入到私有网络中,不能为它添加子节点!");
		break;
		case 14:
			result = false;
			setTooltip("防火墙只能加入到主机和负载均衡器中,不能为它添加子节点!");
		break;
		case 15:
			result = false;
			setTooltip("密钥只能加入到主机中,不能为它添加子节点!");
		break;
		default:
			result = false;
	}
	return result;
}

/*设置提示内容*/
function setTooltip(text){
	$dragTooltip.text(text);
	 		$dragTooltip.fadeIn();
	 		setTimeout(function(){
				$dragTooltip.fadeOut();
	}, 2000);
}

/*当增加节点时,选中的节点解析到jsonResult中*/
function jsonParse(selectedNode, newNode, jsonResult){
	var jsonExpress = null;	
	if(selectedNode && newNode && jsonResult){
		jsonExpress = selectedNode.jsonExpress;
		newNode.jsonExpress = {
			id: 0,
			name: newNode.text,
			type: newNode.resourceType,
			configuration: newNode.configuration,
			x: newNode.x,
			y: newNode.y
		};
		if([0, 1, 2, 4, 5, 7].indexOf(newNode.resourceType) != -1){
			newNode.jsonExpress.children =[];
		}
		if(jsonExpress && jsonExpress.type == 0){
			newNode.jsonExpress.id = jsonExpress.id * 10 + jsonResult.children.length + 1;
			newNode.id = newNode.jsonExpress.id;
			newNode.jsonExpress.children = [];
			jsonResult.children.push(newNode.jsonExpress);
		}else{
			if(jsonExpress && jsonExpress.children){
				newNode.jsonExpress.id = jsonExpress.id * 10 + jsonExpress.children.length + 1;
				newNode.id = newNode.jsonExpress.id;
				jsonExpress.children.push(newNode.jsonExpress);
			}		
		}
	}else{
		return;
	}
}

/*删除节点*/
function removeNode(node, jsonResult, resourceNum){
	var id = "";
	var nodeArr = [];
	var index = 0;
	console.log(nodes.length);
	if(node && jsonResult){
		for(var i = 0; i < nodes.length; i++){
			console.log(nodes[i].id);
			id = nodes[i].id.toString();
			if(id.indexOf(node.id) != -1){
				scene.remove(nodes[i]);	
				nodeArr.push(nodes[i]);
			}
		}		
	}
	         
	for(var j = 0; j < nodeArr.length; j++){
		 var type = nodeArr[j].resourceType;
        	switch(type){
        		case 1:
        			resourceNum.hostNum--;
        		break;
        		case 2:
					resourceNum.privateNetNum--;
				break;	
				case 3:
					resourceNum.publicNetIPNum--;
				break;
				case 4:
					resourceNum.routerNum--;
				break;
				case 5:
					resourceNum.loadBalanceNum--;
				break;
				case 6:
					resourceNum.diskNum--;
				break;
				case 7:
					resourceNum.nasNum--;
				break;
				case 8:
					resourceNum.relationalSqlNum--;
				break;
	 			case 9:
					resourceNum.cacheNum--;
				break;
				case 10:
					resourceNum.mongoDBNum--;
				break;
				case 11:
					resourceNum.sparkNum--;
				break;
				case 12:
					resourceNum.zookeeperNum--;
				break;
				case 13:
					resourceNum.firewallNum--;
				break;
				case 14:
					resourceNum.firewallNum--;
				break;	
				case 15:
					resourceNum.secretKeyNum--;
				break;
        	}
		index = nodes.indexOf(nodeArr[j]); 
		if(index != -1){
			nodes.splice(index, 1);
		}
	}
	jsonResult = getJsonPos(node.jsonExpress, jsonResult);
	console.log(nodes.length);
	return jsonResult;
}

/*获取删除节点在jsonResult中的位置,对jsonResult进行更新*/
function getJsonPos(nodeJson, jsonResult){
	console.log(jsonResult);
	var index = 0;
	var index1 = 0;
	var index2 = 0;
	var children = null;
	var idString = nodeJson.id.toString();
	if(idString.length == 1){
		jsonResult = {};
	}else if(idString.length == 2){
		index = idString.charAt(1);
		jsonResult.children.splice(index - 1, 1);
	}else if(idString.length == 3){
		index = idString.charAt(1);
		index1 = idString.charAt(2);
		jsonResult.children[index - 1].children.splice(index1 - 1, 1);
	}else{
		index = idString.charAt(1);
		index1 = idString.charAt(2);
		index2 = idString.charAt(2);
		jsonResult.children[index - 1].children[index1 - 1].children.splice(index2 - 1, 1);
	}
	console.log(jsonResult);
	return jsonResult;
}

/*弹出框菜单按钮*/
function modalButton(){  
	$(".cancel").click(function(){
		$(".layer").fadeOut();
		$(".modal").fadeOut();
	});
	$(".icon-x").click(function(){
		$(".layer").fadeOut();
		$(".modal").fadeOut();
	});	
}

