<script lang="ts">
	import { onMount } from 'svelte';
	import Create from '../../../components/Create.svelte';
	import { id, orgName } from '../../../stores';
	import { goto } from '$app/navigation';

	let organisations: any[] = [];
	let joinedOrganisations: any[] = [];
	onMount(async () => {
		organisations = await fetch(`http://localhost:8000/api/organisations/${$id}`).then((response) =>
			response.json()
		);
		joinedOrganisations = await fetch(`http://localhost:8000/api/organisations/joined/${$id}`).then(
			(response) => response.json()
		);
	});
	let display = false;
</script>

<header><h1 class="text-2xl">Organisations</h1></header>
<button on:click={() => (display = !display)}>
	{#if display}
		Cancel
	{:else}
		Create
	{/if}
</button>

<main>
	<h2>My Organisations</h2>
	<div class="grid grid-cols-4 place-items-center">
		{#if organisations}
			{#each organisations as organisation}
				<button
					class="bg-slate-300 w-32 h-32"
					on:click={() => {
						goto(`organisations/${organisation.name}`);
						$orgName = organisation.name;
					}}
				>
					<p>{organisation.name}</p>
					<p>{organisation.collaborators.length}</p>
				</button>
			{/each}
		{/if}
	</div>
	<h2>Joined Organisations</h2>
	{#if joinedOrganisations}
		{#each joinedOrganisations as joined}
			<button
				class="bg-slate-400 w-32 h-32"
				on:click={() => {
					goto(`organisations/${joined.name}`);
					$orgName = joined.name;
				}}
			>
				<p>{joined.name}</p>
				<p>{joined.collaborators.length}</p>
			</button>
		{/each}
	{/if}
	{#if display}
		<Create />
	{/if}
</main>
