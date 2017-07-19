function check(table_id,data,tab){
	if(tab.url.indexOf("chrome://") >= 0){
		chrome.pageAction.hide(table_id);
	}else{
		chrome.pageAction.show(table_id);
	}
};
function draw(str,tab){
	chrome.tabs.executeScript(null,{code: "if(document.getElementById('qrcode_panel')!=null) document.getElementById('qrcode_panel').parentNode.removeChild(document.getElementById('qrcode_panel'))"});
	chrome.tabs.insertCSS(null,{file:'qrcoder_css.css'});
	chrome.tabs.executeScript(null,{file: "codePanel.js"});
	chrome.tabs.executeScript(null,{code: "var qr_text=\'"+str+"\'"});
}

chrome.tabs.onUpdated.addListener(check);

chrome.contextMenus.create({'title':'生成页面地址的二维码','contexts':['page'],'onclick':function(info,tab){
	draw(info.pageUrl,tab);
}});
chrome.contextMenus.create({'title':'生成选中链接的二维码','contexts':['link'],'onclick':function(info,tab){
	draw(info.linkUrl,tab);
}});
chrome.contextMenus.create({'title':'生成选中文字的二维码','contexts':['selection'],'onclick':function(info,tab){
	draw(info.selectionText,tab);
}});
chrome.contextMenus.create({'title':'生成图片地址的二维码','contexts':['image'],'onclick':function(info,tab){
	draw(info.srcUrl,tab);
}});
chrome.pageAction.onClicked.addListener(function(tab){
	draw(tab.url,tab);
});