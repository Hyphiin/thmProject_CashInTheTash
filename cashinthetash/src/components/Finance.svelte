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
            Name: finance.Name
        })
        console.log('erfolgreich geupdated!');
    }

    let date= finance.Datum.toDate().toDateString();

</script>

<section>
    <div class="column">
        <div class="notification has-background-info-dark">
            <input class="input is-info" on:input={updateFinance} type="text" bind:value={finance.Name}/>
            <input class="input is-info" on:input={updateFinance} type="text" bind:value={finance.Betrag}/>
            <hr/>
            <p class="subtitle has-text-centered is-size-7 is-uppercase has-text-weight-bold">Erstellt: {date}</p>
            <a class="delete is-large is-danger" on:click={deleteFinance}></a>
            <p class="tag is-info is-light">{finance.Kategorie}</p>
        </div>
    </div>
</section>
