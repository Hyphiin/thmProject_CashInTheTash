<script>

</script>

<svelte:head>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css'>
</svelte:head>

<main>
    <nav class="navbar has-shadow is-white">
        <div class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item" href="javascript:window.location.href=window.location.href">
                    <img src="https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png"
                         alt="Logo">
                </a>
                <div class="navbar-burger burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-item" href="http://localhost:5000/">Home</a>
                    <a class="navbar-item">FAQ</a>
                </div>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Team
                    </a>
                    <div class="navbar-dropdown is-boxed">
                        <p class="navbar-item">
                            Felix Wegener
                        </p>
                        <p class="navbar-item">
                            Chiara Knipprath
                        </p>
                    </div>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                            <p class="control">
                                <a class="button is-dark">
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
    <section class="hero is-primary has-text-centered is-bold" >
        <div class="hero-body" >
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

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>