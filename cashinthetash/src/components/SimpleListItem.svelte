<script>
    export let id = '';
    export let finance = {};

    let date = finance.Datum.toDate().toDateString();
    export let activated
</script>

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
    {activated = true}
    <td>
    Einnahme
    </td>
    {:else}
    {activated = false}
    <td>
        Ausgabe
    </td>
{/if}
<td>
    {date}
</td>


