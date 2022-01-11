# 组件
> ## Player.vue
> 1. ### setDaram (DaramPart, Callback = null)  
>    *DaramPart*——Array  
>    *Callback*——Function  
>  
>    关于DaramPart
>
>  ```
>DaramPart格式：
>  [
>    String,
>    Object
>  ]
>
>  当DaramPart中使用Object时：
>  {
>    content: String, // 必须，等于String
>    clas: String, // 样式类名
>    style: String, // 额外样式
>    action: Function, // 结束前执行
>    changeVar: { // 顺便更改某个全局变量
>      varName: String,
>      num: Number || NaN // 如果传入数字，会尝试进行计算，如果传入其它类型，直接覆盖储存
>    },
>    setVar: { // 顺便储存（新建）某个全局变量
>      varName: String,
>      content: NaN
>    },
>    changeSpecial: { // 顺便更改某个特质层数
>      name: String,
>      num: Number // 传入其它类型会等于1
>    },
>    setSpecial: { // 顺便储存（新建）某个特质
>      name: String,
>      num: Number
>    }
>  }
>  ```
> 2. lock ()  
> 3. unlock ()  
> 4. clear ()
***

> ## SpecialBorder.vue
> 无
***

> ## StateBorder.vue
> 1. ### addDisplayVar (name, displayName)  
>       添加一条需要显示的全局变量，显示的名称自定义。
>>    *name*——String  
>>变量名 
> 
>>    *displayName*——String  
>>用来显示的变量名，不传会直接用变量名 
>
> <br></br>
>
> 2. ### addVar (name, displayName)  
>       添加一条需要显示的全局变量，直接显示变量名。
>>    *name*——String  
>>变量名 
> 
>
> <br></br>
>
> 3. ### removeDisplayVar (name)
>       根据变量名移除一个显示出来的变量。
>
> <br></br>
***