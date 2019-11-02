# typescript 笔记

## 目录

## hello word

## 基础类型

## 变量声明 

## 类

js 通过构造函数实现类，原型链实现继承，es6 迎来了 **class**

### 类的概念

- 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口- - 来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 - Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

### 访问修饰符

- public
  + 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
```js
    class Animal {
      public name;
      public constructor (name) {
        this.name = name
      }
    }
    let a = new Animal('Tom')
    console.log(a.name)// Tom
```

- private
  + 修饰的属性或方法是私有的，不能在声明它的类的外部访问
```
    class Animal {
      private name;
      public constructor (name) {
        this.name = name
      }
    }
    
    class Dog extends Animal {
      constructor(name) {
        super(name)
        console.log(this.name)//无法访问子类私有属性
      }
    }
```
- protected
    + 饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
    
```
    class Animal {
      protected name;
      public constructor (name) {
        this.name = name
      }
    }
    
    class Dog extends Animal {
      constructor(name) {
        super(name)
        console.log(this.name)//允许访问 protected
      }
    }
```

- readonly
  +  只读属性必须在声明时或构造函数里被初始化
    
- 存取器
  + 使用 getter 和 setter 可以改变属性的赋值和读取行为

```
    class Animal {
        constructor(name) {
            this.name = name;
        }
        get name() {
            return 'Jack';
        }
        set name(value) {
            console.log('setter: ' + value);
        }
    }
    
    let a = new Animal('Kitty'); // setter: Kitty
    a.name = 'Tom'; // setter: Tom
    console.log(a.name); // Jack
```

### 抽象类

abstract 用于定义抽象类和其中的抽象方法

- 什么是抽象类
    + 抽象类是不允许被实例化的 （不能使用new）
    + 抽象类中抽象方法必须由子类实现

```
    abstract class Animal {
      protected name;
      public constructor (name) {
        this.name = name
      }
      public abstract sayHi()
    }
    
    class Dog extends Animal {
      constructor(name) {
        super(name)
        console.log(this.name)
      }
      sayHi () {
        console.log('hi I a Tom')
      }
    }

``` 

## 接口

ts 用接口定义对象的类型

### 什么是接口

- 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）

接口以大写**I**开头

### 例子

```
    // 定义接口
    interface IPersion {
        name: string,
        age: number
    }
    // 实现
    let lucy: Person = {
      name: ' Lucy',
      age: 24
    }
```

做为函数的参数

```
   interface IPersion {
     name: string
    }

    function test(p: IPersion) {
      console.log(p.name);
    }
    test({name: '张三'})
```

这里需要注意：**不能像在C#或者Java等语言中，称给函数test传递的参数实现了接口IPersion，这里只关心参数的结构**

### 属性

- 可选属性
    + 符号：**?**
    + 对可能存在的属性进行预定义
    + 捕获引用不存在的属性时报错
```
  interface IPersion {
        name: string,
        age?: number
    }
```
- 任意属性
    + 有时候我们希望一个接口允许有任意的属性
```
    interface IPerson {
      name: string
      age: string
      [propName: string]: any
    }
```
使用 [propName: string] 定义了任意属性取 string 类型的值

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

```
interface IPerson {
  name: string
  // 报错：number 不是string类型的子集
  age: number 
  [propName: string]: string
}

```

- 只读属性
    + **readonly**
    + 只在该对象进行初始化的时候赋值，其他情况赋值会报错
```
   interface IPerson {
      readonly id: number
      name: string
      age: number
    }
    // 赋值
    let louis:IPerson = {
      id: 1,
      name: 'Louis',
      age: 34
    }
```
- readonly vs const
    + 变量用 const 属性用 readonly

### 接口类型函数

接口能够描述JavaScript中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型

- 例子

```
    interface SearchFunc {
      (source: string, subString: string): boolean;
    }
    
    let mySearch: SearchFunc;
    mySearch = function(src: string, sub: string): boolean {
      let result = src.search(sub);
      return result > -1;
    }
```

### 实现接口

使用**implements** 关键字，可以继承多个接口使用**,**号

列:

```
interface IAnimal {
  name: string
  age: number,
  type?: string,
  sayHi(name: string):void
}

class Cat implements IAnimal {
  name = 'tom'
  age = 2
  sayHi = function (name: string) {
    this.name = name
  }
  // 私有
  run = function () {
    console.log(`${this.name}在跑`)
  }
 }
```

接口描述了类的公共部分，不会帮你检查私有成员

### 继承接口

和类一样，接口也可以实现相互继承,使用**extends**关键字即可实现

```js
    interface IAnimal {
      name: string
      age: number,
      type?: string,
      sayHi(name: string):void
    }
    
    interface ICat extends IAnimal {
      run():void
    }
    // 可以一次性继承多个接口，接口之间用逗号分隔。
    interface IDog extends ICat,IAnimal {
      bark():void
    }

```
通过继承，可以将一个接口成员复制到另一个接口，在大型项目中，可以灵活的分隔接口，也可以重组

### 混合类型接口

接口可以描述函数、对象的方法或者对象的属性，有时希望一个对象同时具有上面提到多种类型，比如一个对象可以当做函数使用，同时又具有属性和方法- 混合接口

```
    interface Counter {
      (start: number): string;
      interval: number;
      reset(): void;
    }
```
声明一个接口，如果只有(start: number):string一个成员，那么这个接口就是函数接口，同时还具有其他两个成员，可以用来描述对象的属性和方法，这样就构成了一个混合接口

```
    // 创建函数，返回值是Counter类型
    function getCounter(): Counter {
      let counter = <Counter>function (start: number) { };
      counter.interval = 123;
      counter.reset = function () { };
      return counter;
    }
     
    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;

```

 通过类型断言，将函数对象转换为Counter类型，转换后的对象不但实现了函数接口的描述，使之成为一个函数，还具有interval属性和reset()方法

### 接口继承类

当接口继承一个类类型时，接口同样会继承到类的private和protected成员，这个接口只能被这个类或子类实现，（有时候很有用，代码只在子类拥有特定属性时起作用）

```
    class Control {
        private state: any;
    }
    
    interface SelectableControl extends Control {
        select(): void;
    }
    
    class Button extends Control implements SelectableControl {
        select() { }
    }
    
    class TextBox extends Control {
        select() { }
    }
    
    // Error: Property 'state' is missing in type 'Image'.
    class Image implements SelectableControl {
        select() { }
    }

```

上面的例子，**SelectableControl** 包含了 **Control** 的所有成员，包括私有**state**,所以只有 **Control**的子类才能实现他


## 对象

### 对象和函数

- 对象是包含一些属性和方法（方法(Function)数组（Array）对象（Object）都是对象）-》 万物皆对象
- 函数是用来实现具体功能的代码，用一种方式将代码组织起来

### ts 对象

对象是包含一组键值对的实例。 值可以是标量、函数、数组、对象等，如下实例

```
    let object_name = { 
        key1: "value1", // 标量
        key2: "value",  
        key3: function() {
            // 函数
        }, 
        key4:["content1", "content2"] //集合
    }
```

对象实例

```
    var sites = { 
       site1:"Runoob", 
       site2:"Google" 
    }; 
    // 访问对象的值
    console.log(sites.site1) 
    console.log(sites.site2)
```

### 类型模板

- 在对象中添加方法，ts是不允许的，对象必须是特定类型的实例，所以提前写好方法，并且赋值默认值，可进行修改

```
    let person = {
      name: 'Louis',
      age: 34,
      sayHi: function () {}
    }
     person.sayHi = function () {
      
    }
```

### 内置对象

他们的定义文件，则在 TypeScript 核心库的定义文件中

- Boolean、Error、Date、RegExp
- DOM 和 BOM 的内置对象
    + Document、HTMLElement、Event、NodeList

## 命名空间

之前叫**内部模块**，现改为**命名空间**

使用 **namespace**关键字

```
    namespace species {
      export interface Animal {
        run(name:string):string
      }
    }
    let cat: species.Animal
    let str = cat.run('小猫在跑')
```

### 作用

- 防止命名冲突
    + 将对象包裹到一个命名空间内，防止命名冲突
-当应用变得越来越大时，我们需要将代码分离到不同的文件中以便于维护

### 分离到多个文件

- 使用**<reference>**标签来表示引用关系
    + 在 reference 标签中可以标记依赖文件的相对路径
    + ```/// <reference path="XXX.ts" />```
    + 使用--outFile标记：```tsc --outFile sample.js Test.ts xx.ts ...```
- 分别编译每个文件，然后把生成的js 文件正确的在页面上引用

### 命名空间的使用

在名为utils.js 的文件下声明一个命名空间

```
// utils.ts
namespace Utils {
    export interface IPerson {
        name: string;
        age: number;
    }
}

```
通过 *reference**注释引用命名空间 

```
    /// <reference path="utils.ts" />
    const me: Utils.IPerson = {
        name: 'funlee',
        age: 18
    }
    console.log(me); // {name: 'funlee', age: 18}
```

也可以用**import**

```
    import './utils'
    
    const me: Utils.IPerson = {
        name: 'funlee',
        age: 18
    }
    console.log(me); // {name: 'funlee', age: 18}
```

### 别名

- 给常用对象取别名，简化命名空间操作

```
    namespace species {
      export interface Animal {
        run(name:string):string
      }
    }
    import animal = species.Animal
    let cat: animal
    let str = cat.run('小猫在跑')
```

### 外部命名空间

类型定义文件的以 **.d.ts** 结尾，里面主要用来定义类型

- 如何在项目引用
    + npm isntall 已经有的*d.ts文件（npm install --save @types/package），查询现有的types 包含的js包 
    + 使用工具生成 [地址](https://github.com/Microsoft/dts-gen)
- 声明文件的结构应该与代码文件结构保持一致

## 泛型

## 枚举

## 类型推论

## 模块

## 命名空间和模块

## 使用事项

## 装饰器