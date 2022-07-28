chrome.runtime.sendMessage({msg:"users"}, function (data) {
	console.log("Hello. This message was sent from scripts/inject.js");
	console.log(data.data);
	if(window.location.host == 'www.w3schools.com' && window.location.pathname == '/cssref/tryit.asp'){
		console.log('opened in the w3schools.com');
		chrome.runtime.sendMessage({message:'frames'},function(data){
			console.log(data);
		})
	}
});

