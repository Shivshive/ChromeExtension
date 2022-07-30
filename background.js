chrome.action.onClicked.addListener((tab) => {
  chrome.windows.create(
    {
      focused: true,
      height: 800,
      url: ['src/browser_action/browser_action.html'],
      type: 'popup'

    },
    (w) => {
      chrome.scripting.executeScript({ target: { tabId: tab.id }, func: showAlert, args: [tab.id] })
    }
  )
  // chrome.scripting.executeScript({
  //   target: {tabId: tab.id},
  //   files: ['content.js']
  // });
});

function showAlert(tab) {
  alert(tab);
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.for == 'tab' && !request.inject && !request.url) {
    chrome.windows.getLastFocused({
      populate: true,
      windowTypes: ['normal']
    }, (window) => {
      console.log(window);

      getTabsActiveIds(window).then(([tabIds]) => {
        console.log([tabIds]);

        // chrome.scripting.executeScript({ target: { tabId: tabIds }, func: showAlert, args: [tabIds] }, function (d) {
        //   console.log(d);
        //   sendResponse(d);
        // });

        executeScriptFunc(tabIds, showAlert, [tabIds]).then(() => {
          sendResponse(true);
        })
      });



      // let queryOptions = {active: true,lastFocusedWindow: true };
      // chrome.tabs.query(queryOptions,function (t) {
      //   console.log(t[0].id);
      //   chrome.scripting.executeScript({ target: { tabId: t[0].id }, func: showAlert, args: [t[0]] }, function (d){
      //     sendResponse(true);
      //   })
      // })
    })
    return true;
  }
  if (request.for = 'tab' && request.inject == 'demo-automation') {
    console.log('demo automation');
    getLastFocusedWindow().then((window)=>{
      console.log(window);
        getTabsActiveIds(window).then(([tabIds])=>{
          console.log(tabIds);
          executeScriptFile(tabIds,request.url).then(()=>{
            sendResponse(true);
          });
        })
    })

    return true;
  }
})


async function getLastFocusedWindow() {
  return chrome.windows.getLastFocused({
    populate: true,
    windowTypes: ['normal']
  });
}

async function executeScriptFile(tabid, file) {
  return chrome.scripting.executeScript({ target: { tabId: tabid }, files: [file] });
}

async function executeScriptFunc(tabid, funcName, args) {
  console.log(tabid);
  return chrome.scripting.executeScript({ target: { tabId: tabid }, func: funcName, args: [args] });
}

function getTabsActiveIds(w) {
  return new Promise((resolve, reject) => {
    let tabIds = w.tabs.filter((v, i) => {
      if (v.active) {
        return true
      }
    }).map((v, i) => {
      return v.id;
    });
    resolve(tabIds);
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.data == true && request.url) {
    getData(request.url).then((data) => sendResponse(data));
    return true;
  }
})

function getData(url) {
  return new Promise((resolve, reject) => {
    fetch(url).then((d) => { return d.json() }).then((dt) => resolve(dt));
  })
}
// const users = "https://reqres.in/api/users?page=2";
// const data_url = "./data/data.json";

// chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {
//     if (message.msg === "users") {

//         // waitTill(10000).then(()=>{
//         //     senderResponse({data:'this is my message, let me know if you get this !!'})
//         // }).catch((e)=>{
//         //     console.log(e);
//         // })
//         fetch_(data_url).then((response) => {
//             setTimeout(() => {
//                 senderResponse({ data: response });
//             }, 5000);
//         }).catch((e) => {
//             console.log(e);
//         })
//         return true;  // Will respond asynchronously.
//     }

//     if (message.message == "frames") {
//         getCurrentTab().then((tab)=>{
//             const xpath = "//div[@class='item3' and contains(text(),'3')]";
//             findFrame(tab,xpath).then((results)=>{
//                 for(const r of results){
//                     console.log(r.result);
//                 }
//                 senderResponse(results);
//             })
//         })
//         return true;
//     }
// });


// async function waitTill(timeout) {
//     return new Promise((res, rej) => {
//         setTimeout(function () {
//             res();
//         }, timeout);
//     })
// }

// async function fetch_(url) {
//     return new Promise((res, rej) => {
//         fetch(url, { method: 'GET' })
//             .then(response => response.text())
//             .then(data => {
//                 let dataObj = JSON.parse(data);
//                 res(dataObj);
//             })
//     })
// }

// async function getCurrentTab() {
//     let queryOptions = { active: true, lastFocusedWindow: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }

// async function getFrames(tab) {
//     return chrome.webNavigation.getAllFrames({ tabId: tab.id });
// }

// async function findFrame(tab,xpath) {
//     return chrome.scripting.executeScript({
//         target: { tabId: tab.id, allFrames: true },
//         func: findEle,
//         args : [xpath]
//     })
// }

// function findEle(xpath) {
//     let c = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
//     if(c){
//         c.style.color='red';
//         c.style.border='2px solid red';
//         c.style.padding='10px';
//     }
//     return c;
// }
