import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    RadioGroup,
    Button,
    Table,
    Radio
} from "./src/index";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    render() {
        return (
            <View style={styles.container}>
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
                    style={{ width: 100, margin: 10 }}
                    textStyle={{ color: "#333" }} />
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
                        { id: 'hldj', name: '护理等级', flex: 1, width: 300 },
                        { id: 'cwhz', name: '床位患者', flex: 5, width: 300 },
                        { id: 'js', name: '计数', flex: 1 },
                    ]}
                    data={[
                        { hldj: 1, cwhz: '啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈啊哈哈哈哈', js: 3 },
                        { hldj: 1, cwhz: 2, js: 3 },
                        { hldj: 1, cwhz: 2, js: 3 },
                    ]}
                    style={{ width: 800, height: 550 }}
                    otherStyle={{
                        headStyle: { height: 50 },
                        headTextStyle: { width: 200 },
                        bodyStyle: { backgroundColor: '#ddd' },
                        bodyRowStyle: { height: 50 },
                        bodyTextStyle: { color: '#333' }
                    }}
                    horizontal />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});
