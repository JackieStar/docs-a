# 数组Array

## Array.from && newSet() （去重）

```js
// es5
let a = [1,2,2,3,3,4,5];
let b = [a[0]];
for(let i = 0; i < a.length; i++){
    let flag = false;
    for(let j = 0; j < b.length; j++){
        if( a[i] === b[j] ){
            flag = true;
            break;
        }
    }
    if( !flag ){
        b.push(a[i])
    }
}
console.log(b) // [1,2,3,4,5]

// es6

let a = [1,2,2,3,3,4,5];
let b = Array.from(new Set(a))
console.log(b) // [1,2,3,4,5]

```

## Array.filter(callback) （数组过滤）

```js

let a = [
    {
        name: 'kele',
        title: '可口可乐'
    },
    {
        name: 'kele',
        title: '芬达'
    },
    {
        name: 'wlg',
        title: '王老吉'
    }
]

// es5
let b = [];

for(let i = 0; i < a.length; i++){
    if( a[i].name === 'kele' ){
        b.push(a[i])
    }
}

// es6

let b = a.filter(item => item.name === 'kele');

console.log(b) //[{name: 'kele', title: '可口可乐'},{name: 'kele', title: '芬达'}]

```

## Array.every(callback)

这个方法主要是判断数组中所有的元素都符合条件时，返回true

```js

let a = [1,2,3,4,5];
let b = a.every(item => item > 2);
console.log(b) // false

```

## Array.some(callback)

这个方法和上一个略有区别，这个方法主要判断数组中有一个元素符合条件，就返回true

```js

let a = [1,2,3,4,5];
let b = a.some(item => item > 2);
console.log(b) // true

```

## Array.find(callback)

这个方法是返回数组中符合条件的第一个元素，否则就返回undefined

```js

let a = [1,2,3,4,5];
let b = a.find(item => item > 2);
console.log(b) // 3

```

## Array.findIndex(callback)

这个方法是返回数组中符合条件的第一个元素的索引值，否则就返回-1

```js

let a = [1,2,3,4,5];
let b = a.findIndex(item => item > 2);
console.log(b) // 2  符合条件的为元素3 它的索引为2

```

## Array.includes(item, finIndex)

这个方法是判断数组中是否包含有指定的值，包含就返回true，否则就是false，它接受两个参数，第一个为搜索的值（必填），第二个为搜索开始的位置（选填，默认从0开始）

```js

let a = [1,2,3,4,5];
let b = a.includes(2);
console.log(b) // true

```

## Array.map(callback)

这个方法是返回一个根据你callback函数中的条件，返回一个全新的数组

```js

let a = [1,2,3,4,5];
let b = a.map(item => item * 2);
console.log(b) // [2,4,6,8,10]

```

## Array.reduce(callback)

这个方法是根据callback中的条件对数组中的每个元素都进行类加的操作，返回一个全新的值，下面做两个不同的例子，便于理解

```js

/** 第一种 **/
let a = [1,2,3];
let b = a.reduce((i, j) => {
  return i + j;
}, 0);
console.log(b) // b
/** 第二种 **/
let a = [1,2,3];
let b = a.reduce((i,j) => {
	i.push(j)
	return i
},[0])
console.log(b) // [0,1,2,3]

```

## ...扩展运算符

这个可以很方便的帮我们实现合并两个数组

```JS

let a = [1,2,3];
let b = [4,5,6];
let c = [...a,...b];
console.log(c) // [1,2,3,4,5,6];

```

