<script lang="ts">
	import { onMount } from 'svelte';
	import Create from '../../../components/Create.svelte';
	import { mail } from '../../../stores';
	import Organisation from '../../../components/Organisation.svelte';

	let organisations: any[] = [];
	let joinedOrganisations: any[] = [];
	
	onMount(async () => {
		organisations = await fetch(`http://localhost:8000/api/organisations/${$mail}`).then((response) =>
			response.json()
		);
		joinedOrganisations = await fetch(`http://localhost:8000/api/organisations/joined/${$mail}`).then(
			(response) => response.json()
		);
	});
	let display = false;
</script>

<header class="flex justify-between">
	<h1 class="text-2xl">Organisations</h1>
	<button on:click={() => (display = !display)} class="px-2 py-1 bg-gray-200 rounded-md">
		{#if display}
			Close
		{:else}
			+
		{/if}
	</button>
</header>
<main>
	{#if display}
		<Create on:created={() => {display = false}} />
	{/if}
	<h2>My Organisations</h2>
	<div class="grid grid-cols-4 gap-x-2 mb-10">
		{#if organisations}
			{#each organisations as org}
			<Organisation org={org} />
			{/each}
		{/if}
	</div>
	<h2>Joined Organisations</h2>
	<div class="grid grid-cols-4 gap-x-2">
	{#if joinedOrganisations}
		{#each joinedOrganisations as joined}
		<Organisation org={joined} />
		{/each}
	{/if}
	</div>
</main>