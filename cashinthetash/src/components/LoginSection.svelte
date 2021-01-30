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

    console.log("showContend " + showContend);

</script>

<section class="section has-text-centered">
    {#if user}
        <Profile {...user}/>

        {#if showContend}
            <Finances/>
        {:else}
            <Plans {...user}/>
        {/if}

    {:else}
        <div class="box">
            <form>
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input class="input" type="email" placeholder="z.b. alex@beispiel.com">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Passwort</label>
                    <div class="control">
                        <input class="input" type="password" placeholder="********">
                    </div>
                </div>
                <button class="button is-info">Einloggen</button>
            </form>
            <div class="is-invisible">
                invisible
            </div>
            <button class="button is-info">Registrieren</button>
            <hr/>
            <button class="button is-info" on:click={login}>
                <i class="fab fa-google"></i>
            </button>
        </div>
    {/if}
</section>