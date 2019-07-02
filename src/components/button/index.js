import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lineHeight: 0
        }
    }

    changeViewLayout = (event) => {
        this.setState({
            lineHeight: event.nativeEvent.layout.height - 10
        });
    }

    render() {
        const btnStyle = { ...styles.button, ...this.props.style };
        const textStyle = {
            ...styles.text,
            lineHeight: this.state.lineHeight,
            ...this.props.textStyle,
        };

        return React.createElement(TouchableOpacity,
            {
                onPress: this.props.onPress,
                disabled: this.props.disabled,
                onLayout: this.changeViewLayout,
                style: this.props.disabled
                    ? { ...btnStyle, ...styles.disabledStyle }
                    : { height: 25, ...btnStyle }
            },
            <Text style={
                this.props.disabled
                    ? { ...textStyle, ...styles.disabledTextStyle }
                    : textStyle
            }>
                {this.props.text}
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingTop: 5,
        paddingRight: 15,
        paddingBottom: 5,
        paddingLeft: 15,
    },
    disabledStyle: {
        borderColor: '#eee',
        backgroundColor: "#eee"
    },
    text: {
        fontSize: 14,
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
