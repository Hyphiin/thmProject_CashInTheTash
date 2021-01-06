<script>
    export let id = '';
    export let finance = {};

    let date = finance.Datum.toDate().toDateString();

    let stringSelected = ""

    if (finance.Art){
        stringSelected = "is-selected"
    }else{
        stringSelected = ""
    }


</script>



<tr class= {stringSelected}>
        <td>
            {finance.Kategorie}
        </td>
        <td>
            {finance.Name}
        </td>
        <td>
            {finance.Betrag}
        </td>
        {#if finance.Art === "Einnahme"}
            <td>
                Einnahme
            </td>
        {:else}
            <td>
                Ausgabe
            </td>
        {/if}
        <td>
            {date}
        </td>
</tr>
