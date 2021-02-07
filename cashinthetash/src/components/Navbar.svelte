<script>
    import {auth, googleProvider} from '../firebase';
    import {authState} from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }

    let mobile;
    const toggleNav = () =>{
        mobile = !mobile
    }

</script>

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
                <span class="navbar-burger burger" class:is-active={mobile} id="burger" on:click={toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </span>
            </div>
            <div class="navbar-menu" class:is-active={mobile} id="menu">
                <div class="navbar-end">
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
</main>