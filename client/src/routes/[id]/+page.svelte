<script>
	import HomeWidget from '../../components/HomeWidget.svelte';
	import Inbox from '../../components/Inbox.svelte';
	import Tasks from '../../components/Tasks.svelte';
</script>

<header><h1 class="text-2xl">Dashboard</h1></header>
<main class="w-full h-full">
	<HomeWidget />
	<div class="flex justify-between h-1/2">
		<Tasks />
		<Inbox />
	</div>
</main>