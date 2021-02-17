<script>
    import {authState} from "rxfire/auth";
    import {auth, googleProvider} from "../firebase";

    export let displayName;
    export let photoURL;
    export let email;

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }

</script>

<div class="profile-container">
    <div class="card profile">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img src={ photoURL } alt="Placeholder image">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4 is-size-6-mobile">{ displayName }</p>
                    <p class="subtitle sub">{ email }</p>
                    {#if user}
                        <span>
                            <button class="button" on:click={ () => auth.signOut() }>Logout</button>
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