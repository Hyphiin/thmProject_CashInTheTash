<script>
    import {auth, googleProvider} from '../firebase';
    import {authState} from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
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
                <a class="navbar-item" href="javascript:window.location.href=window.location.href">
                    <img class="tag is-rounded light-color"
                         src='./images/CashInTheTashLogo2.png' alt="Logo"/>
                </a>
                <span class="navbar-item">
                    <h1 class="title is-6 has-text-white">
                        CashInTheTash
                    </h1>
                </span>
                <span class="navbar-burger burger has-text-white" class:is-active={mobile} id="burger"
                      on:click={toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </span>
            </div>
            <div class="navbar-menu" class:is-active={mobile} id="menu">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <span class="navbar-link fontlight-color">
                            Team
                        </span>
                        <div class="navbar-dropdown is-boxed primary-color">
                            <p class="navbar-item has-text-white" href="">
                                Felix
                            </p>
                            <p class="navbar-item has-text-white" href="">
                                Chiara
                            </p>
                        </div>
                    </div>
                    <span class="navbar-item">
                {#if user}
                <button class="button" on:click={ () => auth.signOut() }>Logout</button>
                {:else}
                <button class="button" on:click={login}>
                    <i class="fab fa-google"></i>
                    <i class="placeholder"> | </i>
                        Login

                </button>
                {/if}
            </span>
                    <span class="navbar-item">
                        <button class="button" on:click={() => {info = !info}}>Info</button>
                    </span>
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
                    <img src="images/Info/Plan_erstellen.png"/>
                    <hr/>
                    <p class="has-text-white">Ein erstellter Plan kann außerdem noch bearbeitet und bei Bedarf auch vollständig gelöscht werden.</p>
                    <img src="images/Info/Plan_Edit_and_Open.png"/>
                    <p class="has-text-white">Der Pfeil zeigt, wo ein Plan mit einem Klicken geöffnet werden kann.</p>
                    <hr/>
                    <p class="has-text-white">Die Einträge eines Plans können in 2 Varianten angezeigt werden. Standardäßig werden sie in einer klassischen Liste angezeigt, worauf der Nutzer durch Anlicken des Icons die Ansicht auf eine Diagrammansicht und aucb wieder zurück wechseln kann.</p>
                    <img src="images/Info/Plan_Ansicht_Wechsel.png"/>
                    <hr/>
                    <p class="has-text-white">Ein erstmal erstellter Eintrag, kann ähnlich wie der Plan, auch editiert und gelöscht werden.</p>
                    <img src="images/Info/Eintrag_Edit_And_Delete.png"/>
                    <hr/>
                    <p class="has-text-white">Umkreist sieht man hier einmal den Betrag eines Eintrags, welcher entsprechend seiner Wertigkeit, bei Positivität grün und bei Negativität rot hinterlegt ist</p>
                    <img src="images/Info/Eintraege_Sum.png"/>
                    <p class="has-text-white">Unter der Liste der Einträge wird außerdem die Summe der gesamten Liste angezeigt und ähnlich wie die Summe der einzelnen Einträge, nach ihrer Wertigkeit farbig hinterlegt.</p>
                    <hr/>
                    <p class="has-text-white">Über folgenden Button, kann ein neuer Eintrag für einen Plan erstellt werden.</p>
                    <img src="images/Info/Eintrag_erstellen.png"/>
                </div>
            </section>
        </div>
    </div>
{/if}
