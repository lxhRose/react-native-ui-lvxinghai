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
RadioGroup  
---
![RadioGroup-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/RadioGroup.png)  

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
  
Button   
---
![RadioGroup-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Button.png)  
```js
<Button
  text="确认"
  onPress={() => { }}
  style={{ width: 100, margin: 10 }}
  textStyle={{ color: "#333" }} />
```
属性：  
* text（string）：按钮名称；  
* onPress（function）：点击按钮触发的事件；  
* style（obj）：按钮样式；  
* textStyle（obj）：按钮文字样式。  
  
Table
---
default  
![Table-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Table.png)  
horizontal    
![Table-horizontal-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Table-horizontal.png)  
```js
<Table
  head={[
    { id: 'hldj', name: '护理等级', flex: 1, width: 300 },
    { id: 'cwhz', name: '床位患者', flex: 5, width: 300 },
    { id: 'js', name: '计数', flex: 1 },
  ]}
  data={[
    { hldj: 1, cwhz: 2, js: 3 },
    { hldj: 1, cwhz: 2, js: 3 },
    { hldj: 1, cwhz: 2, js: 3 },
  ]}
  style={{ width: 800, height: 550 }}
  otherStyle={{
    headStyle: { height: 50 },
    headTextStyle: { width: 200 },
    bodyStyle: { height: 500 },
    bodyRowStyle: { height: 50 },
    bodyTextStyle: { color: '#333' }
  }}
  horizontal />
  ```
  属性：
  * head(Array)：表头信息，其中flex和width为可选参数，默认值flex=1，width=100；当horizontal = false时，flex生效，设置一个单元格的宽度比例值；horizontal=true时，width生效，设置单元格的宽度；  
  * data（Array）：数据，注意数据字段名称与表头id一一对应；  
  * style（obj）：表格样式；  
  * otherStyle（obj）：表内其他部分样式，分别对应headStyle：表头，headTextStyle：表头文字，表格内容：bodyStyle，表格行：bodyRowStyle，表格文字：bodyTextStyle；  
  * horizontal（bool）：标识是否可横向滑动，即表头过长时，显示横向滚动条。  
  
  
