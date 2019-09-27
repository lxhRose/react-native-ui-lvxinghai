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
const borderWidth = adap.w(1);

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldHead: [],
            HeightArr: [],
            bodyHeight: HEIGHT,
            openChildren: -1,
            showModalState: false,
            modalStyle: null,
            modalContent: null,
            _head: [],
            firstHead: []
        }
        this.rowRefArr = [];
        this.colRefArr = [];
        this.rowRefArrFirst = [];
        this.colRefArrFirst = [];
        this.befIndex = -1;
        this.Arr = [];
        this.clickRow = this.clickRow.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    showModal = (option) => {
        if (option) {
            const { modalStyle, modalContent } = option;
            this.setState({
                showModalState: !this.state.showModalState,
                modalStyle,
                modalContent
            });
        } else { // 关闭
            this.setState({ showModalState: false });
        }
    }

    changeBodyLayout = (event) => {
        this.setState({
            bodyHeight: event.nativeEvent.layout.height
        });
    }

    changeViewLayout = (event, index, head) => {
        const { fixedFirst } = this.props;
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
        // 设置行高
        this.rowRefArr[index].setNativeProps({
            style: {
                height: HeightArr[index] + borderWidth,
            }
        });
        // 设置单元格高度
        this.colRefArr[index].map((item) => {
            item && item.setNativeProps({
                style: {
                    height: HeightArr[index]
                }
            });
        });
        if (fixedFirst) {
            // 设置第一列行高
            this.rowRefArrFirst[index].setNativeProps({
                style: {
                    height: HeightArr[index] + borderWidth,
                }
            });
            // 设置第一列单元格高度
            this.colRefArrFirst[index].map((item) => {
                item && item.setNativeProps({
                    style: {
                        height: HeightArr[index]
                    }
                });
            });
        }
    }

    clickRow = (index) => {
        this.setState({
            openChildren: this.state.openChildren === index ? -1 : index
        });
    }

    _headColStyle = (headTextStyle, item) => {
        return {
            ...styles.headItem,
            ...headTextStyle,
            flex: item.flex || 1,
            width: item.width || (headTextStyle && headTextStyle.width) || 100
        }
    }

    // 表头
    creatHead = (head, otherStyle) => {
        const {
            headStyle,
            headTextStyle,
            hasBorder
        } = otherStyle;

        const _headStyle = {
            ...styles.head, ...headStyle
        };

        return React.createElement(View,
            {
                style: hasBorder === 'row' || hasBorder === 'all'
                    ? { ...styles.borderHeadRow, ..._headStyle }
                    : _headStyle
            },
            <View style={styles.wrap}>
                {head.map((item, _i) => {
                    let type = typeof item.name === 'string' ? Text : View;

                    return React.createElement(type,
                        {
                            key: item.id,
                            style: hasBorder === 'all'
                                ? {
                                    ...styles.borderCol,
                                    borderLeftWidth: _i === 0 ? borderWidth : 0,
                                    ...this._headColStyle(headTextStyle, item)
                                }
                                : this._headColStyle(headTextStyle, item)
                        },
                        item.name
                    )
                })}
            </View>
        )
    }

    // 表行
    creatRow = (row, index, head, otherStyle, isFirst) => {
        const {
            bodyRowStyle,
            evenRowColor,
            hasBorder
        } = otherStyle;
        return React.createElement(View,
            {
                key: index,
                style: hasBorder === 'row' || hasBorder === 'all'
                    ? { ...styles.borderRow } : null
            },
            <View>
                <View
                    ref={rowRef => {
                        isFirst
                            ? this.rowRefArrFirst[index] = rowRef
                            : this.rowRefArr[index] = rowRef
                    }}
                    style={{
                        ...styles.Row,
                        ...bodyRowStyle,
                        backgroundColor: index % 2 === 0 ? "" : evenRowColor
                    }}
                >
                    <View style={styles.wrap}>
                        {head.map((headItem, _i) =>
                            this.creatCol(row, index, head, headItem, _i, otherStyle, isFirst))}
                    </View>
                </View>
                {row.children && this.state.openChildren === index &&
                    this.creatChildren(row, otherStyle, isFirst)
                }
            </View>
        )
    }

    refCol = (colRef, index, _i, isFirst) => {
        if (this.befIndex !== index) this.Arr = [];
        this.befIndex = index;
        this.Arr[_i] = colRef;
        isFirst
            ? this.colRefArrFirst[index] = this.Arr
            : this.colRefArr[index] = this.Arr;
    }

    // 表单元格
    creatCol = (row, index, head, headItem, _i, otherStyle, isFirst) => {
        const {
            headTextStyle,
            bodyTextStyle,
            hasBorder
        } = otherStyle;
        const colStyle = {
            ...styles.rowItem,
            ...bodyTextStyle,
            ...row.rowBgStyle,
            ...headItem.bodyColStyle,
            flex: headItem.flex || 1,
            width: headItem.width || (headTextStyle && headTextStyle.width) || 100,
        }

        let type = null;
        headItem.render ? type = View : type = Text;

        return React.createElement(type,
            {
                key: headItem.id,
                ref: (colRef) => this.refCol(colRef, index, _i, isFirst),
                onLayout: (e) => this.changeViewLayout(e, index, head),
                style: hasBorder === 'all'
                    ? {
                        ...styles.borderCol,
                        borderLeftWidth: _i === 0 ? borderWidth : 0,
                        ...colStyle
                    }
                    : colStyle,
            },
            headItem.render ? headItem.render(row, index) : row[headItem.id]
        );
    }

    // 每行的子项
    creatChildren = (row, otherStyle, isFirst) => {
        const {
            childrenStyle,
            hasBorder
        } = otherStyle;
        return React.createElement(View,
            {
                style: {
                    height: 100,
                    borderWidth: borderWidth,
                    borderBottomWidth: hasBorder === 'row' || hasBorder === 'all' ? 0 : borderWidth,
                    borderColor: '#ddd',
                    ...childrenStyle
                }
            },
            <ScrollView>
                {!isFirst && row.children}
            </ScrollView>
        )
    }

    // 构造表格
    _createElement = (head, data, otherStyle, isFirst) => {
        const {
            bodyStyle,
            hasBorder,
            bodyTextStyle
        } = otherStyle;

        const {
            showModalState,
            modalStyle,
            modalContent
        } = this.state;

        const { fixedFirst } = this.props;

        return React.createElement(View,
            {
                style: { flex: 1, flexDirection: 'column' }
            },
            <View>
                {this.creatHead(head, otherStyle)}
                <View style={{
                    ...styles.body,
                    height: this.state.bodyHeight,
                    ...bodyStyle,
                }}>
                    <ScrollView>
                        {data.length > 0
                            ? <View onLayout={this.changeBodyLayout} style={{ paddingBottom: borderWidth * 2 }}>
                                {data.map((row, index) => this.creatRow(row, index, head, otherStyle, isFirst))}
                            </View>
                            : <Text style={hasBorder === 'all'
                                ? {
                                    ...styles.nullText,
                                    ...styles.nullTextBorder,
                                    ...styles.nullTextBorderOth,
                                    fontSize: bodyTextStyle && bodyTextStyle.fontSize || adap.font(41)
                                }
                                : hasBorder === 'row'
                                    ? {
                                        ...styles.nullText,
                                        ...styles.nullTextBorder,
                                        fontSize: bodyTextStyle && bodyTextStyle.fontSize || adap.font(41)
                                    }
                                    : { ...styles.nullText, fontSize: bodyTextStyle && bodyTextStyle.fontSize || adap.font(41) }
                            }>
                                暂无数据
                            </Text>
                        }
                    </ScrollView>
                </View>
                {!fixedFirst && showModalState &&
                    <View style={{ ...styles.modal, ...modalStyle }}>
                        {modalContent}
                    </View>
                }
            </View >
        )
    }

    componentDidMount = () => {
        this.resetHead(this.props);
    }

    componentWillReceiveProps = (props) => {
        this.resetHead(props);
    }

    resetHead = (props) => {
        const { fixedFirst, head } = props;
        if (!fixedFirst) return;

        let _head = [...head], firstHead = [];
        firstHead = _head.splice(0, 1);
        this.setState({
            _head,
            firstHead
        });
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
            hasBorder,
            fixedFirst
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

        const {
            _head,
            firstHead,
            showModalState,
            modalStyle,
            modalContent
        } = this.state;

        return React.createElement(View,
            {
                style: { ...style }
            },
            fixedFirst
                ? <View style={styles.wrapBox}>
                    <View
                        style={{
                            width: firstHead.length > 0 && firstHead[0].width
                                ? firstHead[0].width
                                : 100
                        }}>
                        {this._createElement(firstHead, data, otherStyle, true)}
                    </View>
                    <ScrollView horizontal>
                        {this._createElement(_head, data, otherStyle, false)}
                    </ScrollView>
                    {showModalState &&
                        <View style={{ ...styles.modal, ...modalStyle }}>
                            {modalContent}
                        </View>
                    }
                </View>
                : horizontal
                    ? <ScrollView horizontal>
                        {this._createElement(head, data, otherStyle, false)}
                    </ScrollView>
                    : this._createElement(head, data, otherStyle, false)
        )
    }
}

const styles = StyleSheet.create({
    wrapBox: {
        flex: 1,
        flexDirection: 'row'
    },
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    head: {
        height: HEIGHT,
        backgroundColor: '#3B7CFF',
    },
    headItem: {
        width: 100,
        height: '100%',
        padding: adap.h(42),
        fontSize: adap.font(41),
        lineHeight: adap.h(57),
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
        borderBottomWidth: borderWidth,
        borderColor: '#ddd',
    },
    nullTextBorderOth: {
        borderLeftWidth: borderWidth,
        borderRightWidth: borderWidth,
        borderColor: '#ddd',
    },
    borderRow: {
        borderBottomWidth: borderWidth,
        borderColor: '#ddd',
    },
    borderCol: {
        borderRightWidth: borderWidth,
        borderColor: '#ddd',
    },
    borderHeadRow: {
        borderTopWidth: borderWidth,
        borderBottomWidth: borderWidth,
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
    fixedFirst: PropTypes.bool,
};
