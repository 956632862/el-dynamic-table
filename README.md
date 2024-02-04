# el-dynamic-table

## 二次封装的elTable组件

使用组件前记得先安装elementUi 环境在下面。由于elementUi官方使用的vue的版本跟vue最新版本不一样，
所以组件内部不再集成elementUi跟vue了，统一使用项目本身的依赖包，方便解决由于版本不同产生的问题。

版本更新记录放到最下方，如果有问题请先更新到最新版本

### 依赖环境

+ vue 2.7.15
+ elementUi 2.15.14

### 使用说明

`大部分的参数都跟elementUi官方文档一致，如果是自定义或者是重写了的参数或者是功能点，全部都在下面说明`

参数分成了两种，一种是可全局配置的参数，一种是局部配置的参数。

局部传入的参数会覆盖全局配置的参数，最下面会将`可全局配置的参数` 单独列出来。

组件自定义都没有使用函数式组件，全部使用的插槽。

### DynamicTable 参数

| 参数名             | 默认值 | 值类型                 | 描述                                                         |
| ------------------ | ------ | ---------------------- | ------------------------------------------------------------ |
| columns            | []     | Array                  | 表单列，具体参数下面写明                                     |
| selection          | false  | Boolean                | 是否打开最前面的选择框                                       |
| selection-multiple | Null   | Number                 | 最多可以选择几条，默认不限制                                 |
| selectable         | Null   | Function（row, index） | 设置禁用行的checkbox，跟官方用法一致                         |
| reserveSelection   | true   | Boolean                | 是否缓存选中的数据                                           |
| expand             | False  | Boolean                | 是否设置展开行                                               |
| indexMethod        | Null   | Function（index）      | 传入即开启index列，参数为 index 0开始的下标，返回值会作为当前行的序列号 |
| operates           | {}     | Object                 | 按钮组的配置，下面会有详细说明                               |
| cellMergeRule      | []     | Array                  | 单元格合并的规则，传入`columns`中表格项的`prop` 参数即可     |
| isPagination       | true   | Boolean                | 是否显示分页                                                 |
| pagination         | {}     | Object                 | 分页的配置，详细的在下方说明                                 |

#### pagination

分页配置项，监听参数在下面

```js
pagination:{
	// 参数跟elementUi官方的一致  
  // v1.1.7 版本新增
  pageField:'current-page',	// 页码变化填充的字段
  pageSizeField:'page-size' // 分页大小变化填充的字段
}
```



#### columns

表格列，`支持官方的参数，如果有特别的将在下面的代码中写明` ，**不支持事件监听** 

##### 序号列配置

```js
columns:[
  // 序号
  {
    label:'表头名',
    type:'index',
  }
]
```

##### 列配置

`row:行数据，column：列数据,vm：组件内部的$parent，一般可以指向到当前的vue实例，但不一定准确`

```js
columns:[
  
  // 表示一列
  {
    ...官方参数,
    // 多层次嵌套表头
    deep_headers:[] //参数跟columns参数相同
    formatter:({row,column,vm}) => {}
  }
  
]
```

#### operates

+ `button` : 按钮的选项，跟elementUi官方一致，注意这里没有监听事件

  ```js
  button:{
    ...官方参数
    disabled:({row:行数据,column:当前列,vm:dynamicTable的$parent选项,button:当前的按钮选项}) => {
     	// 返回 Boolean值
      return false || true
    } 
  }
  ```

  

+ `buttons` :按钮的渲染参数，具体为

  ```js
  // row:行数据,column:当前列 button:当前按钮的data vm:dynamicTable的$parent选项
  buttons:[
    {
      directives:[],  // 指令数组，会绑定到按钮上
  		text:String | Function({row,column,button}),
      
      // v1.1.5 之后生效
      disabled:({row:行数据,column:当前列,vm:dynamicTable的$parent选项,button:当前的按钮选项}) => {
     		// 必须返回 Boolean值
        return false || true
      } 
      
      onClick:Function({row,column,vm}) 
  	}
  ]
  ```

+ `isSlot` : 是否使用插槽，开启了之后需要自己使用插槽写按钮组

+ `component` : 使用自定义组件，优先级比slot低，这个里面使用的是 `动态组件 <component :is=xxx/>` ，使用说明自行查看`Vue官方文档` 

### DynamicTable 监听事件

| 事件名            | 参数                | 描述                                               |
| ----------------- | ------------------- | -------------------------------------------------- |
| onSelectionChange | Function(selection) | 监听表格多选事件，selection 为当前被选中的表格数据 |
| onCurrentChange   | Function(index)     | 监听分页页码改变，index为当前页码                  |
| onSizeChange      | Function(size)      | 监听分页大小改变，size为每页条数                   |

### DynamicTable 支持自定义的内容

全部都是使用的插槽的形式！！！！！

| 插槽名         | 参数                           | 描述                                                         |
| -------------- | ------------------------------ | ------------------------------------------------------------ |
| header_{prop}  | {column:当前列}                | 自定义表头内容，{prop}为columns选项中的prop属性              |
| column_{props} | {row:当前行数据,column:当前列} | 自定义列内容，{prop}为columns选项中的prop属性                |
| operates       | {row:当前行数据,column:当前列} | 此插槽需要operates.isSlot为true，自定义操作列内容，{prop}为columns选项中的prop属性 |

### 获取组件内部的el-table的实例

组件在内部把`el-table`的ref存到了`tableRef`这个变量了。所以在最外层组件需要获取到这个变量，使用`this.$refs.dynamicTable.tableRef`即可。

```vue
<el-dynamic-table  ref='dynamicTable'/>


<script>
  test(){
    // 获取到组件内部的el-table实例
		this.$refs.dynamicTable.tableRef
  }

</script>

```



### 可全局配置的参数

下一个大版本更新再出！！！

### 已知问题

`elementUi`的vue版本为`2.5.17`，官方最新的是`2.7.15`。为此会导致
表头不显示，解决方案就是将它使用的vue覆盖就行了。  
在webpack.config.js中配置一下

```js

module.exports = {

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js' // 这代码是解决方案
        }
    },
}

```

### 版本更新记录

有问题先更新到最新版本，此组件一般不会进行无法兼容的更新

#### V1.1.7

+ 分页配置追加了`pageField,pageSizeField`字段，分别表示为`页码变化填充的数据字段，分页大小变化填充的数据就字段`

#### V1.1.5

+ 添加了`disabled`选项到操作栏的`buttons`每个按钮中
+ `buttons`中的每个按钮添加了`directives`数组，支持绑定指令到按钮上

