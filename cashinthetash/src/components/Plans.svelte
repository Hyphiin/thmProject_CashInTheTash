<script>
    import {db} from '../firebase';
    import Plan from './Plan.svelte';
    import firebase from "firebase/app";

    import {showAddConfirmation} from "../store/store";

    function addSuccess() {
		showAddConfirmation.set(true)

        setTimeout(()=>{
            showAddConfirmation.set(false)	
        },3000)
	}

    export let uid;

    let plans = [];
    let allplans = []

    let Titel = '';
    let Summe = 0;

    let sort = 'Datum';
    let filter = "all";

    let limit = 3

    let showContent = false;
    let showDelete = false;
    let currentPlanID;
    let currentPlanData;

    let textTrue = true;

    db.collection('plans').orderBy('Datum').where("UserID", "==", uid).onSnapshot(data => {
        allplans = data.docs
    })

    db.collection('plans').orderBy('Datum').where("UserID", "==", uid).onSnapshot(data => {
        plans = data.docs
    })

    const addPlan = () => {
        const Datum = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection('plans').add({
            Titel, Datum, UserID: uid, Summe
        })
        addSuccess();
        Titel = ''
    }

    const onSort = () => {
        if (filter === "all") {
            db.collection('plans').orderBy(sort).where("UserID", "==", uid).onSnapshot(data => {
                plans = data.docs
            })
        } else {
            db.collection('plans').orderBy('Summe').where("UserID", "==", uid).where("Summe", filter, 0).onSnapshot(data => {
                plans = data.docs
            })
        }
    }

    const onFilter = () => {
        if (filter === "all") {
            db.collection('plans').orderBy(sort).where("UserID", "==", uid).onSnapshot(data => {
                plans = data.docs
            })
        } else {
            db.collection('plans').orderBy('Summe').where("UserID", "==", uid).where("Summe", filter, 0).onSnapshot(data => {
                plans = data.docs
            })
        }
    }

</script>

<div class="newPlan container">
    <article class="message is-medium is-mobile">
        <div class="message-header addPlan">
            <p class="subtitle has-text-white is-6">
                Füge einen neuen Plan hinzu!
            </p>
        </div>
        <form class="box primary-color" on:submit|preventDefault={addPlan}>
            <div class="columns is-mobile list-column addPlan">
                <div class="column is-narrow">
                    <input class="input is-small specialInput" type="text" placeholder="Titel" bind:value={Titel}
                           required/>
                </div>
                <input type="hidden" bind:value={Summe}/>
                <div class="column is-narrow">
                    <button class="button primary-color is-small">
                        Hinzufügen
                    </button>
                </div>
            </div>
          </form>
    </article>
</div>

<section class="section textsection">
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
            <label for="has-icons-left" class="has-text-white">Sortieren:</label>
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
            <label for="has-icons-left" class="has-text-white">Filtern:</label>
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

<div class="container plans">
    <div class="columns is-multiline is-variable is-2 is-mobile">
        {#if plans.length <= 0}
            <div class="notification primary-color sorry has-text-white">
                Leider keine passenden Ergebnisse gefunden!
            </div>
        {/if}
        {#if showContent === true}
            <Plan id={currentPlanID} plan={currentPlanData} bind:showContent={showContent}/>
        {:else}
            {#each plans as plan}
                <Plan id={plan.id} plan={plan.data()} bind:showContent={showContent} bind:showDelete={showDelete}
                      bind:currentPlanID={currentPlanID} bind:currentPlanData={currentPlanData}
                      bind:textTrue={textTrue}/>
            {/each}
        {/if}

    </div>
</div>