<script>

</script>

<svelte:head>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css'>
</svelte:head>

<main>
    <nav class="navbar has-shadow is-white">
        <div class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img src="https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png"
                         alt="Logo">
                </a>
                <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item">Home</a>
                    <a class="navbar-item">Profile</a>
                    <a class="navbar-item">FAQ</a>
                </div>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="/documentation/overview/start/">
                        Team
                    </a>
                    <div class="navbar-dropdown is-boxed">
                        <p class="navbar-item" href="">
                            Felix
                        </p>
                        <p class="navbar-item" href="">
                            Chiara
                        </p>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                            <p class="control">
                                <a class="button is-primary">
								<span>
                				Login
              					</span>
                                </a>
                            </p>
                    </div>
                </div>
            </div>

        </div>
    </nav>
</main>


<style>
    main {
        display: flex;
        text-align: center;
        width: 100%;
        height: 100%;
        flex-direction: column;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    nav {
        display: flex;
        justify-content: flex-start;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>