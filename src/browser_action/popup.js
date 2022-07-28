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

document.querySelector('p').addEventListener('click',(e)=>{
    chrome.runtime.sendMessage(({for:'tab'}),function (data) {
        console.log(data);
    })
})