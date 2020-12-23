<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {db} from '../firebase';
    import Finance from './Finance.svelte';

    let finances = [];

    db.collection('finance').onSnapshot(data => {
        finances = data.docs
    })
</script>

<section class="section">
    <div class="container">
        <h1 class="title">Finanzplaner</h1>
        <h2 class="subtitle">
            Wähle deinen Plan
        </h2>
    </div>
</section>
<div class="container">
    <div class="columns is-multiline is-variable is-2">
        {#each finances as finance}
            <div class="section">
                <Finance id={finance.id} finance={finance.data()}/>
            </div>
        {/each}
        <div class="column is-narrow">
            <div class="notification is-info">
                <h1 class="subtitle">Neue Liste erstellen</h1>
                <a class="button is-rounded is-large ml-6">
                        <span class="icon is-large">
                            <img src='images/plus.jpg' alt="plus">
                        </span>
                </a>
            </div>
        </div>
    </div>
</div>
