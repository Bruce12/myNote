# javascript 基础面试题

- 1.**javascript 的 typeof返回那些数据类型？**
    + object、string、boolean、number、undefined、function

- 2.**列举3种强制类型转换和2种隐式类型转换？**
    + *强制*：parseInt、parseFloat、Number
    + *隐式*：== ！！

- 3.**split()、join的区别**
    + split：切割成数组的形式
    + join：将数组转换成字符串

- 4.**数组方法 pop、push、unshift、shift**
    + push：尾部添加  pop：尾部删除
    + unshift：头部添加   shift：头部删除

- 5.**事件绑定和普通事件有什么区别？**
    + 普通事件的方法
        ```js
          var btn = document.getElementById('hello');
          btn.onclick = function(){
              alert('hello');
          }
          btn.onclick = function(){
              alert('2')
          }
          //输出 2
        ```
        ==执行上面的代码弹窗2==
        
    + 事件绑定方式添加事件：
        ```js
         var btn = document.getElementById('hello');
         btn.addEventListener('click',function(){
             alert(1);
         },false)
         btn.addEventListener('click',function(){
             alert(2);
         },false);
         
        ```
        ==执行上面的代码会先 alert1 再 alert2 普通添加事件的方法不支持添加多个事件，最下面的事件会覆盖上面的，而事件绑定（addEventListener）方式添加事件可以添加多个。addEventListener 不兼容低版本IE，普通事件无法取消，addEventLisntener 还支持事件冒泡+事件捕获==

- 6.**IE 和 DOM 事件流的区别**
    + 执行顺序不一样
    + 参数不一样
    + 事件加不加on
    + this指向问题

- 7.**IE 和标准下有哪些兼容性写法**
    ```js
      var ev = ev || window.event;
      document.documentElement.clientWidth || document.body.clientWidth
      var target = ev.srcElement || ev.target;
    ```
- 8.**call 和 apply 的区别**
    + call
        * 语法：call(thisObj,Object1,Object2....);
        * 定义：调用一个对象的一个方法，以另一个对象替换当前对象
        * 说明：cll 方法可以用来代替另一个对象调该对象的方法。call 方法可以将一个函数的对象上下文从初始的上下文改变由 thisObj 指定的新对象。如果没有提供 thisObj 参数，那么 Global 对象被用作 thisObj.
    + apply方法
        * 语法：apply(thisObj,[argArray]);
        * 定义：应用某一个对象的一个方法，用另一个对象替换当前对象。
        * 说明：如果 argArray 不是一个有效的数组或者不是 arguments 对象，那么将导致一个 TypeError。如果没有提供 argArray 和 thisObj 任何一个参数，那么 Global 对象将被用作 thisObj，并且无法被传递任何参数。

- 9.**b 继承 a 的方法**
    ```js
      function A( age, name ){
          this.age = age;
          this.name = name;
      }
      A.prototype.show = function(){
          alert('父级方法');
      }
      function B( age , name ,job ){
          A.apply(this,arguments);
          this.job = job;
      }
      B.prototype = new A();
      var b = new A(14,'遐客行');
      var a = new B(15,'朗霞','侠客');
      
    ```
- 10.**如何阻止事件冒泡和默认事件**
    + 阻止事件冒泡
        ```js
          //阻止事件冒泡
          function stopBubble(e){
              //如果提供了事件对象，则这是一个非IE浏览器
              if ( e && e.stopPropagation ){
                  //因此它支持W3C的stopPropagation()
                  e.stopPropagation();
              }else{
                  //否则，我们需要使用IE的方式来取消冒泡
                  window.event.cancelBubble = true;
              }
          }
        ```
    + 阻止事件默认行为
        ```js
          function stopDefault(e){
              //w3c
              if ( e && e.preventDefault ){
                  e.preventDefault();
              }else{
                  //IE
                  window.event.returnValue = false;
              }
              return false;
          }
        ```
- 11.**添加、删除、替换、插入到某个节点的方法**
    + appendChild()、insertBefore、replaceChild、removeChild

- 12.**javascript 的本地对象，内置对象和宿主对象**
    + 本地对象为 array obj regexp 等可以new实例化
    + 内置对象为 gload Math 等不可以实例化的
    + 宿主对象为浏览器自带的 document,window 等

- 13.**window.onload 和 document ready 的区别**
    + window.onload 是在 dom 文档树加载完所有文件之后执行一个函数
    + Document.ready 原生没有这个方法，jquery 中有$().ready(function)，在 dom 文档树加载完后执行一个函数（这里的文档树加载完不代表文件加载完）
    + $(document).ready 要比 window.onload 先执行
    + window.onload 只能执行一次，$(document).ready 可能出现多次

- 14.**"= =" 和 "==="的不同**
    + 前者会自动转换成类型，后者不会

- 15.**javascript 的同源策论**
    + 一段脚本只能读取来自同一源的窗口和文档属性，这里的同一个源指的的是主机名、协议和端口号的组合

- 16.**javascript 是一门什么样的语言，它有哪些特点？**
    + javascript 是一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型。它的解释器被称为 javascript 引擎，为浏览器的一部分，广泛用于客户端的脚本语言，最早是在 html 网页上使用，用来给html网页增加动态功能。 javascript 兼容于ECMA标准，因此也称为 ECMAscript。
    + *基本特点*
        * 1.是一种解释性脚本语言
        * 主要用来向 HTML 页面添加交互行为
        * 可以直接嵌套 HTML 页面，但写成单独的js 文件有利于结构和行为的分离
        * 跨平台特性，在绝大多数浏览器的支持，可以在多种平台下运行

- 17.**javascript 的数据类型都有什么？**
    + 基本数据类型：String,Boolean,Number,undefined,null
    + 引用数据类型：Object(Array,Date,RegExp,Function)
    + **如何判断某变量是否为数组类型？**
        * 1.使用数组方法 slice 的方式
        * 2.obj instanceof Array 在某些IE版本中不正确
        * 3.使用 ECMAScript5 中定义的方法 Array.isArray();
        * 4.最好的方法：
        ```js
          if ( typeof Array.isArray === 'undefined' ){
              Array.isArray = function(arg){
                  return Object.prototype.toString.call(arg) === "[object Array]";
              }
          }
        ```

- 18.**希望获取到页面中所有的checkbox怎么做？（不使用第三方框架）**
    ```js
        var domList = document.getElementsByTagName(‘input’)
        var checkBoxList = [];
        var len = domList.length;//缓存到局部变量
        while (len--) {　　//使用while的效率会比for循环更高
    　　    if (domList[len].type == ‘checkbox’) {
            　　checkBoxList.push(domList[len]);
        　　}
        }
    
    ```
- 19.**javascript 的事件流模型都有什么？**
    + “事件冒泡”：事件开始由最具体的元素接收，然后逐级向上传播
    + “事件捕捉”：事件由最不具体的节点接收，然后逐级向下，一直到最具体的
    + DOM 事件流：三个阶段：事件捕捉、目标阶段、事件冒泡

- 20.**看下列代码输出为何？解释原因**
    ```js
      var a;
      alert(typeof a);//undefind
      alert(b);//报错
    ```
    + 解释：undefind 是一个只有一个值得数据类型，这个值就是 undefind，在使用 var 声明变量但未对其赋值进行初始化时，这个变量的值就是 undefind 。而 b 由于未声明将报错。
    
- 21.**看下面代码输出什么？解释原因**
    ```js
	var undefined;
    undefined == null; // true
    1 == true;   // true
    2 == true;   // false
    0 == false;  // true
    0 == '';     // true
    NaN == NaN;  // false
    [] == false; // true
    [] == ![];   // true
   
	var foo = "11"+2-"1";
    console.log(foo);
    console.log(typeof foo);
    执行完后foo的值为111，foo的类型为Number。

    ```
    +  undefined与null相等，但不恒等（=\=\=）
    一个是number一个是string时，会尝试将string转换为number
    尝试将boolean转换为number，0或1
    尝试将Object转换成number或string，取决于另外一个对比量的类型
    所以，对于0、空字符串的判断，建议使用 “=\=\=” 。“\=\=\=”会先判断两边的值类型，类型不匹配时为false。
    那么问题来了，看下面的代码，输出什么，foo的值为什么？
    ```js
    var foo = "11"+2-"1";
    console.log(foo);
    console.log(typeof foo);
    ```
    + 执行完后foo的值为111，foo的类型为Number

- 22.**看代码给答案**
    ```js
    var a = new Object();
    a.value = 1;
    b = a;
    b.value = 2;
    alert(a.value)

    ```
    + 答案：2（考察引用数据类型细节）
    
- 23.**26.	已知数组 var stringArray = [“This”, “is”, “Baidu”, “Campus”]，Alert 出 This is Baidu Campus**
    + alert(stringArray.join(“”))

- 24.**27.	已知有字符串 foo=”get-element-by-id”,写一个 function 将其转化成驼峰表示法 ”getElementById”**
    ```js
    function combo(msg){
        var arr=msg.split("-");
        for(var i=1;i<arr.length;i++){
            arr[i]=arr[i].charAt(0).toUpperCase()+arr[i].substr(1,arr[i].length-1);
        }
        msg=arr.join("");
        return msg;
        }

    ```
- 25.**var numberArray = [3,6,2,4,1,5]（考察基础API）**
    + 实现对该数组的倒排，输出[5,1,4,2,6,3]
    ```
    numberArray.reverse()
    ```
    + 实现对该数组的降序排列，输出[6,5,4,3,2,1]
    ```
      numberArray.sort(function(a,b){return b-a})
    ```
- 26.**输出今天的日期，以YYYY-MM-DD的方式，比如今天是2014年9月26日，则输出2014-09-26**
    ```js
    var d = new Date();
    // 获取年，getFullYear()返回4位的数字
    var year = d.getFullYear();
    // 获取月，月份比较特殊，0是1月，11是12月
    var month = d.getMonth() + 1;
    // 变成两位
    month = month < 10 ? '0' + month : month;
    // 获取日
    var day = d.getDate();
    day = day < 10 ? '0' + day : day;
    alert(year + '-' + month + '-' + day);

    ```
    
- 27.**将字符串”<tr><td>{$id}</td><td>{$name}</td></tr>”中的{$id}替换成10，{$name}替换成Tony （使用正则表达式）**
    ```js
        <tr><td>{$id}</td><td>{$id}_{$name}</td></tr>".replace(/{\$id}/g, '10').replace(/{\$name}/g, 'Tony')
    ```
    
- 28.**为了保证页面输出安全，我们经常需要对一些特殊的字符进行转义，请写一个函数escapeHtml，将<, >, &, “进行转义**
    ```js
    function escapeHtml(str) {
        return str.replace(/[<>”&]/g,     function(match) {
            switch (match) {
               case “<”:
                  return “&lt;”;
               case “>”:
                  return “&gt;”;
               case “&”:
                  return “&amp;”;
               case “\””:
                  return “&quot;”;
              }
          });
    }
    ```
    
- 29.**32.	foo = foo||bar ，这行代码是什么意思？为什么要这样写？**
    + if(!foo) foo = bar;如果foo存在，值不变，否则把bar的值赋给foo。
    短路表达式：作为”&&”和”||”操作符的操作数表达式，这些表达式在进行求值时，只要最终的结果已经可以确定是真或假，求值过程便告终止，这称之为短路求值。

- 30.**看下列代码，将会输出什么?(变量声明提升)**
    ```js
       var foo = 1;
        (function(){
            console.log(foo);
            var foo = 2;
            console.log(foo);
        })()
    ```
    ==答案：输出undefined 和 2。上面代码相当于：==
    ```js
      var foo = 1;
        (function(){
            var foo;
            console.log(foo); //undefined
            foo = 2;
            console.log(foo); // 2;   
        })()

    ```
    ==函数声明与变量声明会被 javscript 引擎隐式地提升到当前作用域的顶部，但是只是提升名称不会提升赋值部分==

- 31.**用 js 实现随机选取 10 - 100 之间的10个数字，存入一个数组，并排序**
    ```js
        function randomNub(aArray, len, min, max) {
            if (len >= (max - min)) {
                return '超过' + min + '-' + max + '之间的个数范围' + (max - min - 1) + '个的总数';
            }
            if (aArray.length >= len) {
                aArray.sort(function (a, b) {
                    return a - b
                });
                return aArray;
            }
            var nowNub = parseInt(Math.random() * (max - min - 1)) + (min + 1);
            for (var j = 0; j < aArray.length; j++) {
                if (nowNub == aArray[j]) {
                    randomNub(aArray, len, min, max);
                    return;
                }
            }
            aArray.push(nowNub);
            randomNub(aArray, len, min, max);
            return aArray;
        }
        var arr = [];
        console.log(randomNub(arr, 10, 10, 100));
    ```
- 32.**把两个数组合并，并删除第二个元素**
    ```js
      var array1 = ['a','b','c'];
      var array2 = ['d','e','f'];
      var array3 = array1.concat(array2);
      array3.splice(1,1);
    ```
- 33.**怎样添加、移除、移动、复制、创建和查找节点（原生JS，）**
    + createDocumentFragment():创建新节点，创建一个 DOM 片段
    + createElement():创建一个具体元素
    + createTextNode():创建一个文本节点
    + appendChild():添加节点
    + removeChild():删除节点
    + replaceChild():替换节点
    + insertBefore():插入节点
    + getElementsByTagName():通过标签名称查找节点
    + getElementsByName():通过元素的 Name 属性值查找
    + getElementById():通过元素Id，唯一性

- 34.**有这样一个URL：http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e，请写一段JS程序提取URL中的各个GET参数(参数名和参数个数不确定)，将其按key-value形式返回到一个json结构中，如{a:’1′, b:’2′, c:”, d:’xxx’, e:undefined}**
    ```js
      function serilizeUrl(url) {
            var urlObject = {};
            if (/\?/.test(url)) {
                var urlString = url.substring(url.indexOf("?") + 1);
                var urlArray = urlString.split("&");
                for (var i = 0, len = urlArray.length; i < len; i++) {
                    var urlItem = urlArray[i];
                    var item = urlItem.split("=");
                    urlObject[item[0]] = item[1];
                }
                return urlObject;
            }
            return null;
        }
      var obj=  serilizeUrl('http://item.taobao.com/item.htm?a=1&b=2&c=&d=xxx&e');
    ```
- 35.**正则表达式构造函数var reg=new RegExp(“xxx”)与正则表达字面量var reg=//有什么不同？匹配邮箱的正则表达式？**
    + 答案：当使用RegExp()构造函数的时候，不仅需要转义引号（即\”表示”），并且还需要双反斜杠（即\\表示一个\）。使用正则表达字面量的效率更高。
    ```js
      var regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    ```
- 36.**看下面代码，给出输出结果**
    ```js
      for (var i = 1; i <= 3; i++) {
        setTimeout(function () {
            console.log(i);
        }, 0);
      };
    ```
    ==输出：4 4 4==
    ==原因：Javascript事件处理器在线程空闲之前不会运行。追问，如何让上述代码输出1 2 3？==
    ```js
      for (var i = 1; i <= 3; i++) {
            setTimeout((function (a) { //改成立即执行函数
                console.log(a);
            })(i), 0);
        };
    ```
- 37.**写一个function，清除字符串前后的空格。（兼容所有浏览器）**
    ```js
       if (!String.prototype.trim) {
            String.prototype.trim = function () {
                return this.replace(/^\s+/, "").replace(/\s+$/, "");
            }
        }
        // test the function 
        var str = " \t\n test string ".trim();
        alert(str == "test string"); // alerts "true"
    ```
- 38.**javascript 中 callee 和 caller 的作用？**
    + caller 是返回一个函数的引用，该函数调用了当前函数
    + callee 是返回正在被执行的 function 函数，也就是所指定的 function 对象的正文

==那么问题来了!如果一对兔子每月生一对兔子；一对新生兔，从第二个月起就开始生兔子；假定每对兔子都是一雌一雄，试问一对兔子，第n个月能繁殖成多少对兔子？（使用callee完成==
```js
    //典型的斐波那契数列 
    var result = [];
    function fn(n) { 
        if (n == 1) {
            return 1;
        } else if (n == 2) {
            return 1;
        } else {
            if (result[n]) {
                return result[n];
            } else {
                //argument.callee()表示fn()
                result[n] = arguments.callee(n - 1) + arguments.callee(n - 2);
                return result[n];
            }
        }
    }
```
- 39.**Javascript中, 以下哪条语句一定会产生运行错误？**
    ```js
    A、var _变量=NaN;  
    B、var 0bj = []; //命名不对，报错，不用以数字开头  
    C、var obj = //; //运行undefind 	
    D、var obj = {};
    ```
    ==答案BC，注意：C在有些浏览器上会报错，chrome运行fundefind ==

- 40.**以下两个变量a和b，a+b的哪个结果是NaN？**
    ```js
      A、var a=undefined; b=NaN 
      B、var a= ‘123’; b=NaN
      C、var a =undefined , b =NaN
      var a=NaN , b='undefined'

    ```
- 41.**var a=10; b=20; c=4;  ++b+c+a++ 以下哪个结果是正确的?**
    ```js
     // A、34   B、35  C、36  D、37
    ```
==答案：B==

- 42.**将页面中所有文本框的表单，并将他们全部清空**
    ```js
        //方法1
        for (vari = 0; i < form1.elements.length; i++) {
            if (form1.elements.type == 'text')
                form1.elements.value = '';
        }
        //方法2
        for (vari = 0; i < document.forms.length; i++) {
            if (forms[0].elements.type == 'text')
                forms[0].elements.value = '';
        }
        //方法3
        if (document.form.elements.type == 'text')
            form.elements.value = '';
        //方法4
        for (vari = 0; i < document.forms.length; i++) {
            for (var j = 0; j < document.forms.elements.length; j++) {
                if (document.forms.elements[j].type == 'text')
                    document.forms.elements[j].value = '';
            }
        }
    ```
- 43.**分析代码，得出正确的结果**
    ```js
      var a=10, b=20 , c=30;
	  ++a;
	  a++;
	  e=++a+(++b)+(c++)+a++;
	  alert(e);//77
    ```
- 44.**写出函数 DateDemo 的返回结果，系统时间假定为今天**
    ```js
        function DateDemo() {
            var d, s = "今天日期是：";
            d = new Date();
            s += d.getMonth() + 1 + "/";
            s += d.getDate() + "/";
            s += d.getFullYear();
            return s;
        }
    ```
- 45.**写出简单描述html标签（不带属性的开始标签和结束标签）的正则表达式，并将以下字符串中的html标签去除掉**
    ```js
      var str = '<div> 这里是div <p> 里面的段落 </p></div>';
      var reg = /<\/?\w+\/?>/gi;
      alert(str.replace(reg,''));
    ```
- 46.**完成foo()函数的内容，要求能够弹出对话框提示当前选中的是第几个单选框**
    ```js
        //js代码
        function foo() {
            //在此处添加代码
            var rdo = document.form1.radioGroup;
            for (var i = 0; i < rdo.length; i++) {
                if (rdo.checked) {
                    alert(“您选择的是第” + (i + 1) + ”个单选框”);
                }
            }
        }
       //html代码
       <form name=”form1″>
            <input type=”radio” name=”radioGroup”/>
            <input type=”radio” name=”radioGroup”/>
            <input type=”radio” name=”radioGroup”/>
            <input type=”radio” name=”radioGroup”/>
            <input type=”submit”/>
        </form>
    ```
- 47.**列举浏览器对象模型BOM里常用的至少4个对象，并列举window对象的常用方法至少5个**
    + 对象：window,document,location,screen,history,navigator
    + 方法:alert(),confirm(),prompt(),open(),close()

- 48.**希望获取到页面中所有的checkbox怎么做？(不使用第三方框架)**
    ```js
        var domList = document.getElementsByTagName('input')
        var checkBoxList = [];
        var len = domList.length;　　 //缓存到局部变量
        while (len--) {　　 //使用while的效率会比for循环更高
            　　
            if (domList[len].type == 'checkbox') {　　
                checkBoxList.push(domList[len]);　　
            }
        }
    ```
- 49.**简述创建函数的几种方式**
    ```js
      //第一种（函数声明）： 
      function sum1(num1,num2){
        return num1+num2;
      }
      //第二种（函数表达式）：
      var sum2 = function(num1,num2){
       return num1+num2;
      }
      //第三种（函数对象方式）：
      //var sum3 = new Function("num1","num2","return num1+num2");
    ```
- 50.**iframe 的优缺点**
    + 优点
        * 解决加载缓慢的第三方内容如图标和广告等的加载问题
        * Security sandbox
        * 并行加载脚本
    + 缺点
        * iframe会阻塞主页面的Onload事件
        * 即时内容为空，加载也需要时间
        * 没有语意

- 51.**请你谈谈Cookie的弊端？**
    + Cookie 数量长度的限制。每个 domain 最多只能有20条cookie，每个cookie长度不能超过 4KB，否则会被截掉
    + 安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了
    + 有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用

- 52.**js延迟加载的方式有哪些？**
    + defer 和 async
    + 动态创建 DOM 方式（创建script，插入到DOM中，加载完毕后callBack）
    + 按需异步载入js

- 53.**哪些操作会造成内存泄漏？**
    + 内存泄漏指任何对象在您不再拥有或需要它之后仍然存在
    + 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为0(没有其他对象引用过该对象)，或对该对象的唯一引用是循环的，那么该对象的内存即可回收
    + setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏
    + 闭包
    + 控制台日志
    + 循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

- 54.**判断一个字符串中出现次数最多的字符，统计这个次数**
    ```js
        var str = 'asdfssaaasasasasaa';
        var json = {};
        for (var i = 0; i < str.length; i++) {
            if (!json[str.charAt(i)]) {
                json[str.charAt(i)] = 1;
            } else {
                json[str.charAt(i)]++;
            }
        };
        var iMax = 0;
        var iIndex = '';
        for (var i in json) {
            if (json[i] > iMax) {
                iMax = json[i];
                iIndex = i;
            }
        }
        alert('出现次数最多的是:' + iIndex + '出现' + iMax + '次');
    ```
- 55.**写一个获取非行间样式的函数**
    ```js
      function getStyle(obj, attr, value) {
            if (!value) {
                if (obj.currentStyle) {
                    return obj.currentStyle[attr];
                } else {
                    window.getComputedStyle(obj, attr)[value];
                }
            } else {
                obj.style[attr] = value;
            }
        }
    ```
- 56.**事件委托是什么**
    + 让利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行！

- 57.**闭包是什么，有什么特性，对页面有什么影响**
    + 我的理解是，闭包就是能够读取其他函数内部变量的函数。在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
    ```js
       function outer() {
            var num = 1;

            function inner() {
                var n = 2;
                alert(n + num);
            }
            return inner;
        }
        outer()();
    ```
- 58.**解释 jsonp 的原理，以及优缺点**
    + 动态创建 script 标签，回调函数
    + Ajax 是页面无刷新请求数据操作
    + ==优点==
        * 1.它不像 XMLHttpRequest 对象实现的 Ajax 请求那样受到同源策略的限制，JSONP 可以跨越同源策略
        * 2.它的兼容性更好，在更加古老的浏览器中都可以运行，不需要 XMLRequest 或 ActiveX的支持
        * 3.在请求完毕后可以通过调用 Callback 的方式回传结果。将回调方法的权限给了调用方。这个就相当于将 controller 层和 view 层终于分开了。
    + ==缺点==
        * 1.它只支持 GET 请求而不支持 POST 等其他类型的请求
        * 2.它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面之间如何进行 javascript 调用问题
        * 3.jsonp 在调用失败的时候不会返回各种 HTTP 状态码
        * 4.安全性。万一假如提供jsonp 的服务器在页面注入漏洞，即它返回的 javascript 的内容被人控制的。那么结果是什么？所有调用这个jsonp 的网站都会存在漏洞。于是无法把危险控制在一个域名下，所有在使用jsonp的时候必须保持使用的jsonp服务器必须是安全可信的

- 59.**字符串反转，如将 '12345678' 变成 '87654321**
    + 思路：先将字符串转换为数组 split()，利用数组的反序函数 reverse()颠倒数组，再利用 jion() 转换为字符
    ```js
      var str = '12345678';
      str = str.split('').reverse().join('');
    ```
- 60.**将数字 12345678 转化成 RMB形式 如： 12,345,678**
    ```js
       function re(str) {
            str += '';
            return str.split("").reverse().join("");
        }
        function toRMB(num) {
            var tmp = '';
            for (var i = 1; i <= re(num).length; i++) {
                tmp += re(num)[i - 1];
                if (i % 3 == 0 && i != re(num).length) {
                    tmp += ',';
                }
            }
            return re(tmp);
        }
       console.log(toRMB('12345678'));
    ```
- 61.**生成5个不同的随机数**
    ```js
       //思路：5个不同的数，每生成一次就和前面的所有数字相比较，如果有相同的，则放弃当前生成的数字！
        var num1 = [];
        for (var i = 0; i < 5; i++) {
            num1[i] = Math.floor(Math.random() * 10) + 1; //范围是 [1, 10]
            for (var j = 0; j < i; j++) {
                if (num1[i] == num1[j]) {
                    i--;
                }
            }
        }
    ```
- 62.**去掉数组中重复的数字**
    ```js
      //数组去重
        var arr = [1, 1, 2, 2, 1, 2, 2, 1, 3, 2, 4, 3, 4, 1, 2, 3, 7, 8, 9];
        var j;
        //需求：根据arr，取出所有不重复的元素[1,2,3,4,7,8,9];
        //1 声明结果数组
        var resultArr = [arr[0]];//可以先将arr[0]放入到结果数组中(因为结果数组中现在是空的，不可能重复)

        //2 获取arr中的每个元素，到resultArr中进行比較，如果在resultArr中不存在arr[i]，放入即可
        for (var i = 1; i < arr.length; i++) {
        //取出了arr[i],需要与resultArr中每一个元素进行比較，还需要遍历resultArr

            for (j = 0; j < resultArr.length; j++) {
            //使用arr[i]与resultArr[j]进行比較，如果每一次比较均不相等，放入即可
            //如果有一个项相等，阻止放入，设置假设条件为false
                if (arr[i] == resultArr[j]) {
                    break;//提高效率，找到一个相等的，后面的就没必要看了
                }
            }

            //所以，需要在所有的比較完成后，在判断是否放入
            if (j == resultArr.length) {
                resultArr[resultArr.length] = arr[i];
            }
        }
        console.log(resultArr);
    ```
- 63.**求质数**
    ```js
      //假设成立法:
        var num = 4;
        //1 检测一个数是不是质数，不太确定是不是，可以通过假设的方式
        var flag = true;
        //2 对假设进行要进行验证
        for (var i = 2; i <= num / 2; i++) {
            //3 找到可以是假设失败的情况
            if (num % i == 0) {
            //4 假设失败，设置假设条件为false
            flag = false;
            //可以添加break，单纯的为了减少执行次数，提高效率(可以省略)
            break;
            }
        }
        //5 根据假设判断是否是质数
        if (flag == true) {
            alert("是质数");
        } else {
            alert("不是质数");
        }
    ```
- 64.**反转数组**
    ```js
      var arr = [1,2,3,4,5,6,7];
      var temp=[];
      for (var i = arr.length-1; i>=0; i--) {
         temp[temp.length] = arr[i];
      }
      console.log(temp);
    ```
- 65.**冒泡排序**
    ```js
       //第1版
        var arr = [1, 2, 3, 5, 4];
        var temp
        //外层循环控制轮数
        for (var i = 0; i < arr.length - 1; i++) {
        //内层循环控制每一轮的比較次数
        for (var j = 0; j < arr.length - 1 - i; j++) {
        //每一次要做的事情，比較当前项和后项的大小
        if (arr[j] > arr[j + 1]) {
        //交换两个位置的值
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        }
        }
        }
        console.log(arr);
    ```
    ```js
      //第2版
        var arr = [1, 2, 3, 5, 4];
        var temp, flag;

        //外层循环控制轮数
        for (var i = 0; i < arr.length - 1; i++) {
        //不确定的是，哪一轮的比較是可以结束的（排好了）
            flag = true;
        //内层循环控制每一轮的比較次数
            for (var j = 0; j < arr.length - 1 - i; j++) {
                 //每一次要做的事情，比較当前项和后项的大小
                if (arr[j] > arr[j + 1]) {
                //交换两个位置的值
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

        //设置假设不成立的条件，如果if被进入，说明排序没有完成
            flag = false;//阻止跳出
            }
        }
        //根据flag，验证假设是否成立
        if (flag == true) {//==true可以省略，原因是flag本身就是bool值
            break;
        }
        }
        console.log(arr);
    ```
- 66.**window.location.search() 返回的是什么？**
    + 查询(参数)部分。除了给动态语言赋值以外，我们同样可以给静态页面,并使用javascript来获得相信应的参数值
    + 返回值：?ver=1.0&id=timlq 也就是问号后面的！

- 67.**window.location.hash 返回的是什么？**
    + 锚点,返回值：#love 

- 68.**javascript 中的垃圾回收机制？**
    + 在Javascript中，如果一个对象不再被引用，那么这个对象就会被GC回收。如果两个对象互相引用，而不再  被第3者所引用，那么这两个互相引用的对象也会被回收。因为函数a被b引用，b又被a外的c引用，这就是为什么  函数a执行后不会被回收的原因。 

- 69.**看代码写结果**
    ```js
      function changeObjectProperty(o) {
            o.siteUrl = "http://www.csser.com/";
            o = new Object();
            o.siteUrl = "http://www.popcg.com/";
        }
        var CSSer = new Object();
        changeObjectProperty(CSSer);
        console.log(CSSer.siteUrl); //http://www.csser.com/
    ```

==如果CSSer参数是按引用传递的，那么结果应该是"http://www.popcg.com/"，但实际结果却仍是"http://www.csser.com/"。事实是这样的：在函数内部修改了引用类型值的参数，该参数值的原始引用保持不变。我们可以把参数想象成局部变量，当参数被重写时，这个变量引用的就是一个局部变量，局部变量的生存期仅限于函数执行的过程中，函数执行完毕，局部变量即被销毁以释放内存。    
    （补充：内部环境可以通过作用域链访问所有的外部环境中的变量对象，但外部环境无法访问内部环境。每个环境都可以向上搜索作用域链，以查询变量和函数名，反之向下则不能)==

- 70.**代码题**
    ```js
        var a = 6; 
        setTimeout(function(){
            alert(a);
            var a = 66; 
        }, 1000);
        a = 666; 
        alert(a); 
        // 666, undefined;

    ```
==异步处理，一切声明提前==

- 71.**什么事同源策略**
    + 同协议、端口、域名的安全策略，由王景公司提出来的安全协议！

- 72.为什么不能定义1px左右的div容器？
    ```
      IE6下这个问题是因为默认的行高造成的，解决的方法也有很多，例如：
      overflow:hidden | zoom:0.08 | line-height:1px
    ```
- 72.**计算字符串字节数**
    ```js
      	new function(s){ 
            if(!arguments.length||!s) return null;  
            if(""==s) return 0;     
            var l=0;
            for(var i=0;i<s.length;i++){        
                if(s.charCodeAt(i)>255) l+=2; else l+=1;  //charCodeAt()得到的是unCode码   
            }     //汉字的unCode码大于 255bit 就是两个字节
            alert(l); 
        }("hello world!");

    ```
- 73.**请用代码实现 outerHTML**
    ```js
        Object.prototype.outerHTML = function () {
            var innerCon = this.innerHTML, //获得里面的内容
                outerCon = this.appendChild(innerCon); //添加到里面
            alert(outerCon);
        }
        function $(id) {
            return document.getElementById(id);
        }
        alert($('outer').innerHTML);
        alert($('outer').outerHTML);
    ```
- 74.**JS中简单继承 call 方法**
    ```js
       function Parent(name, money) {
            this.name = name;
            this.money = money;
            this.info = function () {
                alert('姓名： ' + this.name + ' 钱： ' + this.money);
            }
        }
        //定义孩子类
        function Children(name) {
            Parent.call(this, name); //继承 姓名属性，不要钱。  
            this.info = function () {
                alert('姓名： ' + this.name);
            }
        }
        //实例化类
        var per = new Parent('parent', 800000000000);
        var chi = new Children('child');
        per.info();
        chi.info();
    ```
- 75.**jquery 中的bind(),live(),delegate()的区别**
    + bind:绑定事件，对新添加的事件不起作用，方法用于将一个处理程序附加到每个匹配元素的事件上并返回jquery对象。
    + live:方法将一个事件处理程序附加到当前选择器匹配的所有元素（包含现有的或将来添加的）的指定事件上并返回jQuery对象。
    + delegate:方法基于一组特定的根元素将处理程序附加到匹配器的所有元素（现有的或将来的）的一个或多个事件上

- 76.**你如何优化自己的代码**
    + 代码重用
    + 避免全局变量（命名空间，封闭空间，模块化mvc）
    + 拆分函数避免函数过于臃肿
    + 注释代码

- 77.**怎么样实现两栏等高**
    ```html
        <div id="container" style="display: table;width: 100%;">
            <div id="left" style="background-color: red;display: table-cell;">
                内容<br/>
                内容<br/>
                内容<br/>
                内容<br/>
                内容<br/>
                内容<br/>
            </div>
        
            <div id="right" style="background-color: blue;display: table-cell">
                内容
            </div>
        </div>
    ```
- 78.**使用js实现这样的效果：在文本域里输入文字时，当按下enter键时不换行，而是替换成“{{enter}}”,(只需要考虑在行尾按下enter键的情况).**
    ```js
     function back(ele,event){
            event = event || window.event;
            if(event.keyCode==13){
                event.returnValue = false;
                ele.value+="{{enter}}"
                return false;
            }
        }
    ```
- 79.**specify(‘hello,)//=>’h,e,l,l,o,w,o,r,l,d’实现specify函数**
    ```js
        function specify(str) {
            var tempArray = Array.prototype.filter.call(str, function (value, index, array) {
                return value >= 'A' && value <= 'z' && value != "_";
            });
            return tempArray.join(",");
        }

        console.log(specify("hedd____df*(%$#a !!!))))))llo,Wo@@@r        ld"));
    ```
- 80.**简述readyonly与disabled的区别**
    + ReadOnly和Disabled的作用是使用户不能够更改表单域中的内容
    + Readonly只针对input(text/password)和textarea有效，而disabled对于所有的表单元素有效，包括select,radio,checkbox,button等
    + 在表单元素使用了disabled后，我们将表单以POST或者GET的方式提交的话，这个元素的值不会被传递出去，而readonly会将该值传递出去

- 81.**为什么扩展 javascript 内置对象不是好的做法**
    + 因为你不知道哪一天浏览器或javascript本身就会实现这个方法，而且和你扩展的实现有不一致的表现。到时候你的javascript代码可能已经在无数个页面中执行了数年，而浏览器的实现导致所有使用扩展原型的代码都崩溃了

- 82.**什么是三元表达式？“三元”表示什么意思？**
    + 三元如名字表示的三元运算符需要三个操作数。语法是 条件 ? 结果1 : 结果2;. 这里你把条件写在问号(?)的前面后面跟着用冒号(:)分隔的结果1和结果2。满足条件时结果1否则结果2

- 83.**浏览器标准模式和怪异模式之间的区别是什么？**
    + 所谓的标准模式是指，浏览器按W3C标准解析执行代码；怪异模式则是使用浏览器自己的方式解析执行代码，因为不同浏览器解析执行的方式不一样，所以我们称之为怪异模式

- 84.**如何判断一个js变量是数组类型**
    + ES5：Array.isArray();
    + [] instanceof Array;
    + 调用数组的 slice 方法: `Object.prototype.toString.call([]);`//[object Array]

- 85.**请列举 js 数组类型中常用的方法**
    + concat():连接两个或更多的数组，并返回结果
    + join(): 把数组的所有元素放入一个字符串，元素通过指定分隔符进行分隔
    + pop():删除并返回数组的最后一个元素
    + push():向数组的末尾添加一个或更多元素，并返回新的长度
    + reverse():颠倒数组中元素的顺序
    + shift():删除并返回数组的第一个元素
    + slice():从某个已有的数组返回选定的元素
    + sort():对数组的元素进行排序
    + splice():删除元素，并向数组添加新元素
    + toSource():返回该对象的源代码
    + toString():把数组转换为字符串，并返回结果
    + toLocaleString():把数组转换为本地数组，并返回结果
    + valueOf():返回对象的原始值

- 86.**下面这段代码想要循环输出结果01234，请问输出结果是否正确，如果不正确，请说明为什么，并修改循环内的代码使其输出正确结果**
    ```js
      for (var i = 0; i < 5; ++i) {
            setTimeout(function () {
                console.log(i);
            }, 100 * i);
        }
    ```
    ==会输出5个5，因为定时器解析到最后执行（js事件队列==
    ```js
      for (var i = 0; i < 5; ++i) {
            setTimeout((function (i) {
                console.log(i);
            })(i), 100 * i);
        }
    ```
    ==利用局部作用域可以解决这样的问题==

- 87.**变量的命名规范以及命名推荐**
    + 变量，函数，方法：小写开头，以后的每个单词首字母大写（驼峰）
    + 构造函数，class：每个单词大写开头
    + 基于实际情况，以动词，名词，谓词来命名。尽量言简意骇，以命名代替注释

- 88.**只允许使用 + - * / 和 Math.* ，求一个函数 y = f(x, a, b);当x > 100 时返回 a 的值，否则返回 b 的值，不能使用 if else 等条件语句，也不能使用|,?:,数组。**
    ```js
        // Math的 max 和min 方法 可以差文档，temp 返回的值要么是1 要么是0
       function f(x, a, b) {
            var temp = Math.ceil(Math.min(Math.max(x - 100, 0), 1));
            alert(temp);
            return a * temp + b * (1 - temp);
        }
        console.log(f(105, 101, 2));
    ```
- 89.**JavaScriptalert(0.4*0.2);结果是多少？和你预期的一样吗？如果不一样该如何处理？**
    + 有误差，应该比准确结果偏大。现将小数转换成整数进行处理

- 90.**主流浏览器内核**
    + IE trident、火狐gecko、谷歌苹果 webkit、Opera-》presto

- 91. **列出3条以上ff和IE的脚本兼容问题**
    + window.event:表示当前的事件对象，IE有这个对象，FF没有，FF通过给事件处理函数传递事件对象
    + 获取事件源：IE 用 srcElement 获取事件源，而FF 用target获取事件源
    + 添加，去除事件：IE->element.attachEvent('onclick',function),element.detachEvent('onclick',function)
    + FF:element.addEventListener('click',function,true); element.removeEventlistener('click',funciton,true);
    4. 获取标签的自定义属性：IE->div1.value 或 div1['value'],FF：div1.getAttribute('value')

- 92. **用正则表达式，写出由字母开头，其余由数字、字母、下划线组成的6~30的字符串？**
    + `^[a-zA-Z]{1}[\w]{5,29}$`

- 93.**在Javascript中什么是伪数组？如何将伪数组转化为标准数组？**
    + 伪数组（类数组）：无法直接调用数组方法或期望length属性有什么特殊的行为，但仍可以对真正数组遍历方法来遍历它们。典型的是函数的argument参数，还有像调用getElementsByTagName,document.childNodes之类的,它们都返回NodeList对象都属于伪数组。可以使用Array.prototype.slice.call(fakeArray)将数组转化为真正的Array对象

- 94.**删除与某个字符相邻且相同的字符,比如"fdaffdaaklfjklja"==>"fdafdaklfjklja"**
    ```js
      var str = "fdafffdaaklfjklja";
        var arr = [];
        for (var i = 0; i < str.length; i++) {
            arr[i] = str[i]; //考虑到字符串的不可操作性,没有也能实现
        };
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === arr[i + 1]) {
                arr.splice(i, 1);
                i--;
            }
        };
        str = arr.join("");
        console.log(str);
    ```
- 95.**请写出三种以上的Firefox有但InternetExplorer没有的属性和函数**
    + 在IE下可通过document.frames["id"];得到该IFRAME对象，而在火狐下则是通过document.getElementById("content_panel_if").contentWindow;
    + IE的写法： _tbody=_table.childNodes[0],在FF中，firefox会在子节点中包含空白则第一个子节点为空白""， 而ie不会返回空白 可以通过if("" != node.nodeName)过滤掉空白子对象
    + 模拟点击事件,if(document.all){ //ie下document.getElementById("a3").click();}

- 96.**将字符串”<tr><td>{$id}</td><td>{$name}</td></tr>”中的{$id}替换成10，{$name}替换成Tony （使用正则表达式**
    ```js
       '<tr><td>{$id}</td><td>{$id}_{$name}</td></tr>'
        .replace(/{\$id}/g, '10')
        .replace(/{\$name}/g, 'Tony')
    ```
- 97.**数据类型**
    ```js
        typeof 1;		"number"
        typeof "hello";		"string"
        typeof /[0-9]/;		"object"
        typeof {};		"object"
        typeof null;		"object"
        typeof undefined;	"undefined"
        typeof [1,2,3];		"object"
        typeof function(){};	//"function"
    ```
- 98.**数据类型转换**
    ```js
        parseInt(3.14);			//3
        parseFloat("3asdf");		//3
        parseInt("1.23abc456");
        parseInt(true);//"true" NaN
    ```
- 99.**Ajax的最大的特点是什么**
    + Ajax可以实现异步通信效果，实现页面局部刷新，带来更好的用户体验；按需获取数据，节约带宽资源

- 100.**ajax的缺点**
    + ajax不支持浏览器back按钮
    + 安全问题 AJAX暴露了与服务器交互的细节
    + 对搜索引擎的支持比较弱
    + 破坏了程序的异常机制

- 101.**Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型，这个函数是**
    + HasOwnProperty

- 102.**对 JSON 的了解**
    + 轻量级数据交互格式，可以形成复杂的嵌套格式，解析非常方便

- 103.**js 延迟加载的方式有哪些**
    + <script>标签的async="async"属性
    + <script>标签的defer="defer"属性
    + 动态创建<script>标签
    + AJAX eval（使用AJAX得到脚本内容，然后通过eval_r(xmlhttp.responseText)来运行脚本）
    + iframe方式
    
- 104.**JSON 的了解**
    + JSON(javascript Object Notation) 是一种轻量级的数据交换格式。它基于 javascript 的一个子集。数据格式简单，易于读写，占用带宽小{'age':'12','name':'back'}
