<canvas id="myChart" width="400" height="400"></canvas>


<script>
    import {db} from "../firebase";

    export let id = '';
    export let finance = {};
    export let planID;

    let test = {};


    import {onMount} from 'svelte'

    function createChart() {
        let nums = []
        let dates = []
            db.collection('finance').where("planID", "==", planID).orderBy("Datum").onSnapshot(data => {
                test = data.docs
                console.log("TEST: ", test)
                let oldDate = test[0].data().Datum.toDate()
                let mm = oldDate.getMonth() + 1;
                let dd = oldDate.getDate();
                let yyyy = oldDate.getFullYear();
                oldDate = dd + '/' + mm + '/' + yyyy;

                let betrag = 0

                for (let j = 0; j < test.length; j++) {
                    let currentDate = test[j].data().Datum.toDate()
                    let mm2 = currentDate.getMonth() + 1;
                    let dd2 = currentDate.getDate();
                    let yyyy2 = currentDate.getFullYear();
                    currentDate = dd2 + '/' + mm2 + '/' + yyyy2;

                    if (currentDate === oldDate) {
                        if (test[j].data().Art === "Einnahme") {
                            betrag = betrag + test[j].data().Betrag
                            console.log("oldDate: ", oldDate)
                            console.log("currentDate: ", currentDate)
                            console.log("Betrag: ", betrag)
                            oldDate = currentDate
                            if (j === test.length-1){
                                nums.push(betrag)
                                dates.push(oldDate)
                                console.log("push1: ",betrag," + ", oldDate)
                            }
                        } else {
                            betrag = betrag - test[j].data().Betrag
                            console.log("oldDate: ", oldDate)
                            console.log("currentDate: ", currentDate)
                            console.log("Betrag: ", betrag)
                            oldDate = currentDate
                            if (j === test.length-1){
                                nums.push(betrag)
                                dates.push(oldDate)
                                console.log("push2: ",betrag," + ", oldDate)

                            }
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Januar', 'Februar', 'März', 'April','Mai', 'Juni', 'Juli'],
                datasets: [{
                    label: 'Ausgaben in €',
                    data: [500, -200, 177, 560, 50, -540, 400],
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

                    }else {
                        nums.push(betrag)
                        dates.push(oldDate)
                        console.log("push: ",betrag," + ", oldDate)
                        if (test[j].data().Art === "Einnahme") {
                            console.log("oldDate: ", oldDate)
                            console.log("currentDate: ", currentDate)
                            console.log("Betrag: ", test[j].data().Betrag)
                            oldDate = currentDate
                            betrag = test[j].data().Betrag
                            if (j === test.length-1){
                                nums.push(betrag)
                                dates.push(oldDate)
                                console.log("push1: ",betrag," + ", oldDate)
                            }
                        } else {
                            console.log("oldDate: ", oldDate)
                            console.log("currentDate: ", currentDate)
                            console.log("Betrag: ", test[j].data().Betrag)
                            oldDate = currentDate
                            betrag = -test[j].data().Betrag
                            if (j === test.length-1){
                                nums.push(betrag)
                                dates.push(oldDate)
                                console.log("push1: ",betrag," + ", oldDate)
                            }
                        }
                    }
                    }],
                },
                legend: {
                    labels: {
                        fontColor: '#FFF'
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
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            })

    }

    onMount(createChart)

</script>

