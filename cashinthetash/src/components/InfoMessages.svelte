<script>
    import Fa from 'svelte-fa'
    import {faMobile, faMoneyCheck, faChartPie} from '@fortawesome/free-solid-svg-icons'
</script>

<article class="message is-small article-tiles2">
    <div class="message-body">
        <div class="columns is-mobile list-column">
            <div class="column is-narrow is-one-fifth icon-tiles">
                <Fa icon={faMobile} class="fa-2x has-text-white"/>
            </div>
            <div class="column auto has-text-white">
                Der neue, smarte Weg deine Finanzen auf deinem Handy zu organisieren!
            </div>
        </div>
    </div>
</article>

<article class="message is-small article-tiles">
    <div class="message-body">
        <div class="columns is-mobile list-column">
            <div class="column auto has-text-white">
                Erstelle eigene Finanzpläne, füge Ein- und Ausgaben hinzu und habe alles im Blick!
            </div>
            <div class="column is-narrow is-one-fifth icon-tiles">
                <Fa icon={faMoneyCheck} class="fa-2x has-text-white"/>
            </div>
        </div>
    </div>
</article>

<article class="message is-small article-tiles">
    <div class="message-body">
        <div class="columns is-mobile list-column">
            <div class="column is-narrow is-one-fifth icon-tiles">
                <Fa icon={faChartPie} class="fa-2x has-text-white"/>
            </div>
            <div class="column auto has-text-white">
                Überblicke deine Finanzen jetzt auch in Diagrammen!
            </div>
        </div>
    </div>
</article>