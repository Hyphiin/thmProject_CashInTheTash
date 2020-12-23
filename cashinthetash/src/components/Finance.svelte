<script>
    import {db} from '../firebase';

    export let id = '';
    export let finance = {};

    const deleteFinance = () => {
        db.collection('finance').doc(id).delete()
    }

</script>

<section>
    <div class="column">
        <div class="notification is-info">
            <h2 class="subtitle has-text-centered">Erstellungsdatum: {finance.Datum}</h2>
            <input type="text" value={finance.Betrag}/>
            <input type="text" value={finance.Kategorie}/>
            <button on:click={deleteFinance}>Delete</button>
        </div>
    </div>
</section>