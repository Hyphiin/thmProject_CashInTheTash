<script>
    import {db} from '../firebase';
    import firebase from "firebase";
    import SimpleList from "./SimpleList.svelte";

    import {showAddConfirmation} from "../store/store";

    function addSuccess() {
		showAddConfirmation.set(true)

        setTimeout(()=>{
            showAddConfirmation.set(false)	
        },3000)
	}

    let finances = [];
    export let sum;

    let Betrag = 0;
    let Name = '';
    let Kategorie = '';
    let Art = '';
    export let planID;
    let Summe = 0;
    let helper = 0;
    let Positiv = false;
    let pos;


    db.collection('finance').orderBy('Datum').where("planID", "==", planID).onSnapshot(data => {
        finances = data.docs
    })


    const addFinance = () => {

        showAdd = !showAdd;

        const Datum = firebase.firestore.Timestamp.fromDate(new Date());
        if(Art === "Einnahme"){
            pos = true
        }else {
            pos = false
        }
        Positiv = pos;

        db.collection('finance').add({
            Betrag, Name, Kategorie, Datum, planID, Art, Summe, Positiv
        })
        addSuccess();
        Name = ''

        if(Art === "Einnahme"){
            sum = sum + Betrag
        }else {
            sum = sum - Betrag
        }

        db.collection('plans').doc(planID).update({
            Summe: sum,
        })

        Betrag = ''

    }

    let showAdd = false;
    let showList = true;
    let activatedText = "Hinzufügen"

    const showADDButton = () => {
        showAdd = !showAdd
    }

</script>


<div class="container">
        {#if showList}
            <SimpleList planID={planID} sum={sum} pos={pos}/>
        {/if}
    {#if finances.length <= 0}
        <div class="tag is-link is-light">
            Leider noch keine Einträge vorhanden!
        </div>
    {/if}
</div>
<div class="container" style="margin-top:15px">
<button class="button primary-color" on:click={showADDButton}>{activatedText}</button>
</div>

{#if showAdd}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Eintrag erstellen</p>
                <button class="delete" aria-label="close"  on:click={() => {showAdd = !showAdd}}></button>
            </header>
            <section class="modal-card-body">
                        <div class="notification primary-color">
                            <form on:submit|preventDefault={addFinance}>
                                <input class="input" type="text" placeholder="Name" bind:value={Name} required/>
                                <input class="input" type="number" bind:value={Betrag} required/>
                                <div class="control has-text-left has-text-white">
                                    <label>Kategorie:  </label>
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
                                            <option name="answer" value={"Haushalt"}>Haushalt</option>
                                            <option name="answer" value={"Sonstige"}>Sonstige</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="control has-text-left has-text-white">
                                    <label>Art?  </label>
                                    <div class="select is-small is-rounded">
                                        <select bind:value={Art}>
                                            <option name="answer" value={""}>Auswählen</option>
                                            <option name="answer" value={"Einnahme"}>Einnahme</option>
                                            <option name="answer" value={"Ausgabe"}>Ausgabe</option>
                                        </select>
                                    </div>
                                </div>
                                <hr/>
                                <button class="button primary-color">Hinzufügen</button>
                            </form>
                        </div>
             </section>
         </div>
     </div>
 {/if}

