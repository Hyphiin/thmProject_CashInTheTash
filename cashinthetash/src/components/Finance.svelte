<script>
    import {db} from '../firebase';

    export let id = '';
    export let finance = {};
    export let planID;
    export let sum;

    let Summe;
    let helper = 0;

    const deleteFinance = () => {
        db.collection('finance').doc(id).delete()
        console.log('erfolgreich gelöscht!');
    }

    const updateFinance = () => {
        db.collection('finance').doc(id).update({
            Betrag: finance.Betrag,
            Name: finance.Name
        })

        if(finance.Art === "Einnahme"){
            helper = helper + finance.Betrag
            Summe = helper
            console.log("Sum: "+sum+", Summe: "+Summe)
        }else {
            helper = helper - finance.Betrag
            Summe = helper
            console.log("Sum: "+sum+", Summe: "+Summe)
        }

        let updatePlan = db.collection('plan').where("planID", "==", planID);
        updatePlan.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.update({
                    Summe: Summe
                });
            });
        });
        console.log('erfolgreich geupdated!');
    }

    let date= finance.Datum.toDate().toDateString();

    let datum = finance.Datum.toDate()
    let mm = datum.getMonth() + 1;
    let dd = datum.getDate();
    let yyyy = datum.getFullYear();

    datum = dd + '/' + mm + '/' + yyyy;

    let stringSelected = "notification has-background-info-dark"

    if (finance.Art === "Einnahme"){
        stringSelected = "notification is-success"
    }else{
        stringSelected = "notification is-warning"
    }

</script>


    <div class={stringSelected}>
        <input class="input is-info" on:input={updateFinance} type="text" bind:value={finance.Name}/>
        <input class="input is-info" on:input={updateFinance} type="text" bind:value={finance.Betrag}/>
        <hr/>
        <p class="subtitle has-text-centered is-size-7 is-uppercase has-text-weight-bold">Erstellt: {datum}</p>
        <a class="delete is-large is-danger" on:click={deleteFinance}></a>
        <p class="tag is-info is-light">{finance.Kategorie}</p>
    </div>

