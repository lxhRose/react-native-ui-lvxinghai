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
            bodyHeight: HEIGHT,
            openChildrenArr: []
        }
        this.rowRefArr = [];
        this.clickRow = this.clickRow.bind(this);
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

    clickRow = (index) => {
        if (this.state.openChildrenArr.includes(index)) {
            this.setState({
                openChildrenArr: [...this.state.openChildrenArr].filter((item) => item !== index)
            });
        } else {
            this.setState({
                openChildrenArr: [...this.state.openChildrenArr, index]
            });
        }
    }

    _createElement = (head, data, otherStyle) => {
        const {
            headStyle,
            headTextStyle,
            bodyStyle,
            bodyRowStyle,
            bodyTextStyle,
            evenRowColor,
            childrenStyle,
            hasBorder
        } = otherStyle;
        return React.createElement(View,
            {
                style: { flex: 1, flexDirection: 'column' }
            },
            <View>
                <View style={hasBorder === 'row' || hasBorder === 'all'
                    ? { ...styles.borderHeadRow, ...styles.head, ...headStyle }
                    : { ...styles.head, ...headStyle }}
                >
                    <View style={styles.wrap}>
                        {head.map((item, _i) => {
                            return React.createElement(Text,
                                {
                                    key: item.id,
                                    style: hasBorder === 'all'
                                        ? {
                                            ...styles.headItem,
                                            ...headTextStyle,
                                            ...styles.borderCol,
                                            borderLeftWidth: _i === 0 ? adap.w(1) : 0,
                                            flex: item.flex || 1,
                                            width: item.width || (headTextStyle && headTextStyle.width) || 100
                                        }
                                        : {
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
                                            key: index,
                                            style: hasBorder === 'row' || hasBorder === 'all'
                                                ? { ...styles.borderRow } : null
                                        },
                                        <View>
                                            <View ref={rowRef => { this.rowRefArr[index] = rowRef }}
                                                style={{
                                                    ...styles.Row,
                                                    ...bodyRowStyle,
                                                    backgroundColor: index % 2 === 0 ? "" : evenRowColor
                                                }}
                                            >
                                                <View style={styles.wrap}>
                                                    {head.map((headItem, _i) => {
                                                        return React.createElement(View,
                                                            {
                                                                key: headItem.id,
                                                                style: hasBorder === 'all'
                                                                    ? {
                                                                        width: headItem.width || (headTextStyle && headTextStyle.width) || 100,
                                                                        height: '100%',
                                                                        flex: headItem.flex || 1,
                                                                        ...styles.borderCol,
                                                                        borderLeftWidth: _i === 0 ? adap.w(1) : 0,
                                                                        ...headItem.bodyColStyle
                                                                    }
                                                                    : {
                                                                        width: headItem.width || (headTextStyle && headTextStyle.width) || 100,
                                                                        height: '100%',
                                                                        flex: headItem.flex || 1,
                                                                        ...headItem.bodyColStyle
                                                                    },
                                                            },
                                                            headItem.render
                                                                ? headItem.render(row, index)
                                                                : <Text
                                                                    style={{
                                                                        ...styles.rowItem,
                                                                        ...bodyTextStyle,
                                                                        ...headItem.bodyColStyle
                                                                    }}
                                                                    onLayout={(e) => this.changeViewLayout(e, index, head)}
                                                                >
                                                                    {row[headItem.id]}
                                                                </Text>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                            {row.children && this.state.openChildrenArr.includes(index) &&
                                                <View style={{
                                                    height: 100,
                                                    borderWidth: adap.w(1),
                                                    borderBottomWidth: hasBorder === 'row' || hasBorder === 'all' ? 0 : adap.w(1),
                                                    borderColor: '#ddd',
                                                    ...childrenStyle
                                                }}>
                                                    <ScrollView>
                                                        {row.children}
                                                    </ScrollView>
                                                </View>
                                            }
                                        </View>
                                    )
                                })}
                            </View>
                            : <Text style={hasBorder === 'all'
                                ? { ...styles.nullText, ...styles.nullTextBorder, ...styles.nullTextBorderOth }
                                : hasBorder === 'row'
                                    ? { ...styles.nullText, ...styles.nullTextBorder }
                                    : styles.nullText
                            }>
                                暂无数据
                            </Text>
                        }
                    </ScrollView>
                </View>
            </View >
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
            evenRowColor,
            childrenStyle,
            hasBorder
        } = this.props;

        const otherStyle = {
            headStyle,
            headTextStyle,
            bodyStyle,
            bodyRowStyle,
            bodyTextStyle,
            evenRowColor,
            childrenStyle,
            hasBorder
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
    headItem: {
        width: 100,
        padding: adap.h(42),
        fontSize: adap.font(41),
        lineHeight: HEIGHT,
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
        width: "100%",
        padding: adap.h(42),
        fontSize: adap.font(41),
        lineHeight: adap.h(57),
        color: '#1C2024'
    },
    wrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nullText: {
        flex: 1,
        padding: adap.h(42),
        height: HEIGHT,
        textAlign: 'center',
        fontSize: adap.font(41),
        lineHeight: adap.h(57)
    },
    nullTextBorder: {
        borderBottomWidth: adap.w(1),
        borderColor: '#ddd',
    },
    nullTextBorderOth: {
        borderLeftWidth: adap.w(1),
        borderRightWidth: adap.w(1),
        borderColor: '#ddd',
    },
    borderRow: {
        borderBottomWidth: adap.w(1),
        borderColor: '#ddd',
    },
    borderCol: {
        borderRightWidth: adap.w(1),
        borderColor: '#ddd',
    },
    borderHeadRow: {
        borderTopWidth: adap.w(1),
        borderBottomWidth: adap.w(1),
        borderColor: '#ddd',
    }
});

Table.propTypes = {
    head: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    horizontal: PropTypes.bool,
    hasBorder: PropTypes.oneOf(['row', 'all']),
    style: PropTypes.object,
    headStyle: PropTypes.object,
    headTextStyle: PropTypes.object,
    bodyStyle: PropTypes.object,
    bodyRowStyle: PropTypes.object,
    bodyTextStyle: PropTypes.object,
    childrenStyle: PropTypes.object,
    evenRowColor: PropTypes.string,
};

