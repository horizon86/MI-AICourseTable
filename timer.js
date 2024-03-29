/**
 * author: 
 * https://github.com/horizon86
 * https://github.com/Zhaosn
 * opensource: github.com/horizon86/MI-AICourseTable
 
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  // 支持异步操作 推荐await写法

/* 
  // 这是一个示例函数，用于演示，正常用不到可以删掉
  const someAsyncFunc = () => new Promise(resolve => {
    setTimeout(() => resolve(), 1)
  })  
  await someAsyncFunc()

  // 这个函数中也支持使用 AIScheduleTools 譬如给出多条时间配置让用户选择之类的
 */
	function parseToDOM(str) {
			// https://www.zhihu.com/question/20785073/answer/16175020
			var div = document.createElement("div")
			if (typeof str == "string")
				div.innerHTML = str
			return div
		}
    function getWeekInfo() {
        let xhr = new XMLHttpRequest()
        let result = ''

        xhr.open('GET', '/eams/homeExt!main.action', false)
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                console.log(this.getAllResponseHeaders())
                result = this.responseText
            }
        }
        try {
            xhr.send()
        } catch (error) {
            console.error(error)
            return null
        }
        div = parseToDOM(result)
        info_div = div.getElementsByClassName('info-box')[0].getElementsByTagName('div')[0]
        current_week = info_div.getElementsByTagName('span')[0].innerHTML
        total_week = info_div.getElementsByTagName('i')[0].innerHTML.replace('/', '')//查看获取到的报文发现有两个 info-box 标签，但是貌似匹配的是第一个
		console.log([current_week, total_week])
        return [current_week, total_week]
    }
	function get_start_semester(current_week) {
        let today = new Date()//今天
        let one_day = new Date('2022-09-02').getTime() - new Date('2022-09-01').getTime()//一天的秒数？
        start_time = today - (current_week - 1) * 7 * one_day - (today.getDay() - 1) * one_day//今天减过去天数再减这周已过天数
        start_date = new Date(start_time)
        start_date.setHours(0, 0, 0, 0)
        return String(start_date.getTime())
    }

  // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
	ret = {
    //totalWeek: 30, // 总周数：[1, 30]之间的整数
    startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
    showWeekend: false, // 是否显示周末
    forenoon: 4, // 上午课程节数：[1, 10]之间的整数
    afternoon: 4, // 下午课程节数：[0, 10]之间的整数
    night: 4, // 晚间课程节数：[0, 10]之间的整数
    sections: [{
		section: 1, // 节次：[1, 30]之间的整数
		startTime: '08:30', // 开始时间：参照这个标准格式5位长度字符串
		endTime:   '09:15' // 结束时间：同上
		},
		{section: 2,
		startTime: '9:20',
		endTime:   '10:05'},
		{section: 3,
		startTime: '10:25',
		endTime:   '11:10'},
		{section: 4,
		startTime: '11:15',
		endTime:   '12:00'},
		{section: 5,
		startTime: '13:30',
		endTime:   '14:15'},
		{section: 6,
		startTime: '14:20',
		endTime:   '15:05'},
		{section: 7,
		startTime: '15:25',
		endTime:   '16:10'},
		{section: 8,
		startTime: '16:15',
		endTime:   '17:00'},
		{section: 9,
		startTime: '18:30',
		endTime:   '19:15'},
		{section: 10,
		startTime: '19:20',
		endTime:   '20:05'},
		{section: 11,
		startTime: '20:10',
		endTime:   '20:55'},
		{section: 12,
		startTime: '21:00',
		endTime:   '21:45'},

    ] // 课程时间表，注意：总长度要和上边配置的节数加和对齐
  }
	week_infos = getWeekInfo()
	if (null == week_infos) {
		return ret
	}
	ret.totalWeek = Number(week_infos[1])
	ret.startSemester = get_start_semester(week_infos[0])
	return ret
}