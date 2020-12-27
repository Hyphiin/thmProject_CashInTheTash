<script>

    import {createEventDispatcher} from 'svelte';
    import Plans from "./Plans.svelte";

    let dispatch = createEventDispatcher();

    export let items;
    export let activeItem;


</script>

<div class="sides">
        {#each items as item}
            <div on:click={() => activeItem = 'Finances'}>
                <div class:active={item === activeItem}>{ item }</div>
                <Plans/>
            </div>
        {/each}
</div>



