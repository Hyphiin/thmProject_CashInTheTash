<script>
    import {db} from '../firebase';

    export let finance = {};

</script>

<section>
    <div class="column">
        <div class="notification is-info">
            <h2 class="subtitle has-text-centered">Erstellungsdatum: {finance.Datum}</h2>
            <p>{finance.Betrag}</p>
        </div>
    </div>
</section>