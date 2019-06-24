简介：这是一套基于React-native的组件库，可以根据自己的需求导入需要使用的组件：  
1、安装：npm i react-native-ui-lvxinghai    
2、使用：  
一：RadioGroup组件：  
import {RadioGroup} from "react-native-radiogroup-lxh";  
<RadioGroup  
    defaultChecked="bcl"  
    onChange={this.onChange}  
    option={this.Radio_Option}  
    style={{ marginTop: adap.h(27) }} />  
  
defaultChecked：默认选中项的id;  
  
onChange：发生改变时的回调函数，返回值是选中的Radio id值；
    
style：样式属性，暂时只支持设置包裹层样式；  
  
option：配置，具体如下： 
    
如果要分组横向排列就使用   

option=[  
    [  
        {id: "radio_1", label: "单选按钮一", flex: 1},  
        {id: "radio_2", label: "单选按钮二", flex: 1},  
        {id: "radio_3", label: "单选按钮三", flex: 1},  
        ...  
    ], [  
        {id: "radio_4", label: "单选按钮四", flex: 1},  
        {id: "radio_5", label: "单选按钮五", flex: 1},  
        {id: "radio_6", label: "单选按钮六", flex: 1},  
        , ...  
    ]    
]  
  
如果直接竖直排列，  
option = [  
    {id: "radio_1", label: "单选按钮一", flex: 1},  
    {id: "radio_2", label: "单选按钮二", flex: 1},  
    {id: "radio_3", label: "单选按钮三", flex: 1},  
    ...  
]  
  
支持设置Radio的flex。  
