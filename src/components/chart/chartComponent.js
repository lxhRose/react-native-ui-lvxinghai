import React, { Component } from 'react';
import {
    View,
    Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';

/*获取设备的屏幕宽度和高度*/
const { width, height } = Dimensions.get('window');

function toString(obj) {
    let result = JSON.stringify(obj, function (key, val) {
        if (typeof val === 'function') {
            return `~--demo--~${val}~--demo--~`;
        }
        return val;
    });
    do {
        result = result.replace('\"~--demo--~', '').replace('~--demo--~\"', '').replace(/\\n/g, '').replace(/\\\"/g, "\"");
    } while (result.indexOf('~--demo--~') >= 0);
    return result;
}

/*在WebView加载外部html后执行的js，主要是初始化echart图表*/
function renderChart(props) {
    const height = `${props.height || 400}px`;
    const width = props.width ? `${props.width}px` : 'auto';
    return `
        document.getElementById('main').style.height = "${height}";
        document.getElementById('main').style.width = "${width}";
        var myChart = echarts.init(document.getElementById('main'));
        myChart.setOption(${toString(props.option)});
        window.document.addEventListener('message', function(e) {
            var option = JSON.parse(e.data);
            myChart.setOption(option);
        });
    `
}

/**
 * 通过WebView封装react-native不支持的插件，本次封装echarts
 *
 * 该组件需要的props
 * option  必填，为ECharts配置属性option，详细配置参考官网ECharts，http://echarts.baidu.com/option.html#title
 * width   不必填，为图表的宽度
 * height  不必填，为图表的高度
 *
 *
 */
export default class RNECharts extends Component {
    constructor(props) {
        super(props);
        this.setNewOption = this.setNewOption.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.option !== this.props.option) {
            this.refs.chart.reload();
        }
    }

    setNewOption(option) {//postMessage会触发刚才js中的message监听方法，使得图表刷新option配置
        this.refs.chart.postMessage(JSON.stringify(option));
    }

    render() {
        return React.createElement(View,
            {
                style: {
                    width: this.props.width || width,
                    flex: 1,
                    height: this.props.height || 400,
                }
            },
            <WebView
                ref="chart"
                originWhiteList={['*']}
                scrollEnabled={false}
                style={{
                    height: this.props.height || 400,
                    backgroundColor: this.props.backgroundColor || 'transparent'
                }}
                source={{
                    uri: 'file:///android_asset/chart.html',
                    baseUrl: 'file:///android_asset/'
                }}
                injectedJavaScript={renderChart(this.props)}
            />
        )
    }
}  
