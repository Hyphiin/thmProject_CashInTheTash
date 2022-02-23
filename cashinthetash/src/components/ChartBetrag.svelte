
<canvas id="myChart" width="400" height="400"></canvas>

<script>
    import {db} from "../firebase";
    import {onMount} from 'svelte'

    export let planID;

    let finances = {};

    function createChart() {
        let array = ["Essen","Trinken",'Kleidung', 'Freizeit', 'Miete', 'Technik', 'Versicherung', 'Haushalt' , 'Sonstige']
        let nums = []
        for(let i = 0; i < 8; i++) {
            db.collection('finance').where("planID", "==", planID).where("Kategorie", "==", array[i]).onSnapshot(data => {
                finances = data.docs
                let e = 0
                for (let j = 0; j < finances.length; j++) {
                    if(finances[j].data().Art === "Einnahme"){
                        e = e + finances[j].data().Betrag
                    }else{
                        e = e - finances[j].data().Betrag
                    }    
                }
                nums [i] = e

                let ctx = document.getElementById('myChart').getContext('2d');
                let myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: array,
                        datasets: [{
                            label: 'Betrag in €',
                            data: nums,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(65, 180, 20, 0.2)',
                                'rgba(188, 20, 100, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(65, 180, 20, 0.2)',
                                'rgba(188, 20, 100, 0.2)'
                            ],
                            borderWidth: 1,
                        }]
                    },
                    options: {
                        legend: {
                            labels: {
                                fontColor: '#FFF',
                            }
                        },
                        scales: {
                            xAxes: [{
                                stacked: true,
                                ticks: {
                                    fontColor: '#FFF'
                                },
                                gridLines: {
                                    color: "#14212d"
                                }
                            }],
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: '#FFF'
                                },
                                gridLines: {
                                    color: "#14212d"
                                }
                            }]
                        }
                    }
                });
            })
        }
    }


    onMount(createChart)

</script>