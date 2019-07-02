import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Button from "./../button/index";

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
        borderRadius: 5,
        padding: 20,
        width: 400,
        height: 150,
        backgroundColor: "#fff",
    },
    wrapHead: {
        height: 20
    },
    head: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        borderRadius: 16,
        width: 20,
        height: 20,
        lineHeight: 20,
        fontSize: 16,
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
        paddingLeft: 10,
        width: 240,
        fontSize: 16,
        lineHeight: 20,
    },
    body: {
        padding: 15,
        height: 65
    },
    bodyText: {
        fontSize: 14,
        lineHeight: 20
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        height: 25,
    },
    btn: {
        marginLeft: 5
    },
});

Message.propTypes = {
    type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
    title: PropTypes.string,
    content: PropTypes.string,
    option: PropTypes.array,
};

Message.defaultProps = {
    type: 'info',
    option: [{
        text: 'ok',
        style: {
            borderWidth: 0,
            backgroundColor: "#3B7CFF"
        },
        textStyle: { color: "#fff" },
    }]
}
