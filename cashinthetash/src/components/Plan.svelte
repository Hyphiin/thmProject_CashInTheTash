<script>
    import {db} from '../firebase';
    import Finances from "./Finances.svelte";
    import '@fortawesome/fontawesome-free/js/all.js';

    export let id = '';
    export let plan = {};
    export let showContent;
    let showEdit;
    export let showDelete;

    export let planID = '';
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
        console.log('erfolgreich gelöscht!');
        showContent = false;
    }

    const updatePlan = () => {
        db.collection('plans').doc(id).update({
            Titel: plan.Titel
        })
        console.log('erfolgreich geupdated!');
    }


    const getID = () => {
        planID = {id};
        console.log(planID);
    }



    console.log("showEdit " + showEdit);

    let string = "column is-two-quarters-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd";
    let activatedText = "Öffnen";
    const showContentButton = () => {
        if (showContent) {
            activatedText = "Öffnen"
            string = "column is-two-quarters-mobile is-half-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
            console.log("showContent1: ", showContent)
            console.log("string1: ", string)
            console.log("activatedText1: ", activatedText)
        } else {
            activatedText = "Schließen"
            string = "column is-full-mobile is-full-tablet is-full-desktop is-full-widescreen is-full-fullhd"
            console.log("showContent2: ", showContent)
            console.log("string2: ", string)
            console.log("activatedText2: ", activatedText)
        }
        showContent = !showContent
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

<div class={string}>
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
                <div class="column is-narrow">
                </div>
                <div class="column is-narrow">
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
                <Finances planID={id} sum={sum}/>
                <hr class="has-background-white"/>
            {/if}
            <p class="subtitle2 has-text-centered is-size-7 is-uppercase has-text-weight-bold has-text-white">Erstellt: {datum}</p>
            <button class="button" on:click={showContentButton}>{activatedText}</button>
        </div>
    </article>
</div>


{#if showDelete}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Plan löschen</p>
                <button class="delete" aria-label="close" on:click={() => {showDelete = !showDelete}}></button>
            </header>
            <div class="notification primary-color">
                <a on:click={() => {showDelete = !showDelete; deletePlan()}}>
                    <i class="fas fa-trash has-text-white"></i>
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