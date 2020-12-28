<script>
    export let displayName;
    export let photoURL;
    export let email;
</script>

<div class="card">
    <div class="card-content">
        <div class="media">
            <div class="media-left">
                <figure class="image is-48x48">
                    <img src={ photoURL } alt="Placeholder image">
                </figure>
            </div>
            <div class="media-content">
                <p class="title is-4">{ displayName }</p>
                <p class="subtitle is-6">{ email }</p>
            </div>
        </div>
    </div>
</div>