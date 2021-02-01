<script>
    import {db} from '../firebase';
    import Plan from './Plan.svelte';
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import firebase from "firebase/app";

    export let uid;

    let plans = [];

    let Titel = '';
    let Summe = 0;

    let sort = 'Datum';
    let filter = "==";

    let limit = 3

    db.collection('plans').orderBy('Datum').where("UserID", "==", uid).limit(limit).onSnapshot(data => {
        plans = data.docs
    })

    const IncreaseNumber = () => {
        if (limit <= plans.length) {
            limit += 3
            console.log(limit)
        }
        db.collection('plans').orderBy('Datum').where("UserID", "==", uid).limit(limit).onSnapshot(data => {
            plans = data.docs
        })
    }

    const LimitNumber = () => {
        if (limit >= 6) {
            limit = limit - 3
        } else {
            alert('Mindestanzahl darf nicht unterschritten werden.')
        }
        db.collection('plans').orderBy('Datum').where("UserID", "==", uid).limit(limit).onSnapshot(data => {
            plans = data.docs
        })
    }

    const addPlan = () => {
        const Datum = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection('plans').add({
            Titel, Datum, UserID: uid, Summe
        })
        console.log('erfolgreich hinzugefügt!');
        Titel = ''
    }

    const onSort = () => {
        if (filter === "all") {
            db.collection('plans').orderBy(sort).where("UserID", "==", uid).limit(limit).onSnapshot(data => {
                plans = data.docs
            })
        } else {
            if (filter === "all") {
                db.collection('plans').orderBy('Summe').where("UserID", "==", uid).limit(limit).onSnapshot(data => {
                    plans = data.docs
                })
            } else {
                db.collection('plans').orderBy('Summe').where("UserID", "==", uid).where("Summe", filter, 0).limit(limit).onSnapshot(data => {
                    plans = data.docs
                })
            }
        }
    }

    const onFilter = () => {
        if (filter === "all") {
            db.collection('plans').orderBy('Summe').where("UserID", "==", uid).limit(limit).onSnapshot(data => {
                plans = data.docs
            })
        } else {
            db.collection('plans').orderBy('Summe').where("UserID", "==", uid).where("Summe", filter, 0).limit(limit).onSnapshot(data => {
                plans = data.docs
            })
        }
    }

</script>

<hr/>

<section class="section">
    <div class="container">
        <h1 class="title has-text-white fcolor">Finanzplaner</h1>
        <h2 class="subtitle has-text-white fcolor">
            Wähle deinen Plan
        </h2>
    </div>
</section>


<div class="columns list-column is-mobile">
    <div class="column is-half is-mobile">
        <div class="control has-text-left is-small">
            <label class="has-text-white">Sortieren:</label>
            <div class="select is-small is-rounded">
                <select class="has-icons-left" bind:value={sort} on:change={onSort}>
                    <option name="answer" value={"Datum"}>Standard</option>
                    <option name="answer" value={"Summe"}>Summe</option>
                    <option name="answer" value={"Datum"}>Datum</option>
                    <option name="answer" value={"Titel"}>Titel</option>
                </select>
            </div>
        </div>
    </div>

    <div class="column is-half is-mobile">
        <div class="control has-text-right is-small">
            <label class="has-text-white">Filtern:</label>
            <div class="select is-small is-rounded">
                <select class="has-icons-left" bind:value={filter} on:change={onFilter}>
                    <option name="answer" value={"all"}>Alle</option>
                    <option name="answer" value={">="}>Positiv</option>
                    <option name="answer" value={"<"}>Negativ</option>
                </select>
            </div>
        </div>
    </div>
</div>

<hr/>
//if filter != Alle, dann prüfe das nur bei den angezeigten
{#if plans.length >= 3 && limit <= plans.length}
    <button class="button is-info" on:click={IncreaseNumber}>Mehr</button>
{/if}

{#if limit >= plans.length && limit > 3}
    <button class="button is-info" on:click={LimitNumber}>Weniger</button>
{/if}
<hr/>

<article class="message is-medium is-mobile">
    <form on:submit|preventDefault={addPlan}>
        <div class="message-header has-background-info">
            <p class="subtitle has-text-white is-6 has-text-centered">
                Füge einen neuen Plan hinzu!
            </p>
        </div>
        <div class="message-body">
            <div class="columns is-mobile list-column">
                <div class="column is-narrow">
                    <input class="input is-info is-small" type="text" placeholder="Titel" bind:value={Titel} required/>
                </div>
                <input type="hidden" bind:value={Summe}/>
                <div class="column is-narrow">
                    <button class="button has-background-info is-small">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    </form>
</article>

<div class="container">
    <div class="columns is-multiline is-variable is-2">
        {#each plans as plan}
            <Plan id={plan.id} plan={plan.data()}/>
        {/each}
    </div>
</div>
