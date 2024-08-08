console.log("background is done!");


async function getConnectInfo() {
    let connetInfo = "";
    try {
        const response = await fetch('https://connect.linux.do/');
        if (!response.ok) {
            connetInfo = '<p style="color: red;">网络异常</p>';
        }
        const data = await response.text();
        connetInfo = handleData(data);
    } catch (error) {
        console.log(error);
        connectInfo = '<p style="color: red;">' + error.toString() + '</p>'; // Storing the error information as a string
    } finally {
        return connetInfo; // 在 finally 块中返回 connetInfo，包含数据或错误信息
    }
}


function handleData(htmlData) {
    // 使用正则表达式匹配所有指定类名的 div 内容
    const regex = /<div class="[^"]*?\bbg-white\b[^"]*?\bp-6\b[^"]*?\brounded-lg\b[^"]*?\bmb-4\b[^"]*?\bshadow\b[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
    let match;
    let count = 0;
    let thirdDivContent = null;

    while ((match = regex.exec(htmlData)) !== null) {
        count++;
        if (count === 3) {
            // 当我们到达第三个匹配时，保存内容并停止循环
            thirdDivContent = match[1];
            break;
        }
    }

    if (thirdDivContent) {
        console.log("Found the third div content:", thirdDivContent);
        return thirdDivContent; // 返回第三个 div 的内容
    } else {
        // 如果没有找到第三个 div，输出错误信息
        console.error('The third specific part was not found in the HTML data.');
        return null;
    }
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_CONNECT_INFO") {
        getConnectInfo().then(processedData => {
            console.log('Processed Data:', processedData);
            sendResponse({value: processedData}); // acknowledge
        }).catch(error => {
            console.error('Error:', error);
        });
    }
    // 返回 true 表示 sendResponse 将被异步调用
    return true;
});


// 向content-script主动发送消息
function sendMessageToContentScript(action, message) {
    chrome.tabs.query({active: true, currentWindow: true}, function (res) {
        chrome.tabs.sendMessage(res[0].id, {action: action, message: message}, function (response) {
            if (response === 'ok') {
                console.log("background-->content发送的消息被消费了");
            }
        });
    });
}





