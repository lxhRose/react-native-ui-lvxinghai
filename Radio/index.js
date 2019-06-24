import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import adap from './../adaptation';

export default class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labelFlex: 0,
        }
        this.rowRef = null;
    }

    componentDidMount = () => {
        this.changeViewLayout();
    }

    changeViewLayout = () => {
        const LabelWidth = (this.props.label.length + 1) * adap.font(50);
        const RadioWidth = adap.w(56);
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

    render() {
        const {
            id,
            checked,
            onChange
        } = this.props;

        const { labelFlex } = this.state;

        return React.createElement(TouchableOpacity,
            {
                ref: rowRef => { this.rowRef = rowRef },
                style: styles.RadioWrap,
                onPress: () => onChange(id)
            },
            <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.Radio}>
                        {checked && <Text style={styles.circle}></Text>}
                    </View>
                </View>
                <View style={{ flex: labelFlex }}>
                    <Text style={styles.label}>{this.props.label}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    RadioWrap: {
        height: adap.h(70)
    },
    Radio: {
        marginTop: adap.h(7),
        borderRadius: adap.w(56),
        borderWidth: adap.w(1),
        borderColor: '#1C2024',
        width: adap.w(56),
        height: adap.h(56),
    },
    circle: {
        marginTop: adap.h(18),
        marginLeft: adap.h(18),
        borderRadius: adap.w(20),
        width: adap.w(20),
        height: adap.h(20),
        backgroundColor: '#1C2024',
    },
    label: {
        fontSize: adap.font(50),
        lineHeight: adap.h(70),
        textAlign: 'center',
        color: '#1C2024'
    }
});
