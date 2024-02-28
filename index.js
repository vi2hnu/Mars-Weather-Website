const api_url = "https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0"
let index;

getWeather().then(sols => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    index = sols.length - 1
    const sol = document.querySelector('[data-mars-sol]')
    const edate = document.querySelector('[data-earth]')
    const max = document.querySelector('[data-max-temp]')
    const min = document.querySelector('[data-min-temp]')
    const wind = document.querySelector('[data-wind]')
    sol.innerHTML = sols[index].mdate
    edate.innerHTML = currentDate
    max.innerHTML = sols[index].max + ' C'
    min.innerHTML = sols[index].min + ' C'
    wind.innerHTML = sols[index].win + ' KMPH'
})



function getWeather() {
    return fetch(api_url)
        .then(res => res.json())
        .then(data => {
            const {
                sol_keys,
                validity_checks,
                ...solData
            } = data
            return Object.entries(solData).map(([sol, others]) => {
                return {
                    mdate: sol,
                    max: others.AT.mx,
                    min: others.AT.mn,
                    win: others.HWS.av
                }
            })
        })
}