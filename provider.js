async function scheduleHtmlProvider() {

    // 导入工具包
    await loadTool('AIScheduleTools')

    let date = new Date()
    let now_year = date.getFullYear();
    // 计算学年码
    let xnm = date.getMonth() <= 7 ? date.getFullYear() - 1 : date.getFullYear();
    // 计算学期码
    let xqm = date.getMonth() <= 7 ? 12 : 3;
    // 异步获取JSON
    try{
        let params = new URLSearchParams()
        params.set('gnmkdm', 'N2154')
        params.set('xnm', xnm)
        params.set('xqm', xqm)
        let data = await fetch('/jwglxt/kbcx/xskbcxMobile_cxXsKb.html', {
            method: 'POST',
            credentials: 'include',
            body: params
        })
        let response_text = await data.text()
        // 没有成功获取到JSON数据
        if(!data.ok || response_text == 'null') {
            await AIScheduleAlert('呜呜呜出错了~ 要不要检查一下是不是没有登录呢~')
            return 'do not continue'
        }

        let obj = await JSON.parse(response_text)

        if(!obj.kbList) {
            await AIScheduleAlert('呜呜呜出错了~ 没有查询到任何课程表数据呢~')
            return 'do not continue'
        }

        // 返回JSON字符串
        return JSON.stringify(obj.kbList)
    }
    catch(err) {
        // 错误处理
        console.log(err);
        await AIScheduleAlert('呜呜呜出错了~ 原因: ' + err.message)
        return 'do not continue'
    }
}