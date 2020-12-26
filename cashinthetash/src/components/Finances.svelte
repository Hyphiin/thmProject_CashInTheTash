<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {db} from '../firebase';
    import Finance from './Finance.svelte';

    let finances = [];

    let Betrag = '';
    let Kategorie = '';
    export let planID;

    db.collection('finance').orderBy('Datum').onSnapshot(data => {
        finances = data.docs
    })

    const addFinance = () => {
        db.collection('finance').add({
            Betrag, Kategorie, Datum: Date.now(), planID
        })
        console.log('erfolgreich hinzugefügt!');
        Betrag = ''
        Kategorie = ''
    }
</script>

<section class="section">
    <div class="container">
        <div class="columns is-multiline is-variable is-2 is-centered">
            <div class="notification is-info">
                <form on:submit|preventDefault={addFinance}>
                    <input class="input is-info" type="text" placeholder="Betrag" bind:value={Betrag}/>
                    <input class="input is-info" type="text" placeholder="Kategorie" bind:value={Kategorie}/>
                    <button class="button is-info">ADD</button>
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
