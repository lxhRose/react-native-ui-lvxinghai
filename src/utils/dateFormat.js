const DateFormat = {
    getTodayTimeStr() {
        let myDate = new Date();
        return DateFormat.format(myDate, true);
    },
    getToday() { // 今天
        let myDate = new Date();
        return DateFormat.format(myDate);
    },
    getToday2() { // 今天  yyyy-MM-dd
        let myDate = new Date();
        return DateFormat.format(myDate, false, true);
    },
    getWeek() {
        let myDate = new Date();
        let str = '星期';
        switch (myDate.getDay()) {
            case 0: str = str + '日'; break;
            case 1: str = str + '一'; break;
            case 2: str = str + '二'; break;
            case 3: str = str + '三'; break;
            case 4: str = str + '四'; break;
            case 5: str = str + '五'; break;
            case 6: str = str + '六'; break;
        }
        return str;
    },
    getTime() {
        let myDate = new Date();
        let hours = DateFormat.lowTen(myDate.getHours());
        let minutes = DateFormat.lowTen(myDate.getMinutes());
        return `${hours}:${minutes}`;
    },
    getYesterday() { // 昨天
        let myDate = new Date();
        myDate.setDate(myDate.getDate() - 1);

        return DateFormat.format(myDate);
    },
    getNowWeek() { //获取本周
        let myDate = new Date();
        let todayStr = DateFormat.format(myDate);
        let day = myDate.getDay();
        if (day === 0) { // 星期天
            myDate.setDate(myDate.getDate() - 6); // 周一
        } else {
            myDate.setDate(myDate.getDate() - day + 1); // 周一
        }
        let startStr = DateFormat.format(myDate);
        return [startStr, todayStr];
    },
    getNowMonth() { // 本月
        let myDate = new Date();
        let todayStr = DateFormat.format(myDate);
        myDate.setDate(1); // 从本月一号开始
        let startStr = DateFormat.format(myDate);
        return [startStr, todayStr];
    },
    getNowYear() { // 全年
        let myDate = new Date();
        let todayStr = DateFormat.format(myDate);
        myDate.setMonth(0, 1); // 从本年一月一号开始
        let startStr = DateFormat.format(myDate);
        return [startStr, todayStr];
    },
    format(myDate, needTime = false, type = false) {
        let year = myDate.getFullYear();
        let month = DateFormat.lowTen(myDate.getMonth() + 1);
        let date = DateFormat.lowTen(myDate.getDate());
        let hours = DateFormat.lowTen(myDate.getHours());
        let minutes = DateFormat.lowTen(myDate.getMinutes());
        let seconds = DateFormat.lowTen(myDate.getSeconds());

        if (needTime) {
            return `${year}-${month}-${date}  ${hours}:${minutes}:${seconds}`;
        } else if (type) {
            return `${year}-${month}-${date}`;
        } else {
            return `${year}年${month}月${date}日`;
        }
    },
    lowTen(value) { // 对小于10 的数处理+0
        return value < 10 ? '0' + value.toString() : value.toString();
    }
}

export default DateFormat;
