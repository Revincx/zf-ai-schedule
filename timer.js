function scheduleTimer({ parserRes }) {
    let full_weeks = parserRes.map(item => item.weeks).flat()
    full_weeks = full_weeks.sort((a, b) => b - a)
    let max_week = full_weeks[0]
    return {
        totalWeek: max_week,
        startWithSunday: false,
        showWeekend: true,
        forenoon: 4,
        afternoon: 4,
        night: 3,
        sections: [
            {
                section: 1,
                startTime: '08:30',
                endTime: '09:15'
            },
            {
                section: 2,
                startTime: '09:20',
                endTime: '10:05'
            },
            {
                section: 3,
                startTime: '10:25',
                endTime: '11:10'
            },
            {
                section: 4,
                startTime: '11:15',
                endTime: '12:00'
            },
            {
                section: 5,
                startTime: '14:30',
                endTime: '15:15'
            },
            {
                section: 6,
                startTime: '15:20',
                endTime: '16:05'
            },
            {
                section: 7,
                startTime: '16:25',
                endTime: '17:10'
            },
            {
                section: 8,
                startTime: '17:15',
                endTime: '18:00'
            },
            {
                section: 9,
                startTime: '19:30',
                endTime: '20:15'
            },
            {
                section: 10,
                startTime: '20:20',
                endTime: '20:55'
            },
            {
                section: 11,
                startTime: '21:00',
                endTime: '21:45'
            }
        ]
    }
}