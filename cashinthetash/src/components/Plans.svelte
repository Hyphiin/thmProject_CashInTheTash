<script>
    import {db} from '../firebase';
    import Plan from './Plan.svelte';
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import firebase from "firebase/app";

    export let uid;

    let plans = [];

    let Titel = '';

    db.collection('plans').orderBy('Datum').where("UserID", "==", uid).onSnapshot(data => {
        plans = data.docs
    })

    const addPlan = () => {
        const Datum = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection('plans').add({
            Titel, Datum, UserID: uid
        })
        console.log('erfolgreich hinzugefügt!');
        Titel = ''
    }

    export let show;

</script>


<div class="tile is-ancestor">
    <div class="tile is-vertical is-8">
        <div class="tile">
            <div class="tile is-parent is-vertical">
                <article class="tile is-child notification is-success">
                    <p class="title">Finanzplaner</p>
                    <p class="subtitle">
                        Wähle deinen Plan
                    </p>
                </article>
                {#each plans as plan}
                    <article class="tile is-child notification is-success">
                        <Plan id={plan.id} plan={plan.data()}/>
                    </article>
                {/each}
            </div>
            <div class="tile is-parent">
                <article class="tile is-child notification is-success">
                    <p class="title">Projektidee</p>
                    <p class="subtitle">Der smarte Weg deine Finanzen zu organisieren!</p>
                    <figure class="image is-4by3">
                        <img src="../images/Finance.jpg">
                    </figure>
                </article>
            </div>
        </div>
        <div class="tile is-parent">
            <article class="tile is-child notification is-success">
                <p class="title">Web-Frameworks</p>
                <p class="subtitle">Ein Projekt von Felix Wegener und Chiara Knipprath.</p>
                <div class="content">
                    <!-- Content -->
                </div>
            </article>
        </div>

    </div>

    <div class="tile is-parent">
        <article class="tile is-child notification is-success">
            <div class="content">
                <form on:submit|preventDefault={addPlan}>
                    <input class="input is-success" type="text" placeholder="Titel" bind:value={Titel}/>
                    <hr/>
                    <button class="button is-success is-inverted">ADD</button>
                </form>
            </div>
        </article>
    </div>
</div>
