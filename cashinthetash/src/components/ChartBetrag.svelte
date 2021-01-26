<canvas id="myChart" width="400" height="400"></canvas>


<script>
    import {db} from "../firebase";

    export let id = '';
    export let finance = {};
    export let planID;

    let test = {};


    import {onMount} from 'svelte'

    function createChart() {
        let array = ["Essen","Trinken",'Kleidung', 'Freizeit', 'Miete', 'Technik', 'Versicherungen', 'Sonstiges']
        let nums = []
        for(let i = 0; i < 8; i++) {
            db.collection('finance').where("planID", "==", planID).where("Kategorie", "==", array[i]).onSnapshot(data => {
                test = data.docs
                console.log("TEST: ",test)
                let e = 0
                for (let j = 0; j < test.length; j++) {
                    if(test[j].data().Art === "Einnahme"){
                        e = e + test[j].data().Betrag
                    }else{
                        e = e - test[j].data().Betrag
                    }
                    console.log("test[j]: ", test[j].data().Betrag)
                    console.log("Betrag: ", e)
                }
                nums [i] = e

                let ctx = document.getElementById('myChart').getContext('2d');
                let myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Essen', 'Trinken', 'Kleidung', 'Freizeit', 'Miete', 'Technik', 'Versicherungen', 'Sonstiges'],
                        datasets: [{
                            label: 'Betrag in €',
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
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true,
                                ticks: {
                                    beginAtZero: true
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