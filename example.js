import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {
    RadioGroup,
    Button,
    Table,
    Radio,
    BaseModal,
    Message,
    RNECharts,
} from "./src/index";
import adap from "./src/utils/adaptation";

const option2 = {
    title: {
        text: '目前住院床数',
        x: 'center',
        textStyle: {
            fontSize: adap.font(42),
            color: '#011712'
        },
        top: "60%"
    },
    tooltip: {
        show: false
    },
    legend: {
        left: 'center',
        itemWidth: adap.w(50),
        itemHeight: adap.h(42),
        data: ['占用', '空床'],
        textStyle: {
            fontSize: adap.font(42)
        }
    },
    series: [
        {
            type: 'pie',
            startAngle: 180,
            radius: '80%',
            center: ['50%', '50%'],
            hoverAnimation: false,
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{c}',
                    color: '#ddd'
                }
            },
            data: [
                {
                    name: '占用',
                    value: 300,
                    itemStyle: {
                        normal: {
                            color: '#00C889'
                        }
                    }
                },
                {
                    name: '空床',
                    value: 200,
                    itemStyle: {
                        normal: {
                            color: '#ddd'
                        }
                    }
                },
                {
                    value: 500, label: { normal: { position: 'inside' } },
                    itemStyle: {
                        normal: {
                            color: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
            ],
        }
    ]
};

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            visible: false
        }
        this.timer = null;
    }

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
            // this.refs.charts.setNewOption(option)
        }, 2000)
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
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

        return (
            <ScrollView style={styles.container}>
                {/* <Text>eCharts：</Text>
                <View style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#ddd'
                }}>
                    <RNECharts
                        ref="charts"
                        width={200}
                        height={200}
                        option={option2} />
                </View>
                <Text>RadioGroup：</Text>
                <RadioGroup
                    onChange={(id) => { }}
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
                            },
                            { id: '2', label: '继续观察' },
                        ], [
                            { id: '3', label: '已处理' },
                            { id: '4', label: '慢性变化无需处理' },
                        ]
                    ]}
                    style={{
                        padding: 20,
                        width: 300,
                        height: 100,
                    }} />
                <Text>Button：</Text>
                <Button
                    text="确认"
                    onPress={() => { }}
                    style={styles.btnStyle}
                    textStyle={styles.btnTextStyle} />
                <Button
                    text="确认" />
                <Text>Radio：</Text>
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
                <Text>Table：</Text> */}
                <Table
                    head={[
                        { id: 'hldj', name: '护理等级', flex: 1, width: 300 },
                        { id: 'cwhz', name: '床位患者', flex: 5, width: 300 },
                        {
                            id: 'js', name: '计数', flex: 1,
                            render: (data, index) => <Text onPress={() => this.refs.table.clickRow(index)}>This is a element:{data.js}</Text>
                        },
                    ]}
                    ref="table"
                    data={[
                        {
                            hldj: 1, cwhz: 2, js: 3,
                            children: <View style={{ height: 300 }}>
                                <Text>子项</Text>
                            </View>
                        },
                        { hldj: 1, cwhz: 2, js: 3 },
                        { hldj: 1, cwhz: 2, js: 3 },
                    ]}
                    style={{ width: 800, height: 500 }}
                    headTextStyle={{ width: 200 }}
                    bodyStyle={{ backgroundColor: '#fff' }}
                    bodyRowStyle={{ height: 50 }}
                    bodyTextStyle={{ color: '#333' }}
                    hasBorder='all'
                    // evenRowColor="#4ACA6D"
                    horizontal />
                <BaseModal
                    visible={this.state.visible}
                    closeModal={() => this.setState({ visible: false })} />
                {/* <Message
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
                /> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    btnStyle: {
        borderRadius: 0,
        width: "100%",
        height: adap.h(160),
        backgroundColor: "#3B7CFF"
    },
    btnTextStyle: {
        fontSize: adap.font(50),
        color: "#fff"
    }
});
