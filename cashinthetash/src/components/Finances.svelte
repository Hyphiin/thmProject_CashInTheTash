<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {db} from '../firebase';
    import Finance from './Finance.svelte';
    import firebase from "firebase";

    let finances = [];

    let Betrag = '';
    let Kategorie = '';
    let Wiederkehrend = '';
    let Einnahme = '';
    let Ausgabe = '';

    export let planID;

    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        finances = data.docs
    })

    const addFinance = () => {
        const Datum = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection('finance').add({
            Betrag, Kategorie, Datum, planID, Wiederkehrend, Einnahme, Ausgabe
        })
        console.log('erfolgreich hinzugefügt!');
        Betrag = ''
        Kategorie = ''

        console.log(planID);
    }

    const showPlan = () => {
        console.log(planID);
    }
</script>

<section class="section">
    <div class="container">
        <div class="columns is-multiline is-variable is-2 is-centered">
            <div class="notification is-light">
                <form on:submit|preventDefault={addFinance}>
                    <input class="input is-success" type="text" placeholder="Betrag" bind:value={Betrag}/>
                    <input class="input is-success" type="text" placeholder="Kategorie" bind:value={Kategorie}/>
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="answer" bind:group={Wiederkehrend} value={true}>
                            Wiederkehrend
                        </label>
                        <label class="radio">
                            <input type="radio" name="answer" bind:group={Wiederkehrend} value={false}>
                            Einmalig
                        </label>
                    </div>
                    <div class="control">
                        <label class="radio">
                            <input type="radio" name="answer2" bind:group={Einnahme} value={true}>
                            Einnahme
                        </label>
                        <label class="radio">
                            <input type="radio" name="answer2" bind:group={Ausgabe} value={true}>
                            Ausgabe
                        </label>
                    </div>
                    <button class="button is-success">ADD</button>
                </form>
            </div>
        </div>
    </div>
</section>

<div class="container">
    <div class="columns is-multiline is-variable is-2">
        {#each finances as finance}
            <div class="section">
                <Finance id={finance.id} finance={finance.data()}/>
            </div>
        {/each}
    </div>
</div>