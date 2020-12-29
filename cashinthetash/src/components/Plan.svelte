<script>
    import {db} from '../firebase';
    import Finances from "./Finances.svelte";
    import Profile from "./Profile.svelte";
    import SimpleList from "./SimpleList.svelte";

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

    export let planID = '';

    const getID = () => {
        planID = {id};
        console.log(planID);
    }

    export let showContend;
    export let showEdit;

    let date = plan.Datum.toDate().toDateString();
</script>

<section>
    <div class="column" >
        <div class="notification is-info" >
            <h2 class="subtitle has-text-centered">Erstellungsdatum: {date}</h2>
            <input class="input" on:input={updatePlan} type="text" bind:value={plan.Titel}/>
            {#if showContend === true}
                <SimpleList planID={planID}/>
            {/if}
            {#if showEdit === true}
                <Finances planID={id}/>
            {/if}

            <a class="delete is-large is-danger" on:click={deletePlan}></a>
            <button class="button is-primary" on:click={() => {showContend = !showContend}}>Show</button>
            {#if showContend === true}
            <button class="button is-primary" on:click={() => {showEdit = !showEdit; showContend = false}}>Edit</button>
            {/if}
        </div>
    </div>
</section>