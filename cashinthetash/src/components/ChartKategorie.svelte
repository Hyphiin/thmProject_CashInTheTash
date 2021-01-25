<canvas id="myChart" width="400" height="400"></canvas>


<script>
    import {db} from "../firebase";

    export let id = '';
    export let finance = {};
    export let planID;

    export let sum

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
        //let a = finance.count().where("Kategorie","==","Essen")
        //let b = finance.count().where("Kategorie","==","Trinken")

        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Essen', 'Trinken', 'Kleidung', 'Freizeit', 'Miete', 'Technik','Versicherungen','Sonstiges'],
                datasets: [{
                    label: '# of Votes',
                    data: [4, 17, 3, 5, 2, 3,0,0],
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
            }
        });
    }

    onMount(createChart)

</script>