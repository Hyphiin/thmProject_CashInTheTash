<script>
    import {db} from '../firebase';

    export let id = '';
    export let finance = {};
</script>

<div>
    <h2 class="subtitle has-text-centered">Erstellungsdatum: {finance.Datum}</h2>
    <p>{finance.Betrag}</p>
</div>
