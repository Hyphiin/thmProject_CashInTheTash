<script>
    export let id = '';
    export let finance = {};

    let date = finance.Datum.toDate().toDateString();
    let activated = true
    console.log(activated)
</script>


{#if activated}
    <tr class= "is-selected">
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
{:else}
    <tr>
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
{/if}


