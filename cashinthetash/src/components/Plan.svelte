<script>
    import {db} from '../firebase';
    import Finances from "./Finances.svelte";
    import '@fortawesome/fontawesome-free/js/all.js';

    import {showDeletionConfirmation, showUpdateConfirmation} from "../store/store";

    function deleteSuccess() {
		showDeletionConfirmation.set(true)

        setTimeout(()=>{
            showDeletionConfirmation.set(false)	
        },3000)
	}

    function updateSuccess() {
		showUpdateConfirmation.set(true)

        setTimeout(()=>{
            showUpdateConfirmation.set(false)	
        },3000)
	}

    export let id = '';
    export let plan = {};
    export let showContent;
    let showEdit;
    export let showDelete;

    export let currentPlanID;
    export let currentPlanData;


    const deletePlan = () => {
        db.collection('plans').doc(id).delete()
        let deleteFinance = db.collection('finance').where("planID", "==", id);
        deleteFinance.get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.delete();
            });
        });
        deleteSuccess();
        showContent = false;
    }

    const updatePlan = () => {
        db.collection('plans').doc(id).update({
            Titel: plan.Titel
        })
        updateSuccess()
    }

    export let textTrue;
    let stringColumn;
    let activatedText;

    if (textTrue) {
        stringColumn = "column is-two-quarters-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd";
        activatedText = "Öffnen";
    } else {
        activatedText = "Schließen"
        stringColumn = "column is-full-mobile is-full-tablet is-half-desktop is-offset-one-quarter-desktop is-half-widescreen is-offset-one-quarter-widescreen is-half-fullhd is-offset-one-quarter-fullhd"
    }

    const showContentButton = () => {
        showContent = !showContent
        if (showContent) {
            activatedText = "Schließen"
            stringColumn = "column is-full-mobile is-full-tablet is-half-desktop  is-offset-one-quarter-desktop is-half-widescreen is-offset-one-quarter-widescreen is-half-fullhd is-offset-one-quarter-fullhd"
        } else {
            activatedText = "Öffnen"
            stringColumn = "column is-two-quarters-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"   
        }
        currentPlanID = id;
        currentPlanData = plan;
    }


    const showDeleteButton = () => {
        showDelete = !showDelete
    }

    const showEditButton = () => {
        showEdit = !showEdit
    }

    let datum = plan.Datum.toDate()
    let mm = datum.getMonth() + 1;
    let dd = datum.getDate();
    let yyyy = datum.getFullYear();

    datum = dd + '/' + mm + '/' + yyyy;

    $: sum = plan.Summe;

</script>

<div class={stringColumn}>
    <article class="message is-medium">
        <div class="message-header">
            <div class="columns is-mobile list-column">
                <div class="column is-narrow">
                </div>
                <div class="column" style="padding-left:5px">
                    <p class="title is-4 has-text-white has-text-left name">
                        {plan.Titel}
                    </p>
                </div>
                <div class="column is-narrow" style="padding-right:2px;" on:click={showEditButton}>
                    <i class="fas fa-pen is-6"></i>
                </div>
                <div class="column is-narrow">
                </div>
                <div class="column is-narrow" style="padding-right:6px;" on:click={showDeleteButton}>
                    <i class="fas fa-trash is-6 has-text-white"></i>
                </div>
            </div>

        </div>
        <div class="message-body">
            {#if showContent}
                <Finances planID={id} sum={sum} />
                <hr class="has-background-white"/>
            {/if}
            <p class="subtitle2 has-text-centered is-size-7 is-uppercase has-text-weight-bold has-text-white">
                Erstellt: {datum}</p>
            <button class="button primary-color" on:click={showContentButton}>{activatedText}</button>
        </div>
    </article>
</div>


{#if showDelete}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head primary-color">
                <p class="modal-card-title has-text-white">Plan löschen</p>
                <button class="delete" aria-label="close" on:click={() => {showDelete = !showDelete}}></button>
            </header>
            <footer class="modal-card-foot">
                <button class="button primary-color" on:click={() => {showDelete = !showDelete; deletePlan()}}>Löschen</button>
                <button class="button primary-color" on:click={() => {showDelete = !showDelete}}>Abbrechen</button>
            </footer>
        </div>
    </div>
{/if}

{#if showEdit}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head primary-color">
                <p class="modal-card-title has-text-white">Plan umbenennen</p>
                <button class="delete" aria-label="close" on:click={() => {showEdit = !showEdit}}></button>
            </header>
            <section class="modal-card-body">
                <input class="input" type="text" on:input={updatePlan} bind:value={plan.Titel}/>
            </section>
            <footer class="modal-card-foot">
                <button class="button primary-color" on:click={() => {showEdit = !showEdit}}>Schließen</button>
            </footer>
        </div>
    </div>
{/if}