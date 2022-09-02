const semester_ids = {
    "semesters": {
        "y0": [
            {
                "id": 24,
                "schoolYear": "2003-2004",
                "name": "1"
            },
            {
                "id": 15,
                "schoolYear": "2003-2004",
                "name": "2"
            }
        ],
        "y1": [
            {
                "id": 32,
                "schoolYear": "2004-2005",
                "name": "1"
            },
            {
                "id": 16,
                "schoolYear": "2004-2005",
                "name": "2"
            }
        ],
        "y2": [
            {
                "id": 33,
                "schoolYear": "2005-2006",
                "name": "1"
            },
            {
                "id": 17,
                "schoolYear": "2005-2006",
                "name": "2"
            }
        ],
        "y3": [
            {
                "id": 34,
                "schoolYear": "2006-2007",
                "name": "1"
            },
            {
                "id": 18,
                "schoolYear": "2006-2007",
                "name": "2"
            }
        ],
        "y4": [
            {
                "id": 35,
                "schoolYear": "2007-2008",
                "name": "1"
            },
            {
                "id": 19,
                "schoolYear": "2007-2008",
                "name": "2"
            }
        ],
        "y5": [
            {
                "id": 36,
                "schoolYear": "2008-2009",
                "name": "1"
            },
            {
                "id": 20,
                "schoolYear": "2008-2009",
                "name": "2"
            }
        ],
        "y6": [
            {
                "id": 37,
                "schoolYear": "2009-2010",
                "name": "1"
            },
            {
                "id": 21,
                "schoolYear": "2009-2010",
                "name": "2"
            }
        ],
        "y7": [
            {
                "id": 3,
                "schoolYear": "2010-2011",
                "name": "1"
            },
            {
                "id": 22,
                "schoolYear": "2010-2011",
                "name": "2"
            }
        ],
        "y8": [
            {
                "id": 4,
                "schoolYear": "2011-2012",
                "name": "1"
            },
            {
                "id": 23,
                "schoolYear": "2011-2012",
                "name": "2"
            }
        ],
        "y9": [
            {
                "id": 5,
                "schoolYear": "2012-2013",
                "name": "1"
            },
            {
                "id": 25,
                "schoolYear": "2012-2013",
                "name": "2"
            }
        ],
        "y10": [
            {
                "id": 6,
                "schoolYear": "2013-2014",
                "name": "1"
            },
            {
                "id": 26,
                "schoolYear": "2013-2014",
                "name": "2"
            }
        ],
        "y11": [
            {
                "id": 7,
                "schoolYear": "2014-2015",
                "name": "1"
            },
            {
                "id": 2,
                "schoolYear": "2014-2015",
                "name": "2"
            }
        ],
        "y12": [
            {
                "id": 8,
                "schoolYear": "2015-2016",
                "name": "1"
            },
            {
                "id": 27,
                "schoolYear": "2015-2016",
                "name": "2"
            }
        ],
        "y13": [
            {
                "id": 9,
                "schoolYear": "2016-2017",
                "name": "1"
            },
            {
                "id": 28,
                "schoolYear": "2016-2017",
                "name": "2"
            }
        ],
        "y14": [
            {
                "id": 10,
                "schoolYear": "2017-2018",
                "name": "1"
            },
            {
                "id": 29,
                "schoolYear": "2017-2018",
                "name": "2"
            }
        ],
        "y15": [
            {
                "id": 11,
                "schoolYear": "2018-2019",
                "name": "1"
            },
            {
                "id": 30,
                "schoolYear": "2018-2019",
                "name": "2"
            }
        ],
        "y16": [
            {
                "id": 12,
                "schoolYear": "2019-2020",
                "name": "1"
            },
            {
                "id": 31,
                "schoolYear": "2019-2020",
                "name": "2"
            }
        ],
        "y17": [
            {
                "id": 47,
                "schoolYear": "2020-2021",
                "name": "1"
            },
            {
                "id": 48,
                "schoolYear": "2020-2021",
                "name": "2"
            }
        ],
        "y18": [
            {
                "id": 74,
                "schoolYear": "2021-2022",
                "name": "1"
            },
            {
                "id": 75,
                "schoolYear": "2021-2022",
                "name": "2"
            }
        ],
        "y19": [
            {
                "id": 76,
                "schoolYear": "2022-2023",
                "name": "1"
            },
            {
                "id": 77,
                "schoolYear": "2022-2023",
                "name": "2"
            }
        ],
        "y20": [
            {
                "id": 94,
                "schoolYear": "2023-2024",
                "name": "1"
            },
            {
                "id": 95,
                "schoolYear": "2023-2024",
                "name": "2"
            }
        ],
        "y21": [
            {
                "id": 114,
                "schoolYear": "2024-2025",
                "name": "1"
            },
            {
                "id": 115,
                "schoolYear": "2024-2025",
                "name": "2"
            }
        ],
        "y22": [
            {
                "id": 116,
                "schoolYear": "2025-2026",
                "name": "1"
            },
            {
                "id": 117,
                "schoolYear": "2025-2026",
                "name": "2"
            }
        ]
    }
}
// 返回的和上面的 semester_ids 格式相同
function get_semester_ids() {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/eams/dataQuery.action', false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    data = 'dataType=semesterCalendar'
    let result = null
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this.getAllResponseHeaders());
            result = this.responseText
        }
    };

    try {
        xhr.send(data)
    } catch (error) {
        console.error(error)
        return null
    }
    result = 'tmp_djc_obj=' + result.trim()
    eval(result)
    // result = JSON.parse(result)
    return {
        semesters: tmp_djc_obj.semesters
    }
}

function getids_noiframe(dom = document) {

    var scripts = dom.getElementsByTagName("script");

    for (let index = 0; index < scripts.length; index++) {
        const element = scripts[index].innerHTML;
        // 提取ids的正则表达式
        const regx_ids = /\(form.*\"ids\",.*\"[0-9]*\"\)/;
        var result = element.match(regx_ids);
        //  console.log(element);

        if (result != null) {
            //匹配到的话就返回ids
            console.log(result[0]);
            var ids = result[0].match(/[0-9]+/);
            if (ids != null) {
                return ids[0];
            }
        }
    }
    return null;

}

function getids(dom = document, smethod = 0, errOut = false) {
    var a = dom.getElementById("iframeMain").contentWindow.document
    var scripts = a.getElementsByTagName('script');

    console.log(typeof (smethod));
    console.log("查找节点结束");

    for (let index = 0; index < scripts.length; index++) {
        const element = scripts[index].innerHTML;
        // 提取ids的正则表达式
        const regx_ids = /\(form.*\"ids\",.*\"[0-9]*\"\)/;
        var result = element.match(regx_ids);
        if (errOut)
            console.log(element);

        if (result != null) {
            //匹配到的话就返回ids
            var ids = result[0].match(/[0-9]+/);
            if (ids != null) {
                return ids[0];
            }
        }
    }
    return null;
}

function fetch_ids_from_network(dom = document) {

    let xhr = new XMLHttpRequest()
    xhr.open('GET', '/eams/courseTableForStd.action', false)
    xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')

    let result = null

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

    const regx_ids = /\(form.*\"ids\",.*\"[0-9]*\"\)/;

    let res = result.match(regx_ids)

    if (res != null) {
        //匹配到的话就返回ids
        console.log(res[0])
        let ids = res[0].match(/[0-9]+/);
        if (ids != null) {
            return ids[0];
        }
    }
    return null
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function get_start_semester(current_week) {
    let today = new Date()
    let one_day = new Date('2022-09-02').getTime() - new Date('2022-09-01').getTime()
    start_time = today - (current_week - 1) * 7 * one_day - (today.getDay() - 1) * one_day
    start_date = new Date(start_time)
    start_date.setHours(0, 0, 0, 0)
    return start_date
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
    xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
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

async function getSemesterId(dom = document) {
    // 在debugger中无法获得 _semester_id , 不知道为什么
    let week_infos = getWeekInfo()
    let start_date = get_start_semester(week_infos[0])

    // 上学期 or 下学期
    let semester_name = 0
    if (start_date.getMonth() < 6) {
        semester_name = 2
    } else {
        semester_name = 1
    }

    let year1 = '2022'

    let today = new Date()
    if (today.getMonth() <= 6) {
        if ( semester_name == 2) {
            // 上半年 春季学期
            year1 = today.getFullYear()
        } else {
            // 上半年 秋季学期
            year1 = today.getFullYear() - 1
        }
    } else {
        if ( semester_name == 1) {
            // 下半年 秋季学期
            year1 = today.getFullYear()
        } else {
            // 下半年 春季学期
            year1 = today.getFullYear() - 1
        }
    }

    let schoolYear = String(year1) + '-' + String(year1 + 1)

    let sids = get_semester_ids()
    if (null == sids) {
        return null
    }

    let semesters = sids.semesters

    for (yi in semesters) {
        // console.log(yi)
        for (sem_idx in  semesters[yi]) {
            let one_sem = semesters[yi][sem_idx]
            // console.log(one_sem)
            if (one_sem['schoolYear'] == schoolYear && one_sem['name'] == String(semester_name)) {
                return one_sem['id']
            }
        }
    }
    return null
}

async function tableQueryXml(dom = document) {

    let ids = getids(dom);
    if (null == ids) {
        console.log('iframe里没找到ids，在整个dom里找')
        ids = getids_noiframe(dom);
    }
    if (null == ids) {
        console.error("ids is null");

        ids = fetch_ids_from_network(dom)

        if (null == ids) {
            console.error("ids is null from network");
            return [null, '尝试先点一下“我的课表”再导入']
        }
    }

    //这个semester.id每个学期都要改

    let semester_id = await getSemesterId(dom)

    if (null == semester_id) {
        console.error("请求semester_id超时");
        return [null, '骚瑞，没搞到学期id']
    }

    let data = 'ignoreHead=1&setting.kind=std&startWeek=&semester.id={semester_id}&ids={ids}';
    const idsReg = /\{ids\}/
    const semesterReg = /\{semester_id\}/
    data = data.replace(semesterReg, semester_id);
    data = data.replace(idsReg, ids);

    let url = 'http://classes.tju.edu.cn/eams/courseTableForStd!courseTable.action'

    try {
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer-when-downgrade', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data // body data type must match "Content-Type" header
        });
        //  return response.json(); // parses JSON response into native JavaScript objects
        return [response.text()]; // parses JSON response into native JavaScript objects
    } catch (error) {
        console.error(error)
        return [null, '骚瑞，没搞到课表页面']
    }
}

async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    await loadTool('AIScheduleTools')

    // 模拟点击 “我的课表”
    console.log('start')    

    ret = await tableQueryXml(dom)

    if (null == ret[0]) {
        await AIScheduleAlert(ret[1])
        return 'do not continue'
    }
    console.log('end')

    return ret[0]
}