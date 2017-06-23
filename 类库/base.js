
//前台调用
var $ = function(){
    return new Base();
};

//基础库
function Base() {
    this.elements = []
    
    this.getById = function(id) {
        this.elements.push(document.getElementById(id))
        return this;
    };

    this.getByTagName = function(tagName) {
        var tags = document.getElementsByTagName(tagName);
        for(var i = 0; i < tags.length; i++) {
            this.elements.push(tags[i]);
        }
        return this;
    }

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