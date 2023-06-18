<script lang="ts">
	import { onMount } from 'svelte';
	import { organisation, mail } from '../../../../stores';
	import Assign from '../../../../components/Assign.svelte';
	import Participants from '../../../../components/Participants.svelte';

	let tasks: any;

	let isOwner: boolean = false;
	let display: boolean = false;
	onMount(async () => {
		tasks = await fetch(`http://localhost:8000/api/tasks/org/${$organisation.name}`).then(
			(response) => response.json()
		);
		isOwner = $mail === $organisation.owner;
	});

	const remove = async () => {
		await fetch(`http://localhost:8000/api/organisations/${$organisation.name}`, {
			method: 'DELETE'
		});
	};
</script>

<h1 class="text-3xl">{$organisation.name}</h1>
<main>
	<div class="flex">
		<div class="w-full">
			<button on:click={() => (display = !display)} class="px-2 py-1 bg-gray-200 rounded-md">
				{#if display}
					Close
				{:else}
					+
				{/if}
			</button>
			{#if isOwner && display}
				<Assign />
			{:else}
				<table class="w-full border rounded-lg overflow-hidden">
					<thead class="bg-gray-200 text-gray-700">
						<th class="py-2 px-4">name</th>
						<th class="py-2 px-4">assignee</th>
						<th class="py-2 px-4">due</th>
						<th class="py-2 px-4">status</th>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700">
						{#if tasks}
							{#each tasks as task}
								<tr class="text-center">
									<td>{task.name}</td>
									<td>{task.assignee}</td>
									<td>{task.due}</td>
									<td>
										{#if task.done}
											done
										{:else}
											incomplete
										{/if}
									</td>
								</tr>
							{/each}
						{/if}
					</tbody>
				</table>
			{/if}
		</div>
		<Participants />
	</div>
	{#if isOwner}
		<footer class="bg-red-300 p-2 rounded-lg">
			<h1>Danger Zone</h1>
			<button class="relative bottom-0 left-0 text-red-500" on:click={remove}>Delete</button>
		</footer>
	{/if}
</main>
