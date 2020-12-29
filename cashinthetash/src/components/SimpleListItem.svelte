<script>
    export let id = '';
    export let finance = {};
</script>

<section>
    <tr>
        <th> Kategorie</th>
        <td class="notification is-light">
            <p>{finance.Kategorie}</p>
        </td>
        <th>Betrag</th>
        <td class="notification is-light">
            <p>{finance.Betrag}</p>
        </td>
    </tr>

</section>