<script>

</script>

<svelte:head>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css'>
</svelte:head>

<main>
    <section class="hero is-primary is-fullheight">
        <!-- Hero head: will stick at the top -->
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div class="navbar-brand">
                        <a class="navbar-item">
                            <img src="https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png" alt="Logo">
                        </a>
                        <span class="navbar-item is-bold">
                            CashInTheTash
                        </span>
                        <span class="navbar-burger" data-target="navbarMenuHeroA">
            <span></span>
            <span></span>
            <span></span>
          </span>
                    </div>
                    <div id="navbarMenuHeroA" class="navbar-menu">
                        <div class="navbar-end">
                            <a class="navbar-item is-active">
                                Home
                            </a>
                            <a class="navbar-item">
                                FAQ
                            </a>
                            <a class="navbar-item">
                                Team
                            </a>
                            <span class="navbar-item">
              <a class="button is-primary is-inverted">
                <span>Login</span>
              </a>
            </span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

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