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
    let showContent = false;

    console.log("showContend " + showContent);

</script>

<section class="section has-text-centered">
    {#if user}
        <Profile {...user}/>

        {#if showContent}
            <Finances/>
        {:else}
            <Plans {...user}/>
        {/if}

        <hr/>
        <div class="card">
            <div class="card-content has-background-black">
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
                        <button class="button" on:click={ () => auth.signOut() }>Logout</button>
                    </span>
            </footer>
        </div>

    {:else}
        <div class="card">
            <div class="card-content has-background-black ">
                <p class="title fcolor has-text-white">
                    “ Warum bleibt so viel Monat am Ende des Geldes übrig?”
                </p>
                <p class="subtitle fcolor has-text-white">
                    John Barrymore
                </p>
            </div>
            <footer class="card-footer">
                <p class="card-footer-item">
      <span>
        <button class="button" on:click={login}>
            <i class="fab fa-google"></i>
            <i class="placeholder"> | </i>
            Login

        </button>
      </span>
            </footer>
        </div>
    {/if}
</section>