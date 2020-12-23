<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {db} from '../firebase';
    import Finance from './Finance.svelte';

    let finances = [];

    let Betrag = '';
    let Kategorie = '';
    let Datum = '';

    db.collection('finance').onSnapshot(data => {
        finances = data.docs
    })

    const addFinance = () =>{
        db.collection('finance').add({
            Betrag, Kategorie, Datum: Date.now()
        })

        Betrag = ''
        Kategorie = ''
        Datum = ''
    }
</script>

<section class="section">
    <div class="container">
        <h1 class="title">Angelegte Einträge</h1>
        <h2 class="subtitle">
            Wähle deinen Eintrag
        </h2>
    </div>
</section>

<div>
    <form on:submit|preventDefault={addFinance}>
        <input type="text" bind:value={Betrag}/>
        <input type="text" bind:value={Kategorie}/>
        <button>ADD</button>
    </form>
</div>

<div class="container">
    <div class="columns is-multiline is-variable is-2">
        {#each finances as finance}
            <div class="section">
                <Finance id={finance.id} finance={finance.data()}/>
            </div>
        {/each}
    </div>
</div>
