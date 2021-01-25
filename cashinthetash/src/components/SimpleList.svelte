<script>

    import {db} from "../firebase";
    import SimpleListItem from "./SimpleListItem.svelte";
    import ChartDatum from "./ChartDatum.svelte";
    import ChartKategorie from "./ChartKategorie.svelte";
    import ChartBetrag from "./ChartBetrag.svelte";

    let finances = [];
    export let planID;
    export let finance = {};
    export let sum;
    export let plan = {};
    export let Summe;

    let sort = 'Name';

    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        finances = data.docs
    })


    db.collection("plans")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                console.log(doc.id, " => ", doc.data().Summe);
                sum = doc.data().Summe;
                // console.log("Booked",doc.data().get("booked"));
            });
        });


    const onSort = () => {
        db.collection('finance').orderBy(sort).where("planID", "==", planID).onSnapshot(data => {
            finances = data.docs
        })
    }

    let color2 = "is-danger"
    if (Summe > 0) {
        color2 = "is-success"
    } else {
        color2 = "is-danger"
    }


</script>


<div class="control has-text-left">
    <label>Sortieren nach</label>
    <div class="select is-small is-rounded">
        <select bind:value={sort} on:change={onSort}>
            <option name="answer" value={"Name"}>Auswählen</option>
            <option name="answer" value={"Betrag"}>Betrag</option>
            <option name="answer" value={"Datum"}>Datum</option>
            <option name="answer" value={"Name"}>Name</option>
            <option name="answer" value={"Kategorie"}>Kategorie</option>
        </select>
    </div>
    <i class="fas fa-chart-pie"></i>
</div>
<hr/>

<div class="container">
    {#if (sort === "Datum")}
        <ChartDatum/>
    {:else if (sort === "Betrag")}
        <ChartBetrag/>
    {:else if (sort === "Kategorie")}
        <ChartKategorie/>
    {:else if (sort === "Name")}
        <div class="rows">
            {#each finances as item}
                <div class="row is-fullwidth is-2">
                    <SimpleListItem id={item.id} finance={item.data()}/>
                </div>
                <div style="height:8px"></div>
            {/each}
        </div>
    {:else}
        <div class="rows">
            {#each finances as item}
                <div class="row is-fullwidth is-2">
                    <SimpleListItem id={item.id} finance={item.data()}/>
                </div>
                <div style="height:8px"></div>
            {/each}
        </div>
    {/if}
    <div class="control">
        <div class="tags has-addons">
            <span class="tag is-info">{sum}</span>
            <span class="tag {color2}"></span>
        </div>
    </div>
</div>






