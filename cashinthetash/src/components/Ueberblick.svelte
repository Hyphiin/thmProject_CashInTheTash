<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import FinanceStore from "../FinanceStore"
    import {Finanzen} from '../FinanceStore';
    import ListenKurzDetails from "./ListenKurzDetails.svelte";


    let name = '';
    export let uid;

    //Liste zum Array hinzufügen
    const addToArray = () => {
        $Finanzen = [...$Finanzen, {
            id: $Finanzen.length+1, name, datum: Date.now(), userid: uid
        }];
        console.log($Finanzen);
        name = '';
    };

</script>

<main>
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
        {#each $FinanceStore as list (list.id)}
            <div in:fade out:scale|local animate:flip={{duration: 500}}>
                <ListenKurzDetails {list} />
            </div>
        {/each}
            <div class="column is-narrow">
                <div class="notification is-info">
                    <h1 class="subtitle">Neue Liste erstellen</h1>
                    <form on:submit|preventDefault={addToArray}>
                        <input class="input is-info" type="text" placeholder="Titel" bind:value={name}/>
                        <button class="button is-info is-inverted">ADD</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</main>
