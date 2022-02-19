<script>
    import {authState} from "rxfire/auth";
    import {auth, googleProvider} from "../firebase";

    import {loggingIn, loggingOut, loginSuccess, loginFailure} from "../store/store";

    export let displayName;
    export let photoURL;
    export let email;

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

</script>

<div class="profile-container">
    <div class="card profile">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image">
                        <img src={ photoURL } alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4 is-size-6-mobile">{ displayName }</p>
                    <p class="subtitle sub">{ email }</p>
                    {#if user}
                        <span>
                            <button class="button" on:click={ () => logout() }>Logout</button>
                        </span>
                    {:else}
                        <button class="button" on:click={login}>
                            Login
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>