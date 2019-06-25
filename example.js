import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {
    RadioGroup,
    Button
} from "./src/index";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.Radio_Option = [
            [
                { id: '1', label: '不处理' },
                { id: '2', label: '继续观察' },
            ], [
                { id: '3', label: '已处理' },
                { id: '4', label: '慢性变化无需处理' },
            ]
        ];
    }

    onChange = (checked) => {
        alert(checked);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>RadioGroup：</Text>
                <RadioGroup
                    defaultChecked="1"
                    onChange={this.onChange}
                    option={this.Radio_Option}
                    style={styles.RadioGroup} />
                <Text>Button：</Text>
                <Button
                    text="确认"
                    onPress={() => { }}
                    style={{ width: 100, margin: 10 }}
                    textStyle={{}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    RadioGroup: {
        padding: 20,
        width: 200,
        height: 100,
    },
});
