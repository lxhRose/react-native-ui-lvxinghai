import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Radio from "./../Radio/index";
import PropTypes from 'prop-types';

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: ''
        }
    }

    onChange = (id) => {
        this.setState({
            checked: id
        }, () => {
            this.props.onChange(this.state.checked);
        });
    }

    isArray = (obj) => {
        return Object.prototype.toString.call(obj).slice(8, -1) === 'Array';
    }

    render() {
        const {
            checked
        } = this.state;

        const { option, defaultChecked } = this.props;

        return React.createElement(View,
            {
                style: { ...styles.RadioGroup, ...this.props.style }
            },
            <>
                {option.map((item, index) => {
                    if (this.isArray(item)) { // 分组横向排列
                        return React.createElement(View,
                            {
                                key: index,
                                style: styles.Row
                            },
                            <>
                                {item.map((child, _index) => {
                                    return React.createElement(View,
                                        {
                                            key: _index,
                                            style: { flex: child.flex ? child.flex : 1 }
                                        },
                                        <Radio
                                            id={child.id}
                                            defaultChecked={defaultChecked === child.id.toString()}
                                            onChange={() => this.onChange(child.id)}
                                            label={child.label}
                                            groupCheckedId={checked}
                                            style={child.style}
                                            radioColor={child.radioColor} />
                                    );
                                })}
                            </>
                        )
                    } else { // 竖直排列
                        return React.createElement(View,
                            {
                                key: index,
                                style: { flex: item.flex ? item.flex : 1 }
                            },
                            <Radio
                                id={item.id}
                                defaultChecked={defaultChecked === item.id.toString()}
                                onChange={() => this.onChange(item.id)}
                                label={item.label}
                                style={item.style}
                                radioColor={item.radioColor} />
                        );
                    }
                })}
            </>
        );
    }
}

const styles = StyleSheet.create({
    RadioGroup: {
        width: 100,
        height: 50,
    },
    Row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

RadioGroup.propTypes = {
    option: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.string,
    style: PropTypes.object,
};
