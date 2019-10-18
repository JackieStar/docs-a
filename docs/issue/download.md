### 下载

#### vue.js - 前端用get请求做一个导出下载功能,如何添加请求头添加token?

```js
let blob = new Blob([返回参数]，{
    type: 'application/vnd.ms-excel'
})
let objUrl = URL.createObjectURL(blob)
var a = document.createElement('a')
a.href = objUrl
a.download = '下载的文件名' // 改变文件名
a.click()
```
