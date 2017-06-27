


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
    loginAlert.drag();

    // login.onmousedown = function (event) {
    //     //clientX 点击点距离窗口左边的距离
    //     var _this = this;
    //     var diffX = event.clientX - _this.offsetLeft;
    //     var diffY = event.clientY - _this.offsetTop;
        
    //     document.onmousemove = function(moveEvent){
    //         var e = moveEvent || window.moveEvent;
    //         _this.style.left = moveEvent.clientX - diffX + 'px';
    //         _this.style.top = moveEvent.clientY - diffY + 'px';
    //     };

    //     document.onmouseup = function() {
    //         this.onmousemove = null;
    //         this.onmouseup = null;
    //     };
    // };
    

    
}

