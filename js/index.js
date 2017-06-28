


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
}





/*

window.onload = function () {
    var btn = document.getElementById('myBtn');
    addEvent(btn, 'click', fn1);
    // addEvent(document, 'click',fn2);

    // var baidu = document.getElementById('baidu');
    // addEvent(baidu, 'click', function(e){
    //     e.preventDefault();
    // });
}

function fn1(e){
    e.stopPropagation();
    alert('button');
}


function fn3(){
    alert(3);
}

*/










