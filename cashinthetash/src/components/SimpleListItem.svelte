<script>
    export let id = '';
    export let finance = {};

    let date = finance.Datum.toDate().toDateString();

    let datum = finance.Datum.toDate()
    let mm = datum.getMonth() + 1;
    let dd = datum.getDate();
    let yyyy = datum.getFullYear();

    datum = dd + '/' + mm + '/' + yyyy;

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
            {datum}
        </td>
</tr>
