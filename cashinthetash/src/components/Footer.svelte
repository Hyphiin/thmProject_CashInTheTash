<script>
    import {auth} from "../firebase";

    let loggedIn = false;

    auth.onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in.
            loggedIn = true;
        } else {
        // No user is signed in.
            loggedIn = false;
        }
    });

</script>
<footer class="footer">
    <div class="content has-text-centered">
        <p class="tag is-medium">
            CashInTheTash
        </p>
    </div>
</footer>