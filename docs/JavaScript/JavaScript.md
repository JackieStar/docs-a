# JavaScript书写规范

## 基本书写

### 使用四个空格进行缩进

```js

function forever (name) {
  console.log('hi', name)   // ✗ 错误
    console.log('hello', name)   // ✓ 正确
}

```

### 除了缩进，不要使用多个空格

```js

const id =    1234    // ✗ 错误
const id = 1234       // ✓ 正确

```

### 不要在句末使用分号

```js

const a = 'a'   // ✓ 正确
const a = 'a';  // ✗ 错误

```

### 字符串统一使用单引号

```js

console.log('hello there')
// 如果遇到需要转义的情况，请按如下三种写法书写
const x = 'hello "world"'
const y = 'hello \'world\''
const z = `hello 'world'`

```

### 代码块中避免多余留白

```js

if(user) {
                            // ✗ 错误
  const name = getName()
 
}

if (user) {
  const name = getName()    // ✓ 正确
}

```

### 关键字后面加空格

```js

if (condition) { ... }   // ✓ 正确
if(condition) { ... }    // ✗ 错误

```

### 函数声明时括号与函数名间加空格

```js

function name (arg) { ... }   // ✓ 正确
function name(arg) { ... }    // ✗ 错误

run(function () { ... })      // ✓ 正确
run(function() { ... })       // ✗ 错误

```

### 展开运算符与它的表达式间不要留空白

```js

fn(... args)    // ✗ 错误
fn(...args)     // ✓ 正确

```

### 遇到分号时空格要后留前不留

```js

for (let i = 0 ;i < items.length ;i++) {...}    // ✗ 错误
for (let i = 0; i < items.length; i++) {...}    // ✓ 正确

```

### 圆括号间不留空格

```js

getName( name )     // ✗ 错误
getName(name)       // ✓ 正确

```

### 属性前面不要加空格

```js

user .name      // ✗ 错误
user.name       // ✓ 正确

```

### 一元运算符前面跟一个空格

```js

typeof!admin        // ✗ 错误
typeof !admin        // ✓ 正确

```

### 注释首尾留空格

```js

//comment           // ✗ 错误
// comment          // ✓ 正确

/*comment*/         // ✗ 错误
/* comment */       // ✓ 正确

```

### 模板字符串中变量前后不加空格

```js

const message = `Hello, ${ name }`    // ✗ 错误
const message = `Hello, ${name}`      // ✓ 正确

```

### 逗号后面加空格

```js

// ✓ 正确
const list = [1, 2, 3, 4]
function greet (name, options) { ... }

// ✗ 错误
const list = [1,2,3,4]
function greet (name,options) { ... }

```

### 不允许有连续多行空行

```js

// ✓ 正确
const value = 'hello world'
console.log(value)

// ✗ 错误
const value = 'hello world'



console.log(value)

```

### 单行代码块两边加空格

```js

function foo () {return true}    // ✗ 错误
function foo () { return true }  // ✓ 正确
if (condition) { return true }  // ✓ 正确

```

### 始终将逗号置于行末

```js

const obj = {
  foo: 'foo'
  ,bar: 'bar'   // ✗ 错误
}

const obj = {
  foo: 'foo',
  bar: 'bar'   // ✓ 正确
}

```

### 点号操作符须与属性需在同一行

```js

console.log('hello')  // ✓ 正确

console.
  log('hello')  // ✗ 错误

console
  .log('hello') // ✓ 正确

```

### 函数调用时标识符与括号间不留间隔

```js

console.log ('hello') // ✗ 错误
console.log('hello')  // ✓ 正确

```

### 键值对当中冒号与值之间要留空白

```js

const obj = { 'key' : 'value' }    // ✗ 错误
const obj = { 'key' :'value' }     // ✗ 错误
const obj = { 'key':'value' }      // ✗ 错误
const obj = { 'key': 'value' }     // ✓ 正确

```

## 变量定义

### 使用 const/let 定义变量

```js

const a = 'a'
a = 'b'   // ✗ 错误，请使用 let 定义

let test = 'test'

var noVar = 'hello, world'   // ✗ 错误，请使用 const/let 定义变量

```

### 每个 const/let 关键字单独声明一个变量

```js

// ✓ 正确
const silent = true
let verbose = true

// ✗ 错误
const silent = true, verbose = true

// ✗ 错误
let silent = true,
    verbose = true

```

### 不要重复声明变量

```js

let name = 'John'
let name = 'Jane'     // ✗ 错误

let name = 'John'
name = 'Jane'         // ✓ 正确

```

### 不要使用 undefined 来初始化变量

```js

let name = undefined    // ✗ 错误

let name
name = 'value'          // ✓ 正确

```

### 对于变量和函数名统一使用驼峰命名法

```js

function my_function () { }    // ✗ 错误
function myFunction () { }     // ✓ 正确

const my_var = 'hello'           // ✗ 错误
const myVar = 'hello'            // ✓ 正确

```

### 不要定义未使用的变量

```js

function myFunction () {
  const result = something()   // ✗ 错误
}

```

### 字符串拼接操作符 (Infix operators) 之间要留空格

```js

// ✓ 正确
const x = 2
const message = 'hello, ' + name + '!'

// ✗ 错误
const x=2
const message = 'hello, '+name+'!'

```

### 检查 NaN 的正确姿势是使用 isNaN()

```js

if (price === NaN) { }      // ✗ 错误
if (isNaN(price)) { }       // ✓ 正确

```

### 用合法的字符串跟 typeof 进行比较操作

```js

typeof name === undefined       // ✗ 错误
typeof name === 'undefined'     // ✓ 正确

```

## 对象与数组

### 对象中定义了存值器，一定要对应的定义取值器

```js

const person = {
  set name (value) {    // ✗ 错误
    this._name = value
  }
}

const person = {
  set name (value) {
    this._name = value
  },
  get name () {         // ✓ 正确
    return this._name
  }
}

```

### 使用数组字面量而不是构造器

```js

const nums = new Array(1, 2, 3)   // ✗ 错误
const nums = [1, 2, 3]            // ✓ 正确

```

### 对象字面量中不要定义重复的属性

```js

const user = {
  name: 'Jane Doe',
  name: 'John Doe'    // ✗ 错误
}

```

### 外部变量不要与对象属性重名

```js

let score = 100
function game () {
  score: while (true) {      // ✗ 错误
    score -= 10
    if (score > 0) continue score
    break
  }
}

```

### 对象属性换行时注意统一代码风格

```js

const user = {
  name: 'Jane Doe', age: 30,
  username: 'jdoe86'            // ✗ 错误
}

const user = { name: 'Jane Doe', age: 30, username: 'jdoe86' }    // ✓ 正确

const user = {
  name: 'Jane Doe',
  age: 30,
  username: 'jdoe86'
}

```

## 类定义

### 类名要以大写字母开头

```js

class animal {}
const dog = new animal()    // ✗ 错误

class Animal {}
const dog = new Animal()    // ✓ 正确

```

### 避免对类名重新赋值

```js

class Dog {}
Dog = 'Fido'    // ✗ 错误

```

### 子类的构造器中一定要调用 super

```js

class Dog {
  constructor () {
    super()   // ✗ 错误
  }
}

class Dog extends Mammal {
  constructor () {
    super()   // ✓ 正确
  }
}

```

### 无参的构造函数调用时要带上括号

```js

function Animal () {}
const dog = new Animal    // ✗ 错误
const dog = new Animal()  // ✓ 正确

```

## 模块

### 同一模块有多个导入时一次性写完

```js

import { myFunc1 } from 'module'
import { myFunc2 } from 'module'          // ✗ 错误

import { myFunc1, myFunc2 } from 'module' // ✓ 正确

```

### import, export 和解构操作中，禁止赋值到同名变量

```js

import { config as config } from './config'     // ✗ 错误
import { config } from './config'               // ✓ 正确

```

## 语句

### 避免在 return 语句中出现赋值语句

```js

function sum (a, b) {
  return result = a + b     // ✗ 错误
}

```

### 不要随意更改关键字的值

```js

let undefined = 'value'     // ✗ 错误

```

### return，throw，continue 和 break 后不要再跟代码

```js

function doSomething () {
  return true
  console.log('never called')     // ✗ 错误
}

```

## 逻辑与循环

### 始终使用 === 替代 ==

```js

if (name === 'John')   // ✓ 正确
if (name == 'John')    // ✗ 错误
    
if (name !== 'John')   // ✓ 正确
if (name != 'John')    // ✗ 错误

```

### if/else 关键字要与花括号保持在同一行

```js

// ✓ 正确
if (condition) {
  // ...
} else {
  // ...
}

// ✗ 错误
if (condition)
{
  // ...
}
else
{
  // ...
}

```

### 多行 if 语句的的括号不能省略

```js

// ✓ 正确
if (options.quiet !== true) console.log('done')

// ✓ 正确
if (options.quiet !== true) {
  console.log('done')
}

// ✗ 错误
if (options.quiet !== true)
  console.log('done')

```

### 对于三元运算符 ? 和 : 与他们所负责的代码处于同一行

```js

// ✓ 正确
const location = env.development ? 'localhost' : 'www.api.com'

// ✓ 正确
const location = env.development
  ? 'localhost'
  : 'www.api.com'

// ✗ 错误
const location = env.development ?
  'localhost' :
  'www.api.com'

```

### 如果有更好的实现，尽量不要使用三元表达式

```js

let score = val ? val : 0     // ✗ 错误
let score = val || 0          // ✓ 正确

```

### switch 语句中不要定义重复的 case 分支

```js

switch (id) {
  case 1:
    // ...
  case 1:     // ✗ 错误
}

```


### sswitch 一定要使用 break 来将条件分支正常中断

```js

switch (filter) {
  case 1:
    doSomething()    // ✗ 错误
  case 2:
    doSomethingElse()
}

switch (filter) {
  case 1:
    doSomething()
    break           // ✓ 正确
  case 2:
    doSomethingElse()
}

switch (filter) {
  case 1:
    doSomething()
    // fallthrough  // ✓ 正确
  case 2:
    doSomethingElse()
}

```

