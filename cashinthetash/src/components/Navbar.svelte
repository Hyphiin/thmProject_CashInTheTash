<script>
    import {auth, googleProvider} from '../firebase';
    import {authState} from 'rxfire/auth';

    import {loggingIn, loggingOut, loginSuccess, loginFailure} from "../store/store";

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        loggingIn.set(true);
        auth.signInWithPopup(googleProvider).then(res => {
            loggingIn.set(false);
            loginSuccess.set(true);
            setTimeout(()=>{
                loginSuccess.set(false);
            }, 3000);
        }).catch(e=>{
            loggingIn.set(false);
            loginFailure.set(true);
            setTimeout(()=>{
                loginFailure.set(false);
            }, 3000);
        });
    }

    function logout() {
        auth.signOut().then(()=>{
            loggingOut.set(true);
            setTimeout(()=>{
                loggingOut.set(false);
            }, 3000)
        }).catch(e=>{
            loggingOut.set(false);
        })
    }

    let mobile;
    const toggleNav = () => {
        mobile = !mobile
    }

    let info = false;

</script>

<main>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <h1 class="title is-6 has-text-white">
                        CashInTheTash
                    </h1>
                </div>
                <div class="navbar-burger burger has-text-white" class:is-active={mobile} id="burger"
                      on:click={toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </div>
            </div>
            <div class="navbar-menu" class:is-active={mobile} id="menu">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-link">
                            Team
                        </div>
                        <div class="navbar-dropdown is-boxed primary-color">
                            <p class="navbar-item has-text-white" href="">
                                Felix
                            </p>
                            <p class="navbar-item has-text-white" href="">
                                Chiara
                            </p>
                        </div>
                    </div>
                    <div class="navbar-item">
                {#if user}
                <button class="button primary-color" on:click={ () => logout() }>Logout</button>
                {:else}
                <button class="button primary-color" on:click={login}>
                    
                        Login

                </button>
                {/if}
            </div>
                    <div class="navbar-item">
                        <button class="button primary-color" on:click={() => {info = !info}}>Info</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</main>



{#if info}
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title">Allgemeine Informationen</p>
                <button class="delete" aria-label="close"  on:click={() => {info = !info}}></button>
            </header>
            <section class="modal-card-body">
                <div class="notification primary-color">
                    <p class="has-text-white">Hier kann ein Plan erstellt werden:</p>
                    <img src="images/Info/Plan_erstellen.png" alt="Plan erstellen."/>
                    <hr/>
                    <p class="has-text-white">Ein erstellter Plan kann außerdem noch bearbeitet und bei Bedarf auch vollständig gelöscht werden.</p>
                    <img src="images/Info/Plan_Edit_and_Open.png" alt="Plan editieren und öffnen."/>
                    <p class="has-text-white">Der Pfeil zeigt, wo ein Plan mit einem Klicken geöffnet werden kann.</p>
                    <hr/>
                    <p class="has-text-white">Die Einträge eines Plans können in 2 Varianten angezeigt werden. Standardäßig werden sie in einer klassischen Liste angezeigt, worauf der Nutzer durch Anlicken des Icons die Ansicht auf eine Diagrammansicht und auch wieder zurück wechseln kann.</p>
                    <img src="images/Info/Plan_Ansicht_Wechsel.png" alt="Ansicht Wechsel."/>
                    <hr/>
                    <p class="has-text-white">Ein erstmal erstellter Eintrag, kann ähnlich wie der Plan, auch editiert und gelöscht werden.</p>
                    <img src="images/Info/Eintrag_Edit_And_Delete.png" alt="Eintrag editieren und öffnen."/>
                    <hr/>
                    <p class="has-text-white">Umkreist sieht man hier einmal den Betrag eines Eintrags, welcher entsprechend seiner Wertigkeit, bei Positivität grün und bei Negativität rot hinterlegt ist</p>
                    <img src="images/Info/Eintraege_Sum.png" alt="Die Gesamtsumme der Einträge eines Plans."/>
                    <p class="has-text-white">Unter der Liste der Einträge wird außerdem die Summe der gesamten Liste angezeigt und ähnlich wie die Summe der einzelnen Einträge, nach ihrer Wertigkeit farbig hinterlegt.</p>
                    <hr/>
                    <p class="has-text-white">Über folgenden Button, kann ein neuer Eintrag für einen Plan erstellt werden.</p>
                    <img src="images/Info/Eintrag_erstellen.png" alt="Eintrag erstellen."/>
                </div>
            </section>
        </div>
    </div>
{/if}
