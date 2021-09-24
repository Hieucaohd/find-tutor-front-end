var dayjs = require('dayjs');

export const handleTime = (startTime) => {
    if(!startTime) return;
    let now = dayjs();
    let old = dayjs(startTime);
    const year = now.year() - old.year();
    const month = now.month() - old.month();
    const date = now.date() - old.date();
    const hour = now.hour() - old.hour();
    const minute = now.minute() - old.minute();
    if(year > 0) {
        return `${year} năm trước`;
    } else if (month > 0) {
        return `${month} tháng trước`;
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