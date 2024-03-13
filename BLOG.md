> 官方文档：[Docs](https://ldtu0m3md0.feishu.cn/docs/doccnhZPl8KnswEthRXUz8ivnhb "开发文档")
# 前言
本校小爱课程表导入有人适配了，但是我导入失败了。加群后很快就有大佬联系我，本着学习的目的，婉拒了大佬的帮助，赶紧学了学js准备适配。
我校是树维系统，相比其他系统尴尬就尴尬在这个系统在小爱课程表内置浏览器上兼容性垃圾，居然显示不出来课程表。
搞了几天之后，今天终于要接近成功了，吓得我赶紧发一篇CSDN。
# 开工
## provider
因为小爱显不出来课程表页面，因此得先发请求获取课程表数据。那怎么知道发什么数据呢？只能抓包看看。在电脑和手机上打开课表页面，抓包对比之后发现，获取课程信息是通过发送POST请求来实现的。
![电脑抓包比手机多的请求](https://img-blog.csdnimg.cn/20210321142554572.png)
其中，第12-16号请求是电脑比手机多发送的请求，其中第15号请求获取课程信息。因此我们只要模拟第15号请求即可。
观察15号请求，是个POST请求，其上传的数据中最重要的是semester.id和ids。前者表示学期，后者是唯一的学生ids。20212学期的semester.id是48，其他学期的id可以查看12号请求的响应来获取。（因此，之后每个学期都要改一下这个semester.id。当然也可以写进代码里判断，但是太麻烦了）

因此provider分为两个部分，一个是获取ids，另一个是发送POST请求。
### 1. 获取ids
通过在网页搜索ids的值，发现在如下片段中出现
```js
function searchTable(){
   		if(jQuery("#courseTableType").val()=="std"){
   			bg.form.addInput(form,"ids","1234567");
   		}else{
   			bg.form.addInput(form,"ids","12345");
   		}
       	bg.form.submit(form,"courseTableForStd!courseTable.action","contentDiv");
   	}
```
   std表示student，我们需要的是学生课表，因此发送的ids是第一个1234567，通过正则表达式匹配得到ids即可。但是在chrome测试时发现使用document.getElementByTagName('script')方法，经常无法得到上述代码所在的js片段，有时可以，有时不行。通过查阅资料与观察，发现事实上，这个片段在一个iframe里面，这个iframe里有一个完整的网页，因此可以获取iframe中的document再来查找一定可以找到。在手机上不知道能不能把这个放到iframe中，因此为了确保查到ids，使用了两种方法进行查找，分别是直接使用document.getElementByTagName()，另一种是获取iframe里的document之后再操作。
### 2 POST请求

查找到之后就可以发送POST请求了，使用XMLHTTPrequest即可。获取其返回的网页即可。本来想用jQuery，但是居然不能用。

## parser
解析主要是搞明白数据在网页的存储格式。以一个课程为例：

```javascript
var teachers = [{ id: 6484, name: "施鹏鹏", lab: false }, { id: 7357, name: "罗翔", lab: false }];//本课程所有老师
var actTeachers = [{ id: 7357, name: "罗翔", lab: false }];//这节课真正上课的老师
var assistant = _.filter(actTeachers, function (actTeacher) {
    return (_.where(teachers, { id: actTeacher.id, name: actTeacher.name, lab: actTeacher.lab }).length == 0) && (actTeacher.lab == true);
});
var assistantName = "";
if (assistant.length > 0) {
    assistantName = assistant[0].name;
    actTeachers = _.reject(actTeachers, function (actTeacher) {
        return _.where(assistant, { id: actTeacher.id }).length > 0;
    });
}
var actTeacherId = [];
var actTeacherName = [];
for (var i = 0; i < actTeachers.length; i++) {
    actTeacherId.push(actTeachers[i].id);
    actTeacherName.push(actTeachers[i].name);
}
activity = new TaskActivity(actTeacherId.join(','), actTeacherName.join(','), "13015(02365)", "网络营销", "8866", "新浪总部335", "00000111100000000000000000000000000000000000000000000", null, "", assistantName, "", "", "");//这里包含了课程名字和上课地址，后面的53个01字符串表示该周开课否（示例表示4-8周开课）
index = 2 * unitCount + 0;//2 * unitCount + 0   即第2天（周三）第0节课
table0.activities[index][table0.activities[index].length] = activity;
index = 2 * unitCount + 1;//  第2天（周三）第1节课
table0.activities[index][table0.activities[index].length] = activity;
```
想必结合注释大家能看懂。
搞明白了写解析就好办了。直接一通正则表达式就OK。

代码地址：<https://github.com/horizon86/MI-AICourseTable>

附上semester.id
```json
{"semesters":{"y0":[{"id":24,"schoolYear":"2003-2004","name":"1"},{"id":15,"schoolYear":"2003-2004","name":"2"}],"y1":[{"id":32,"schoolYear":"2004-2005","name":"1"},{"id":16,"schoolYear":"2004-2005","name":"2"}],"y2":[{"id":33,"schoolYear":"2005-2006","name":"1"},{"id":17,"schoolYear":"2005-2006","name":"2"}],"y3":[{"id":34,"schoolYear":"2006-2007","name":"1"},{"id":18,"schoolYear":"2006-2007","name":"2"}],"y4":[{"id":35,"schoolYear":"2007-2008","name":"1"},{"id":19,"schoolYear":"2007-2008","name":"2"}],"y5":[{"id":36,"schoolYear":"2008-2009","name":"1"},{"id":20,"schoolYear":"2008-2009","name":"2"}],"y6":[{"id":37,"schoolYear":"2009-2010","name":"1"},{"id":21,"schoolYear":"2009-2010","name":"2"}],"y7":[{"id":3,"schoolYear":"2010-2011","name":"1"},{"id":22,"schoolYear":"2010-2011","name":"2"}],"y8":[{"id":4,"schoolYear":"2011-2012","name":"1"},{"id":23,"schoolYear":"2011-2012","name":"2"}],"y9":[{"id":5,"schoolYear":"2012-2013","name":"1"},{"id":25,"schoolYear":"2012-2013","name":"2"}],"y10":[{"id":6,"schoolYear":"2013-2014","name":"1"},{"id":26,"schoolYear":"2013-2014","name":"2"}],"y11":[{"id":7,"schoolYear":"2014-2015","name":"1"},{"id":2,"schoolYear":"2014-2015","name":"2"}],"y12":[{"id":8,"schoolYear":"2015-2016","name":"1"},{"id":27,"schoolYear":"2015-2016","name":"2"}],"y13":[{"id":9,"schoolYear":"2016-2017","name":"1"},{"id":28,"schoolYear":"2016-2017","name":"2"}],"y14":[{"id":10,"schoolYear":"2017-2018","name":"1"},{"id":29,"schoolYear":"2017-2018","name":"2"}],"y15":[{"id":11,"schoolYear":"2018-2019","name":"1"},{"id":30,"schoolYear":"2018-2019","name":"2"}],"y16":[{"id":12,"schoolYear":"2019-2020","name":"1"},{"id":31,"schoolYear":"2019-2020","name":"2"}],"y17":[{"id":47,"schoolYear":"2020-2021","name":"1"},{"id":48,"schoolYear":"2020-2021","name":"2"}],"y18":[{"id":74,"schoolYear":"2021-2022","name":"1"},{"id":75,"schoolYear":"2021-2022","name":"2"}],"y19":[{"id":76,"schoolYear":"2022-2023","name":"1"},{"id":77,"schoolYear":"2022-2023","name":"2"}],"y20":[{"id":94,"schoolYear":"2023-2024","name":"1"},{"id":95,"schoolYear":"2023-2024","name":"2"}],"y21":[{"id":114,"schoolYear":"2024-2025","name":"1"},{"id":115,"schoolYear":"2024-2025","name":"2"}],"y22":[{"id":116,"schoolYear":"2025-2026","name":"1"},{"id":117,"schoolYear":"2025-2026","name":"2"}]}}
```

test