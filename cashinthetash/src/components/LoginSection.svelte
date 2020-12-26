<script>
    import Profile from './Profile.svelte';
    import Ueberblick from "./Ueberblick.svelte";
    import {authState} from "rxfire/auth";
    import {auth, googleProvider} from "../firebase";
    import Finances from "./Finances.svelte";
    import Plans from "./Plans.svelte";


    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<section class="section has-text-centered">
    {#if user}
        <Profile {...user}/>
        <button class="button is-info" on:click={ () => auth.signOut() }>Logout</button>
        <Plans/>
        <!--<Ueberblick/>-->
    {:else}
        <button class="button is-info" on:click={login}>
            Signin with Google
        </button>
    {/if}
</section>