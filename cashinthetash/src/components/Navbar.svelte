<script>
    import {auth, googleProvider} from '../firebase';
    import {authState} from 'rxfire/auth';

    let user;

    const unsubscribe = authState(auth).subscribe(u => user = u);

    function login() {
        auth.signInWithPopup(googleProvider);
    }

    let mobile;
    const toggleNav = () => {
        mobile = !mobile
    }

</script>

<main>
    <nav class="navbar">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item" href="javascript:window.location.href=window.location.href">
                    <img class="tag is-rounded"
                         src='https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png'
                         alt="Logo">
                </a>
                <span class="navbar-item">
                    <h1 class="title is-6 has-text-white">
                        CashInTheTash
                    </h1>
                </span>
                <span class="navbar-burger burger has-text-white" class:is-active={mobile} id="burger" on:click={toggleNav}>
            <span></span>
            <span></span>
            <span></span>
          </span>
            </div>
            <div class="navbar-menu" class:is-active={mobile} id="menu">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <span class="navbar-link fontlight-color">
                            Team
                        </span>
                        <div class="navbar-dropdown is-boxed primary-color">
                            <p class="navbar-item has-text-white" href="">
                                Felix
                            </p>
                            <p class="navbar-item has-text-white" href="">
                                Chiara
                            </p>
                        </div>
                    </div>
                    <span class="navbar-item">
                {#if user}
                <button class="button" on:click={ () => auth.signOut() }>Logout</button>
                {:else}
                <button class="button" on:click={login}>
                    <i class="fab fa-google"></i>
                    <i class="placeholder"> | </i>
                        Login

                </button>
                {/if}
            </span>
                </div>
            </div>
        </div>
    </nav>
</main>