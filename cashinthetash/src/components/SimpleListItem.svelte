<script>
    export let id = '';
    export let finance = {};

    let date = finance.Datum.toDate().toDateString();

    let stringSelected = ""

    if (finance.Einnahme){
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
        {#if finance.Einnahme}
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
