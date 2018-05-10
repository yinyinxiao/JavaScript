//兼容的判断是否为某元素的子元素
function contains(refNode,otherNode){
			if (typeof refNode.contains=='function'&&(!client.engine.webkit||client.engine.webkit>=522)) {
				return refNode.contains(otherNode);
			}else if(typeof refNode.compareDocumentPosition=='function'){
				return !!(refNode.compareDocumentPosition(otherNode)&16);
			}else{
				var node=otherNode.parentNode;
				do{
					if (node===refNode) {
						return true;
					}else{
						node=node.parentNode;
					}
				}while (node!=null);
				return false;
				
			}
		}
//兼容的得到元素中的文本内容
//innerText会忽略行内样式和脚本，而textContent则会返回其他文本一样的行内样式和脚本代码
function getInnerText(element){
	return (typeof element.textContent=='string')?element.textContent:element.innerText;
}
function setInnerText(element,text){
	if (typeof element.textContent=="string") {
		element.textContent==text;
	}else{
		element.innerText=text;
	}
}
//计算某个元素在页面上的左偏移量
function getElementLeft(element){
	var actualLeft=element.offsetLeft;
	var current=element.offsetParent;
	
	while(current!=null){
		actualLeft+=current.offsetLeft;
		current=current.offsetParent;
	}
	return actualLeft;
}
//计算元素在页面上的上偏移量
function getElementTop(element){
	var actualTop=element.offsetTop;
	var current=element.offsetParent;
	
	while(current!=null){
		actualTop+=current.offsetTop;
		current=current.offsetParent;
	}
	return actualTop
}

//客户区的大小，客户区=内容区+内边距
function getViewport(){
	if(document.compatMode=="BackCompat"){
		//混杂模式下
		return{
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}else{
		//标准模式
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}
}
//getBoundingClientRect()方法给出了left、top、right、bottom，元素在页面中相对视口的位置
function getBoundingClientRect(element){
	var scrollTop=document.documentElement.scrollTo;
	var scrollLeft=document.documentElement.scrollLeft;
	if(element.getBoundingClientRect){
		if(typeof arguments.callee.offset!='number'){
			var temp=document.createElement("div");
			temp.style.cssText="position: absolute;left: 0;top: 0;";
			document.body.appendChild(temp);
			arguments.callee.offset=-temp.getBoundingClientRect().top-scrollTop;
			document.body.remove(temp);
			temp=null;
		}
		var rect=element.getBoundingClientRect();
		var offset=arguments.callee.offset;
		return{
			left:rect.left+offset,
			right:rect.right+offset,
			top:rect.top+offset,
			bottom:rect.bottom+offset
		};
	}else{
		var actualLeft=getElementLeft(element);
		var actualTop=getElementTop(element);
		return{
			left:actualLeft-scrollTop,
			right:actualLeft+element.offsetWidth-scrollLeft,
			top:actualTop-scrollTop,
			bottom:actualTop+element.offsetTop-scrolltop
		};
	}
}

//事件处理
var EventUtil={
	//添加事件
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on+type",handler);
		}else{
			element["on"+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if (element.removeEventListener) {
			element.removeEventListener(type,handler,false);
			
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	getEvent:function(event){
		return event?event:window.event;
	},
	getTarget:function(event){
		return event.target||event.srcElement;
	},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=null;
		}
	},
	stopPropagation:function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
	
};
//在网址后面添加参数，并且编码
function addQueryStringArg(url,name,value){
					if (url.indexOf("?")==-1) {
						url+="?";
					}else{
						url+="&";
					}
					url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
					return url;
				}

//IE7之前的浏览器使用XHR
function createXHR(){
	if(typeof arguments.callee.activeXString!="string"){
		var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i,len;
		for (i=0;len=versions.length;i<len;i++) {
			try{
				new ActiveXObject(version[i]);
				arguments.callee.activeXString=versions[i];
				break;
			}catch(ex){}
		}
	}
	return new ActiveXObject(arguments.callee.activeXString);
}
//兼容的创建XHR
function createXHR2(){
	if(typeof XMLHttpRequest !="undefined"){
		return new XMLHttpRequest();
	}else if(typeof ActiveXObject!="undefined")){
		var versions=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i,len;
		for (i=0,len=versions.length;i<len;i++) {
			try{
				new ActiveXObject(version[i]);
				arguments.callee.activeXString=version[i];
				break;
			}catch(ex){}
		}
		return ActiveXObject(arguments.callee.activeXString);
	}else{
		throw new Error("no XML object availlable");
	}
}
//向url追加参数
function addURLParam(url,name,value){
	url+=(url.indexOf("?")==-1? "?":"&");
	url+=encodeURIComponent(name)+":"+encodeURIComponent(value);
	return url;
	
}

















