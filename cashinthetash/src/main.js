import App from './App.svelte';
import Ueberblick from './components/Ueberblick.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;