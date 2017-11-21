var jsonResult = {
		id: 1,
		name: "基础网络",
		type: 0,
		configuration: {
			resourceAllocation: {
				"名称": "基础网络",
				"描述": "无",
				"ID": "vxnet-0"
			}
		},
		children: [
	  {
	  	id: 11,
	  	name: "新建主机1",
	  	type: 1,
	  	configuration: {
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
	  	children: [
	  		id: 111
	  		name: "新建公网IP",
	  		type: 3,
	  		configuration: {
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
	  		}
	  	]
	  },
	  {
	  	id: 12,
	  	name: "新建路由器1",
	  	type: 4,
	  	configuration: {
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
	  	children: []
	  }
	]
	}
	
}
