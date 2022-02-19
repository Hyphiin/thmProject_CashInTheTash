<canvas id="myChart" width="400" height="400"></canvas>


<script>
    import {db} from "../firebase";

    export let planID;

    let finances = {};


    import {onMount} from 'svelte'

    function createChart() {
        let nums = []
        let dates = []
        db.collection('finance').where("planID", "==", planID).orderBy("Datum").onSnapshot(data => {
            finances = data.docs
            let oldDate = finances[0].data().Datum.toDate()
            let mm = oldDate.getMonth() + 1;
            let dd = oldDate.getDate();
            let yyyy = oldDate.getFullYear();
            oldDate = dd + '/' + mm + '/' + yyyy;

            let betrag = 0

            for (let j = 0; j < finances.length; j++) {
                let currentDate = finances[j].data().Datum.toDate()
                let mm2 = currentDate.getMonth() + 1;
                let dd2 = currentDate.getDate();
                let yyyy2 = currentDate.getFullYear();
                currentDate = dd2 + '/' + mm2 + '/' + yyyy2;

                if (currentDate === oldDate) {
                    if (finances[j].data().Art === "Einnahme") {
                        betrag = betrag + finances[j].data().Betrag
                        oldDate = currentDate
                        if (j === finances.length - 1) {
                            nums.push(betrag)
                            dates.push(oldDate)
                        }
                    } else {
                        betrag = betrag - finances[j].data().Betrag
                        oldDate = currentDate
                        if (j === finances.length - 1) {
                            nums.push(betrag)
                            dates.push(oldDate)
                        }
                    }
                } else {
                    nums.push(betrag)
                    dates.push(oldDate)
                    if (finances[j].data().Art === "Einnahme") {
                        oldDate = currentDate
                        betrag = finances[j].data().Betrag
                        if (j === finances.length - 1) {
                            nums.push(betrag)
                            dates.push(oldDate)
                        }
                    } else {
                        oldDate = currentDate
                        betrag = -finances[j].data().Betrag
                        if (j === finances.length - 1) {
                            nums.push(betrag)
                            dates.push(oldDate)
                        }
                    }
                }


                dates.sort()

                let ctx = document.getElementById('myChart').getContext('2d');
                let myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dates,
                        datasets: [{
                            label: 'Umsatz in €',
                            data: nums,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                ticks: {
                                    fontColor: '#FFF'
                                },
                                gridLines: {
                                    color: "#14212d"
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: '#FFF'
                                },
                                gridLines: {
                                    color: "#14212d"
                                }
                            }],
                        },
                        legend: {
                            labels: {
                                fontColor: '#FFF'
                            }
                        }

                    }
                })
            }
        })
    }

    onMount(createChart)

</script>

