<script>
    import {db} from '../firebase';

    export let id = '';
    export let finance = {};

    const deleteFinance = () => {
        db.collection('finance').doc(id).delete()
    }

    const updateFinance = () => {
        db.collection('finance').doc(id).update({
            Betrag : finance.Betrag,
            Kategorie : finance.Kategorie
        })
    }

</script>

<section>
    <div class="column">
        <div class="notification is-info">
            <h2 class="subtitle has-text-centered">Erstellungsdatum: {finance.Datum}</h2>
            <input on:input={updateFinance} type="text" bind:value={finance.Betrag}/>
            <input on:input={updateFinance} type="text" bind:value={finance.Kategorie}/>
            <button on:click={deleteFinance}>Delete</button>
        </div>
    </div>
</section>