<script>
    import Navbar from "./components/Navbar.svelte";
    import Footer from "./components/Footer.svelte";
    import Banner from "./components/Banner.svelte";
    import LoginSection from "./components/LoginSection.svelte";
</script>

<svelte:head>
    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css'>
    <link rel='stylesheet' href='../global.css'>
</svelte:head>

<main class="bg-image2">
    <Navbar/>
    <Banner/>
    <LoginSection/>
    <Footer/>
</main>