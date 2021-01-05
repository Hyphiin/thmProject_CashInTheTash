<script>
    import {fade, slide, scale} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {db} from '../firebase';
    import Finance from './Finance.svelte';
    import firebase from "firebase";
    import SimpleList from "./SimpleList.svelte";


    let finances = [];
    let plans = [];

    let Betrag = 0;
    let Name = '';
    let Kategorie = '';
    let Wiederkehrend = '';
    let Einnahme = '';
    let Ausgabe = '';
    export let planID;
    let Summe;
    let helper = 0;


    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        finances = data.docs
    })

    const addFinance = () => {
        const Datum = firebase.firestore.Timestamp.fromDate(new Date());
        db.collection('finance').add({
            Betrag, Name, Kategorie, Datum, planID, Wiederkehrend, Einnahme, Ausgabe
        })
        console.log('erfolgreich hinzugefügt!');
        Name = ''

        console.log(planID);

        if(Einnahme){
            helper = helper + Betrag
            Summe = helper
            console.log(Summe)
        }else {
            helper = helper - Betrag
            Summe = helper
            console.log(Summe)
        }

        db.collection('plans').doc(planID).update({
            Summe: helper
        })
        Betrag = ''
    }

    const showPlan = () => {
        console.log(planID);
    }


    let showEdit = false;
    let showList = true;

    console.log("showList " + showList);

    let activatedText = "Edit"
    const showEditButton = () => {
        showList = !showList
        if (showList) {
            activatedText = "Edit"
        } else {
            activatedText = "Return"
        }
    }

    export let finance = {};
    export let activated;
    let activatedTextTwo = "ADD"
    const showADDButton = () => {
        showEdit = !showEdit
        if (showEdit) {
            activatedTextTwo = "ADD"
        } else {
            activatedTextTwo = "Save"
        }
    }

</script>


<hr/>
<div class="container">
        {#if showList}
            <SimpleList planID={planID} sum={Summe}/>
        {:else}
            <div class="columns columns is-multiline is-variable is-2">
            {#each finances as finance}
                    <Finance id={finance.id} finance={finance.data()}/>
            {/each}
            </div>
        {/if}
</div>
<div class="container" style="margin-top:15px">
<button class="button is-primary" on:click={showEditButton}>{activatedText}</button>
{#if showList === false}
    <button class="button is-primary" on:click={showADDButton}>{activatedTextTwo}</button>
{/if}
</div>

{#if showEdit}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Eintrag erstellen</p>
                <button class="delete" aria-label="close"  on:click={() => {showEdit = !showEdit}}></button>
            </header>
            <section class="modal-card-body">
                        <div class="notification has-background-info-dark">
                            <form on:submit|preventDefault={addFinance}>
                                <input class="input is-info" type="text" placeholder="Name" bind:value={Name}/>
                                <input class="input is-info" type="number" placeholder="Betrag" bind:value={Betrag}/>
                                <div class="control has-text-left">
                                    <label>Kategorie:</label>
                                    <div class="select is-small is-rounded">
                                        <select bind:value={Kategorie}>
                                            <option name="answer" value={""}>Auswählen</option>
                                            <option name="answer" value={"Essen"}>Essen</option>
                                            <option name="answer" value={"Trinken"}>Trinken</option>
                                            <option name="answer" value={"Kleidung"}>Kleidung</option>
                                            <option name="answer" value={"Freizeit"}>Freizeit</option>
                                            <option name="answer" value={"Miete"}>Miete</option>
                                            <option name="answer" value={"Technik"}>Technik</option>
                                            <option name="answer" value={"Versicherung"}>Versicherung</option>
                                            <option name="answer" value={"Sonstige"}>Sonstige</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control has-text-left">
                                    <label>Wiederkehrend?</label>
                                    <div class="select is-small is-rounded">
                                        <select bind:value={Wiederkehrend}>
                                            <option name="answer" value={""}>Auswählen</option>
                                            <option name="answer" value={true}>Wiederkehrend</option>
                                            <option name="answer" value={false}>Einmalig</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control has-text-left">
                                    <label>Einnahme?</label>
                                    <div class="select is-small is-rounded">
                                        <select bind:value={Einnahme}>
                                            <option name="answer" value={""}>Auswählen</option>
                                            <option name="answer" value={true}>Ja</option>
                                            <option name="answer" value={false}>Nein</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control has-text-left">
                                    <label>Ausgabe?</label>
                                    <div class="select is-small is-rounded">
                                        <select bind:value={Ausgabe}>
                                            <option name="answer" value={""}>Auswählen</option>
                                            <option name="answer" value={true}>Ja</option>
                                            <option name="answer" value={false}>Nein</option>
                                        </select>
                                    </div>
                                </div>
                                <hr/>
                                <button class="button is-primary">ADD</button>
                            </form>
                        </div>
             </section>
         </div>
     </div>
 {/if}

