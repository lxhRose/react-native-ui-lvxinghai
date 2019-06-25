import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    RadioGroup,
    Button,
    Table
} from "./src/index";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>RadioGroup：</Text>
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
                <Text>Button：</Text>
                <Button
                    text="确认"
                    onPress={() => { }}
                    style={{ width: 100, margin: 10 }}
                    textStyle={{ color: "#333" }} />
                <Text>Table：</Text>
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
                    }} />
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
