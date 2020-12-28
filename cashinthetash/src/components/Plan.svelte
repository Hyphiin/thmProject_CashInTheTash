<script>
    import {db} from '../firebase';
    import Finances from "./Finances.svelte";
    import Profile from "./Profile.svelte";

    export let id = '';
    export let plan = {};

    const deletePlan = () => {
        db.collection('plans').doc(id).delete()
        console.log('erfolgreich gelöscht!');
    }

    const updatePlan = () => {
        db.collection('plans').doc(id).update({
            Titel: plan.Titel
        })
        console.log('erfolgreich geupdated!');
    }

    let planID = '';

    const getID = () => {
        planID = {id};
        console.log(planID);
    }

</script>

<section>
    <div class="column">
        <div class="notification is-info" on:click={getID}>
            <h2 class="subtitle has-text-centered">Erstellungsdatum: {plan.Datum}</h2>
            <input class="input" on:input={updatePlan} type="text" bind:value={plan.Titel}/>
            <Finances {planID}/>
            <a class="delete is-large is-danger" on:click={deletePlan}></a>
            <p> {id} </p>
        </div>
    </div>
</section>