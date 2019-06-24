import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import Radio from "./Radio/index";

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.defaultChecked ? this.props.defaultChecked : ''
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

        const { option } = this.props;

        return React.createElement(View,
            {
                style: { flex: 1, ...this.props.style }
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
                                            checked={checked.toString() === child.id.toString()}
                                            onChange={this.onChange}
                                            label={child.label} />
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
                                checked={checked.toString() === item.id.toString()}
                                onChange={this.onChange}
                                label={item.label} />
                        );
                    }
                })}
            </>
        );
    }
}

const styles = StyleSheet.create({
    Row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
