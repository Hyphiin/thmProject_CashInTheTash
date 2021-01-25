<canvas id="myChart" width="400" height="400"></canvas>


<script>
    import {db} from "../firebase";

    export let id = '';
    export let finance = {};
    export let planID;

    export let sum

    let test = {};


    db.collection("plans")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                console.log(doc.id, " => ", doc.data().Summe);
                sum = doc.data().Summe;
                // console.log("Booked",doc.data().get("booked"));
            });
        });


    import {onMount} from 'svelte'

    function createChart() {
        let array = ["Essen","Trinken",'Kleidung', 'Freizeit', 'Miete', 'Technik', 'Versicherungen', 'Sonstiges']
        let nums = []
        for(let i = 0; i < 8; i++) {
            db.collection('finance').orderBy('Datum').where("planID", "==", planID).where("Kategorie", "==", array[i]).onSnapshot(data => {
                test = data.docs
                console.log(test)
                let e = 0
                /*forEach(key in test)
                {
                    let bla = key.Betrag
                    console.log(bla)
                }*/
                for (let j = 0; j < test.length - 1; j++) {
                    e = e + test[j].Betrag
                    console.log("test[j]: ", test[j].Betrag)
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