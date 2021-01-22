<script>
    import {db} from '../firebase';
    import Plan from './Plan.svelte';
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import firebase from "firebase/app";

    export let uid;

    let plans = [];

    let Titel = '';
    let Summe = 0;

    let sort = 'Datum';

    db.collection('plans').orderBy('Datum').where("UserID", "==", uid).onSnapshot(data => {
        plans = data.docs
    })

    const addPlan = () => {
        const Datum = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection('plans').add({
            Titel, Datum, UserID: uid, Summe
        })
        console.log('erfolgreich hinzugefügt!');
        Titel = ''
    }

    const onSort = () => {
        db.collection('plans').orderBy(sort).where("UserID", "==", uid).onSnapshot(data => {
            plans = data.docs
        })
    }

</script>

<hr/>

<section class="section">
    <div class="container">
        <h1 class="title has-text-white fcolor">Finanzplaner</h1>
        <h2 class="subtitle has-text-white fcolor">
            Wähle deinen Plan
        </h2>
    </div>
</section>

<div class="control has-text-left">
    <label class="has-text-white">Sortieren nach</label>
    <div class="select is-small is-rounded">
        <select bind:value={sort} on:change={onSort}>
            <option name="answer" value={"Datum"}>Auswählen</option>
            <option name="answer" value={"Summe"}>Summe</option>
            <option name="answer" value={"Datum"}>Datum</option>
            <option name="answer" value={"Titel"}>Titel</option>
        </select>
    </div>
</div>

<hr/>

<div class="container">
    <div class="columns is-multiline is-variable is-2">
        {#each plans as plan}
                <Plan id={plan.id} plan={plan.data()}/>
        {/each}
    </div>
</div>

<div class="section">
<div class="container">
        <div class="columns is-multiline is-variable is-2 is-centered">
            <div class="notification is-info">
                <form on:submit|preventDefault={addPlan}>
                    <input class="input is-info" type="text" placeholder="Titel" bind:value={Titel} required/>
                    <input type="hidden" bind:value={Summe}/>
                    <hr/>
                    <button class="button is-info is-inverted">Hinzufügen</button>
                </form>
            </div>
        </div>
</div>
</div>
