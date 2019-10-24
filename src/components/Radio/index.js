import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableNativeFeedback
} from 'react-native';
import adap from './../../utils/adaptation';
import PropTypes from 'prop-types';

const RADIO_WIDTH = adap.w(56);
const COLOR = '#1C2024';

export default class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelFlex: 0,
            checked: props.defaultChecked
        }
        this.rowRef = null;
    }

    componentDidMount = () => {
        this.changeViewLayout();
    }

    changeViewLayout = () => {
        const { style } = this.props;
        const LabelWidth = ((this.props.label ? this.props.label.length : 0) + 1) * ((style && style.fontSize) || adap.font(50));
        const RadioWidth = (style && style.fontSize) || RADIO_WIDTH;
        const totl = LabelWidth + RadioWidth;
        const labelFlex = LabelWidth / RadioWidth;

        this.setState({
            labelFlex: labelFlex
        });

        this.rowRef.setNativeProps({
            style: {
                width: totl,
            }
        });
    }

    onChecked = () => {
        this.setState({
            checked: true
        }, () => {
            const { onChange } = this.props;
            onChange && onChange(this.state.checked);
        })
    }

    render() {
        const {
            label,
            groupCheckedId,
            id,
            style,
            radioColor
        } = this.props;
        const { labelFlex, checked } = this.state;

        return React.createElement(View,
            {
                ref: rowRef => { this.rowRef = rowRef },
                style: { ...styles.RadioWrap, ...style },

            },
            <TouchableNativeFeedback onPress={this.onChecked}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <View style={{
                            ...styles.Radio,
                            marginTop: (style && (style.lineHeight - style.fontSize) / 2) || adap.w(7),
                            width: (style && style.fontSize) || RADIO_WIDTH,
                            height: (style && style.fontSize) || RADIO_WIDTH,
                            borderColor: radioColor || (style && style.color) || COLOR
                        }}>
                            {(groupCheckedId && groupCheckedId !== id) ? false : checked
                                && <Text style={{
                                    ...styles.circle,
                                    backgroundColor: radioColor || (style && style.color) || COLOR
                                }}></Text>
                            }
                        </View>
                    </View>
                    <View style={{ flex: labelFlex }}>
                        <Text style={{
                            ...styles.label,
                            fontSize: (style && style.fontSize) || adap.font(50),
                            lineHeight: (style && style.lineHeight) || adap.font(70),
                            color: (style && style.color) || COLOR
                        }}>{label}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    RadioWrap: {
        height: adap.h(70)
    },
    Radio: {
        marginTop: adap.h(7),
        borderRadius: 100,
        borderWidth: adap.w(1),
        borderColor: COLOR,
        width: RADIO_WIDTH,
        height: RADIO_WIDTH,
    },
    circle: {
        marginTop: '34%',
        marginLeft: '34%',
        borderRadius: 100,
        width: '20%',
        height: '20%',
        backgroundColor: COLOR,
    },
    label: {
        fontSize: adap.font(50),
        lineHeight: adap.h(70),
        textAlign: 'center',
        color: COLOR
    }
});

Radio.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    style: PropTypes.object,
    radioColor: PropTypes.string,
    groupCheckedId: PropTypes.string,
};
