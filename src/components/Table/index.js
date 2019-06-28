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
            HeightArr: [],
            bodyHeight: HEIGHT
        }
        this.rowRefArr = [];
    }

    changeBodyLayout = (event) => {
        this.setState({
            bodyHeight: event.nativeEvent.layout.height
        });
    }

    changeViewLayout = (event, index, head) => {
        const { oldHead, HeightArr } = this.state;
        if (oldHead !== head) { // 不同table，初始化
            this.setState({
                oldHead: head,
                HeightArr: []
            });
        }

        const _height = event.nativeEvent.layout.height,
            oldHeight = HeightArr[index];

        if (oldHeight) {
            HeightArr[index] = _height > oldHeight ? _height : oldHeight;
        } else {
            HeightArr[index] = _height;
        }

        this.rowRefArr[index].setNativeProps({
            style: {
                height: HeightArr[index],
            }
        });
    }

    _createElement = (head, data, otherStyle) => {
        const {
            headStyle,
            headTextStyle,
            bodyStyle,
            bodyRowStyle,
            bodyTextStyle,
            evenRowColor
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
                                        width: item.width || (headTextStyle && headTextStyle.width) || 100
                                    }
                                },
                                item.name
                            )
                        })}
                    </View>
                </View>
                <View style={{
                    ...styles.body,
                    height: this.state.bodyHeight,
                    ...bodyStyle
                }}>
                    <ScrollView>
                        {data.length > 0
                            ? <View onLayout={this.changeBodyLayout}>
                                {data.map((row, index) => {
                                    return React.createElement(View,
                                        {
                                            style: {
                                                ...styles.Row,
                                                ...bodyRowStyle,
                                                backgroundColor: index % 2 === 0 ? "" : evenRowColor
                                            },
                                            ref: rowRef => { this.rowRefArr[index] = rowRef },
                                            key: index
                                        },
                                        <View style={styles.wrap}>
                                            {head.map((headItem) => {
                                                return React.createElement(View,
                                                    {
                                                        key: headItem.id,
                                                        style: {
                                                            width: headItem.width || (headTextStyle && headTextStyle.width) || 100,
                                                            flex: headItem.flex || 1,
                                                        }
                                                    },
                                                    headItem.render
                                                        ? headItem.render(row)
                                                        : <Text
                                                            style={{
                                                                ...styles.Item,
                                                                ...styles.rowItem,
                                                                ...bodyTextStyle,
                                                            }}
                                                            onLayout={(e) => this.changeViewLayout(e, index, head)}
                                                        >
                                                            {row[headItem.id]}
                                                        </Text>
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
            horizontal,
            headStyle,
            headTextStyle,
            bodyStyle,
            bodyRowStyle,
            bodyTextStyle,
            evenRowColor
        } = this.props;

        const otherStyle = {
            headStyle,
            headTextStyle,
            bodyStyle,
            bodyRowStyle,
            bodyTextStyle,
            evenRowColor
        }

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
        padding: adap.h(42),
        width: 100,
        fontSize: adap.font(41),
        lineHeight: adap.h(57)
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
    headStyle: PropTypes.object,
    headTextStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    bodyRowStyle: PropTypes.object,
    bodyTextStyle: PropTypes.object,
    evenRowColor: PropTypes.string,
};

