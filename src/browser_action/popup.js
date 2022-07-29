// (async function () {

//     async function setQuote(q) {
//         return chrome.storage.sync.set({ quotes: q });
//     }

//     async function getQuote() {
//         return chrome.storage.sync.get(['quotes']);
//     }

//     async function printQuote(data) {
//         console.log(data.content);
//         document.querySelector('h1').innerText = data.author
//         document.querySelector('p').innerText = data.content;
//     }

//     async function fetchQuotes() {
//         return fetch('https://api.quotable.io/random?tags=life%7Cnature', {
//             method: 'GET'
//         }).then((quote) => {
//             return quote.json();
//         }).catch((e) => {
//             return { author: 'Chanakya', content: 'As soon as the fear approaches near, attack and destroy it.' }
//         })
//     }

//     let data = await getQuote();
//     if (data.quotes) {
//         await printQuote(data.quotes);
//         await setQuote((await fetchQuotes()));
//     }
//     else {
//         let quote = await fetchQuotes();
//         if (quote) {
//             await printQuote(quote);
//             await setQuote((await fetchQuotes()));
//         }
//     }
// })();

const storageCache = {};
const datafromjson = {};
fetch('username.json',{method:'GET'}).then((d)=> d.json()).then((dt)=>{
    if(dt){
        Object.assign(datafromjson,dt);
    }
})
            

const initStorageCache = getAllStorageSyncData().then(items => {
    // Copy the data retrieved from storage into storageCache.
    if (items) {
        Object.assign(storageCache, items);
    }
});

document.querySelector('p').addEventListener('click', (e) => {
    chrome.runtime.sendMessage(({ for: 'tab' }), function (data) {
        console.log(data);
    })
})

$('#exampleModal').on('shown.bs.modal', function () {
    const inputs = document.querySelectorAll('input:not([type="checkbox"])');
    for (const ip of inputs) {
        let flag = storageCache[$(ip).attr('id')];
        if (flag) {
            ip.value = storageCache[$(ip).attr('id')]
        }
        else{
            ip.value = datafromjson[$(ip).attr('id')]
        }
    }
})

$(':checkbox').on('change', (e) => {
    let inputs = Array.from(e.target.closest('#savedetails').querySelectorAll('input:not([type="checkbox"])'));
    if (e.target.checked) {
        inputs.forEach(ip => $(ip).prop('disabled', false));
    }
    else {
        inputs.forEach(ip => $(ip).prop('disabled', true));
        storageCache[$(inputs[1]).attr('id')] = inputs[1].value;
        storageCache[$(inputs[0]).attr('id')] = inputs[0].value;
        chrome.storage.sync.set(storageCache);
    }
})

function getAllStorageSyncData() {
    // Immediately return a promise and start asynchronous work
    return new Promise((resolve, reject) => {
        // Asynchronously fetch all data from storage.sync.
        chrome.storage.sync.get(null, (items) => {
            // Pass any observed errors down the promise chain.
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            // Pass the data retrieved from storage down the promise chain.
            resolve(items);
        });
    });
}

// profile-1-username
// profile-1-password