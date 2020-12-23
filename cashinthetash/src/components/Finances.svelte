<script>
    import {db} from '../firebase';
    import Finance from './Finance.svelte';

    let finances = [];

    db.collection('finance').onSnapshot( data => {
        finances = data.docs
    })
</script>


{#each finances as finance}
    <section>
        <div class="column">
            <div class="notification is-info">
                <h1 class="title has-text-centered">{finance.id}</h1>
                <Finance id={finance.id} finance={finance.data()}/>
            </div>
        </div>
    </section>
{/each}
