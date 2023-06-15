<script lang="ts">
	import { onMount } from 'svelte';
	import { id, mail } from '../stores';

	let requests: any[];
	onMount(async () => {
		requests = await fetch(`http://localhost:8000/api/notifs/${$id}`).then((response) =>
			response.json()
		);
	});

    const accept = async (request: any) => {
		const orgName = request.orgName;
		const user = {
			id: $id,
			email: $mail
		}
        await fetch('http://localhost:8000/api/organisations/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				orgName: orgName,
				user: user
			})
		})
		remove(request);
    }

    const remove = async (request: any) => {
        await fetch('http://localhost:8000/api/notifs/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		});
    }
</script>

<div class="border-2 border-black w-1/2 p-2">
    <h1>Inbox</h1>
	{#if requests}
		{#each requests as request}
			<div class="flex items-center justify-evenly bg-slate-100 rounded-md w-52 h-12">
				<p>{request.orgName}</p>
				<button class="bg-green-500 rounded-md text-white px-2 py-1" on:click={() => accept(request)}>Y</button>
				<button class="bg-red-500 rounded-md text-white px-2 py-1" on:click={() => remove(request)}>X</button>
			</div>
		{/each}
	{/if}
</div>
