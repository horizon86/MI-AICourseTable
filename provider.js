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
    var a=dom.getElementById("iframeMain").contentWindow.document
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


function tableQueryXml(dom = document) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/eams/courseTableForStd!courseTable.action', false);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    //xhr.setRequestHeader("Referer", "http://classes.tju.edu.cn/eams/courseTableForStd.action");
	//check:https://stackoverflow.com/questions/27218525/set-referer-for-xmlhttprequest
	//这里设置 Referer 会被浏览器报错，不用也没有问题 -2022/11/1留
    let ids = getids(dom);//调用
    if(null == ids){
        ids = getids_noiframe(dom);
    }
    if(null == ids){
        console.error("ids is null");
        return null;
    }

    //这个semester.id每个学期都要改
    let data = 'ignoreHead=1&setting.kind=std&startWeek=&semester.id=76&ids={ids}';
    const idsReg = /\{ids\}/
    data = data.replace(idsReg, ids);

    let result = "";

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this.getAllResponseHeaders());
            result = this.responseText;
        }
    };

    try {
        xhr.send(data);
        
    } catch (error) {

        console.error(error);
        
    }
    return result;
}


function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
    return tableQueryXml(dom);
}