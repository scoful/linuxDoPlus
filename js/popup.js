;(function () {
    'use strict';
    console.log("popup_js is done!");


    document.addEventListener('DOMContentLoaded', function () {
        console.log("load完popup了");

        chrome.runtime.sendMessage({type: "GET_CONNECT_INFO"}, (response) => {
            console.log(response.value)
            if (response && response.value) {
                document.getElementById('container').innerHTML = response.value;
            }
        });

        const navLinks = document.querySelectorAll('.nav a');
        const container = document.getElementById('container');

        navLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                // Remove 'active' class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add 'active' class to the clicked link
                this.classList.add('active');

                // Update container content based on clicked link id
                if (this.id === 'viewUpdates') {
                    container.innerHTML = '✊努力获取升级信息ing~✊';
                    chrome.runtime.sendMessage({type: "GET_CONNECT_INFO"}, (response) => {
                        console.log(response.value)
                        if (response && response.value) {
                            document.getElementById('container').innerHTML = response.value;
                        }
                    });
                } else if (this.id === 'supportMe') {
                    container.innerHTML = `
                            <div style="text-align: center;">
                                ❤️感谢您的支持~🙏
                                <div style="margin-top: 20px;">
                                    <img src="images/wx.jpg" alt="Image 1" style="max-width: 70%; height: auto; margin-bottom: 20px;">
                                    <img src="images/zfb.jpg" alt="Image 2" style="max-width: 70%; height: auto;">
                                </div>
                            </div>`;
                }
            });
        });


    });

    // 主动发送消息给后台
    function sendMessageToBackground(action, message) {
        chrome.runtime.sendMessage({action: action, message: message}, function (res) {
            if (res === 'ok') {
                console.log("content-->background发送的消息被消费了");
            } else {
                console.log(res)
            }
        });
    }


}());




