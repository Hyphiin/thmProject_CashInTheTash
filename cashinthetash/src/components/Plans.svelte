<script>
    import {db} from '../firebase';
    import Plan from './Plan.svelte';

    let plans = [];

    let Titel = '';

    db.collection('plans').orderBy('Datum').onSnapshot(data => {
        plans = data.docs
    })

    const addPlan = () => {
        const Datum = Date.now();
        db.collection('plans').add({
            Titel, Datum, UserID: 1
        })
        console.log('erfolgreich hinzugefügt!');
        Titel = ''
    }
</script>

<section class="section">
    <div class="container">
        <h1 class="title">Finanzplaner</h1>
        <h2 class="subtitle">
            Wähle deinen Plan
        </h2>
    </div>
</section>

<section class="section">
    <div class="container">
        <div class="columns is-multiline is-variable is-2 is-centered">
            <div class="notification is-info">
                <form on:submit|preventDefault={addPlan}>
                    <input class="input is-info" type="text" placeholder="Titel" bind:value={Titel}/>
                    <hr/>
                    <button class="button is-info is-inverted">ADD</button>
                </form>
            </div>
        </div>
    </div>
</section>

<div class="container">
    <div class="columns is-multiline is-variable is-2">
        {#each plans as plan}
            <div class="section">
                <Plan id={plan.id} plan={plan.data()}/>
            </div>
        {/each}
    </div>
</div>
