# 1.JavaScript规定了几种语言类型

JavaScript中的每一个值都有它自己的类型，JavaScript规定了七种语言类型，他们是：
- Undefined
- Null
- Boolean
- String
- Number
- Symbol
- Object

我们来谈谈这些类型的一部分关键知识点

### Undefined和Null

思考这个问题：为什么有的编程规范要求用 void 0 代替 undefined？

##### undefined

- undefined类型表示未定义，它的值只有一个：undefined
- 任何变量赋值前都是undefined类型，值为undefined（而不是null）
- undefined是一个变量，而非一个关键字
- 需要表达这个值，可以用全局变量undefined，或者void运算

我们针对第三点来展开讨论，得出上述问题的答案。
undefined是一个变量，我们避免无意中被篡改，建议使用void 0来获取undefined（等价于void (0) ）。我们一般不会把变量赋值为undefined，这样可以保证所有的值为undefined的变量，都是从未赋值的自然状态

##### Null

- 只有一个值，就是null
- 表示空值，是关键字，可以放心使用null关键字来获取null值。

##### String

- string的意义并非“字符串”，而是字符串的UTF16编码，字符串的最大长度实际上是受字符串编码长度影响的。最大长度：253 - 1 。
- 字符串是永远无法变更的，一旦字符串被构造出来，无法用任何方式改变字符串的内容。
- 字符串把每个UTF16单元当做一个字符来处理，所以处理非BMP（超出 U+0000 - U+FFFF 范围）的字符时，应该格外小心。这个设计继承自Java，现实中很少用到BMP之外的字符

##### Number

思考下面问题：为什么在 JavaScript 中，0.1+0.2 不等于0.3

- number类型有264- 253+3 个值。
- 基本符合 IEEE 754-2008 规定的双精度浮点数规则，但也有额外几个表达的语言场景（比如不让除以0出错，引入了无穷大）。
   - NaN，占用了 9007199254740990，这原本是符合 IEEE 规则的数字
   - Infinity，无穷大
   - -Infinity，负无穷大
   
有+0和-0，加法运算中没有区别，但是除法要区分，“忘记检测除以 -0，而得到负无穷大”的情况经常会导致错误，而区分 +0 和 -0 的方式，正是检测 1/x 是 Infinity还是-Infinity
根据双精度浮点数定义，有效的整数范围是 -0x1fffffffffffff 至 0x1fffffffffffff，无法精确表示此范围外的整数。
根据双精度浮点数定义，非整数的Number类型无法用==来比较（三个等号也不行），正确的比较方法是用JavaScript提供的最小精度值：

```js

console.log( 0.1 + 0.2 == 0.3);//false
//正确的比较方法
console.log( Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON);//true

```

##### Symbol

- 表示独一无二的值，它是一切非字符串的对象key的集合。
- Symbol 值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，但是即使描述相同，Symbol值也不相等。
