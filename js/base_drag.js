$().extend('drag',function(dragTargets){


    for (var i = 0; i < this.elements.length; i++) {

            addEvent(this.elements[i], 'mousedown', function (event){
                //clientX 点击点距离窗口左边的距离
                var _this = this;
                var diffX = event.clientX - _this.offsetLeft;
                var diffY = event.clientY - _this.offsetTop;
                
                var canDrag = false;
                for (var i = 0; i < dragTargets.length; i++) {
                    if (dragTargets[i] == event.target) {
                        canDrag = true;
                        break;
                    }
                }
                
                if (canDrag) {
                    addEvent(document, 'mousemove', move);
                    addEvent(document, 'mouseup', up);
                } else {
                    removeEvent(document, 'mousemove', move);
                    removeEvent(document, 'mouseup', up);
                }
                
                
                function move(moveEvent) {
                    var e = moveEvent || window.moveEvent;
                    var left = moveEvent.clientX - diffX;
                    var top = moveEvent.clientY - diffY;
                    //限制不让拖出去
                    if (left < 0) {
                        left = 0;
                    } else if (left > (document.documentElement.clientWidth - _this.offsetWidth)) {
                        left = document.documentElement.clientWidth - _this.offsetWidth;
                    }
                    if (top < 0) {
                        top = 0;
                    } else if (top > document.documentElement.clientHeight - _this.offsetHeight) {
                        top = document.documentElement.clientHeight - _this.offsetHeight
                    }
                    _this.style.left = left + 'px';
                    _this.style.top = top + 'px';
                };

                function up() {
                    removeEvent(this, 'mousemove', move);
                    removeEvent(this, 'mouseup', up);
                };

            })

    }   //end for
    return this;





})
