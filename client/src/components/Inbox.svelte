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
		};
		await fetch('http://localhost:8000/api/organisations/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				orgName: orgName,
				user: user
			})
		});
		remove(request);
	};

	const remove = async (request: any) => {
		await fetch('http://localhost:8000/api/notifs/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(request)
		});
	};
</script>

<div class="border-2 border-black w-72 h-96 p-2 rounded-lg">
	<h1 class="mb-5 border-b-2 border-black text-lg">Inbox | Incoming requests</h1>
	{#if requests}
		{#each requests as request}
			<div class="flex items-center rounded-md w-full h-12">
				<p class="mr-auto">{request.orgName}</p>
				<button class="bg-green-500 rounded-md p-2 mr-1" on:click={() => accept(request)}
					><img src="/checkmark.svg" alt="checkmark" width="20" height="20" /></button
				>
				<button class="bg-red-500 rounded-md p-2" on:click={() => remove(request)}
					><img src="/x.svg" alt="checkmark" width="20" height="20" /></button
				>
			</div>
		{/each}
	{/if}
</div>
