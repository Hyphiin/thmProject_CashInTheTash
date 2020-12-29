<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {db} from '../firebase';
    import Finance from './Finance.svelte';
    import firebase from "firebase";
    import SimpleList from "./SimpleList.svelte";


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


    let showEdit = false;
    let showList = true;

    console.log("showList " + showList);

</script>

<div class="container">
    <div class="columns is-multiline is-variable is-2">
        {#if showList}
            <div class="section">
                <SimpleList planID={planID}/>
            </div>
        {:else}
            {#each finances as finance}
                <Finance id={finance.id} finance={finance.data()}/>
            {/each}
        {/if}
    </div>
</div>
<button class="button is-primary" on:click={() => {showList = !showList}}>Edit</button>
{#if showList === false}
    <button class="button is-primary" on:click={() => {showEdit = !showEdit}}>ADD</button>
{/if}

{#if showEdit}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Eintrag erstellen</p>
                <button class="delete" aria-label="close"  on:click={() => {showEdit = !showEdit}}></button>
            </header>
            <section class="modal-card-body">
                <div class="container">
                    <div class="columns is-multiline is-variable is-2 is-centered">
                        <div class="notification is-light">
                            <form on:submit|preventDefault={addFinance}>
                                <input class="input is-info" type="text" placeholder="Betrag" bind:value={Betrag}/>
                                <input class="input is-info" type="text" placeholder="Kategorie" bind:value={Kategorie}/>
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
                                <button class="button is-info">ADD</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success"  on:click={() => {showEdit = !showEdit}}>Speichern</button>
                <button class="button"  on:click={() => {showEdit = !showEdit}}>Abbrechen</button>
            </footer>
        </div>
    </div>
{/if}

