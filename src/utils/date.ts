/**
 * Developer    :   SongQian
 * Time         :   2020-04-21
 * eMail        :   onlylove1172559463@vip.qq.com
 * description  :   时间公共函数
 */

/**
 * 格式化时间格式, y 年份、M 月份、d 天、 h 小时、 m 分钟、 s 秒钟、 S 毫秒.  yyyy-MM-dd hh:mm:ss.SSS 标准格式化.
 * @param date Date 对象
 * @param format yyyy-MM-dd hh:mm:ss.SSS 标准格式化
 * @param isFullHour 格式化是否24小时制
 * @returns 
 */
export function formatDateTime(date : Date, format : string = "yyyy-MM-dd hh:mm:ss.SSS", isFullHour : boolean = true) {
    date = date || new Date();
    const year = date.getFullYear();
    const month =  date.getMonth() + 1;
    const day = date.getDate();
    const hour = isFullHour ? date.getHours() : (date.getHours() % 12 === 0 && date.getHours() !== 0 ? 12 : date.getHours() % 12);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return format.replace(/(y+)/g, function(val) { return (Array(val.length).join('0') + year).slice(-val.length) }).
        replace(/(M+)/g, function(val) { return (Array(val.length).join('0') + month).slice(-val.length) }).
        replace(/(d+)/g, function(val) { return (Array(val.length).join('0') + day).slice(-val.length) }).
        replace(/(h+)/g, function(val) { return  (Array(val.length).join('0') + hour).slice(-val.length) }).
        replace(/(m+)/g, function(val) { return (Array(val.length).join('0') + minutes).slice(-val.length) }).
        replace(/(s+)/g, function(val) { return (Array(val.length).join('0') + seconds).slice(-val.length) }).
        replace(/(S+)/g, function(val) { return (Array(val.length).join('0') + milliseconds).slice(-val.length) });
}

/**
 * 判断是否为上午， 返回值是Boolean类型， true === 上午， false === 下午。
 * @param date Date 对象
 * @returns 是否为上午， true 上午， false 下午。
 */
export function isAM(date : Date) : boolean {
    date = date || new Date();
    return date.getHours() <= 12;
}

/**
 * 获取当前时间是一周中的星期几
 * @param date Date 对象
 * @returns 0-6 0 是周日，1-6分别是周一至周六。
 */
export function getWeek(date: Date) : number {
    date = date || new Date();
    return date.getDay();
}

/**
 * 是否当前时间是否闰年
 * @param date Date 对象
 * @returns true 闰年, false 非闰年
 */
export function isLeapYear(date: Date) : boolean {
    const year = date.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 通过增加时间改变当前时间, y 年份、M 月份、d 天、 h 小时、 m 分钟、 s 秒钟、 S 毫秒.
 * @param date 当前时间
 * @param value 修改值
 * @param unit 位 y 年份、M 月份、d 天、 h 小时、 m 分钟、 s 秒钟、 S 毫秒.
 * @returns 新的时间
 */
export function add(date: Date, value : number, unit : string) : Date {
    var newDate = date.getTime();
    if (unit === 'S') {
        newDate += value;
    }

    if (unit === 's') {
        newDate += (1000 * value);
    }

    if (unit === 'm') {
        newDate += (1000 * 60 * value);
    }

    if (unit === 'h') {
        newDate += (1000 * 60 * 60 * value);
    }

    if (unit === 'd') {
        newDate += (1000 * 60 * 60 * 24 * value);
    }

    if (unit === 'M') {
        let currYear = date.getFullYear();
        let currM = date.getMonth();
        let m = new Array(value).fill(0).map(function(it, i) {
            let curr = 0;
            let m = (currM + i) % 12;
            if (m === 0 && i !== 0) {
                currYear += 1;
                const month = [31, (isLeapYear(new Date(currYear, 1, 1)) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                curr = (1000 * 60 * 60 * 24 * month[m]);
            } else {
                const month = [31, (isLeapYear(new Date(currYear, 1, 1)) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                curr = (1000 * 60 * 60 * 24 * month[m]);
            }
            return curr;
        }).reduce(function(prev, curr) {
            return prev + (curr || 0);
        })
        newDate += m;
    }

    if (unit === 'y') {
        let currYear = date.getFullYear();
        let m = new Array(value).fill(0).map(function(it, i) {
            let days = isLeapYear(new Date(currYear + i, 1, 1)) ? 366 : 365;
            return (1000 * 60 * 60 * 24 * days);
        }).reduce(function(prev, curr) {
            return prev + (curr ||0);
        })
        newDate += m;
    }

    return new Date(newDate);
}

/**
 * 通过减少时间改变当前时间, y 年份、M 月份、d 天、 h 小时、 m 分钟、 s 秒钟、 S 毫秒.
 * @param date 当前时间
 * @param value 修改值
 * @param unit 单位 y 年份、M 月份、d 天、 h 小时、 m 分钟、 s 秒钟、 S 毫秒.
 * @returns  新的时间
 */
export function subtract(date: Date, value: number, unit: string): Date {
    var newDate = date.getTime();
    if (unit === 'S') {
        newDate -= value;
    }

    if (unit === 's') {
        newDate -= (1000 * value);
    }

    if (unit === 'm') {
        newDate -= (1000 * 60 * value);
    }

    if (unit === 'h') {
        newDate -= (1000 * 60 * 60 * value);
    }

    if (unit === 'd') {
        newDate -= (1000 * 60 * 60 * 24 * value);
    }

    if (unit === 'M') {
        let currYear = date.getFullYear();
        let currM = date.getMonth();
        let m = new Array(value).fill(0).map(function(it, i) {
            let curr = 0;
            let m = ((currM - i) % 12) < 0 ? 11 + ((currM - i) % 12) : ((currM - i) % 12);
            if ( m === 11 && i !== 0) {
                currYear -= 1;
                const month = [31, (isLeapYear(new Date(currYear, 1, 1)) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                curr = (1000 * 60 * 60 * 24 * month[m]);
            } else {
                const month = [31, (isLeapYear(new Date(currYear, 1, 1)) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                curr = (1000 * 60 * 60 * 24 * month[m]);
            }
            return curr;
        }).reduce(function(prev, curr) {
            return prev + (curr || 0);
        })
        newDate -= m;
    }

    if (unit === 'y') {
        let currYear = date.getFullYear();
        let m = new Array(value).fill(0).map(function(it, i) {
            let days = isLeapYear(new Date(currYear - i, 1, 1)) ? 366 : 365;
            return (1000 * 60 * 60 * 24 * days);
        }).reduce(function(prev, curr) {
            return prev + (curr ||0);
        })
        newDate -= m;
    }

    return new Date(newDate);
}

/**
 * 初始化一个新的时间， y 年份、M 月份、d 天、 h 小时、 m 分钟、 s 秒钟、 S 毫秒.
 * @param date 当前时间
 * @param value 修改值, 支持负值，如： -1 当前的时间减 1 个单位值
 * @param unit 单位 y 年份、M 月份、d 天、 h 小时、 m 分钟、 s 秒钟、 S 毫秒.
 * @returns  新的时间
 */
export function setDateTime(date: Date, value: number, unit: string) : Date {
    var timestamp = date.getTime();
    if (unit === 'S') {
        timestamp = (timestamp / 1000 >> 0) * 1000 + value;
    }

    if (unit === 's') {
        timestamp = ((timestamp / (1000 * 60)) >> 0) * (1000 * 60) + 1000 * value;
    }

    if (unit === 'm') {
        timestamp = ((timestamp / (1000 * 60 * 60)) >> 0) * (1000 * 60 * 60) + (1000 * 60 * value);
    }

    if (unit === 'h') {
        timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), value, 0, 0).getTime();
    }

    if (unit === 'd') {
        timestamp = new Date(date.getFullYear(), date.getMonth(), value, 0, 0, 0).getTime();
    }

    if (unit === 'M') {
        timestamp = new Date(date.getFullYear(), value, 1, 0, 0, 0).getTime();
    }

    if (unit === 'y') {
        timestamp = new Date(value, 0, 1, 0, 0, 0).getTime();
    }

    return new Date(timestamp);
}