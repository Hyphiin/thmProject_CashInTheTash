<script>
    import {db} from "../firebase";

    export let id = '';
    export let finance = {};
    export let planID;
    export let sum;
    export let pos;

    export let currentItemID;
    export let currentItemData;

    let date = finance.Datum.toDate().toDateString();

    let datum = finance.Datum.toDate()
    let mm = datum.getMonth() + 1;
    let dd = datum.getDate();
    let yyyy = datum.getFullYear();

    datum = dd + '/' + mm + '/' + yyyy;

    export let colorSum;

    let helper = 0;

    currentItemData = finance;

    export const colorCheck = () => {
            if (sum >= 0) {
                colorSum = "is-success"
            } else {
                colorSum = "is-danger"
            }
            console.log("COLOR CHECKED!")
    }

    let showEdit = false
    let showDelete = false

    const showDeleteButton = () => {
        showDelete = !showDelete
    }
    const showEditButton = () => {
        showEdit = !showEdit
    }

    const deleteFinance = () => {
        showDelete = !showDelete
        if(finance.Art === "Einnahme"){
            sum = sum - finance.Betrag
            console.log("after delete Sum: ",sum)
        }else {
            sum = sum + finance.Betrag
            console.log("after delete Sum: ",sum)
        }
        db.collection('plans').doc(planID).update({
            Summe: sum
        })

        db.collection('finance').doc(id).delete()
        colorCheck()
        console.log('erfolgreich gelöscht!');
    }

    let aktBetrag = finance.Betrag
    let aktArt = finance.Art

    const updateFinance = () => {
        console.log("Betrag davor: ",aktBetrag)

        if(aktArt === "Einnahme"){
            sum = sum - aktBetrag
            console.log("Sum vor Update: ",sum)
        }else {
            sum = sum + aktBetrag
            console.log("Sum  vor Update: ",sum)
        }

        db.collection('finance').doc(id).update({
            Betrag: finance.Betrag,
            Name: finance.Name,
            Kategorie: finance.Kategorie,
            Art: finance.Art
        })

        aktBetrag = finance.Betrag
        aktArt = finance.Art

        console.log("Betrag danach: ", aktBetrag)

        if(finance.Art === "Einnahme"){
            sum = sum + aktBetrag
            pos = true
            console.log("Sum danach: ",sum)
        }else {
            sum = sum - aktBetrag
            pos = false
            console.log("Sum danach: ",sum)
        }
        console.log("pos: ",pos)

        db.collection('plans').doc(planID).update({
            Summe: sum,
        })
        db.collection('finance').doc(id).update({
            Positiv: pos
        })

        colorCheck()
        console.log('erfolgreich geupdated!');
    }
    colorCheck()
</script>


<article class="message is-small">
    <div class="message-header" style="padding-right: 0">
        <div class="columns is-mobile list-column">
            <div class="column">
                <p class="has-text-left name">{finance.Name}</p>
            </div>
            <div class="column is-narrow" on:click={showEditButton}>
                <i class="fas fa-pen is-6"></i>
            </div>
            <div class="column is-narrow"></div>
            <div class="column is-narrow" style="padding-right:0" on:click={showDeleteButton}>
                <i class="fas fa-trash is-6 has-text-white"></i>
            </div>
        </div>

    </div>
    <div class="message-body has-background-white">
        <div class="columns is-mobile">
            <div class="column has-text-left">
                <span>
                    {finance.Kategorie}
                </span>
            </div>
            <div class="column has-text-left">
                {#if finance.Positiv}
                    <span class="tag is-success is-light">{finance.Betrag}€</span>
                {:else}
                    <span class="tag is-danger is-light">-{finance.Betrag}€</span>
                {/if}
            </div>
            <div class="column is-narrow">
                <span>{datum}</span>
            </div>
        </div>
    </div>
</article>


{#if showDelete}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head primary-color">
                <p class="modal-card-title has-text-white">Löschvorgang fortsetzen?</p>
                <button class="delete" aria-label="close" on:click={() => {showDelete = !showDelete;colorCheck()}}></button>
            </header>
            <footer class="modal-card-foot">
                <button class="button primary-color" on:click={() => {deleteFinance();colorCheck()}}>Löschen</button>
                <button class="button primary-color" on:click={() => {showDelete = !showDelete;colorCheck()}}>Abbrechen</button>
            </footer>
        </div>
    </div>
{/if}

{#if showEdit}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Eintrag bearbeiten</p>
                <button class="delete" aria-label="close"  on:click={() => {showEdit = !showEdit; colorCheck()}}></button>
            </header>
            <section class="modal-card-body primary-color">
                    <form on:submit|preventDefault={updateFinance}>
                        <input class="input" type="text" placeholder="Name" bind:value={finance.Name} required/>
                        <input class="input" type="number" placeholder="Betrag" bind:value={finance.Betrag} required/>
                        <div class="control has-text-left has-text-white">
                            <label>Kategorie:</label>
                            <div class="select is-small is-rounded">
                                <select bind:value={finance.Kategorie}>
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
                            <label>Art?</label>
                            <div class="select is-small is-rounded">
                                <select bind:value={finance.Art}>
                                    <option name="answer" value={""}>Auswählen</option>
                                    <option name="answer" value={"Einnahme"}>Einnahme</option>
                                    <option name="answer" value={"Ausgabe"}>Ausgabe</option>
                                </select>
                            </div>
                        </div>
                    </form>
            </section>
            <footer class="modal-card-foot">
                <button type="button" class="button primary-color" on:click={() => {showEdit = !showEdit; colorCheck();updateFinance()}}>Speichern</button>
            </footer>
        </div>
    </div>
{/if}






