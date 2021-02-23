<canvas id="myChart" width="400" height="400"></canvas>


<script>
    import {db} from "../firebase";
    import {onMount} from 'svelte'

    export let id = '';
    export let finance = {};
    export let planID;

    let test = {};

    let filter = "Essen"
    let e = 500




    function createChart() {
        let array = ["Essen","Trinken",'Kleidung', 'Freizeit', 'Miete', 'Technik', 'Versicherungen', 'Sonstiges']
        let nums = []
        for(let i = 0; i < 8; i++) {
            db.collection('finance').orderBy('Datum').where("planID", "==", planID).where("Kategorie", "==", array[i]).onSnapshot(data => {
                test = data.docs
                console.log(test)
                e = test.length
                nums [i] = e
                console.log(e)

                let ctx = document.getElementById('myChart').getContext('2d');
                let myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Essen', 'Trinken', 'Kleidung', 'Freizeit', 'Miete', 'Technik', 'Versicherungen', 'Sonstiges'],
                        datasets: [{
                            label: '# of Votes',
                            data: [nums[0], nums[1], nums[2], nums[3], nums[4], nums[5], nums[6], nums[7]],
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
                        legend: {
                            labels: {
                                fontColor: '#FFF',
                            }
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    display: false,
                                    beginAtZero: true,
                                    fontColor: '#FFF'
                                },
                                gridLines: {
                                    color: "#14212d"
                                }
                            }],
                            yAxes: [{
                                ticks: {
                                    display: false,
                                    beginAtZero: true,
                                    fontColor: '#FFF'
                                },
                                gridLines: {
                                    color: "#14212d"
                                }
                            }],
                        },
                    }
                });
            })
            console.log("in Funktion: ", e)
        }

    }

    onMount(createChart)

</script>