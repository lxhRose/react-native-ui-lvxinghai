react-native-ui-lvxinghai
===
简介：  
---
这是一套基于React-native的组件库，目前仅支持adroid，你可以根据自己的需求导入需要使用的组件。    
  
安装：  
---
    npm i react-native-ui-lvxinghai    
  
目录：
---
1、[Radio（单选按钮）](#Radio单选按钮)  
2、[RadioGroup（单选按钮组）](#RadioGroup单选按钮组)   
3、[Button（按钮）](#Button按钮)  
4、[Table（表格）](#Table表格)   
5、[BaseModal（基础模态框）](#BaseModal基础模态框)  
6、[Message（带图标的消息提示框）](#Message带图标的消息提示框)   
7、[RNECharts（对echarts的封装）](#RNECharts对echarts的封装)  
   
  
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
* id（string）：必选。单选按钮的唯一标识。    
* label（string）：可选。单选按钮的文字描述。  
* defaultChecked（bool）：可选。默认选中否？
* onChange（func）：可选。点击的回调函数，返回当前选中情况。
* style（object）：可选。单选按钮以及label的样式设置，可以设置字体大小行高颜色等。
* radioColor（string）：可选。单独设置Radio（label除外）的颜色。
* groupCheckedId（string）：可选。提供给RadioGroup使用，指定当前选中的单选按钮id，该单选按钮以外的组成员选中状态置为false。

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
![Table-horizontal-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Table-horizontal.png)  
```js
import { Table } from "react-native-ui-lvxinghai";
<Table
  ref="table"
  head={[
    { id: 'hldj', name: '护理等级', flex: 1, width: 300 },
    { id: 'cwhz', name: '床位患者', flex: 5, width: 300 },
    { id: 'js', name: '计数', flex: 1, render: (data, index) => <Text onPress={() => this.refs.table.clickRow(index)}>This is a element:{data.js}</Text>,
  ]}
  data={[
    { hldj: 1, cwhz: 2, js: 3, children: <View style={{ height: 300 }}>
                                <Text>子项</Text>
                            </View> },
    { hldj: 1, cwhz: 2, js: 3 },
    { hldj: 1, cwhz: 2, js: 3 },
  ]}
  style={{ width: 800, height: 550 }}
  headStyle={{ height: 50 }}
  headTextStyle={{ width: 200 }}
  bodyStyle={{ backgroundColor: '#fff' }}
  bodyRowStyle={{ height: 50 }}
  bodyTextStyle={{ color: '#333' }}
  evenRowColor="#4ACA6D"
  horizontal />
  ```
  props：
  * head(Array)：必选。表头信息；  
  其中flex、width和bodyColStyle为可选参数，默认值flex=1，width=100；当horizontal = false时，flex生效，设置一个单元格的宽度比例值；horizontal=true时，width生效，设置单元格的宽度；bodyColStyle设置这一列body的样式（包括背景色字体颜色大小等等；注意，不是head的样式）。    
  其中render(data, index)可以用元素替换表中的内容，data为一整行值的对象。注意：如果是字符串或者数字，请务必使用Text标签包裹起来，使用bodyTextStyle设置的样式对该元素无效，需要单独设置。
  * data（Array）：必选。数据，注意数据字段名称与表头id一一对应；需要注意的是children字段为预留字段，用以向每行传递需要展示的子项。  
  * style（obj）：可选。表格样式；  
  * headStyle（obj）：可选。设置表头样式。  
  * headTextStyle（obj）：可选。设置表头单元格文字样式。  
  * bodyStyle（obj）：可选。设置表格内容样式，如果想设置表格的body部分内容超出沿Y轴滚动，只需要给bodyStyle一个height值。  
  * bodyRowStyle（obj）：可选。设置表格行样式。  
  * bodyTextStyle（obj）：可选。设置表格单元格文字样式。  
  * horizontal（bool）：可选。标识是否可横向滑动，即表头过长时，显示横向滚动条。  
  * evenRowColor（string）：可选。设置表格内容偶数行的颜色，传值类型为为颜色字符串，如："#fff"、"red"。
  * ref: 另外预留了一个clickRow方法供外部调用，以展开每行的子项。例如：this.refs.table.clickRow(index)    
  * childrenStyle（obj）：可选。设置子项包裹框样式。    
  
  
BaseModal（基础模态框）  
---  
```js
import { BaseModal } from "react-native-ui-lvxinghai";
<BaseModal
  visible={this.state.visible}
  closeModal={() => this.setState({ visible: false })} />
```
props：  
* visible（bool）：可选。控制模态框的显示隐藏；  
* closeModal（func）：可选。关闭模态框的函数，点击右上角的关闭按钮时触发；  
* hideCloseBtn（bool）：可选。隐藏自带的关闭按钮；  
* children（any）：可选。子元素，即要在模态框中显示的内容，例如  
```js
<BaseModal><Text>这是一个基础模态框</Text><BaseModal>
``` 
  
Message（带图标的消息提示框）
---
![Message-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/Message.png)  
```js
<Message
  type="error"
  title="这是标题"
  content="这是内容"
  option={[
    {
      text: 'cancle',
      onPress: () => { alert('yes') },
    },
    {
      text: 'ok',
      style: {
        borderWidth: 0,
        backgroundColor: "#3B7CFF"
      },
      textStyle: { color: "#fff" },
    },
  ]}
/>
```
props：  
* type: PropTypes.oneOf(['info', 'warning', 'error', 'success']), 可选。指定消息框类型，默认为info。
* title（string）：可选。消息框的标题
* content（string）：可选。消息框的内容
* option（array）：可选。底部按钮的配置，具体配置如上代码段，默认有一个ok按钮。如有需求可以自定义按钮，设置按钮的显示内容、样式以及按钮的触摸回调函数。
* closeCallback（func）： 可选。关闭消息框的回调函数。
  
RNECharts（对echarts的封装） 
---
![RNECharts-img](https://raw.githubusercontent.com/lxhRose/react-native-ui-lvxinghai/master/image/echarts.png)
  
在你使用之前需要完成以下三个步骤：    
* 将src/components/chart/chart.html文件复制到你项目中的android\app\src\main\assets文件夹下。  
* 执行 npm i react-native-webview    
* 执行 react-native link react-native-webview  
```js
import { RNECharts } from "react-native-ui-lvxinghai";
...
componentDidMount() {
  /**
   * 连续不间断刷新图标demo
   */
  this.timer = setInterval(() => {
      let data = [5, 20, 36, 10, 10, 20].map((v) => {
          return Math.random() * v
      })
      var option = {
          title: {
              text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
              data: ['销量']
          },
          xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
              name: '销量',
              type: 'bar',
              data: data
          }]
      };
      /**普通图表刷新通过改变state内部的option实现，缺点就是组件不断更新，导致图表组件重头开始渲染，没有连贯效果
       * 在chartComponent里面封装的setNewOption方法，
       * 目的是为了调用myChart.setOption(option)
       * 达到不抖屏不更新state刷新图表
       * */
      this.refs.charts.setNewOption(option)
  }, 2000)
}

render() {
  var option = {
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }]
  };
  return(
    <RNECharts
      ref="charts"
      option={option} />
  )
}
```
props:
* option（object），必选。echarts的配置，请参照[ECharts 配置项](https://echarts.baidu.com/option.html#title)   
* width（number），可选。图表宽度；
* height（number），可选。图表高度；
* backgroundColor（string），可选。背景色。

