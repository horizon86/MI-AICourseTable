/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */



async function scheduleTimer({
    providerRes,
    parserRes
} = {}) {
    // 支持异步操作 推荐await写法

    // 这个函数中也支持使用 AIScheduleTools 譬如给出多条时间配置让用户选择之类的

    ret = {
        //   totalWeek: 25, // 总周数：[1, 30]之间的整数
        //   startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: true, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 4, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
            section: 1,
            startTime: "08:30",
            endTime: "09:15"
        },
        {
            section: 2,
            startTime: "09:20",
            endTime: "10:05"
        },
        {
            section: 3,
            startTime: "10:25",
            endTime: "11:10"
        },
        {
            section: 4,
            startTime: "11:15",
            endTime: "12:00"
        },
        {
            section: 5,
            startTime: "13:30",
            endTime: "14:15"
        },
        {
            section: 6,
            startTime: "14:20",
            endTime: "15:05"
        },
        {
            section: 7,
            startTime: "15:25",
            endTime: "16:10"
        },
        {
            section: 8,
            startTime: "16:15",
            endTime: "17:00"
        },
        {
            section: 9,
            startTime: "18:30",
            endTime: "19:15"
        },
        {
            section: 10,
            startTime: "19:20",
            endTime: "20:05"
        },
        {
            section: 11,
            startTime: "20:25",
            endTime: "21:05"
        },
        {
            section: 12,
            startTime: "21:10",
            endTime: "22:00"
        }], // 课程时间表，注意：总长度要和上边配置的节数加和对齐
    }

    week_infos = getWeekInfo()

    if (null == week_infos) {
        return ret
    }

    ret.totalWeek = Number(week_infos[1])
    ret.startSemester = get_start_semester(week_infos[0])

    return ret

    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    // PS: 夏令时什么的还是让用户在夏令时的时候重新导入一遍吧，在这个函数里边适配吧！奥里给！————不愿意透露姓名的嘤某人
}

function parseToDOM(str) {
    // https://www.zhihu.com/question/20785073/answer/16175020
    var div = document.createElement("div");
    if (typeof str == "string")
        div.innerHTML = str;
    return div
}

function getWeekInfo() {
    let xhr = new XMLHttpRequest();
    let result = ''

    xhr.open('GET', '/eams/homeExt!main.action', false);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this.getAllResponseHeaders());
            result = this.responseText;
        }
    };

    try {
        xhr.send()
    } catch (error) {
        console.error(error)
        return null
    }

    div = parseToDOM(result)
    info_div = div.getElementsByClassName('info-box')[0].getElementsByTagName('div')[0]
    current_week = info_div.getElementsByTagName('span')[0].innerHTML
    total_week = info_div.getElementsByTagName('i')[0].innerHTML.replace('/', '')
    return [current_week, total_week]
}

function get_start_semester(current_week) {
    let today = new Date()
    let one_day = new Date('2022-09-02').getTime() - new Date('2022-09-01').getTime()
    start_time = today - (current_week - 1) * 7 * one_day - (today.getDay() - 1) * one_day
    start_date = new Date(start_time)
    start_date.setHours(0,0,0,0)
    return String(start_date.getTime())
}