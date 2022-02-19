<script>

    import {db} from "../firebase";
    import SimpleListItem from "./SimpleListItem.svelte";
    import ChartDatum from "./ChartDatum.svelte";
    import ChartKategorie from "./ChartKategorie.svelte";
    import ChartBetrag from "./ChartBetrag.svelte";


    let finances = [];

    let allfinance = [];

    export let planID;
    export let sum;
    export let pos;

    let showChart = false
    let sort = 'Name';

    // let allfinance = []
    // let limit = 5;


    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        finances = data.docs
    })

    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        allfinance = data.docs
    })


    const onSort = () => {
        db.collection('finance').orderBy(sort).where("planID", "==", planID).onSnapshot(data => {
            finances = data.docs
        })
        colorCheckSum()
    }

    const changeHandler = () => {
        onSort();
    }

    let colorSum = "is-success"
    let currentItemData;

    const colorCheckSum = () => {
        if (sum >= 0) {
            colorSum = "is-success"
        } else {
            colorSum = "is-danger"
        }
    }

    const showMyChart = () => {
        if (showChart === true) {
            showChart = false
        } else {
            showChart = true
            db.collection('finance').orderBy(sort).where("planID", "==", planID).onSnapshot(data => {
                finances = data.docs
            })
            colorCheckSum()
        }
    }

    // const IncreaseNumber = () => {
    //     if (limit <= allfinance.length) {
    //         limit += 5
    //         console.log(limit)
    //     }
    //     db.collection('finance').orderBy('Datum').where("planID", "==", planID).limit(limit).onSnapshot(data => {
    //         finances = data.docs
    //     })
    // }

    // const LimitNumber = () => {
    //     if (limit >= 10) {
    //         limit = limit - 5
    //     } else {
    //         alert('Mindestanzahl darf nicht unterschritten werden.')
    //     }
    //     db.collection('finance').orderBy('Datum').where("planID", "==", planID).limit(limit).onSnapshot(data => {
    //         finances = data.docs
    //     })
    // }
</script>

<div class="container">
    <div class="columns is-mobile">
        <div class="column is-narrow">
            <div class="control">
                {#if showChart === true}
                    <label class="has-text-white" style="padding-left: 4px">Diagramm</label>
                    <div class="select is-small is-rounded">
                        <select bind:value={sort} on:change={onSort}>
                            <option name="answer" value={"Betrag"}>Betrag</option>
                            <option name="answer" value={"Datum"}>Datum</option>
                            <option name="answer" value={"Kategorie"}>Kategorie</option>
                        </select>
                    </div>
                {:else}
                    <label class="has-text-white" style="padding-left: 4px">Sortieren</label>
                    <div class="select is-small is-rounded">
                        <select bind:value={sort} on:change={changeHandler}>
                            <option name="answer" value={"Name"}>Auswählen</option>
                            <option name="answer" value={"Betrag"}>Betrag</option>
                            <option name="answer" value={"Datum"}>Datum</option>
                            <option name="answer" value={"Name"}>Name</option>
                            <option name="answer" value={"Kategorie"}>Kategorie</option>
                        </select>
                    </div>
                {/if}
            </div>
        </div>
        {#if finances.length > 0}
            {#if showChart === true}
                <div class="column is-narrow" style="padding-left: 53px;" on:click={showMyChart}>
                    <i class="fas fa-list has-text-white"></i>
                </div>
            {:else}
                <div class="column is-narrow" style="padding-left: 62px;" on:click={showMyChart}>
                    <i class="fas fa-chart-pie has-text-white"></i>
                </div>
            {/if}
        {/if}
    </div>
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
        {:else}
            <ChartBetrag planID={planID}/>
        {/if}
    {:else}
        <div class="rows scrollable__container">
            {#each finances as item}
                <div class="row is-fullwidth is-2">
                    <SimpleListItem id={item.id} finance={item.data()} bind:sum={sum} pos={pos} planID={planID}
                                    bind:currentItemData={currentItemData} bind:colorSum={colorSum}/>
                </div>
                <div style="height:10px"></div>
            {/each}
        </div>
        <!-- {#if allfinance.length > 5 && limit < allfinance.length}
            <button class="button" on:click={IncreaseNumber}>Mehr</button>
        {/if}

        {#if limit > 5}
            <button class="button" on:click={LimitNumber}>Weniger</button>
        {/if} -->
        {#if finances.length > 0}
            <div style="height:10px"></div>
            <div class="control">
                <span class="tag is-large {colorSum}">{sum}€</span>
            </div>
        {/if}
    {/if}

</div>






