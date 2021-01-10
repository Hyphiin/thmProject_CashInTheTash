<script>
    import {db} from '../firebase';
    import Finances from "./Finances.svelte";
    import '@fortawesome/fontawesome-free/js/all.js';

    export let finance = {};

    export let id = '';
    export let plan = {};

    const deletePlan = () => {
        db.collection('plans').doc(id).delete()
        let deleteFinance = db.collection('finance').where("planID", "==", id);
        deleteFinance.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
        console.log('erfolgreich gelöscht!');
    }

    const updatePlan = () => {
        db.collection('plans').doc(id).update({
            Titel: plan.Titel
        })
        console.log('erfolgreich geupdated!');
    }

    export let planID = '';

    const getID = () => {
        planID = {id};
        console.log(planID);
    }

    export let showContent;
    export let showList;
    export let showEdit;

    let date = plan.Datum.toDate().toDateString();
    console.log("showEdit " + showEdit);

    let string = "column is-two-quarters-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd";
    let activatedText = "Öffnen";
    const showContentButton = () => {
        showContent = !showContent
        if (showContent) {
            activatedText = "Schließen"
            string = "column is-full-mobile is-full-tablet is-full-desktop is-full-widescreen is-full-fullhd"
        } else {
            activatedText = "Öffnen"
            string = "column is-two-quarters-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
        }

    }

    let showDelete = false;

    const showDeleteButton = () => {
        showDelete = !showDelete
    }

    const showEditButton = () => {
        showEdit = !showEdit
    }

</script>


<div class={string}>
    <div class="notification is-info">
        <div class="columns">
            <div class="column is-four-fifths">
                <p class="title is-4">
                {plan.Titel}
                </p>
            </div>
            <div class="column" on:click={showEditButton}>
                <i class="fas fa-pen is-6"></i>
            </div>
            <div class="column" on:click={showDeleteButton}>
                <i class="fas fa-trash is-6"></i>
            </div>
        </div>
        <!--<input class="input" on:input={updatePlan} type="text" bind:value={plan.Titel}/>-->
        {#if showContent}
            <Finances planID={id}/>
        {/if}
        <hr/>
        <p class="subtitle has-text-centered is-size-7 is-uppercase has-text-weight-bold">Erstellt: {date}</p>
        <button class="button is-info is-inverted" on:click={showContentButton}>{activatedText}</button>
    </div>
</div>


{#if showDelete}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Plan löschen</p>
                <button class="delete" aria-label="close" on:click={() => {showDelete = !showDelete}}></button>
            </header>
            <div class="notification has-background-info">
                <a on:click={deletePlan}>
                    <i class="fas fa-trash"></i>
                </a>
            </div>
        </div>
    </div>
{/if}

{#if showEdit}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <input class="input" on:input={updatePlan} type="text" bind:value={plan.Titel}/>
                <button class="delete" aria-label="close" on:click={() => {showEdit = !showEdit}}></button>
            </header>
        </div>
    </div>
{/if}