var runScript = async function (ob) {

    const find = x => document.evaluate(x, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const wait = timeout => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, timeout);
        })
    };

    const waitFor = (x, timeout) => {
        let countdown = 0;
        return new Promise((resolve, reject) => {
            const tc = setInterval(() => {
                countdown = countdown + 1000;
                if (find(x)) {
                    clearInterval(tc);
                    resolve(find(x));
                }
                if (timeout <= countdown) {
                    clearInterval(tc);
                    resolve(false);
                }
            }, 1000);
        })
    };

    const getRandomStr = function () {
        return Math.random().toString(36).substring(2);
    }

    console.log(ob);
    await wait(5000);
    let first_name = await waitFor(ob["first-name"], 5000);
    if (first_name) {
        let last_name = await waitFor(ob["last-name"], 5000);
        last_name.value = await getRandomStr();
        let address = await waitFor(ob["address"], 5000);
        address.innerText = await getRandomStr();
    }
}

chrome.runtime.sendMessage({ data: true, url: 'data/demo_automation.json' }, function (data) {
    if (data) {
        runScript(data);
    }
});
