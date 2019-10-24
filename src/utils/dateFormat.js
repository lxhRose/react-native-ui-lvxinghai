const DateFormat = {
    _getMonth(str, isAdd) {
        let myDate = str ? new Date(str) : new Date();
        let month = myDate.getMonth();
        myDate.setMonth(isAdd ? (month + 1) : (month - 1));
        return this.Format('yyyy-MM', myDate);
    },
    Format(s = 'yyyy-MM-dd', obj = new Date()) {
        let _s = s; // 必须新定义一个变量来接收结果
        let Arr = [
            { id: 'yyyy', num: s.indexOf('yyyy') > -1 ? this.lowTen(obj.getFullYear()) : '' },
            { id: 'MM', num: s.indexOf('MM') > -1 ? this.lowTen(obj.getMonth() + 1) : '' },
            { id: 'dd', num: s.indexOf('dd') > -1 ? this.lowTen(obj.getDate()) : '' },
            { id: 'hh', num: s.indexOf('hh') > -1 ? this.lowTen(obj.getHours()) : '' },
            { id: 'mm', num: s.indexOf('mm') > -1 ? this.lowTen(obj.getMinutes()) : '' },
            { id: 'ss', num: s.indexOf('ss') > -1 ? this.lowTen(obj.getSeconds()) : '' },
        ];
        Arr.map((item) => {
            if (item.num != '')
                _s = _s.replace(item.id, `${item.num}`);
        });
        return _s;
    },
    lowTen(value) { // 对小于10 的数处理+0
        return value < 10 ? '0' + value.toString() : value.toString();
    }
}

export default DateFormat;
