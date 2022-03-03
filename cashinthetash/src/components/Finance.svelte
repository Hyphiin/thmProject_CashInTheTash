<script>
    import {db} from '../firebase';

    import {showDeletionConfirmation, showUpdateConfirmation} from "../store/store";

    function deleteSuccess() {
		showDeletionConfirmation.set(true)

        setTimeout(()=>{
            showDeletionConfirmation.set(false)	
        },3000)
	}

    function updateSuccess() {
		showUpdateConfirmation.set(true)

        setTimeout(()=>{
            showUpdateConfirmation.set(false)	
        },3000)
	}

    export let id = '';
    export let finance = {};
    export let planID;
    export let sum;

    const deleteFinance = () => {
        if(finance.Art === "Einnahme"){
            sum = sum + finance.Betrag
        }else {
            sum = sum - finance.Betrag 
        }

        db.collection('plans').doc(planID).update({
            Summe: sum
        })

        db.collection('finance').doc(id).delete()
        deleteSuccess();
    }

    const updateFinance = () => {
        db.collection('finance').doc(id).update({
            Betrag: finance.Betrag,
            Name: finance.Name
        })

        if(finance.Art === "Einnahme"){
            sum = sum + finance.Betrag
        }else {
            sum = sum - finance.Betrag
        }

        db.collection('plans').doc(planID).update({
            Summe: sum
        })
        updateSuccess();
    }

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
    <input class="input" on:input={updateFinance} type="number" step=".01" min="0" bind:value={finance.Betrag}/>
    <hr/>
    <p class="subtitle has-text-centered is-size-7 is-uppercase has-text-weight-bold">Erstellt: {datum}</p>
    <a class="delete is-large is-danger" on:click={deleteFinance}></a>
    <p class="tag">{finance.Kategorie}</p>
</div>

