var dayjs = require('dayjs');

var dayOfYear = require('dayjs/plugin/dayOfYear');
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
dayjs.extend(dayOfYear);


export const handleTime = (startTime) => {
    if(!startTime) return;
    let now = dayjs();
    let old = dayjs(startTime);

    const year = now.year() - old.year();
    const month = now.month() - old.month();
    const week = now.week() - old.week();
    const date = now.dayOfYear() - old.dayOfYear();
    const hour = now.hour() - old.hour();
    const minute = now.minute() - old.minute();

    if(year > 0) {
        return `${year} năm trước`;
    } else if (month > 0 && date > 30) {
        return `${month} tháng trước`;
    } else if (week > 0) {
        return `${week} tuần trước`;
    } else if (date > 0) {
        return `${date} ngày trước`;
    } else if (hour > 0) {
        return `${hour} giờ trước`;
    }
    else if (minute > 0 ){
        return `${minute} phút trước`;
    }
    return "0 phút trước"
}