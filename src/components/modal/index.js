import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import adap from './../../utils/adaptation';
import PropTypes from 'prop-types';

export default class BaseModal extends Component {
    render() {
        if (this.props.visible) {
            return React.createElement(View, { style: styles.content },
                <>
                    {!this.props.hideCloseBtn &&
                        <TouchableOpacity
                            onPress={this.props.closeModal}
                            style={styles.closeButton}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.text}>×</Text>
                        </TouchableOpacity>
                    }
                    <View>
                        {this.props.children}
                    </View>
                </>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 99999,
        elevation: 99999,
        padding: adap.w(90),
        width: adap.w(3840),
        height: adap.h(2160),
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    closeButton: {
        position: 'absolute',
        right: adap.w(120),
        top: adap.h(120),
        zIndex: 999,
        borderRadius: adap.w(80),
        width: adap.w(80),
        height: adap.h(80),
        backgroundColor: '#fff',
    },
    text: {
        lineHeight: adap.h(80),
        textAlign: 'center',
        color: '#3B7CFF',
        fontSize: adap.font(60),
    }
});

BaseModal.propTypes = {
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    hideCloseBtn: PropTypes.bool,
    children: PropTypes.any,
};
