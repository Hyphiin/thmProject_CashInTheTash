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
    let filter = "==";

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

    const onFilter = () => {
        if (filter === "all") {
            db.collection('plans').orderBy('Summe').where("UserID", "==", uid).onSnapshot(data => {
                plans = data.docs
            })
        } else {
            db.collection('plans').orderBy('Summe').where("UserID", "==", uid).where("Summe", filter, 0).onSnapshot(data => {
                plans = data.docs
            })
        }
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


<div class="columns is-mobile list-column">
    <div class="column is-narrow">
        <div class="control">
            <label class="has-text-white">Sortieren:</label>
            <div class="select is-small is-rounded">
                <select class="has-icons-left" bind:value={sort} on:change={onSort}>
                    <option name="answer" value={"Datum"}>Standard</option>
                    <option name="answer" value={"Summe"}>Summe</option>
                    <option name="answer" value={"Datum"}>Datum</option>
                    <option name="answer" value={"Titel"}>Titel</option>
                </select>
            </div>
        </div>
    </div>

    <div class="column is-narrow">
        <div class="control has-text-centered">
            <label class="has-text-white">Filtern:</label>
            <div class="select is-small is-rounded">
                <select class="has-icons-left" bind:value={filter} on:change={onFilter}>
                    <option name="answer" value={"all"}>Alle</option>
                    <option name="answer" value={">="}>Positiv</option>
                    <option name="answer" value={"<"}>Negativ</option>
                </select>
            </div>
        </div>
    </div>
</div>

<hr/>

<article class="message is-medium">
    <form on:submit|preventDefault={addPlan}>
        <div class="message-header has-background-info">
            Füge einen neuen Plan hinzu!
        </div>
        <div class="message-body">
            <div class="columns is-mobile list-column">
                <div class="column is-narrow">
                    <input class="input is-info" type="text" placeholder="Titel" bind:value={Titel} required/>
                </div>
                <input type="hidden" bind:value={Summe}/>
                <div class="column is-narrow">
                    <button class="button has-background-info">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    </form>
</article>

<div class="container">
    <div class="columns is-multiline is-variable is-2">
        {#each plans as plan}
            <Plan id={plan.id} plan={plan.data()}/>
        {/each}
    </div>
</div>
