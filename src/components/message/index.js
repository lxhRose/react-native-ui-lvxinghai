import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Button from "./../button/index";
import adap from "./../../utils/adaptation";

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }

    closeModal = () => {
        this.setState({
            visible: false
        });
        this.props.closeCallback && this.props.closeCallback();
    }

    render() {
        const {
            visible,
        } = this.state;

        const {
            type,
            title,
            content,
            option
        } = this.props;

        return visible
            ? React.createElement(View,
                { style: styles.wrap },
                <View style={styles.content}>
                    <View style={styles.wrapHead}>
                        <View style={styles.head}>
                            {type === 'info' &&
                                <Text style={{ ...styles.icon, ...styles.info_icon }}>!</Text>
                            }
                            {type === 'warning' &&
                                <Text style={{ ...styles.icon, ...styles.warning_icon }}>!</Text>
                            }
                            {type === 'error' &&
                                <Text style={{ ...styles.icon, ...styles.error_icon }}>×</Text>
                            }
                            {type === 'success' &&
                                <Text style={{ ...styles.icon, ...styles.success_icon }}>√</Text>
                            }
                            <Text style={styles.title}>{title}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bodyText}>{content}</Text>
                    </View>
                    <View style={styles.footer}>
                        {option.map((btn, i) => (
                            <Button text={btn.text}
                                key={i}
                                style={{ ...styles.btn, ...btn.style }}
                                textStyle={btn.textStyle}
                                onPress={() => { this.closeModal(); btn.onPress && btn.onPress() }} />
                        ))}
                    </View>
                </View>
            )
            : null
    }
}

const styles = StyleSheet.create({
    wrap: {
        position: 'absolute',
        zIndex: 100000,
        elevation: 100000,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
        borderRadius: adap.w(20),
        padding: adap.w(50),
        width: adap.w(1500),
        height: adap.h(500),
        backgroundColor: "#fff",
    },
    wrapHead: {
        height: adap.h(100)
    },
    head: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        borderRadius: adap.w(80),
        width: adap.w(90),
        height: adap.h(90),
        lineHeight: adap.h(90),
        fontSize: adap.font(56),
        textAlign: 'center',
        color: '#fff',
    },
    info_icon: {
        backgroundColor: '#3B7CFF',
    },
    warning_icon: {
        backgroundColor: '#ffcc00',
    },
    error_icon: {
        backgroundColor: 'red',
    },
    success_icon: {
        backgroundColor: '#33cc33'
    },
    title: {
        paddingLeft: adap.w(30),
        width: adap.w(1300),
        fontSize: adap.font(56),
        lineHeight: adap.h(100),
        color: '#333',
    },
    body: {
        padding: adap.h(30),
        paddingTop: adap.h(50),
        height: adap.h(200)
    },
    bodyText: {
        fontSize: adap.font(42),
        lineHeight: adap.h(60),
        color: '#333',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        height: adap.h(100),
    },
    btn: {
        marginLeft: adap.w(40),
    },
});

Message.propTypes = {
    type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
    title: PropTypes.string,
    content: PropTypes.string,
    option: PropTypes.array,
    closeCallback: PropTypes.func,
};

Message.defaultProps = {
    type: 'info',
    option: [{
        text: 'ok',
        style: {
            borderWidth: 0,
            backgroundColor: "#3B7CFF"
        },
        textStyle: { color: "#fff", fontSize: adap.font(42) },
    }]
}
