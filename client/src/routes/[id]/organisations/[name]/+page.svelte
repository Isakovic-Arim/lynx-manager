<script lang="ts">
	import { onMount } from "svelte";
	import { orgName } from "../../../../stores";

	let users: any;
	onMount(async () => {
		users = await fetch(`http://localhost:8000/api/organisations/collaborators/${$orgName}`).then(response => response.json());
	});

	const remove = async () => {
		await fetch(`http://localhost:8000/api/organisations/${$orgName}`, {
			method: 'DELETE'
		});
	}
</script>

<h1>{$orgName}</h1>
<main>
	
	{#if users}
		{#each users as user}
			{user.email}
		{/each}
	{/if}
	<button class="bg-red-500 text-white" on:click={remove}>Delete</button>
</main>