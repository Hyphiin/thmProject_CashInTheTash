<script>
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";
    import Banner from "./components/Banner.svelte";
    import LoginSection from "./components/LoginSection.svelte";

    import {showDeletionConfirmation, showUpdateConfirmation, showAddConfirmation, loggingIn, loggingOut, loginSuccess, loginFailure} from "./store/store";

    let showDeletionConfirmationValue;
    let showUpdateConfirmationValue;
    let showAddConfirmationValue;

    let logInProcess;
    let logOutProcess;

    let loginSuc;
    let loginFail;

	showDeletionConfirmation.subscribe(value => {
		showDeletionConfirmationValue = value;
	});

    showUpdateConfirmation.subscribe(value => {
		showUpdateConfirmationValue = value;
	});

    showAddConfirmation.subscribe(value => {
		showAddConfirmationValue = value;
	});

    loggingIn.subscribe(value => {
		logInProcess = value;
	});

    loggingOut.subscribe(value => {
		logOutProcess = value;
	});

    loginSuccess.subscribe(value => {
		loginSuc = value;
	});

    loginFailure.subscribe(value => {
		loginFail = value;
	});

</script>

<svelte:head>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css'>
    <link rel='stylesheet' href='../global.css'>
</svelte:head>

<main class="bg-image2">
    <Navbar/>
    {#if showDeletionConfirmationValue}
    <div class="notification is-danger is-light alertNotification">
            Erfolgreich gelöscht!
    </div>
    {/if}
    {#if showUpdateConfirmationValue}
    <div class="notification is-info is-light alertNotification">
            Erfolgreich geupdated!
    </div>
    {/if}
    {#if showAddConfirmationValue}
    <div class="notification is-success is-light alertNotification">
            Erfolgreich hinzugefügt!
    </div>
    {/if}
    <Banner/>
    {#if logInProcess === false && logOutProcess === false}
    <LoginSection/>
    {:else if logInProcess === true && logOutProcess === false}
        <div style="min-height: 500px; display: flex; justify-content: center; align-items: center;">
            <p class="title is-2 has-text-white">Wir loggen dich ein...</p>
        </div>
    {:else}
        <div class="notification is-success is-light alertNotification">
            Erfolgreich ausgeloggt!
        </div>
        <LoginSection/>
    {/if}
    <Footer/>
    {#if loginSuc}
        <div class="notification is-success is-light alertNotification">
            Erfolgreich eingeloggt!
        </div>
    {/if}
    {#if loginFail}
        <div class="notification is-danger is-light alertNotification">
            Fehlgeschlagen!
        </div>
    {/if}
</main>