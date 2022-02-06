var stats = []

async function getData() {
    const data = await fetch("https://covid-api.mmediagroup.fr/v1/cases");
    const resp = await data.json();
    return resp;
}

async function postData(data) {
    const response = await data;
    const { confirmed: confirmed_ph, recovered: recovered_ph, population: population_ph, deaths: deaths_ph } = response.Philippines.All;
    let p = document.getElementById("__covidcases");
    p.innerHTML = confirmed_ph + " confirmed cases <br> " + recovered_ph + " recovered <br>" + population_ph + " population <br>" + deaths_ph + " deaths";
    return [confirmed_ph, recovered_ph, deaths_ph, population_ph];
}

async function displayChart() {
    let stats = await postData(getData());
    console.log(stats);
    const data = {
        labels: [
            'Confirmed',
            'Recovered',
            'Deaths'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [stats[0], stats[1], stats[2]],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)'
            ],
            hoverOffset: 0
        }]
    };

    const ctx = document.getElementById("__covidChart");
    ctx.clientHeight = "10rem";
    const myChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            layout: {
                padding: {
                    left: 0,
                }
            }
        }
    });
}

displayChart();