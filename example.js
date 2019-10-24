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
    DatePicker,
    DatePickerMonth
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
            visible: false,
            text: '全部'
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

    testClick = (index) => {
        this.refs.table.clickRow(index);
    }

    testSelect = (e) => {
        // console.log(e.nativeEvent)
        this.refs.table.showModal({
            modalStyle: {
                top: e.nativeEvent.locationY + adap.h(100),
                left: e.nativeEvent.locationX,
                borderWidth: 1,
                borderColor: '#ddd',
                padding: adap.w(20),
                backgroundColor: "#fff"
            },
            modalContent: <View>
                <Text style={{
                    padding: adap.w(10),
                    fontSize: adap.font(42)
                }}
                    onPress={() => this.clckItem('全部')}>全部</Text>
                <Text style={{
                    padding: adap.w(10),
                    fontSize: adap.font(42)
                }}
                    onPress={() => this.clckItem('小米')}>小米</Text>
            </View>
        });
    }

    clckItem = (text) => {
        this.setState({ text });
        this.refs.table.showModal({ modalStyle: null, modalContent: null })
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
            <View style={styles.container}>
                <ScrollView>
                    {/* <Select options={[
                    { value: 1, name: '全部' },
                    { value: 2, name: '小莫' },
                    { value: 3, name: '小莫2' },
                    { value: 4, name: '小莫3' },
                ]} onChange={(value) => alert(value)} />
                <Text>傻子RN</Text> */}
                    <DatePicker ref="DatePicker" value='2019-10-09' callback={(date) => alert(date)} />
                    <Text>eCharts：</Text>
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
                    <Text>DatePickerMonth:</Text>
                    <DatePickerMonth callback={(str) => { }} />
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
                        onPress={() => this.refs.DatePicker.setValue('2019-10-16')}
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
                    <Text>Table：</Text>
                    <Table
                        head={[
                            { id: 'col0', name: '麻醉方式', flex: 1 },
                            { id: 'col1', name: '手术状态', flex: 1 },
                            { id: 'col2', name: '手术时间', flex: 2 }
                        ]}
                        data={[]}
                        fixedFirst={true}
                    />
                    {/* <Table
                    ref="table"
                    head={[
                        {
                            id: 'bedNo',
                            name: <Text onPress={this.testSelect} style={{ fontSize: adap.font(42), color: '#fff' }}>{this.state.text}</Text>,
                            width: 100
                        },
                        { id: 'itemName', name: '操作', flex: 1, render: (data, index) => <Text onPress={() => this.refs.table.clickRow(index)}>展开{data.itemName}</Text> },
                        { id: 'pname', name: '姓名', flex: 1 },
                        { id: 'gender', name: '性别', flex: 1 },
                        { id: 'batch', name: '台次', flex: 1 },
                        { id: 'batchNo', name: '台号', flex: 1 },
                        { id: 'opName', name: '手术名称', flex: 1 },
                        { id: 'doctor', name: '主刀医师', flex: 1 },
                        { id: 'anesthesia', name: '麻醉方式', flex: 1 },
                        { id: 'opState', name: '手术状态', flex: 1 },
                        { id: 'opDate', name: '手术时间', flex: 2 }
                    ]}
                    data={[
                        {
                            bedNo: "558",
                            itemName: "0024551",
                            pname: "洪佑",
                            gender: "女",
                            batch: "1",
                            batchNo: "手术台3",
                            opName: "阑尾切除",
                            doctor: "金翠云",
                            anesthesia: "静脉麻醉",
                            opState: "进行中",
                            opDate: "2019-08-02 12:00:00",
                            date: "2019-08-02",
                            departno: "-10038",
                            children: <View style={{ height: 300 }}>
                                <Text>子项</Text>
                            </View>
                        },
                        {
                            bedNo: "558",
                            itemName: "0024551",
                            pname: "洪佑",
                            gender: "女",
                            batch: "1",
                            batchNo: "手术台3",
                            opName: "阑尾切除",
                            doctor: "金翠云",
                            anesthesia: "静脉麻醉",
                            opState: "进行中",
                            opDate: "2019-08-02 12:00:00",
                            date: "2019-08-02",
                            departno: "-10038",
                            children: <View style={{ height: 300 }}>
                                <Text>子项</Text>
                            </View>
                        },
                    ]}
                    // bodyStyle={{ height: 500 }}
                    // hasBorder="all"
                    fixedFirst={true}
                /> */}
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
                            textStyle: { color: "#fff", fontSize: adap.font(42) },
                        },
                    ]}
                /> */}
                </ScrollView>
                <BaseModal
                    visible={this.state.visible}
                    closeModal={() => this.setState({ visible: false })}
                    children={<Text>yes</Text>} />
            </View>
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
