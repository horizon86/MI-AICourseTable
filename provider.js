function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
	function getids_noiframe(dom = document) {
		var scripts = dom.getElementsByTagName("script")
			for (let index = 0; index < scripts.length; index++) {
				const element = scripts[index].innerHTML
				// 提取ids的正则表达式
				const regx_ids = /\(form.*\"ids\",.*\"[0-9]*\"\)/
				var result = element.match(regx_ids)
				//  console.log(element)

				if (result != null) {
					//匹配到的话就返回ids
					console.log(result[0])
					var ids = result[0].match(/[0-9]+/)
					if (ids != null) {
						return ids[0]
					}
				}
			}
		return null
	}
	function getids(dom = document, smethod = 0, errOut = false) {
		var a=dom.getElementById("iframeMain").contentWindow.document
		var scripts = a.getElementsByTagName('script')

		console.log(typeof (smethod))
		console.log("查找节点结束")

		for (let index = 0; index < scripts.length; index++) {
			const element = scripts[index].innerHTML
			// 提取ids的正则表达式
			const regx_ids = /\(form.*\"ids\",.*\"[0-9]*\"\)/
			var result = element.match(regx_ids)
			if (errOut)
				console.log(element)

			if (result != null) {
				//匹配到的话就返回ids
				var ids = result[0].match(/[0-9]+/)
				if (ids != null) {
					return ids[0]
				}
			}
		}
		return null
	}
	function getSemesterid(dom = document) {
		//获取包含 semesterid 的表单。代码由菜鸟教程网站的 AJAX 教程修改而来
		let xmlhttp
		let result = ""
		if (window.XMLHttpRequest) {
			// IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp=new XMLHttpRequest()
		}
		else {
			// IE6, IE5 浏览器执行代码
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
		}
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
			  result = xmlhttp.responseText
			}
		}
		xmlhttp.open('POST', '/eams/dataQuery.action', false)
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8")
		try {
			xmlhttp.send("dataType=semesterCalendar")
		} catch (error) {
			console.error(error)
		}
		return result
	}
	function locateSemesterid(raw){
		//从包含 semesterid 的表单中匹配，根据时间判断当前学期
		let d = new Date()
		let yr=d.getFullYear()
		let mr=d.getMonth()+1
		let reg
		let sessionid
		if (mr < 8 && mr > 1)//2到7月看作下学期
		{
			let yearTemp = (yr-1)+"-"+yr
			console.log(yearTemp+"下学期")
			reg = new RegExp("(?<=\\{id:)\\d+(?=,schoolYear:\"" + yearTemp + "\",name:\"2\")", 'g')
		}
		else if (1 == mr)
		{
			let yearTemp = (yr-1)+"-"+yr
			console.log(yearTemp+"上学期")
			reg = new RegExp("(?<=\\{id:)\\d+(?=,schoolYear:\"" + yearTemp + "\",name:\"1\")", 'g')
		}
		else
		{
			let yearTemp = yr+"-"+(yr+1)
			console.log(yearTemp+"上学期")
			reg = new RegExp("(?<=\\{id:)\\d+(?=,schoolYear:\"" + yearTemp + "\",name:\"1\")", 'g')
		}
		sessionid = raw.match(reg)
		console.log("id: " + sessionid)
		//console.log(reg)
		return sessionid
	}
	function tableQueryXml(dom = document) {
		let xhr = new XMLHttpRequest()
		xhr.open('POST', '/eams/courseTableForStd!courseTable.action', false)
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")
		//xhr.setRequestHeader("Referer", "http://classes.tju.edu.cn/eams/courseTableForStd.action")
		//check:https://stackoverflow.com/questions/27218525/set-referer-for-xmlhttprequest
		//这里设置 Referer 会被浏览器报错，不用也没有问题 -2022/11/1留
		let ids = getids(dom)//调用
		if(null == ids){
			ids = getids_noiframe(dom)
		}
		if(null == ids){
			console.error("ids is null")
			return null
		}
		let semidRaw = getSemesterid(dom)
		let semesterid = locateSemesterid(semidRaw)//调用
		console.log("im here at: " + semesterid)
		if(null == semesterid){
			console.error("Semesterid is null")
			return null
		}
		//这个semester.id每个学期都要改/新增了获取semester.id的代码，若有问题可在这里手动修改
		let data = 'ignoreHead=1&setting.kind=std&startWeek=&semester.id={semesterid}&ids={ids}'
		const idsReg = /\{ids\}/
		data = data.replace(idsReg, ids)
		const semesteridReg = /\{semesterid\}/
		data = data.replace(semesteridReg, semesterid)
		let result = ""

		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				console.log(this.getAllResponseHeaders())
				result = this.responseText
			}
		}
		try {
			xhr.send(data)
		} catch (error) {
			console.error(error)
		}
		return result
	}
	return tableQueryXml(dom)
}