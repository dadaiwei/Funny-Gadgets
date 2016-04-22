// JavaScript Documentet

var li1 = document.getElementById("img").getElementsByTagName("li");
var li2 = document.getElementById("btn").getElementsByTagName("li");
for(var i = 0; i < li2.length; i++)
{
	li2[i].index = i;
	li2[i].onmouseover = function(){
		for(var j = 0; j < li2.length; j++)
		{
			li1[j].style.display = "none";
		}
		    li1[this.index].style.display = "block";
	}
	
}

setInterval(function(){
		for(var i = 0; i < li1.length; i++)
	{
		for(var j = 0; j < li1.length; i++)
		{
			li1[i].style.display = (j==i?"none":"block");	
		}
		
	}
	},1000);
