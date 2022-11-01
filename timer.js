/**
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
 
  // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
  return {
    totalWeek: 30, // 总周数：[1, 30]之间的整数
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
}