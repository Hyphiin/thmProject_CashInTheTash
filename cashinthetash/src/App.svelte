<script>
    import Profile from './Profile.svelte';
    import {auth, googleProvider} from './firebase';
    import {authState} from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>

<svelte:head>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css'>
</svelte:head>

<main>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="javascript:window.location.href=window.location.href">
                    <img class="tag is-info is-light is-rounded"
                         src='https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png'
                         alt="Logo">
                </a>
                <span class="navbar-item">
                    <h1 class="title is-6">
                        CashInTheTash
                    </h1>
                </span>
                <span class="navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </span>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <a class="navbar-item">
                        Home
                    </a>
                    <a class="navbar-item">
                        FAQ
                    </a>
                    <div class="navbar-item has-dropdown is-hoverable">
                        <span class="navbar-link">
                            Team
                        </span>
                        <div class="navbar-dropdown is-boxed">
                            <p class="navbar-item" href="">
                                Felix
                            </p>
                            <p class="navbar-item" href="">
                                Chiara
                            </p>
                        </div>
                    </div>
                    <span class="navbar-item">
              <a class="button is-info">
                {#if user}
                <button class="button is-info" on:click={ () => auth.signOut() }>Logout</button>
                {:else}
                <button class="button is-info" on:click={login}>
                    Login
                </button>
                {/if}
              </a>
            </span>
                </div>
            </div>
        </div>
    </nav>
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
        <figure class="image container is-128x128">
            <img class="is-rounded" src="images/Finance4.jpg">
        </figure>
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

</main>