react-native-ui-lvxinghai
===
简介：  
---
这是一套基于React-native的组件库，目前仅支持adroid，你可以根据自己的需求导入需要使用的组件。    
  
安装：  
---
    npm i react-native-ui-lvxinghai    
  
使用：  
---
Radio（单选按钮）  
---
![Radio-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Radio.png)  
```js
import { Radio } from "react-native-ui-lvxinghai"; 
<Radio
  defaultChecked={false}
  id='radio'
  onChange={(checked) => {
    // alert(checked)
  }}
  label="单选按钮"
  style={{
    height: 70,
    lineHeight: 70,
    fontSize: 20,
    color: '#333'
  }}
  radioColor="blue" />
```
props：  
* id: PropTypes.string.isRequired，必选。单选按钮的唯一标识。
* label: PropTypes.string，可选。单选按钮的文字描述。
* defaultChecked: PropTypes.bool，可选。默认选中否？
* onChange: PropTypes.func，可选。点击的回调函数，返回当前选中情况。
* style: PropTypes.object，可选。单选按钮以及label的样式设置，可以设置字体大小行高颜色等。
* radioColor: PropTypes.string，可选。单独设置Radio（label除外）的颜色。
* groupCheckedId: PropTypes.string，可选。提供给RadioGroup使用，指定当前选中的单选按钮id，该单选按钮以外的组成员选中状态置为false。

RadioGroup（单选按钮组）  
---
![RadioGroup-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/RadioGroup.png)  

```js
import { RadioGroup } from "react-native-ui-lvxinghai";   
<RadioGroup
  defaultChecked="1"
  onChange={(id) => { alert(id) }}
  option={[
    [
      {  
        id: '1',
        label: '不处理',
        style: {
          height: 70,
          lineHeight: 70,
          fontSize: 20,
          color: '#333'
        },
        radioColor: "blue"
        flex: 1 
      },
      { id: '2', label: '继续观察', flex: 1 },
    ], [
      { id: '3', label: '已处理', flex: 1 },
      { id: '4', label: '慢性变化无需处理', flex: 1 },
    ]
  ]}
  style={{
    padding: 20,
    width: 200,
    height: 100,
  }} />  
```
   
props：  
* option（Array）：必选。配置，可通过option子对象中的style属性和radioColor属性设置Radio的样式，具体如下：  
* defaultChecked（string）：可选。默认选中项的id;  
* onChange（function）：可选。发生改变时的回调函数，返回值是选中的Radio id值；   
* style（object）：可选。样式属性，暂时只支持设置包裹层样式；  
    
如果要分组横向排列就使用   
```js
option=[  
  [  
    { id: '1', label: '不处理', flex: 1 },
    { id: '2', label: '继续观察', flex: 1 },  
  ], [  
    { id: '3', label: '已处理', flex: 1 },
    { id: '4', label: '慢性变化无需处理', flex: 1 },  
  ]    
]  
```  
如果直接竖直排列，  
```js
option = [  
    { id: '1', label: '不处理', flex: 1 },
    { id: '2', label: '继续观察', flex: 1 },
    { id: '3', label: '已处理', flex: 1 },
    { id: '4', label: '慢性变化无需处理', flex: 1 },  
]  
```  
支持设置Radio的flex，但它并不是必须的。  
  
Button（按钮）   
---
![RadioGroup-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Button.png)  
```js
import { Button } from "react-native-ui-lvxinghai";
<Button
  text="确认"
  onPress={() => { }}
  style={{ width: 100, margin: 10 }}
  textStyle={{ color: "#333" }} />
```
props：  
* text（string）：必选。按钮名称；  
* onPress（function）：可选。点击按钮触发的事件；  
* style（obj）：可选。按钮样式；  
* textStyle（obj）：可选。按钮文字样式。  
  
Table（表格）  
---
default  
![Table-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Table.png)  
horizontal    
![Table-horizontal-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Table-horizontal.png)  
```js
import { Table } from "react-native-ui-lvxinghai";
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
  headStyle={{ height: 50 }}
  headTextStyle={{ width: 200 }}
  bodyStyle={{ backgroundColor: '#ddd' }}
  bodyRowStyle={{ height: 50 }}
  bodyTextStyle={{ color: '#333' }}
  horizontal />
  ```
  props：
  * head(Array)：必选。表头信息，其中flex和width为可选参数，默认值flex=1，width=100；当horizontal = false时，flex生效，设置一个单元格的宽度比例值；horizontal=true时，width生效，设置单元格的宽度；  
  * data（Array）：必选。数据，注意数据字段名称与表头id一一对应；  
  * style（obj）：可选。表格样式；  
  * headStyle（obj）：可选。设置表头样式。  
  * headTextStyle（obj）：可选。设置表头单元格文字样式。  
  * bodyStyle（obj）：可选。设置表格内容样式，如果想设置表格的body部分内容超出沿Y轴滚动，只需要给bodyStyle一个height值。  
  * bodyRowStyle（obj）：可选。设置表格行样式。  
  * bodyTextStyle（obj）：可选。设置表格单元格文字样式。  
  * horizontal（bool）：可选。标识是否可横向滑动，即表头过长时，显示横向滚动条。  
  
BaseModal（基础模态框）  
---  
```js
import { BaseModal } from "react-native-ui-lvxinghai";
<BaseModal
  visible={this.state.visible}
  closeModal={() => this.setState({ visible: false })} />
```
props：  
* visible: PropTypes.bool,可选。控制模态框的显示隐藏；  
* closeModal: PropTypes.func,可选。关闭模态框的函数，点击右上角的关闭按钮时触发；  
* hideCloseBtn: PropTypes.bool,可选。隐藏自带的关闭按钮；  
* children: PropTypes.any,可选。子元素，即要在模态框中显示的内容，例如  
```js
<BaseModal><Text>这是一个基础模态框</Text><BaseModal>
``` 

