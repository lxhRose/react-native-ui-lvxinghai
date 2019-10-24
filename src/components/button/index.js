import React, { Component } from 'react';
import {
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import adap from "./../../utils/adaptation";

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineHeight: 0
        }
    }

    changeViewLayout = (event) => {
        this.setState({
            lineHeight: event.nativeEvent.layout.height
                - (this.props.style && this.props.style.borderWidth || styles.button.borderWidth) * 2
        });
    }

    render() {
        const btnStyle = { ...styles.button, ...this.props.style };
        const textStyle = {
            ...styles.text,
            lineHeight: this.state.lineHeight,
            ...this.props.textStyle,
        };

        return React.createElement(TouchableNativeFeedback,
            {
                onPress: this.props.onPress,
                disabled: this.props.disabled,
                onLayout: this.changeViewLayout,
            },
            <View style={this.props.disabled
                ? { ...btnStyle, ...styles.disabledStyle }
                : { height: adap.h(90), ...btnStyle }}>
                <Text style={
                    this.props.disabled
                        ? { ...textStyle, ...styles.disabledTextStyle }
                        : textStyle
                }>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: adap.w(20),
        borderWidth: adap.w(3),
        borderColor: '#ddd',
        paddingRight: adap.w(40),
        paddingLeft: adap.w(40),
    },
    disabledStyle: {
        borderColor: '#eee',
        backgroundColor: "#eee"
    },
    text: {
        fontSize: adap.font(42),
        textAlign: 'center',
        color: '#333',
    },
    disabledTextStyle: {
        color: '#bbb',
    }
});

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    style: PropTypes.object,
    textStyle: PropTypes.object,
    disabled: PropTypes.bool,
};
