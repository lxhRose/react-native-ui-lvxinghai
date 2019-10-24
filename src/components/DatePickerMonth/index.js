import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import adap from "./../../utils/adaptation";
import DateFormat from "./../../utils/dateFormat";
import Button from "./../button/index";

export default class DatePickerMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStr: props.defaultDate
        }
    }

    _getMonth = (isAdd) => {
        let dateStr = DateFormat._getMonth(this.state.dateStr, isAdd);
        this.setState({ dateStr });
        this.props.callback(dateStr);
    }

    render() {
        const {
            style,
            textStyle,
            btnStyle,
            predisabled,
            nextdisabled
        } = this.props;
        const { dateStr } = this.state;

        return React.createElement(View,
            { style: { ...styles.wrap, ...style } },
            <>
                {!predisabled &&
                    <Button
                        text="<"
                        onPress={() => this._getMonth(false)}
                        style={{ ...styles.btnStyle, ...btnStyle }}
                        textStyle={{ ...styles.dateText, ...textStyle }} />
                }
                <Text style={{ ...styles.dateText, ...textStyle }}>{dateStr}</Text>
                {!nextdisabled &&
                    <Button
                        text=">"
                        onPress={() => this._getMonth(true)}
                        style={{ ...styles.btnStyle, ...btnStyle }}
                        textStyle={{ ...styles.dateText, ...textStyle }} />
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: adap.w(3),
        borderColor: '#ddd',
        borderRadius: adap.w(20),
        width: adap.w(220),
        height: adap.h(70),
        backgroundColor: '#fff',
    },
    dateText: {
        fontSize: adap.font(24),
        color: '#666'
    },
    btnStyle: {
        borderWidth: 0,
        paddingLeft: adap.w(23),
        paddingRight: adap.w(23),
        height: adap.h(70)
    }
});

DatePickerMonth.propTypes = {
    callback: PropTypes.func.isRequired,
    defaultDate: PropTypes.string,
    predisabled: PropTypes.bool,
    nextdisabled: PropTypes.bool,
    style: PropTypes.object,
    btnStyle: PropTypes.object,
    textStyle: PropTypes.object,
};
DatePickerMonth.defaultProps = {
    defaultDate: DateFormat.Format('yyyy-MM'),
}
