<script>
	import Inbox from '../../components/Inbox.svelte';
	import Tasks from '../../components/Tasks.svelte';
</script>

<header><h1 class="text-2xl">Dashboard</h1></header>
<main class="flex justify-between">
	<Tasks />
	<Inbox />
</main>