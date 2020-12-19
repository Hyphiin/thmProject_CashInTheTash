<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import Navbar from "./Navbar.svelte";
    import Footer from "./Footer.svelte";
    import ListStore from "../ListStore"
    import ListenKurzDetails from "./ListenKurzDetails.svelte";

</script>

<main>
    <Navbar/>
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
        {#each $ListStore as list (list.id)}
            <div in:fade out:scale|local animate:flip={{duration: 500}}>
                <ListenKurzDetails {list} />
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
    <Footer/>
</main>
