<script>

    import {db} from "../firebase";
    import SimpleListItem from "./SimpleListItem.svelte";

    let finances = [];
    export let planID;

    let sort = 'Datum';

    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        finances = data.docs
    })

    const onSort = () => {
        db.collection('finance').orderBy(sort).where("planID", "==", planID).onSnapshot(data => {
            finances = data.docs
        })
    }


</script>




<div class="control has-text-left">
    <label>Sortieren nach</label>
    <div class="select is-small is-rounded">
        <select bind:value={sort} on:change={onSort}>
            <option name="answer" value={"Datum"}>Auswählen</option>
            <option name="answer" value={"Betrag"}>Betrag</option>
            <option name="answer" value={"Datum"}>Datum</option>
            <option name="answer" value={"Name"}>Name</option>
            <option name="answer" value={"Kategorie"}>Kategorie</option>
        </select>
    </div>
</div>
<hr/>
<table class="table is-striped is-fullwidth">
    <tr>
        <th>Kategorie</th>
        <th>Name</th>
        <th>Betrag</th>
        <th>Einnahme/Ausgabe</th>
        <th>Datum</th>
    </tr>
    {#each finances as item}
        <SimpleListItem id={item.id} finance={item.data()}/>
    {/each}
</table>




