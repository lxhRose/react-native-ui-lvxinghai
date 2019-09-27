import React, { Component } from 'react';
import {
    Text,
    DatePickerAndroid,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import adap from "./../../utils/adaptation";
import DateFormat from "./../../utils/dateFormat";

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.defaultDate
        }
    }

    showDatePicker = async () => {
        try {
            const { date } = this.state;
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(date)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
                this.setState({
                    date: DateFormat.format(new Date(year, month, day), false, true)
                }, () => {
                    this.props.callback(this.state.date);
                });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        const {
            date,
        } = this.state;

        const {
            style,
            imgStyle,
            textStyle
        } = this.props;

        return React.createElement(TouchableOpacity,
            {
                style: { ...styles.dateBtn, ...style },
                onPress: this.showDatePicker
            },
            <>
                <Image style={{ ...styles.img, ...imgStyle }}
                    source={require('./../../images/date.png')}></Image>
                <Text style={{ ...styles.dateText, ...textStyle }}>{date}</Text>
            </>
        )
    }
}

const styles = StyleSheet.create({
    dateBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: adap.w(10),
        backgroundColor: '#fff',
    },
    img: {
        width: adap.font(50),
        height: adap.font(46),
    },
    dateText: {
        paddingLeft: adap.w(30),
        fontSize: adap.font(41),
    },
});

DatePicker.propTypes = {
    callback: PropTypes.func.isRequired,
    defaultDate: PropTypes.string,
    style: PropTypes.object,
    imgStyle: PropTypes.object,
    textStyle: PropTypes.object,
};
DatePicker.defaultProps = {
    defaultDate: DateFormat.getToday2(),
}
