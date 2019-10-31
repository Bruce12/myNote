# JS面试题高级

## js部分

- 1.**请将一个URL的search部分参数与值转换成一个json对象**
    ```js
      //?categoryid=112&pageid=1
      function getQueryStringArge(){
        //categoryid=112&pageid=1
        var qs = location.search.length > 1?location.search.substr(1):"";
        //[categoryid=112,pageid=1]
        var items = qs.length > 0?qs.split("&"):[];
        var obj={},key,value,item;
        for ( var i = 0;i<items.length;i++ ){
            item = items[i].split("=");
            key = item[0];
            value = item[1];
            obj[key] = value;
        }
        return obj;
      }
    ```
- 2.**请用原生js实现jquery的get\post功能，以及跨域情况下**
    ```js
         window.$ = {};
        /*在$下面申明一个ajax*/
        $.ajax = function (options) {
            /*options 参数对象*/
            /*如果没有传参 或者 传了但是不是对象*/
            /* 如果判断之后是一句代码 括号可以省略*/
            if (!options || typeof options != 'object') {
                return false;
            }
            /*options 里面的参数 需要处理*/
            var type = options.type === 'post' ? 'post' : 'get';
            /*location 可以获取地址栏相关信息*/
            var url = options.url || location.pathname;
            var async = options.async === false ? false : true;
            var data = options.data || {}; /*{name:xgg,age:18}*/
            /*转换成 xhr 的数据格式*/
            var dataStr = '';
            for (var key in data) {
                dataStr += key + '=' + data[key] + '&';
            }
            /*name=xgg&age=10&*/
            dataStr = dataStr && dataStr.slice(0, -1);

            /*beforeSend*/
            /* options.beforeSend && options.beforeSend();*/
            if (options.beforeSend) {
                var flag = options.beforeSend();
                if (flag === false) {
                    return false;
                }
            }

            /*ajax编程*/
            var xhr = new XMLHttpRequest();
            /*1.请求*/
            /*1.1 请求行*/
            xhr.open(type, type == 'get' ? (url + '?' + dataStr) : url, async);
            /*1.2 请求头*/
            if (type == 'post') {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
            /*1.3 请求主体 发送*/
            xhr.send(type == 'get' ? null : dataStr);

            /*2.响应*/
            xhr.onreadystatechange = function () {
                /*通讯完成*/
                if (xhr.readyState == 4) {
                    /*1.响应成功*/
                    if (xhr.status == 200) {
                        /*获取数据*/
                        var result = null;
                        /*获取什么数据*/
                        /*怎么判断去获取什么数据*/
                        /*可以根据响应的类型去判断获取什么数据*/
                        var contentType = xhr.getResponseHeader('Content-Type');
                        /*如果返回的类型包含 字符串 xml */
                        if (contentType.indexOf('xml') > -1) {
                            result = xhr.responseXML;
                        }
                        /*如果返回的类型包含 字符串 json */
                        else if (contentType.indexOf('json') > -1) {
                            result = JSON.parse(xhr.responseText);
                        }
                        /*如果返回的类型包含 字符串 text */
                        else {
                            result = xhr.responseText;
                        }

                        /*调用用户传的 成功回调函数*/
                        options.success && options.success(result);
                    }
                    /*2.响应失败*/
                    else {
                        /*调用用户传的 失败回调函数*/
                        var msg = {
                            status: xhr.status,
                            statusText: xhr.statusText
                        };
                        options.error && options.error(msg);
                    }

                    /*通讯完成回调*/
                    options.complete && options.complete();
                }
            }
        };
        $.get = function (options) {
            options.type = 'get';
            $.ajax(options);
        }
        $.post = function (options) {
            options.type = 'post';
            $.ajax(options);
        }
    ```

    ```js
       //jsonp
       function jsonp(options){
        //1. 拼接查询字符串
        var url = options.url || location.pathname;
        var params = options.data||{};
        var queryString = '';
        for ( key in params ){
             queryString += '&'+key +'='+params[key];
         }
          var callback = 'itcast_'+(Math.random()*Math.random()).toString().substr(2);
         url = url+queryString+'&callback='+callback;
        // 动态创建callback name
        //2.动态创建script标签，添加到页面上
        var scriptElement = document.createElement('script');
        scriptElement.src = url;
        document.body.appendChild(scriptElement);
        //3.回调 数据
        window[callback] = function(data){
            options.success && options.success(data);
            document.body.removeChild(scriptElement);
        }
      }
    ```
- 3.**简要描述web前端性能需要考虑哪方面，你的优化思路是什么？**
    + 资源加载
        * CSS顶部，JS底部
        * CSS JS 文件压缩
        * 图片尽量使用精灵兔，字体图标
        * 图片加载可以通过懒加载的方式
        * 尽可能减少资源请求次数
    + 代码性能
        * 使用CSS缩写，减少代码量
        * 减少查询层级：如 .header.logo 要好过 .header.top.logo
        * 减少查询范围：如.header>li 要好过.header li
        * 避免 Tag 标签 与 class 或 ID 并存。如：a.top、button #submit
        * 删除重复的CSS
    + html
        * 减少DOM节点，加速页面渲染
        * 正确的闭合标签，避免使用<div/>,浏览器会多一个将它解析成 <div></div>的过程
        * 减少页面重绘。比如给图片加上正确的宽高值，可以减少页面的重绘
    + js
        * 尽量少用全局变量
        * 使用事件代码绑定事件，如将事件绑定在body上进行代理
        * 避免频繁操作DOM节点
        * 减少对象查找，如a.b.c.d这种查找方式非常消耗性能，尽可能把它定义在变量里

- 4.**写出3个 this 的典型应用**
    + 做为对象方法调用
    ```js
      var point = {
            x: 0,
            y: 0,
            moveTo: function (x, y) {
                this.x = this.x + x;
                this.y = this.y + y;
            }
        };
        point.moveTo(1, 1) //this 绑定到当前对象，即 point 对象
    ```
    + 作为构造函数调用
    ```js
        function Point(x, y){ 
          this.x = x; 
          this.y = y; 
       } 
    ```
    + 使用 apply 或 call 调用
    ```js
       function Point(x, y) {
            this.x = x;
            this.y = y;
            this.moveTo = function (x, y) {
                this.x = x;
                this.y = y;
            }
        }
        var p1 = new Point(0, 0);
        var p2 = {
            x: 0,
            y: 0
        };
        p1.moveTo(1, 1);
        p1.moveTo.apply(p2, [10, 10]);
    ```

- 5.**请尽可能详尽解释 ajax 的工作原理**
    + ajax 的工作原理相当于在用户和服务器之间加了一个中间层，是用户操作与服务器响应异步话。这样把以前的一些服务器负担的工作转嫁到客户端，利于客户端闲置的处理能力来处理，减轻服务器和带宽的负担，从而达到节约 ISP 的空间及带宽租用成本的目的
    + 简单来说通过 XMLHttpRequest 对象来向服务器发异步请求，从服务器获取数据，然后用 javascript 来操作 DOM 而更新页面。这其中最关键的一步就是从服务器获取请求数据。


- 6.**业界常用的优化WEB页面加载速度的方式(可以分别从页面元素展现,请求连接,css,js,服务器等方面介绍)**
    + **优化图像：**这个绝对是显而易见的,可以看到图片占据的页面内容分量最重.在现代网页设计中,图片绝对占据了大部分的内容.你需要针对你的页面重新定义图片大小.这能够有效地帮助你减少页面大小
    + **减少 DNS 查询(DNS lookup)：**减少DNS查询是一个WEB开发人员可以用了页面加载时间快速有效的方法.DNS查询需要花费很长的时间来返回一个主机名的IP地址.而浏览器在查询结束前不会进行任何操作.对于不同的元素可以使用不同的主机名,如URL、图像、脚本文件、样式文件、FLASH元素等.具有多种网络元素的页面经常需要进行多个DNS查询,因而花费的时间更长.减少不同域名的数量将减少并行下载的数量,加速你的网站
    + **减少HTTP请求：**还有一种简单的优化网页速度的方法是,减少HTTP请求.当一个网站一下子收到太多的HTTP请求,它的访客就会有响应时间延迟的体验,这不仅增加了CPU使用率也增加了页面的加载时间.那么,又该如何减少HTTP请求?减少网站上的对象数量;最小化网站上的重定向数量;使用CSS Sprites技术(只要你需要的那部分图片内容)
    + **使用内容分发网路(content Delivery Network CDN)：**服务器处理大流量是很困难的,这最终会导致页面加载速度变慢.而使用CDN就可以解决这一问题,提升页面加载速度.CDN是位于全球不同地方的高性能网络服务,复制你网络的静态资源,并以最有效的方式来为访客服务.
    + **把CSS文件放在页面顶部,而JS文件放在底部:**把CSS文件在页面底部引入可以禁止逐步渲染,节省浏览器加载和重绘页面元素的资源.JavaScript是用于功能和验证.把JS文件放在页面底部可以避免代码执行前的等待时间,从而提升页面加载速度.这些都是一些减少页面加载时间和提高转换率的方法.在某些情况下,需要JavaScript在页面的顶部加载(如某些第三方跟踪脚本).
    + **压缩 CSS 和 javascript：**压缩是通过移除不必要的字符(如TAB、空格、回车、代码注释等),以帮助减少其大小和网页的后续加载时间的过程.这是非常重要的,但是,你还需要保存JS和CSS的原文件,以便更新和修改代码.
    + **利用浏览器缓存：**浏览器缓存是允许访客的浏览器缓存你网站页面副本的一个功能.这有助于访客再次访问时,直接从缓存中读取内容而不必重新加载.这节省了向服务器发送HTTP请求的时间.此外,通过优化您的网站的缓存系统往往也会降低您的网站的带宽和托管费用.
    + **启用 GZIP 压缩：**在服务器上压缩网站的页面是提升网站访问速度非常有效的一种方法.你可以用gzip压缩做到这一点.Gzip是一个减小发送给访客的HTML文件、JS和CSS体积的工具.压缩的文件减少了HTTP响应时间.据Yahoo报道,这大概可以减少70%的下载时间.而目前90%的通过浏览器的流量都支持Gzip压缩,因此,这是一个提示网站性能有效的选项.

- 7.**列举常用的 web 页面开发，调试以及优化工具**
    + 常用的 IDE(基础开发环境，integrated development environment):sublime,webstorm,vscode,hbuilder
    + 常用的调试工具：firebug(ff)，web developer(ie),iEtester（ie浏览器兼容性）,浏览器自带控制台
    + 常用的优化工具：Google提供了PageSpeed工具,这是一个浏览器插件,可以很好地应用上文中Google所提到的Web优化实践——帮助你轻松对网站的性能瓶颈进行分析,并为你提供优化建议.
    YSlow是雅虎推出的一款浏览器插件,可以帮助你对网站的页面进行分析,并为你提供一些优化建议,以提高网站的性能.

- 8.**解释什么是sql注入，xss漏洞**
    + 结构化查询语言(Structured Query Language)简称SQL,是一种特殊目的的编程语言,是一种数据库查询和程序设计语言,用于存取数据以及查询、更新和管理关系数据库系统;同时也是数据库脚本文件的扩展名.
    所谓SQL注入,就是通过把SQL命令插入到Web表单提交或输入域名或页面请求的查询字符串,最终达到欺骗服务器执行恶意的SQL命令.具体来说,它是利用现有应用程序,将(恶意)的SQL命令注入到后台数据库引擎执行的能力,它可以通过在Web表单中输入(恶意)SQL语句得到一个存在安全漏洞的网站上的数据库,而不是按照设计者意图去执行SQL语句.
    XSS攻击:跨站脚本攻击(Cross Site Scripting),为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆,故将跨站脚本攻击缩写为XSS.XSS是一种经常出现在web应用中的计算机安全漏洞,它允许恶意web用户将代码植入到提供给其它用户使用的页面中.比如这些代码包括HTML代码和客户端脚本.攻击者利用XSS漏洞旁路掉访问控制——例如同源策略(same origin policy).这种类型的漏洞由于被黑客用来编写危害性更大的网络钓鱼(Phishing)攻击而变得广为人知.对于跨站脚本攻击,黑客界共识是:跨站脚本攻击是新型的"缓冲区溢出攻击",而JavaScript是新型的"ShellCode".

- 9.**js 中如何实现一个 map**
    ```js
       let arr = [1,2,3,4,5];
       Array.prototype.myMap = function(fn){
        var newArr = [];
         for ( var i = 0; i<this.length;i++ ){
               newArr.push( fn(this[i],i,this));
         }
         return newArr;
        }
        var newArr = arr.myMap(function(x){
             return x * 2;
         });
    ```
- 10.**js可否实现面向对象编程，如果可以如何实现js对象的继承**

- 11.**如何获取对象a拥有的所有属性（可枚举的、不可枚举的，不包括继承来的属性）**

- 12.**同步和异步的区别**
    + 同步：阻塞的
     张三叫李四去吃饭，李四一直忙得不停，张三一直等着，直到李四忙完两个人一块去吃饭
     =浏览器向服务器请求数据，服务器比较忙，浏览器一直等着（页面白屏），直到服务器返回数 据，浏览器才能显示页面
     异步：非阻塞的
     -张三叫李四去吃饭，李四在忙，张三说了一声然后自己就去吃饭了，李四忙完后自己去吃
     =浏览器向服务器请求数据，服务器比较忙，浏览器可以自如的干原来的事情（显示页面），服务器返回数据的时候通知浏览器一声，浏览器把返回的数据再渲染到页面，局部更新

- 13.**如何解决跨域问题**
    + 理解跨域的概念：协议、域名、端口都相同才同域，否则都是跨域
    出于安全考虑，服务器不允许ajax跨域获取数据，但是可以跨域获取文件内容，所以基于这一点，可以动态创建script标签，使用标签的src属性访问js文件的形式获取js脚本，并且这个js脚本中的内容是函数调用，该函数调用的参数是服务器返回的数据，为了获取这里的参数数据，需要事先在页面中定义回调函数，在回调函数中处理服务器返回的数据，这就是解决跨域问题的主流解决方案

- 14.**页面编码和被请求的资源编码如果不一致如何处理**
    + 对于ajax请求传递的参数，如果是get请求方式，参数如果传递中文，在有些浏览器会乱码，不同的浏览器对参数编码的处理方式不同，所以对于get请求的参数需要使用 encodeURIComponent函数对参数进行编码处理，后台开发语言都有相应的解码api。对于post请求不需要进行编码

- 15.**简述ajax 的过程**
    + 创建XMLHttpRequest对象,也就是创建一个异步调用对象
    + 创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息
    + 设置响应HTTP请求状态变化的函数
    + 发送HTTP请求
    + 获取异步调用返回的数据
    + 使用JavaScript和DOM实现局部刷新

- 16.**阐述一下异步加载**
    + 异步加载的方案： 动态插入 script 标签
    + 通过 ajax 去获取 js 代码，然后通过 eval 执行
    + script 标签上添加 defer 或者 async 属性
    + 创建并插入 iframe，让它异步执行 js

- 17.**请解释一下 JavaScript 的同源策略**
    + 同源策略是客户端脚本（尤其是Javascript）的重要的安全度量标准。它最早出自Netscape Navigator2.0，其目的是防止某个文档或脚本从多个不同源装载。所谓同源指的是：协议，域名，端口相同，同源策略是一种安全协议，指一段脚本只能读取来自同一来源的窗口和文档的属性

- 18.**GET和POST的区别，何时使用POST**
    + GET：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符，有的浏览器是8000个字符
    + POST：一般用于修改服务器上的资源，对所发送的信息没有限制
    + 无法使用缓存文件（更新服务器上的文件或数据库）
    + 向服务器发送大量数据（POST 没有数据量限制）
    + 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

- 19.**什么是Ajax和JSON，它们的优缺点**
    + *Ajax* 是全称是asynchronous JavaScript andXML，即异步JavaScript和xml，用于在Web页面中实现异步数据交互，实现页面局部刷新
    + *优点*：可以使得页面不重载全部内容的情况下加载局部内容，降低数据传输量，避免用户不断刷新或者跳转页面，提高用户体验
    + *缺点*：对搜索引擎不友好；要实现ajax下的前后退功能成本较大；可能造成请求数的增加跨域问题限制
    + JSON是一种轻量级的数据交换格式，ECMA的一个子集
    + *优点*：轻量级、易于人的阅读和编写，便于机器（JavaScript）解析，支持复合数据类型（数组、对象、字符串、数字）

- 20.**一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么**
    + 当发送一个 URL 请求时，不管这个 URL 是 Web 页面的 URL 还是 Web 页面上每个资源的 URL，浏览器都会开启一个线程来处理这个请求，同时在远程 DNS 服务器上启动一个 DNS 查询。这能使浏览器获得请求对应的 IP 地址
    + 浏览器与远程 Web 服务器通过 TCP 三次握手协商来建立一个 TCP/IP 连接。该握手包括一个同步报文，一个同步-应答报文和一个应答报文，这三个报文在 浏览器和服务器之间传递。该握手首先由客户端尝试建立起通信，而后服务器应答并接受客户端的请求，最后由客户端发出该请求已经被接受的报文
    +  一旦 TCP/IP 连接建立，浏览器会通过该连接向远程服务器发送 HTTP 的 GET 请求。远程服务器找到资源并使用 HTTP 响应返回该资源，值为 200 的 HTTP 响应状态表示一个正确的响应
    + 此时，Web 服务器提供资源服务，客户端开始下载资源

- 21.**JQuery一个对象可以同时绑定多个事件，这是如何实现的**
    + jQuery可以给一个对象同时绑定多个事件，低层实现方式是使用addEventListner或attachEvent兼容不同的浏览器实现事件的绑定，这样可以给同一个对象注册多个事件

- 22.**实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制**
    + 考察点1：对于基本数据类型和引用数据类型在内存中存放的是值还是指针这一区别是否清楚
    + 考察点2：是否知道如何判断一个变量是什么类型的
    + 递归算法的设计
    ```js
      	// 方法一：
        Object.prototype.clone = function(){
        var o = this.constructor === Array ? [] : {};
        for(var e in this){
            o[e] = typeof this[e] === "object" ? this[e].clone() : this[e];
        }
        return o;
        }
        //方法二：
            /**
            * 克隆一个对象
            * @param Obj
            * @returns
            */
            function clone(Obj) {   
                var buf;   
                if (Obj instanceof Array) {   
                    buf = [];//创建一个空的数组 
                    var i = Obj.length;   
                    while (i--) {   
                        buf[i] = clone(Obj[i]);   
                    }   
                    return buf;    
                }else if (Obj instanceof Object){   
                    buf = {};//创建一个空对象 
                    for (var k in Obj) { //为这个对象添加新的属性 
                        buf[k] = clone(Obj[k]);   
                    }   
                    return buf;   
                }else{ //普通变量直接赋值
                    return Obj;   
                }   
            }

    ```
- 23.**请评价以下代码并给出改进意见**
    ```js
      if (window.addEventListener) {
            var addListener = function (el, type, listener, useCapture) {
                el.addEventListener(type, listener, useCapture);
            };
        } else if (document.all) {
            addListener = function (el, type, listener) {
                el.attachEvent("on" + type, function () {
                    listener.apply(el);
                });
            }
        }
    ```
    + 不应该在if和else语句中声明addListener函数，应该先声明
    + 不需要使用window.addEventListener或document.all来进行检测浏览器，应该使用能力检测
    + 由于attachEvent在IE中有this指向问题，所以调用它时需要处理一下
    ==改进代码==
    ```js
        function addEvent(elem, type, handler) {　　
        if (elem.addEventListener) {　　　　
            elem.addEventListener(type, handler, false);　　
        } else if (elem.attachEvent) {　　　　
            elem['temp' + type + handler] = handler;　　　　
            elem[type + handler] = function () {　　　　
                elem['temp' + type + handler].apply(elem);　　
            };　　
            elem.attachEvent('on' + type, elem[type + handler]);　
        } else {　　
                elem['on' + type] = handler;　　
            }
        }
    ```
- 24.**用原生JS实现jquery的ready方法**
    ```js
     function ready(fn) {
            if (document.addEventListener) { //标准浏览器
                document.addEventListener('DOMContentLoaded', function () {
                    //注销事件, 避免反复触发
                    document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                    fn(); //执行函数
                }, false);
            } else if (document.attachEvent) { //IE
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState == 'complete') {
                        document.detachEvent('onreadystatechange', arguments.callee);
                        fn(); //函数执行
                    }
                });
            };
        };
    }

    ```
- 25.**（设计题）想实现一个对页面某个节点的拖曳？如何做？（使用原生JS**
    + 给需要拖拽的节点绑定mousedown, mousemove, mouseup事件
    + mousedown事件触发后，开始拖拽
    + mousemove时，需要通过event.clientX和clientY获取拖拽位置，并实时更新位置
    + mouseup时，拖拽结束
    + 需要注意浏览器边界的情况

- 26.**Javascript作用链域**
    + 理解变量和函数的访问范围和生命周期，全局作用域与局部作用域的区别，JavaScript中没有块作用域，函数的嵌套形成不同层次的作用域，嵌套的层次形成链式形式，通过作用域链查找属性的规则需要深入理解

- 27.**谈谈This对象的理解**
    + 理解不同形式的函数调用方式下的this指向，理解事件函数、定时函数中的this指向，函数的调用形式决定了this的指向
    + 全局 this 指向的是 window
    + 函数中的 this 指向的是函数所在的对象
    + 对象中的 this 指向其本身

- 28.**eval是做什么的**
    + 将字符串解析成 JS 代码并运行，应该避免使用 eval，不安全，非常消耗性能

- 29.**关于事件，IE与火狐的事件机制有什么区别？ 如何阻止冒泡**
    + 在IE中,事件对象是作为一个全局变量来保存和维护的.所有的浏览器事件,不管是用户触发的，还是其他事件,都会更新window.event对象.所以在代码中，只要调用window.event就可以获取事件对象， 再event.srcElement就可以取得触发事件的元素进行进一步处理. 
    [2].在FireFox中，事件对象却不是全局对象，一般情况下，是现场发生，现场使用，FireFox把事件对象自动传给事件处理程序.
    关于事件的兼容性处理要熟练掌握，事件对象具体哪些属性存在兼容性问题，IE与标准事件模型事件冒泡与事件捕获的支持要理解

- 30.**new操作符具体干了什么呢**
    + 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型
    + 属性和方法被加入到 this 引用的对象中
    + 新创建的对象由 this 所引用，并且最后隐式的返回 this 

- 31.**模块化开发怎么做**
    + 浏览器端requirejs，seajs；服务器端nodejs；ES6模块化；fis、webpack等前端整体模块化解决方案；grunt、gulp等前端工作流的使用

- 32.**ECMAScript6 怎么写class么，为什么会出现class这种东西**
    ```js
        class Point {
            constructor(x, y) {
                this.x = x;
                this.y = y;
        }
        toString() {
            return '(' + this.x + ', ' + this.y + ')';
            }
        }
    ```
- 33.**JavaScript中的作用域与变量声明提升**
    + 理解JavaScript的预解析机制，js的运行主要分两个阶段：js的预解析和运行，预解析阶段所有的变量声明和函数定义都会提前，但是变量的赋值不会提前

- 34.**javascript对象的几种创建方式**
    + 工厂模式
    + 构造函数模式
    + 原型模式
    + 混合构造函数和原型模式
    + 寄生构造函数模式
    + 动态原型原型
    + 稳妥构造函数模式

- 35.**javascript 继承的6种方法**
    + 原型链继承
    + 借用构造函数继承
    + 组合继承（原型+借用构造）
    + 原型式继承
    + 寄生式继承
    + 寄生组合式继承

- 36.**简述一下Sass、Less，且说明区别**
    + 他们是动态的样式语言，是CSS预处理期，CSS上的一种抽象层，他们是一种特殊的语法/语言而编译成CSS
    + 变量符不一样，less是@，而sass是$
    + Sass 支持条件语句，可以使用if{} else{},for{}循环等等。而less不支持
    + Sass 是基于 Ruby的，是在服务器端处理的，而less 需要引入less.js来处理less 代码输出css到浏览器

- 37.**验证邮箱的正则表达式**
    ```
      /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    ```
- 38.**谈谈浏览器的内核，并且说一下什么事内核**
    + Trident (['traɪd(ə)nt])--IE，Gecko (['gekəʊ])--Firefox, Presto (['prestəʊ])--opera,webkit—谷歌和Safari
    + *浏览器内核又可以分成两部分：*渲染引擎和 JS 引擎。它负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入 CSS 等），以及计算网页的显示方式，然后会输出至显示器或打印机。JS 引擎则是解析 Javascript 语言，执行 javascript 语言来实现网页的动态效果。

- 39.**javascript 原型、原型链？有什么特点?**
    + 原型对象也是普通的对象，是对象一个自带隐式的__proto__属性，原型也有可能自己的原型，如果一个原型对象的原型不为 null 的话，我们就称之为原型链。
    + 原型链是由一些用来继承和共享属性的对象组成的（有限的）对象链
    + javascript 的数据属性值：writable、configurable、enumerable、value
    + 当我们需要一个属性的时，javascript 引擎会先看当前对象是否有这个属性值，如果没有的话，就会查找他的 prototype 对象是否有这个属性

- 40.**写一个通用的事件侦听器函数**
    ```js
        // event(事件)工具集，来源：https://github.com/markyun
        markyun.Event = {
            // 页面加载完成后
            readyEvent: function (fn) {
                if (fn == null) {
                    fn = document;
                }
                var oldonload = window.onload;
                if (typeof window.onload != 'function') {
                    window.onload = fn;
                } else {
                    window.onload = function () {
                        oldonload();
                        fn();
                    };
                }
            },
            // 视能力分别使用dom0||dom2||IE方式 来绑定事件
            // 参数： 操作的元素,事件名称 ,事件处理程序
            addEvent: function (element, type, handler) {
                if (element.addEventListener) {
                    //事件类型、需要执行的函数、是否捕捉
                    element.addEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    element.attachEvent('on' + type, function () {
                        handler.call(element);
                    });
                } else {
                    element['on' + type] = handler;
                }
            },
            // 移除事件
            removeEvent: function (element, type, handler) {
                if (element.removeEnentListener) {
                    element.removeEnentListener(type, handler, false);
                } else if (element.datachEvent) {
                    element.detachEvent('on' + type, handler);
                } else {
                    element['on' + type] = null;
                }
            },
            // 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
            stopPropagation: function (ev) {
                if (ev.stopPropagation) {
                    ev.stopPropagation();
                } else {
                    ev.cancelBubble = true;
                }
            },
            // 取消事件的默认行为
            preventDefault: function (event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            },
            // 获取事件目标
            getTarget: function (event) {
                return event.target || event.srcElement;
            },
            // 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
            getEvent: function (e) {
                var ev = e || window.event;
                if (!ev) {
                    var c = this.getEvent.caller;
                    while (c) {
                        ev = c.arguments[0];
                        if (ev && Event == ev.constructor) {
                            break;
                        }
                        c = c.caller;
                    }
                }
                return ev;
            }
        };
    ```

- 41.**如何判断一个对象是否属于某个类**
    ```js
      //使用instanceof （待完善）
      if(a instanceof Person){
        alert('yes');
      }
    ```
- 42.**模块化怎么做**
    + 立即执行函数，不暴露私有成员
    ```js
        var module1 = (function(){
    　　　　var _count = 0;
    　　　　var m1 = function(){
    　　　　　　//...
    　　　　};
    　　　　var m2 = function(){
    　　　　　　//...
    　　　　};
    　　　　return {
        　　　　　　m1 : m1,
        　　　　　　m2 : m2
    　　　　};
    　　 })(); 
    ```

- 43.**php inset和empty的区别，举例说明**
    + empty函数
        * 用途：检测变量是否为空
        * 判断：如果 var 是非空或非零的值，则 empty() 返回 FALSE。换句话说，""、0、"0"、NULL、FALSE、array()、var $var; 以及没有任何属性的对象都将被认为是空的，如果 var 为空，则返回 TRUE。注意：empty() 只检测变量，检测任何非变量的东西都将导致解析错误。换句话说，后边的语句将不会起作用
    + isset函数
        * 用途：检测变量是否设置
        * 判断：检测变量是否设置，并且不是 NULL。如果已经使用 unset() 释放了一个变量之后，它将不再是 isset()。若使用 isset() 测试一个被设置成 NULL 的变量，将返回 FALSE。同时要注意的是一个NULL 字节（"\0"）并不等同于 PHP 的 NULL 常数

- 44.**javascript 怎么实现事件捕获**

- 45.**js实现深拷贝**
    ```js
        // 当第二次调用的时候， source 是 obj1.subObj
        // target obj.subObj
        // obj.subObj.arr = []
        function deepExtend(source, target) {
          for (var key in source) {
            if (Object.prototype.toString.apply(source[key]) === '[object Object]') {
              // target.subObj = {}
              target[key] = {}
              deepExtend(source[key], target[key])
                // for (var k in source[key]) {
                //   target[key][k] = source[key][k]
                // }
            } else if (Object.prototype.toString.apply(source[key]) === '[object Array]') {
              target[key] = []
              deepExtend(source[key], target[key])
                // for (var i = 0; i < source[key].length; i++) {
                //   target[key].push(source[key][i])
                // }
            } else {
              console.log(++count)
              target[key] = source[key]
            }
          }
        }
        deepExtend(obj1, obj)
    ```

- 46.**说说你对 WebSocket 的了解**
    + webSocket 协议是基于 TCP 的一种新的网络协议。它实现了浏览器与服务器双工(full-duplex)通信，允许服务器主动发送信息给客户端。
    + 传统 web(http) 服务都是请求->响应模型，即客户端（浏览器）请求服务器端（webserver）,服务器收到请求后才能做出响应，客户端才能接收数据，可以理解为'拉',
    webSocket提供浏览器和服务器之间的长链接，可以实现服务器端直接通知客户端，即'推'，
    你登录给张三发信息，过程应该是这样，你登录有请求发送到服务器，服务器利用websocket'推' 到客户端。当然不用 websocket 也看模拟 '推',即客户端浏览器写个 timer 定时器去服务器端 '取数据',但这样的效率肯定不好实时性也不高，websocket解决此问题。

## 框架部分

- 1.**前端templating(Mustache, underscore, handlebars)是干嘛的, 怎么用**
    + Web 模板引擎是为了使用户界面与业务数据（内容）分离而产生的
    + Mustache 是一个 logic-less （轻逻辑）模板解析引擎，它的优势在于可以应用在 Javascript、PHP、Python、Perl 等多种编程语言中
    + Underscore封装了常用的JavaScript对象操作方法，用于提高开发效率
    + Handlebars 是 JavaScript 一个语义模板库，通过对view和data的分离来快速构建Web模板

- 2.**简述一下 Handlebars 的基本用法**

- 3.**AMD(Modules/Asynchronous-Definition)、CMD(Common Module Definition)规范区别**
    + sea.js(AMD)、require.js(CMD/common.js)，这些代表需要着重去了解

- 4.**requireJS 的核心原理是是什么？**
    + 核心是js 的加载模块，通过正则匹配模块以及模块的依赖关系，保证文件加载的先后顺序，根据文件的路径对加载过的文件做了缓存。

- 5.**让你自己设计实现一个requireJS，你会怎么做**
    + 核心是实现 js 的加载模块，维护js的依赖关系，控制好文件加载先后顺序

- 6.**谈一谈你对ECMAScript6的了解**
    + ES6新的语法糖，类，模块化等新特性

- 7.**require.js 特性**
    + 实现js文件的异步加载，避免网页失去响应
    + 管理模块之间的依赖性，便于代码的编写和维护

- 8.**jquery 与 jqueryUI 有啥区别**
    + jquery 是一个 js 库，主要提供的功能是选择器，属性修改和事件绑定等等。
    + jquery UI 则是在jquery的基础上，利用jquery的扩展性，设计的插件。提供了一些常用的界面元素，诸如对话框，拖动行为、改变大小行为等等

- 9.**jQuery.fn的init方法返回的this指的是什么对象？为什么要返回this**
    + this执行init构造函数自身，其实就是jQuery实例对象，返回this是为了实现jQuery的链式操作

- 10.**jquery.extend 与 jquery.fn.extend的区别**
    + Jquery.extend用来扩展jQuery对象本身；jquery.fn.extend用来扩展jQuery实例

- 11.**对 jQuery 的优化方法**
    + 优先使用 ID 选择器
    + 在 class 前使用 tag （标签名）
    + 给选择器一个上下文
    + 尽量不要使用 .live()方法
    + 使用 data() 方法存储临时变量

- 12.**Zepto的点透问题如何解决**
    + 点透主要是由于两个div重合，例如：一个div调用show()，一个div调用hide()；这个时候当点击上面的div的时候就会影响到下面的那个div
    + github上有一个叫做fastclick的库，它也能规避移动设备上click事件的延迟响应，https://github.com/ftlabs/fastclick
    将它用script标签引入页面（该库支持AMD，于是你也可以按照AMD规范，用诸如require.js的模块加载器引入），并且在dom ready时初始化在body上
    + 根据分析，如果不引入其它类库，也不想自己按照上述fastclcik的思路再开发一套东西，需要1.一个优先于下面的“divClickUnder”捕获的事件；2.并且通过这个事件阻止掉默认行为（下面的“divClickUnder”对click事件的捕获，在ios的safari，click的捕获被认为和滚屏、点击输入框弹起键盘等一样，是一种浏览器默认行为，即可以被event.preventDefault()阻止的行为）

- 13.**Underscore 对哪些 JS 原生对象进行了扩展以及提供了哪些好用的函数方法**
    + 对 underscore 的熟悉度

- 14.**angular、vue、react 的熟悉度**

- 15.**常使用的库有哪些？常用的前端开发工具？开发过什么应用或组件**
    + 使用率较高的框架有jQuery、YUI、Prototype、Dojo、Ext.js、Mootools等。尤其是jQuery，超过91%
    + 轻量级框架有Modernizr、underscore.js、backbone.js、Raphael.js等。（理解这些框架的功能、性能、设计原理）
    + 前端开发工具：Sublime Text 、Eclipse、Notepad、Firebug、HttpWatch、Yslow。
    + 开发过的插件：城市选择插件，汽车型号选择插件、幻灯片插件。弹出层。（写过开源程序，加载器，js引擎更好）

- 16.**对 BFC 规范的理解**
    + formatting Context:指页面中的一个渲染区域，并且拥有一套渲染规则，他决定其子元素如何定位，以及与其他元素的相互关系和作用

- 17.**WEB应用从服务器主动推送Data到客户端有那些方式**
    + html5 websoket
    + webSocket 通过 Flash
    + XHR长时间连接
    + XHR Multipart Streaming
    + 不可见的Iframe
    + <script>标签的长时间连接(可跨域)

- 18.**平时如何管理你的项目，如何设计突发大规模并发架构**
    + 先期团队必须确定好全局样式（globe.css），编码模式(utf-8) 等
    + 编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）
    + 标注样式编写人，各模块都及时标注（标注关键样式调用的地方）
    + 页面进行标注（例如 页面 模块 开始和结束）
    + CSS跟HTML 分文件夹并行存放，命名都得统一（例如style.css）
    + JS 分文件夹存放，命名以该JS 功能为准英文翻译
    + 图片采用整合的 images.png png8 格式文件使用 尽量整合在一起使用方便将来的管理

- 19.**说一说前端流行的一些东西**
    + Node.js、Mongodb、npm、MVVM、MEAN、react、angularjs
    
## 移动端部分

## 浏览器部分（HTTP）
- 1.**HTTP协议中，GET和POST有什么区别？分别适用什么场景？**
    + get 传输的数据长度有限制，post 的没有
    + get 通过url 传递，在浏览器地址栏可见，post是在报文中传递
    + post 一般用于表单提交
    + get 一般用于简单的数据查询，严格要求不是那么高的场景

- 2.**HTTP 状态消息  200 302 304 403 404 500 分表表示什么?**
    + 200：请求已成功,请求所希望的响应头或数据体将随此响应返回
    + 302：请求的资源临时从不同的URL响应请求.由于这样的重定向是临时的,客户端应当继续向原有地址发送以后的请求,只有在Cache-Control或Expires中进行了指定的情况下,这个响应才是可缓存的.
    + 304:如果客户端发送了一个带条件的GET请求且该请求已被允许,而文档的内容(自上次一来或者根据请求的条件)并没有改变,则服务器应当返回这个状态码.304响应禁止包含消息体,因此始终以消息头后的第一个空行结尾.
    + 403:服务器已经理解请求,但是拒绝执行它.
    + 404:请求失败,请求所希望得到的资源未被在在服务器上发现.
    + 500:服务器遇到了一个未曾预料的状况,导致了它无法完成对请求的处理.一般来说,这个问题都会在服务器端的源代码出现错误时出现.

- 3.**HTTP协议中，header信息里面，怎么控制页面失效时间（last-modified,cache-control,Expires分别代表什么）**
    + HTTP(HyperTextTransferProtocol)即超文本传输协议,目前网页传输的的通用协议.HTTP协议采用了请求/响应模型,浏览器或其他客户端发出请求,服务器给与响应.就整个网络资源传输而言,包括message-header和message-body两部分.首先传递message-header,即httpheader消息.http header 消息通常被分为4个部分:general header, request header, response header, entity header.但是这种分法就理解而言,感觉界限不太明确.根据维基百科对http header内容的组织形式,大体分为Request和Response两部分.
    last-modified处在Response中,代表请求资源的最后修改时间.客户可以通过If-Modified-Since请求头提供一个日期,该请求将被视为一个条件GET,只有改动时间迟于指定时间的文档才会返回,否则返回一个304(Not Modified)状态.Last-Modified也可用setDateHeader方法来设置.
    Expires处在Response中,代表响应过期的日期和时间.
    cache-control指定请求和响应遵循的缓存机制请求时的缓存指令包括no-cache、no-store、max-age、 max-stale、min-fresh、only-if-cached,响应消息中的指令包括public、private、no-cache、no- store、no-transform、must-revalidate、proxy-revalidate、max-age.各个消息中的指令含义如下:Public指示响应可被任何缓存区缓存.Private指示对于单个用户的整个或部分响应消息,不能被共享缓存处理.这允许服务器仅仅描述当用户的部分响应消息,此响应消息对于其他用户的请求无效.no-cache指示请求或响应消息不能缓存.no-store用于防止重要的信息被无意的发布.在请求消息中发送将使得请求和响应消息都不使用缓存.max-age指示客户机可以接收生存期不大于指定时间(以秒为单位)的响应.min-fresh指示客户机可以接收响应时间小于当前时间加上指定时间的响应.max-stale指示客户机可以接收超出超时期间的响应消息.如果指定max-stale消息的值,那么客户机可以接收超出超时期指定值之内的响应消息.

- 4.**HTTP协议目前常用的有哪几个?KEEPALIVE从哪个版本开始出现的?**
    + 超文本传输协议已经演化出了很多版本,它们中的大部分都是向下兼容的.在RFC 2145中描述了HTTP版本号的用法.客户端在请求的开始告诉服务器它采用的协议版本号,而后者则在响应中采用相同或者更早的协议版本.
    0.9已过时.只接受 GET 一种请求方法,没有在通讯中指定版本号,且不支持请求头.由于该版本不支持 POST 方法,所以客户端无法向服务器传递太多信息.
    HTTP/1.0这是第一个在通讯中指定版本号的HTTP 协议版本,至今仍被广泛采用,特别是在代理服务器中.
    HTTP/1.1当前版本.持久连接被默认采用,并能很好地配合代理服务器工作.还支持以管道方式同时发送多个请求,以便降低线路负载,提高传输速度.
    HTTP/1.1相较于 HTTP/1.0 协议的区别主要体现在:1 缓存处理,2 带宽优化及网络连接的使用,3 错误通知的管理,4 消息在网络中的发送,5 互联网地址的维护,6 安全性及完整性
    keep-Alive功能使客户端到服务器端的连接持续有效,当出现对服务器的后继请求时,Keep-Alive功能避免了建立或者重新建立连接.市场上的大部分Web服务器,包括iPlanet、IIS和Apache,都支持HTTP Keep-Alive.对于提供静态内容的网站来说,这个功能通常很有用.但是,对于负担较重的网站来说,这里存在另外一个问题:虽然为客户保留打开的连接有一定的好处,但它同样影响了性能,因为在处理暂停期间,本来可以释放的资源仍旧被占用.当Web服务器和应用服务器在同一台机器上运行时,Keep- Alive功能对资源利用的影响尤其突出.此功能为HTTP 1.1预设的功能,HTTP 1.0加上Keep-Alive header也可以提供HTTP的持续作用功能.

- 5.**http和https**
    + HTTPS（Hypertext Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单来讲是HTTP的安全版 ，即 HTTP 下加入SSL层，HTTPS 的安全基础是SSL,因此加密的详细内容就需要SSL（详细内容可以百度）
    + ==区别==:https 协议需要到 ca             申请证书，一般免费证书很少，需要交费。http是超文本传输协议，信息是明文传输，https 则是具有安全性 ssl 加密传输协议 http  和 https 使用的是完全不同的连接方式用的端口也不一样，前者是80，后者是443。http的连接很简单,是无状态安全HTTPS协议，是由SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，要比HTTP协议安全。**[http和https](http://jingyan.baidu.com/article/95c9d20d92a74eec4f75614f.html)**

## 服务器（node）部分

- 1.**对Node的优点和缺点提出了自己的看法**
    + （优点）因为Node是基于事件驱动和无阻塞的，所以非常适合处理并发请求，
    因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多。
    此外，与Node代理服务器交互的客户端代码是由javascript语言编写的，
    因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情
    + （缺点）Node是一个相对新的开源项目，所以不太稳定，它总是一直在变，
    而且缺少足够多的第三方库支持。看起来，就像是Ruby/Rails当年的样子。

- 2.**Node.js的适用场景**
    + 实时应用：如在线聊天，实时通知推送等等（如socket.io）
    + 分布式应用：通过高效的并行I/O使用已有的数据
    + 工具类应用：海量的工具，小到前端压缩部署（如grunt），大到桌面图形界面应用程序
    + 游戏类应用：游戏领域对实时和并发有很高的要求（如网易的pomelo框架）
    + 利用稳定接口提升Web渲染能力
    + 前后端编程语言环境统一：前端开发人员可以非常快速地切入到服务器端的开发（如著名的纯Javascript全栈式MEAN架构）

- 3.**对Node的优点和缺点提出了自己的看法**
    + 优点
        * 因为Node是基于事件驱动和无阻塞的，所以非常适合处理并发请求，因此构建在Node上的代理服务器相比其他技术实现（如Ruby）的服务器表现要好得多
        * 与Node代理服务器交互的客户端代码是由javascript语言编写的，因此客户端和服务器端都用同一种语言编写，这是非常美妙的事情
    + 缺点
        * Node是一个相对新的开源项目，所以不太稳定，它总是一直在变
        * 缺少足够多的第三方库支持。看起来，就像是Ruby/Rails当年的样子（第三方库现在已经很丰富了，所以这个缺点可以说不存在了）

## js算法部分

- js快速排序算法

- 写一个multiply 方法支持一下两种调用方式打印出两个数字乘积: multiply(2,3);multiply(2)(3);
    ```js
        function multiply(x,y){
            var  x = x;
            if(arguments.length == 2){
                return x * y;
            }else{
                return function(y){
                    return x * y;
                }
            }       
        }
        console.log( multiply(2)(10));
    ```