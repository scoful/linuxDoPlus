console.log("linux_do_plus_content_script is done!!");

// 也是contentScript，只在打开https://linux.do/t/topic/*的时候触发
document.addEventListener('DOMContentLoaded', function () {
    // 设置每秒（1000毫秒）调用一次
    setInterval(autoExpand, 1000);
});

// 自动展开《贴中回复》
function autoExpand() {
    document.querySelectorAll('.fa.d-icon.d-icon-chevron-down.svg-icon.svg-node').forEach(function (element) {
        element.parentElement.click();
    });
}