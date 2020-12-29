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
        <table class="table is-fullwidth is-hoverable">
            <tr>
                <th>Kategorie</th>
                <th>Betrag</th>
            </tr>
            {#each finances as item}
                <tr >
                <SimpleListItem id={item.id} finance={item.data()}/>
                </tr>
            {/each}
        </table>
    </div>
</div>
