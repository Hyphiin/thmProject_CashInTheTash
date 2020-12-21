<script>
    import ListStore from '../ListStore';

    export let list;

// Liste Löschen
const handleDelete = (id) => {
    ListStore.update(lists => {
        return lists.filter(list => list.id != id);
    });
};
</script>



<section>
    <div class="column">
        <div class="notification is-info">
        <h1 class="title has-text-centered">{list.name}</h1>
        <h2 class="subtitle has-text-centered">Erstellungsdatum: {list.datum}</h2>
        <a class="delete is-large is-danger" on:click={() => handleDelete(list.id)}></a>
        </div>
    </div>
</section>