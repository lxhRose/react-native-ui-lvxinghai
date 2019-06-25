import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import adap from '../../utils/adaptation';
import PropTypes from 'prop-types';

const HEIGHT = adap.h(141);

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldHead: [],
            HeighrArr: []
        }
        this.rowRefArr = [];
    }

    changeViewLayout = (event, index, head) => {
        const { oldHead, HeighrArr } = this.state;
        if (oldHead !== head) { // 不同table，初始化
            this.setState({
                oldHead: head,
                HeighrArr: []
            });
        }

        const _height = event.nativeEvent.layout.height,
            oldHeight = HeighrArr[index];

        if (oldHeight) {
            HeighrArr[index] = _height > oldHeight ? _height : oldHeight;
        } else {
            HeighrArr[index] = _height;
        }

        this.rowRefArr[index].setNativeProps({
            style: {
                height: HeighrArr[index],
            }
        });
    }

    _createElement = (head, data, otherStyle) => {
        const {
            headStyle,
            headTextStyle,
            bodyStyle,
            bodyRowStyle,
            bodyTextStyle
        } = otherStyle;
        return React.createElement(View,
            {
                style: { flex: 1, flexDirection: 'column' }
            },
            <View>
                <View style={{ ...styles.head, ...headStyle }}>
                    <View style={styles.wrap}>
                        {head.map((item) => {
                            return React.createElement(Text,
                                {
                                    key: item.id,
                                    style: {
                                        ...styles.Item,
                                        ...styles.headItem,
                                        ...headTextStyle,
                                        flex: item.flex || 1,
                                        width: item.width || headTextStyle.width || 100
                                    }
                                },
                                item.name
                            )
                        })}
                    </View>
                </View>
                <View style={{
                    ...styles.body,
                    height: data.length * HEIGHT,
                    ...bodyStyle
                }}>
                    <ScrollView>
                        {data.length > 0
                            ? <View>
                                {data.map((row, index) => {
                                    return React.createElement(View,
                                        {
                                            style: { ...styles.Row, ...bodyRowStyle },
                                            ref: rowRef => { this.rowRefArr[index] = rowRef },
                                            key: index
                                        },
                                        <View style={styles.wrap}>
                                            {head.map((headItem) => {
                                                return React.createElement(Text,
                                                    {
                                                        key: headItem.id,
                                                        style: {
                                                            ...styles.Item,
                                                            ...styles.rowItem,
                                                            ...bodyTextStyle,
                                                            flex: headItem.flex || 1,
                                                            width: headItem.width || headTextStyle.width || 100
                                                        },
                                                        onLayout: (e) => this.changeViewLayout(e, index, head)
                                                    },
                                                    row[headItem.id]
                                                )
                                            })}
                                        </View>
                                    )
                                })}
                            </View>
                            : <Text style={styles.nullText}>
                                暂无数据
                        </Text>
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }

    render() {
        const {
            head,
            data,
            style,
            otherStyle,
            horizontal,
        } = this.props;

        return React.createElement(View,
            {
                style: { ...style }
            },
            horizontal
                ? <ScrollView horizontal>
                    {this._createElement(head, data, otherStyle)}
                </ScrollView>
                : this._createElement(head, data, otherStyle)
        )
    }
}

const styles = StyleSheet.create({
    head: {
        height: HEIGHT,
        backgroundColor: '#3B7CFF',
    },
    Item: {
        flex: 1,
        padding: adap.h(42),
        width: 100,
        fontSize: adap.font(41),
        lineHeight: adap.h(57),
    },
    headItem: {
        color: '#fff',
    },
    body: {
        minHeight: HEIGHT,
        backgroundColor: '#fff',
    },
    Row: {
        height: HEIGHT,
    },
    rowItem: {
        color: '#1C2024'
    },
    wrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nullText: {
        height: HEIGHT,
        flex: 1,
        textAlign: 'center',
        padding: adap.h(42),
        fontSize: adap.font(41),
        lineHeight: adap.h(57)
    }
});

Table.propTypes = {
    head: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    horizontal: PropTypes.bool,
    style: PropTypes.object,
    otherStyle: PropTypes.objectOf(PropTypes.object),
};

// 指定 props 的默认值：
Table.defaultProps = {
    otherStyle: {
        headStyle: {},
        headTextStyle: {},
        bodyStyle: {},
        bodyRowStyle: {},
        bodyTextStyle: {}
    }
};
