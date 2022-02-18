function scheduleHtmlParser(data) {
    // 接收JSON数据
    let kbList = JSON.parse(data)
    let courses = []

    // 字符串转数组遍历函数
    let range = function (str) {
        let arr = []
        let start = parseInt(str.split('-')[0])
        let end = parseInt(str.split('-')[1])
        for (let i = start; i <= end; i++) {
            arr.push(i)
        }
        return arr
    }

    // 解析周数用的函数
    let parseWeeks = function (str) {
        let weeks = []
        str.replace(/周/g, '')
        let peroids = str.search(',') == -1 ? [str] : str.split(',')
        for (let peroid of peroids) {
            if (peroid.search('-') == -1) {
                weeks.push(parseInt(peroid))
            }
            else {
                let arr = range(peroid)
                weeks.push(...arr)
            }
        }
        return weeks
    }

    // 遍历kbList并赋值
    for (let item of kbList) {
        courses.push({
            name: item.kcmc,
            position: item.cdmc,
            teacher: item.xm,
            weeks: parseWeeks(item.zcd),
            day: parseInt(item.xqj),
            sections: range(item.jcs)
        })
    }

    // 处理冲突课程
    let render_sections = []
    let deleted = []
    for (let i = 0; i < courses.length; i++) {
        for (let week of courses[i].weeks) {
            for (let section of courses[i].sections) {
                render_sections.push({
                    index: i,
                    position: {
                        x: week,
                        y: courses[i].day,
                        z: section
                    },
                    name: courses[i].name
                })
            }
        }
    }

    let map = new Map()
    for(let real_section of render_sections)
    {
        if(deleted.indexOf(real_section.name + real_section.index) != -1) continue
        let { x, y, z } = real_section.position
        let key = `${x}_${y}_${z}`
        if(!map.get(key)) map.set(key, real_section.name + real_section.index)
        else {
            courses[real_section.index] = 'deleted'
            deleted.push(real_section.name + real_section.index)
        }
    }

    courses = courses.filter(c => c != 'deleted')

    if(deleted.length > 0) console.log("因为冲突而删除的课程:", deleted)

    return courses
}