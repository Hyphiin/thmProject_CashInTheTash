<script>
    import {db} from "../firebase";

    export let id = '';
    export let finance = {};
    export let planID;



    let date = finance.Datum.toDate().toDateString();

    let datum = finance.Datum.toDate()
    let mm = datum.getMonth() + 1;
    let dd = datum.getDate();
    let yyyy = datum.getFullYear();

    datum = dd + '/' + mm + '/' + yyyy;

    let color = ""
    export let color2
    let sum = 0;

    let helper = 0;
    let Summe;

    db.collection("plans")
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots

                console.log(doc.id, " => ", doc.data().Summe);
                sum = doc.data().Summe;
                // console.log("Booked",doc.data().get("booked"));
            });
        });

    const colorCheck = () => {
        if (finance.Art === "Einnahme") {
            color = "is-success"
        } else {
            color = "is-danger"
        }
        if(sum>0){
            color2 = "is-success"
        }else{
            color2 = "is-danger"
        }
        console.log(color+" , "+color2)
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
        db.collection('finance').doc(id).delete()
        console.log('erfolgreich gelöscht!');
        showDelete = !showDelete
    }

    const updateFinance = () => {
        db.collection('finance').doc(id).update({
            Betrag: finance.Betrag,
            Name: finance.Name
        })

        if(finance.Art === "Einnahme"){
            helper = helper + finance.Betrag
            Summe = helper
            console.log(Summe)
        }else {
            helper = helper - finance.Betrag
            Summe = helper
            console.log(Summe)
        }

        let updatePlan = db.collection('plan').where("planID", "==", planID);
        updatePlan.get().then(function(querySnapshot){
            querySnapshot.forEach(function(doc){
                doc.ref.update({
                    Summe: Summe
                });
            });
        });
        colorCheck()
        console.log('erfolgreich geupdated!');
    }
    colorCheck()

</script>


<article class="message is-small {color}">
    <div class="message-header">
        <div class="columns is-mobile list-column">
            <div class="column">
                <p class="has-text-left">{finance.Name}</p>
            </div>
            <div class="column is-narrow" on:click={showEditButton}>
                <i class="fas fa-pen is-6"></i>
            </div>
            <div class="column is-narrow" on:click={showDeleteButton}>
                <i class="fas fa-trash is-6"></i>
            </div>
        </div>

    </div>
    <div class="message-body">
        <div class="columns is-mobile">
            <div class="column">
                <span class="tag is-info is-light">
                    {finance.Kategorie}
                </span>
            </div>
            <div class="column">
                <span>{finance.Betrag}</span>
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
            <header class="modal-card-head">
                <p class="modal-card-title">Eintrag löschen</p>
                <button class="delete" aria-label="close" on:click={() => {showDelete = !showDelete;colorCheck()}}></button>
            </header>
            <div class="notification has-background-info">
                <a on:click={() => {deleteFinance();colorCheck()}}>
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
                <p class="modal-card-title">Eintrag updaten</p>
                <button class="delete" aria-label="close"  on:click={() => {showEdit = !showEdit}}></button>
            </header>
            <section class="modal-card-body">
                <div class="notification has-background-info-dark">
                    <form on:submit|preventDefault={updateFinance}>
                        <input class="input is-info" type="text" placeholder="Name" bind:value={finance.Name} required/>
                        <input class="input is-info" type="number" placeholder="Betrag" bind:value={finance.Betrag} required/>
                        <div class="control has-text-left">
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
                                    <option name="answer" value={"Sonstige"}>Sonstige</option>
                                </select>
                            </div>
                        </div>
                        <div class="control has-text-left">
                            <label>Wiederkehrend?</label>
                            <div class="select is-small is-rounded">
                                <select bind:value={finance.Wiederkehrend}>
                                    <option name="answer" value={""}>Auswählen</option>
                                    <option name="answer" value={true}>Wiederkehrend</option>
                                    <option name="answer" value={false}>Einmalig</option>
                                </select>
                            </div>
                        </div>
                        <div class="control has-text-left">
                            <label>Art?</label>
                            <div class="select is-small is-rounded">
                                <select bind:value={finance.Art}>
                                    <option name="answer" value={""}>Auswählen</option>
                                    <option name="answer" value={"Einnahme"}>Einnahme</option>
                                    <option name="answer" value={"Ausgabe"}>Ausgabe</option>
                                </select>
                            </div>
                        </div>
                        <hr/>
                        <button class="button is-primary" on:click={() => {showEdit = !showEdit; colorCheck()}}>Speichern</button>
                    </form>
                </div>
            </section>
        </div>
    </div>
{/if}






