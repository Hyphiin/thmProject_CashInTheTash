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
    <div class="columns is-multiline is-variable is-2">
        <table class="table">
        {#each finances as item}
            <SimpleListItem id={item.id} finance={item.data()}/>
        {/each}
        </table>
    </div>
</div>
