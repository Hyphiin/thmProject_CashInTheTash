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
            <tr class="table is-fullwidth is-hoverable">
                <th class="table is-fullwidth is-hoverable">Kategorie</th>
                <th class="table is-fullwidth is-hoverable">Betrag</th>
            </tr>
            {#each finances as item}
                <tr class="table is-fullwidth is-hoverable">
                <SimpleListItem id={item.id} finance={item.data()}/>
                </tr>
            {/each}
        </table>
    </div>
</div>
