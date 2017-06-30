

/*
window.onload = function() {
    
    $().getClass('member').hover(function(){
        $().getByTagName('ul').show();
    },function() {
        $().getByTagName('ul').hide();;
    });

    var loginAlert = $().getById('login_alert');
    var screen = $().getById('screen');
    //关闭
    $().getClass('close').click(function(){
        screen.unlock();
        loginAlert.css('display','none');
    });

    //点击登录
	$().getClass('login').click(function() {
        screen.lock();
        loginAlert.css('display','block').center();
	})
    loginAlert.resize(function(){

        if (loginAlert.css('display') == 'block') {
            screen.lock();
        } 
    });

    //设置拖拽
    loginAlert.drag([document.getElementById('login_drag')]);
    


    // $('.a   span').css('color','green');
}

*/

/*
//DOMContentLoaded事件会忽略iframe标签，也就是说 iframe标签的内容不会被当做页面的一部分
addEvent(document, 'DOMContentLoaded', function(){
    console.log('aaa');
});

//IE678模拟DOMContentLoaded  defer表示延迟脚本执行，直到页面加载完成后才开始执行此脚本，
//注意: 只有IE浏览器支持defer属性
//缺陷：当网页里面有iframe标签时，也得等到iframe加载完成后才会执行此脚本
//但在IE中可用doScroll方法来替代DOMContentLoaded, doScroll方法也会忽略iframe标签
document.write('<script id="ie_loaded" defer="defer" src="javascript:void(0)"> </script>');
var ie_loaded = document.getElementById('ie_loaded');
ie_loaded.onreadystatechange = function () {
    alert(this.readyState);
    // if (this.readyState == 'complete') {

    // }
}

var timer = null;

timer = setInterval(function(){
    try {
        document.documentElement.doScroll('left');
        var box = document.getElementById('box');
        alert(box.innerHTML);
    } catch (e) {

    }
});
*/

/*
function addDOMLoaded(fn) {
    if (document.addEventListener) {
        addEvent(document, 'DOMContentLoaded', function () {
            fn();
            removeEvent(document, 'DOMContentLoaded', arguments.callee);
        });
    } else {
        var timer = null;
        timer = setInterval(function () {
            try {
                document.documentElement.doScroll('left');
                fn()
            } catch(e) {
                // statements
                console.log(e);
            }
        }, 100); //100毫秒
    }
}

addDOMLoaded(function () {
    var box = document.getElementById('box');
    alert(box.innerHTML);
});
*/

var b = '123';
var c = b;
console.log(c === b);










