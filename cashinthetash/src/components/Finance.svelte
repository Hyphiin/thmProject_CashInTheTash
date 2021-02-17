<script>
    import {db} from '../firebase';

    export let id = '';
    export let finance = {};
    export let planID;
    export let sum;

    const deleteFinance = () => {
        if(finance.Art === "Einnahme"){
            sum = sum + finance.Betrag
            console.log("Sum: ",sum)
        }else {
            sum = sum - finance.Betrag
            console.log("Sum: ",sum)
        }

        db.collection('plans').doc(planID).update({
            Summe: sum
        })

        db.collection('finance').doc(id).delete()
        console.log('erfolgreich gelöscht!');
    }

    const updateFinance = () => {
        db.collection('finance').doc(id).update({
            Betrag: finance.Betrag,
            Name: finance.Name
        })

        if(finance.Art === "Einnahme"){
            sum = sum + finance.Betrag
            console.log("Sum: ",sum)
        }else {
            sum = sum - finance.Betrag
            console.log("Sum: ",sum)
        }

        db.collection('plans').doc(planID).update({
            Summe: sum
        })
        console.log('erfolgreich geupdated!');
    }

    let date= finance.Datum.toDate().toDateString();

    let datum = finance.Datum.toDate()
    let mm = datum.getMonth() + 1;
    let dd = datum.getDate();
    let yyyy = datum.getFullYear();

    datum = dd + '/' + mm + '/' + yyyy;

    let stringSelected = "notification primary-color"

    if (finance.Art === "Einnahme"){
        stringSelected = "notification is-success"
    }else{
        stringSelected = "notification is-warning"
    }

</script>


<div class={stringSelected}>
    <input class="input" on:input={updateFinance} type="text" bind:value={finance.Name}/>
    <input class="input" on:input={updateFinance} type="text" bind:value={finance.Betrag}/>
    <hr/>
    <p class="subtitle has-text-centered is-size-7 is-uppercase has-text-weight-bold">Erstellt: {datum}</p>
    <a class="delete is-large is-danger" on:click={deleteFinance}></a>
    <p class="tag">{finance.Kategorie}</p>
</div>

