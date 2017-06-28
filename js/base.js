
//前台调用
var $ = function(_this){
    return new Base(_this);
};

//基础库
function Base(args) {
    this.elements = []
    
    if (typeof args == 'string') {
        var selectors = args.split(/\s+/);
        for (var k=0; k < selectors.length; k++) {
            // 
            if (k == 0) {
                switch (selectors[k].charAt(0)) {
                    case '#': {
                        this.getById(selectors[k].substring(1));
                    } break;
                    case '.': {
                        var eles = document.getElementsByClassName(selectors[k].substring(1));
                        for (var i = 0; i < eles.length; i++) {
                            this.elements.push(eles[i]);
                        }
                        
                    } break;    
                    default: {
                        this.getByTagName(selectors[k]);
                    } break;
                }
            } else {
                this.find(selectors[k]);
            }
            
        }
        /*
        switch (args.charAt(0)) {
            case '#': {
                this.getById(args.substring(1));
            } break;
            case '.': {
                var eles = document.getElementsByClassName(args.substring(1));
                for (var i = 0; i < eles.length; i++) {
                    this.elements.push(eles[i]);
                }
                
            } break;    
            default: {
                this.getByTagName(args);
            } break;
        }*/
        
    } else if (args != undefined) {
        this.elements[0] = args;
    }
}

Base.prototype.getById = function(id) {
    this.elements.push(document.getElementById(id))
    return this;
};

Base.prototype.getByTagName = function(tagName) {
    var tags = document.getElementsByTagName(tagName);
    for(var i = 0; i < tags.length; i++) {
        this.elements.push(tags[i]);
    }
    return this;
}

Base.prototype.find = function(args) {
        var tmpEles = [];
        for(var i = 0; i < this.elements.length; i++) {
            switch (args.charAt(0)) {
            case '#': {
                tmpEles.push(document.getElementById(args.substring(1)));
            } break;
            case '.': {
                var eles = this.elements[i].getElementsByClassName(args.substring(1));
                for (var j = 0; j < eles.length; j++) {
                    tmpEles.push(eles[j]);
                }
                
            } break;    
            default: {
                var tags = this.elements[i].getElementsByTagName(args);
                for (var j=0; j < tags.length; j++) {
                    tmpEles.push(tags[j]);
                }
                
            } break;
        }
    }
    

    this.elements = tmpEles;

    return this;
}

//设置css
Base.prototype.css = function(attr, value) {
    if (arguments.length == 0) {
        //如果没传参数，就直接返回样式
        return this.elements[0].style;
    } else if (arguments.length == 1) {
        //如果只传了一个参数,就直接返回样式值
        if (typeof window.getComputedStyle != 'undefined') {    //W3C
            return window.getComputedStyle(this.elements[0], null)[attr];
        } else if (typeof this.elements[0].currentStyle != 'undefined') {   //IE
            return this.elements[0].currentStyle[attr];
        } else {
            return null;
        }
    }

    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style[attr] = value;
    } 
    return this;
}

//设置html
Base.prototype.html = function(str) {
    if (arguments.length == 0) {
        return this.elements[0].innerHTML;
    }
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = str;
    } 
    return this;
}

//获取class节点数组
Base.prototype.getClass = function(className, idName) {
    var all = null;
    if (arguments.length == 2) {
        all = document.getElementById(idName).getElementsByTagName('*');
    } else {
        all = document.getElementsByTagName('*');
    }
    
    for (var i = 0; i < all.length; i++) {
        if (all[i].className == className) {
            this.elements.push(all[i]);
        }
    }
    return this;
}

Base.prototype.addClass = function(className) {
    var len = this.elements.length;
    for (var i = 0; i < len; i++) {
        //避免重复添加class
        if (this.elements[i].className.match(new RegExp('(\\s+|^)' + className + '(\\s+|$)'))) {
            continue;
        }

        if (this.elements[i].className.length == 0) {
            this.elements[i].className += className;
        } else {
            this.elements[i].className += (' ' + className);
        }
    }
    return this;
}

Base.prototype.removeClass = function(className) {
    var len = this.elements.length;
    for (var i = 0; i < len; i++) {
        //避免重复添加class
        var regExp = new RegExp('(\\s+|^)' + className + '(\\s+|$)');
        if (this.elements[i].className.match(regExp)) {
            var clsName = this.elements[i].className.replace(regExp, ' ');
            clsName = clsName.replace(/^\s+/,'');
            if (clsName.length == 0 ) {
                //移除class属性
                this.elements[i].removeAttribute('class');
            } else {
                this.elements[i].className = clsName;
            }
             
        }
    }
    return this;
}

Base.prototype.getElement = function(index) {
    var ele = this.elements[index];
    this.elements = [];
    this.elements[0] = ele;
    return this;
}

//设置点击事件
Base.prototype.click = function (fn) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    } 
    return this;
}

//以下两个方法很少用
//添加link或style.css规则 不常用
Base.prototype.addRule = function(rule, styleSheetsIndex, ruleIndex) {
    var sheet = document.styleSheets[styleSheetsIndex];

    if (typeof sheet.insertRule != 'undefined') {   //W3C
        sheet.insertRule(rule, ruleIndex);
    } else if (typeof sheet.addRule != 'undefined') {   //IE
        var selectorResult = rule.match(/^[^\s]*/);
        var ruleResult = rule.match(/{.*}/)
        if (selectorResult != null && ruleResult != null) {
            sheet.addRule(selectorResult[0], ruleResult[0], ruleIndex);
        }
    }
}

//删除样式表中的第ruleIndex个样式
Base.prototype.removeRule = function(styleSheetsIndex, ruleIndex) {
    var sheet = document.styleSheets[styleSheetsIndex];
    if (typeof sheet.deleteRule != 'undefined') {   //W3C
        sheet.deleteRule(ruleIndex);
    } else if (typeof sheet.removeRule != 'undefined') {    //IE
        sheet.removeRule(ruleIndex);
    }
}


Base.prototype.hover = function(over,out) {
    for (var i = 0; i < this.elements.length; i++) {
        addEvent(this.elements[i], 'mouseover', over);
        addEvent(this.elements[i], 'mouseout', out);
    }
    return this; 
}

Base.prototype.show = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
    return this;
}

Base.prototype.hide = function() {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    }
    return this;
}

//设置元素居中
Base.prototype.center = function() {
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;

    for (var i = 0; i < this.elements.length; i++) {
        var top = (clientHeight - this.elements[i].offsetHeight) / 2;
        var left = (clientWidth - this.elements[i].offsetWidth) / 2;

        this.elements[i].style['top'] = top + 'px';
        this.elements[i].style['left'] = left + 'px';
    }
}

//窗口大小改变触发
Base.prototype.resize = function(fn) {

    var that = this;
    addEvent(window, 'resize', function(){
        for (var i = 0; i < that.elements.length; i++) {
            fn();

            //设置当前元素可见
            var ele = that.elements[i];
            if (ele.offsetLeft + ele.clientWidth > document.documentElement.clientWidth) {
                ele.style.left = document.documentElement.clientWidth - ele.clientWidth + 'px';
            } else if (ele.offsetTop + ele.clientHeight > document.documentElement.clientHeight) {
                ele.style.top = document.documentElement.clientHeight - ele.clientHeight + 'px';
            }
            
        }
    });

    return this;
}

Base.prototype.lock = function() {
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;

    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'block';
        this.elements[i].style['width'] = clientWidth + 'px';
        this.elements[i].style['height'] = clientHeight + 'px';

        //隐藏滚动条
        document.documentElement.style.overflow = 'hidden';
    }
    return this;
}

Base.prototype.unlock = function() {
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;

    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display = 'none';
        document.documentElement.style.overflow = 'auto';
    }
    return this;
}

Base.prototype.drag = function() {
    for (var i = 0; i < this.elements.length; i++) {

        addEvent(this.elements[i], 'mousedown', function (event){
            //clientX 点击点距离窗口左边的距离
            var _this = this;
            var diffX = event.clientX - _this.offsetLeft;
            var diffY = event.clientY - _this.offsetTop;
            
            if (event.target.tagName == 'H2') {
                addEvent(document, 'mousemove', move);
                addEvent(document, 'mouseup', up);
            } else {
                removeEvent(document, 'mousemove', move);
                removeEvent(document, 'mouseup', up);
            }
            
            
            function move(moveEvent){
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
}

function getEvent(event) {
    return event || window.moveEvent;
}

//阻止默认行为
function preventDefault(event) {
    var event = getEvent(event);
    if (typeof event.preventDefault != 'undefined') {
        event.preventDefault(); //W3C
    } else {
        event.returnValue = false;  //IE
    }
}

//跨浏览器添加事件
function addEvent(obj, type, fn) {
    if (typeof obj.addEventListener != 'undefined') {
        obj.addEventListener(type, fn, false);
    } else {
        //创建一个存放事件的字典
        if (!obj.events) {
            obj.events = {};
        }
        //每个Key对应的值为事件处理函数的数组
        if (!obj.events[type]) {
            //创建数组
            obj.events[type] = [];
            obj.events[type][0] = fn;
        } else {
            //如果函数不存在，就添加进来
            if (!addEvent.existFunction(obj.events[type], fn)) {
                obj.events[type][addEvent.eventId++] = fn;
            }
        }
        
        //执行事件函数
        obj['on' + type] = addEvent.exec;
    }
}

function removeEvent(obj, type, fn) {
    if (typeof obj.removeEventListener != 'undefined') {
        obj.removeEventListener(type, fn, false);
    } else {
        //删除元素
        if (obj.events) {
            for (var i = obj.events[type].length - 1; i >=0; i--) {
                if (obj.events[type][i] == fn)
                    obj.events[type].splice(i,1);
            }
        }
        
    }
}
addEvent.eventId = 1;
addEvent.exec = function(event) {
    var e = event || addEvent.fixEvent(window.event);
    for (var i in this.events[e.type]) {
        this.events[e.type][i].call(this,e);
    }
}

addEvent.existFunction = function(eventFunctions, fn) {
    for (var i in eventFunctions) {
        if (eventFunctions[i] == fn) {
            return true;
        }
    }
    return false;
}

addEvent.fixEvent = function (event) {
    event.preventDefault = addEvent.fixEvent.preventDefault;
    event.stopPropagation = addEvent.fixEvent.stopPropagation;
    return event;
}

addEvent.fixEvent.preventDefault = function() {
    this.returnValue = false;
}

addEvent.fixEvent.stopPropagation = function() {
    this.cancelBubble = false;
}

//跨浏览器删除事件
function removeEvent(obj, type, fn) {
    if (typeof obj.removeEventListener != 'undefined') {
        obj.removeEventListener(type, fn, false);
    } else if (typeof obj.detachEvent != 'undefined') {
        obj.detachEvent('on' + type, fn);
    }
}

//插件入口
Base.prototype.extend = function(name, fn) {
    Base.prototype[name] = fn;
};
