<script>

</script>


<div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label class="label">Titel</label>
                <div class="control">
                    <input class="input" type="text" placeholder="e.g Miete">
                </div>
            </div>

            <div class="field">
                <label class="label">Betrag</label>
                <div class="control">
                    <input class="input" type="number" placeholder="e.g. 750€">
                </div>
            </div>

            <div class="control">
                <div class="select">
                    <select>
                        <option>Essen</option>
                        <option>Miete</option>
                        <option>Kleidung</option>
                        <option>Freizeit</option>
                        <option>Arbeit</option>
                    </select>
                </div>
            </div>
            <hr/>
            <div class="control">
                <div class="select">
                    <select>
                        <option>Einmalig</option>
                        <option>Wiederkehrend</option>
                    </select>
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <label class="radio">
                        <input type="radio" name="question">
                        Einnahme
                    </label>
                    <label class="radio">
                        <input type="radio" name="question">
                        Ausgabe
                    </label>
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light">Cancel</button>
                </div>
            </div>

        </section>
        <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button>
        </footer>
    </div>
</div>