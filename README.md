react-native-ui-lvxinghai
===
简介：  
---
这是一套基于React-native的组件库，你可以根据自己的需求导入需要使用的组件  
  
安装：  
---
npm i react-native-ui-lvxinghai    
  
使用：  
---
一、RadioGroup组件  
---
![RadioGroup](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/RadioGroup.png)  

```js
import {RadioGroup} from "react-native-ui-lvxinghai";   
<RadioGroup
    defaultChecked="1"
    onChange={(checked) => { alert(checked) }}
    option={[
        [
            { id: '1', label: '不处理' },
            { id: '2', label: '继续观察' },
        ], [
            { id: '3', label: '已处理' },
            { id: '4', label: '慢性变化无需处理' },
        ]
    ]}
    style={{
        padding: 20,
        width: 200,
        height: 100,
    }} />  
```
   
属性：  
* defaultChecked（string）：默认选中项的id;  
* onChange（function）：发生改变时的回调函数，返回值是选中的Radio id值；   
* option（Array）：配置，具体如下： 
* style（object）：样式属性，暂时只支持设置包裹层样式；  
    
如果要分组横向排列就使用   
```js
option=[  
  [  
    { id: '1', label: '不处理' },
    { id: '2', label: '继续观察' },  
  ], [  
    { id: '3', label: '已处理' },
    { id: '4', label: '慢性变化无需处理' },  
  ]    
]  
```  
如果直接竖直排列，  
```js
option = [  
    { id: '1', label: '不处理' },
    { id: '2', label: '继续观察' },
    { id: '3', label: '已处理' },
    { id: '4', label: '慢性变化无需处理' },  
]  
```  
支持设置Radio的flex。  
