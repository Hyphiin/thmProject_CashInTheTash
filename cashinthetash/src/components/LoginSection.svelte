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
        <hr/>
        <div class="card">
            <div class="card-content bg-image">
                <p class="title has-text-light">
                    “Eine kreative Ökonomie ist der Treibstoff der Wohlfahrt.”
                </p>
                <p class="subtitle has-text-light">
                    Ralph Waldo Emerson
                </p>
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
                    <span>
                        <button class="button is-info" on:click={ () => auth.signOut() }>Logout</button>
                    </span>
            </footer>
        </div>

        {#if showContend}
            <Finances/>
        {:else}
            <Plans {...user}/>
        {/if}

    {:else}
        <div class="card">
            <div class="card-content bg-image1">
                <p class="title">
                    “ Warum bleibt so viel Monat am Ende des Geldes übrig?”
                </p>
                <p class="subtitle">
                    John Barrymore
                </p>
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
      <span>
        <button class="button is-info" on:click={login}>
            Signin with Google
        </button>
      </span>
            </footer>
        </div>
    {/if}
</section>