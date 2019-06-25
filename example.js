import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    RadioGroup,
    Button
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
