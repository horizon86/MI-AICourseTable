/**
 * 更新日志:
 * 1. 修复正则表达式的错误，之前会少匹配一节课
 * 2. 增加了注释，删除了无关变量
 * 
 */
function scheduleHtmlParser(html){
    let result = []

    //匹配一节课的信息,两个 var teachers = 之间的全部内容
    var segmentReg = /var[ \t]*teachers[\t ]*=[\t ]*[\s\S]*?(?=table0\.activities\[index\]\[table0\.activities\[index\]\.length\][ \t]*=[\t ]*activity;[\r\n\t ]*[vt])/g

    //直接匹配到老师的名字
    var actTeacherReg = /(?<=var[ \t]*actTeachers[ \t]*=.*name:[ \t]*\").*?(?=\")/

    //匹配课程名字（假定课程名字之前都是   5位数字(5位数字)  的格式
    var nameReg = /(?<=activity[\t ]*=[ \t]*new[\t ]*TaskActivity\(.*\"[0-9]{5}\([0-9]{5}\)\"[\t ]*,[\t ]*\").*?(?=\")/

    //匹配教室（假定教室前都是在第7个双引号之后
    var roomReg = /(?<=activity[\t ]*=[\t ]*new[\t ]*TaskActivity\(([^"]*?\"){7})[^"]*?(?=\")/

    var weekReg = /(?<=\")[0-1]{53}(?=\")/

    //index = 0 * unitCount + 8;
    var sectionLineReg=/index[\t ]*=[\t ]*[0-6][\t ]*\*[\t ]*unitCount[\t ]*\+[\t ]*[0-9][0-1]?[\t ]*;/g

    //从sectionReg提取的行中匹配   上例匹配  0
    var dayReg = /(?<=index[\t ]*=[\t ]*)[0-6](?=[\t ]*\*)/

    //从sectionReg提取的行中匹配   上例匹配  8
    var timeReg = /(?<=index[\t ]*=[\t ]*.*?unitCount[\t ]*\+[\t ]*)[0-9][0-1]?/


    var mhtml =String(html);

    var segs = mhtml.match(segmentReg);
    for (let seg_index = 0; seg_index < segs.length; seg_index++) {
        const seg = segs[seg_index];
        let re={name: String,position:String,teacher: String,weeks:[],day:Number,sections:[]}
        re.name = seg.match(nameReg)[0];
        re.position = seg.match(roomReg)[0];
        re.teacher = seg.match(actTeacherReg)[0];
        re.day = Number(seg.match(dayReg)[0]) + 1;//1 is Monday or 0 is Monday? 0-6 to 1-7
        let week = seg.match(weekReg)[0];
        for (let i = 0; i < week.length; i++) {
            if(week[i] == '1'){
                re.weeks.push(i);
            }
        }

        var sectionLines = seg.match(sectionLineReg);
        for (let section_index = 0; section_index < sectionLines.length; section_index++) {
            const secLine = sectionLines[section_index];
            let sec = null
            sec = Number(secLine.match(timeReg)[0]) + 1; // 0-11 to 1-12
            re.sections.push(sec);
        }
        result.push(re);
    }
    return result;
}