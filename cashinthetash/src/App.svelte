<script>
    import Profile from './components/Profile.svelte';
    import {auth, googleProvider} from './firebase';
    import {authState} from 'rxfire/auth';
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<main>
    <Navbar/>
    <section class="hero is-info has-text-centered is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="title is-1">
                    CashInTheTash
                </h1>
                <h6 class="subtitle is-6">
                    Plane deine Finanzen!
                </h6>
            </div>
        </div>
    </section>
    <section class="section has-text-centered">
        <p class="tag is-info is-light is-large">Hier kommt ein Bild hin!</p>
        <!--<figure class="image container is-128x128">
            <img class="is-rounded" src="images/Finance4.jpg">
        </figure>-->
    </section>
    <section class="section has-text-centered">
        {#if user}
            <Profile {...user}/>
            <button class="button is-info" on:click={ () => auth.signOut() }>Logout</button>
        {:else}
            <button class="button is-info" on:click={login}>
                Signin with Google
            </button>
        {/if}
    </section>
    <Footer/>
</main>