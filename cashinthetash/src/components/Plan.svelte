<script>
    import {db} from '../firebase';
    import Finances from "./Finances.svelte";
    import Finance from "./Finance.svelte";

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

</script>


    <div class={string}>
        <div class="notification is-info" >
            <input class="input" on:input={updatePlan} type="text" bind:value={plan.Titel}/>
                {#if showContent}
                    <Finances planID={id}/>
                {/if}
            <a class="delete is-medium is-danger" on:click={deletePlan}></a>
            <hr/>
            <p class="subtitle has-text-centered is-size-7 is-uppercase has-text-weight-bold">Erstellt: {date}</p>
            <button class="button is-info is-inverted" on:click={showContentButton}>{activatedText}</button>
        </div>
    </div>


