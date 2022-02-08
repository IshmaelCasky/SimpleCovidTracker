async function getData() {

    const data = await fetch("https://covid19-api-philippines.herokuapp.com/api/summary");
    const status = data.status;
    const resp = await data.json();
    let spinner = document.getElementById("__covidInfoSpinner");
    if (status == 200) {
        await new Promise(r => setTimeout(r, 2000));
        spinner.style.display = "none";
        console.log(resp)
        return resp;
    }


}

async function postData(data) {
    const response = await data;
    const { active_cases: confirmed_ph, total: total_ph, recoveries: recovered_ph, deaths: deaths_ph } = response.data;
    let p = document.getElementById("__covidcases");
    p.innerHTML = confirmed_ph + " confirmed cases <br> " + recovered_ph + " recovered <br>" + deaths_ph + " deaths <br>" + total_ph + " total";
    return [confirmed_ph, recovered_ph, deaths_ph, total_ph];
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
