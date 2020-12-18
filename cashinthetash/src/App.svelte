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
    <section class="hero is-primary is-fullheight-with-navbar">
        <!-- Hero head: will stick at the top -->


        <!-- Hero content: will be in the middle -->
        <div class="hero-body">
            <div class="container has-text-centered">
                <h1 class="title is-1">
                    CashInTheTash
                </h1>
                <h2 class="subtitle is-6">
                    Plane deine Finanzen!
                </h2>
            </div>
        </div>

        <!-- Hero footer: will stick at the bottom -->
        <div class="hero-foot">
            <nav class="tabs">
                <div class="container">
                    <ul>
                        <li class="is-active"><a>Overview</a></li>
                        <li><a>Impressum</a></li>
                        <li><a>Team</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </section>
</main>