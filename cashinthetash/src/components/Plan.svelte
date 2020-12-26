<script>
    import {db} from '../firebase';

    export let id = '';
    export let plan = {};

    const deletePlan = () => {
        db.collection('plans').doc(id).delete()
        console.log('erfolgreich gelöscht!');
    }

    const updatePlan = () => {
        db.collection('plans').doc(id).update({
            Titel : plan.Titel
        })
        console.log('erfolgreich geupdated!');
    }

</script>

<section>
    <div class="column">
        <div class="notification is-info">
            <h2 class="subtitle has-text-centered">Erstellungsdatum: {plan.Datum}</h2>
            <input class="input" on:input={updatePlan} type="text" bind:value={plan.Titel}/>
            <a class="delete is-large is-danger" on:click={deletePlan}></a>
        </div>
    </div>
</section>