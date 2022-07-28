chrome.runtime.onMessage(function (message, sender, sendResponse){
	if(message.msg == 'check_frame'){
		let d = document.evaluate(msg.xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
        if(d){
            sendResponse({found:true});
        }
        else{
            sendResponse({found:false});
        }
		return true;
	}
})