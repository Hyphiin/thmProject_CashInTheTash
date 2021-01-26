<script>

    import {db} from "../firebase";
    import SimpleListItem from "./SimpleListItem.svelte";
    import ChartDatum from "./ChartDatum.svelte";
    import ChartKategorie from "./ChartKategorie.svelte";
    import ChartBetrag from "./ChartBetrag.svelte";

    let finances = [];

    export let planID;
    export let sum;

    let showChart = false

    let sort = 'Name';

    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        finances = data.docs
    })


    const onSort = () => {
        db.collection('finance').orderBy(sort).where("planID", "==", planID).onSnapshot(data => {
            finances = data.docs
        })
        colorCheck2()
    }

    let color2 = "is-success"
    const colorCheck2 = () => {
        if (sum >= 0) {
            color2 = "is-success"
        } else {
            color2 = "is-danger"
        }
    }
    colorCheck2()
</script>

<div class="columns is-mobile list-column">
    <div class="column">
        <div class="control has-text-left">
            {#if showChart}
                <lable>Diagramm</lable>
            {:else}
                <label>Sortieren nach</label>
            {/if}
            <div class="select is-small is-rounded">
                <select bind:value={sort} on:change={onSort}>
                    <option name="answer" value={"Name"}>Auswählen</option>
                    <option name="answer" value={"Betrag"}>Betrag</option>
                    <option name="answer" value={"Datum"}>Datum</option>
                    <option name="answer" value={"Name"}>Name</option>
                    <option name="answer" value={"Kategorie"}>Kategorie</option>
                </select>
            </div>
        </div>
    </div>
    {#if showChart}
        <div class="column is-narrow" on:click={() => {showChart = !showChart}}>
            <i class="fas fa-list has-text-info"></i>
        </div>
    {:else}
        <div class="column is-narrow" on:click={() => {showChart = !showChart}}>
            <i class="fas fa-chart-pie has-text-info"></i>
        </div>
    {/if}

</div>


<hr/>

<div class="container">
    {#if showChart}
        {#if (sort === "Datum")}
            <ChartDatum planID={planID}/>
        {:else if (sort === "Betrag")}
            <ChartBetrag planID={planID}/>
        {:else if (sort === "Kategorie")}
            <ChartKategorie planID={planID}/>
        {:else if (sort === "Name")}
            <div class="rows">
                {#each finances as item}
                    <div class="row is-fullwidth is-2">
                        <SimpleListItem id={item.id} finance={item.data()} sum={sum} planID={planID}/>
                    </div>
                    <div style="height:8px"></div>
                {/each}
            </div>
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag is-info">{sum}</span>
                    <span class="tag {color2}"></span>
                </div>
            </div>
        {/if}
    {:else}
        <div class="rows">
            {#each finances as item}
                <div class="row is-fullwidth is-2">
                    <SimpleListItem id={item.id} finance={item.data()} sum={sum} planID={planID}/>
                </div>
                <div style="height:8px"></div>
            {/each}
        </div>
        <div class="control">
            <div class="tags has-addons">
                <span class="tag is-info">{sum}</span>
                <span class="tag {color2}"></span>
            </div>
        </div>
    {/if}

</div>






