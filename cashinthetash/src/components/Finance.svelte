<script>
    import {db} from '../firebase';

    export let id = '';
    export let finance = {};
    export let planID;

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

        if(finance.Einnahme){
            helper = helper + finance.Betrag
            Summe = helper
            console.log(Summe)
        }else {
            helper = helper - finance.Betrag
            Summe = helper
            console.log(Summe)
        }

        let updatePlan = db.collection('plan').where("planID", "==", planID);
        updatePlan.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.update({
                    Summe: helper
                });
            });
        });
        console.log('erfolgreich geupdated!');
    }

    let date= finance.Datum.toDate().toDateString();

    let stringSelected = "notification has-background-info-dark"

    if (finance.Einnahme){
        stringSelected = "notification has-background-primary"
    }else{
        stringSelected = "notification has-background-info-dark"
    }

</script>

<div class="column is-two-quarters-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
    <div class={stringSelected}>
        <input class="input is-info" on:input={updateFinance} type="text" bind:value={finance.Name}/>
        <input class="input is-info" on:input={updateFinance} type="text" bind:value={finance.Betrag}/>
        <hr/>
        <p class="subtitle has-text-centered is-size-7 is-uppercase has-text-weight-bold">Erstellt: {date}</p>
        <a class="delete is-large is-danger" on:click={deleteFinance}></a>
        <p class="tag is-info is-light">{finance.Kategorie}</p>
    </div>
</div>
