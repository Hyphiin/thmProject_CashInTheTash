<script>
    import {db} from '../firebase';

    export let id = '';
    export let finance = {};

    const deleteFinance = () => {
        db.collection('finance').doc(id).delete()
        console.log('erfolgreich gelöscht!');
    }

    const updateFinance = () => {
        db.collection('finance').doc(id).update({
            Betrag: finance.Betrag,
            Kategorie: finance.Kategorie
        })
        console.log('erfolgreich geupdated!');
    }

</script>

<section>
    <div class="column">
        <div class="notification is-info">
            <h2 class="subtitle has-text-centered">Erstellungsdatum: {finance.Datum}</h2>
            <input class="input" on:input={updateFinance} type="text" bind:value={finance.Betrag}/>
            <input class="input" on:input={updateFinance} type="text" bind:value={finance.Kategorie}/>
            <button class="button is-info is-inverted" on:click={deleteFinance}>Delete</button>
        </div>
    </div>
</section>