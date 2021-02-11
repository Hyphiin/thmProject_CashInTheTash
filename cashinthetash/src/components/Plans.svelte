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


<div class="columns filterwerkzeug">
    <div class="column is-half-desktop has-text-right-desktop" style="padding-left: 0px; padding-right: 5px;">
        <div class="control">
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

    <div class="column is-half-desktop has-text-left-desktop" style="padding-left: 5px; padding-right: 0px;">
        <div class="control">
            <label class="has-text-white">Filtern:</label>
            <div class="select is-small is-rounded">
                <select class="has-icons-left" bind:value={filter} on:change={onFilter}>
                    <option name="answer" value={"all"}>Standard</option>
                    <option name="answer" value={">="}>Positiv</option>
                    <option name="answer" value={"<"}>Negativ</option>
                </select>
            </div>
        </div>
    </div>
</div>


<hr/>

{#if plans.length >= 3 && limit <= plans.length}
    <button class="button is-info" on:click={IncreaseNumber}>Mehr</button>
{/if}

{#if limit >= plans.length && limit > 3}
    <button class="button is-info" on:click={LimitNumber}>Weniger</button>
{/if}

{#if plans.length > 0}
    <hr/>
{/if}

<article class="message is-medium is-mobile">
    <form on:submit|preventDefault={addPlan}>
        <div class="message-header has-background-info addPlan">
            <p class="subtitle has-text-white is-6">
                Füge einen neuen Plan hinzu!
            </p>
        </div>
        <div class="message-body">
            <div class="columns is-mobile list-column addPlan">
                <div class="column is-narrow">
                    <input class="input is-info is-small" type="text" placeholder="Titel" bind:value={Titel}
                           required/>
                </div>
                <input type="hidden" bind:value={Summe}/>
                <div class="column is-narrow">
                    <button class="button is-small has-background-info">
                        <span style="color: White;">
                        <i class="fas fa-plus"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </form>
</article>



<div class="container">
    <div class="columns is-multiline is-variable is-2 is-mobile">
        {#if plans.length <= 0}
            <div class="notification is-info sorry">
                Leider keine passenden Ergebnisse gefunden!
            </div>
        {/if}

        {#each plans as plan}
            <Plan id={plan.id} plan={plan.data()}/>
        {/each}
    </div>
</div>