<script>
    import Profile from './Profile.svelte';
    import {authState} from "rxfire/auth";
    import {auth, googleProvider} from "../firebase";
    import Finances from "./Finances.svelte";
    import Plans from "./Plans.svelte";

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }

    // sides
    let showContend = false;


</script>

<section class="section has-text-centered">
    {#if user}
        <Profile {...user}/>
        <hr/>
        <button class="button is-info" on:click={ () => auth.signOut() }>Logout</button>
        <hr/>

        {#if showContend === false}
            <Plans {...user}/>
        {:else if showContend === true}
            <Finances/>
        {/if}

    {:else}
        <button class="button is-info" on:click={login}>
            Signin with Google
        </button>
    {/if}
</section>