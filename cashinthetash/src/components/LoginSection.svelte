<script>
    import Profile from './Profile.svelte';
    import {authState} from "rxfire/auth";
    import {auth, googleProvider} from "../firebase";
    import Finances from "./Finances.svelte";
    import Plans from "./Plans.svelte";

    import {loggingIn, loginSuccess, loginFailure} from "../store/store";

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

    // sides
    let showContent = false;

</script>

<section class="section has-text-centered mainsection">
    {#if user}
        <Profile {...user}/>

        {#if showContent}
            <Finances/>
        {:else}
            <Plans {...user}/>
        {/if}

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
                <div class="card-footer-item">
                    <span>
                        <button class="button primary-color" on:click={login}>
                                Login
                        </button>
                    </span>
                </div>
            </footer>
        </div>
    {/if}
</section>