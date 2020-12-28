<script>

    import {db} from "../firebase";
    import SimpleListItem from "./SimpleListItem.svelte";

    let finances = [];
    export let planID;

    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        finances = data.docs
    })

</script>

<div class="container">
    <ul class="columns is-multiline is-variable is-2">
        {#each finances as item}
            <li class="section">
                <SimpleListItem id={item.id} finance={item.data()}/>
            </li>
        {/each}
    </ul>
</div>
