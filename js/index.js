


window.onload = function() {
    // $().getClass('member').hover(function(){
    //     $().getByTagName('ul').show();
    // },function() {
    //     $().getByTagName('ul').hide();;
    // });


	$().getClass('login').click(function(){
		var clientWidth = document.documentElement.clientWidth;
		var clientHeight = document.documentElement.clientHeight;
		var ele = $().getById('login_alert').elements[0];
		var top = (clientHeight - ele.offsetHeight) / 2;
		var left = (clientWidth - ele.offsetWidth) / 2;

		// ele.style[top] = top + 'px';
		// ele.style[left] = left + 'px';
		ele.style[top] = '100px';
		ele.style[left] = '100px';
		// $().getById(login_alert).css('top','100px').css('left','200px');
	});

}

