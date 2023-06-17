<script lang="ts">
	import { onMount } from 'svelte';
	import { organisation, mail } from '../../../../stores';
	import Assign from '../../../../components/Assign.svelte';
	import Participants from '../../../../components/Participants.svelte';

	let tasks: any;
	let participants: any;

	let isOwner: boolean = false;
	let display: boolean = false;
	onMount(async () => {
		tasks = await fetch(`http://localhost:8000/api/tasks/org/${$organisation.name}`).then(
			(response) => response.json()
		);
		participants = await fetch(
			`http://localhost:8000/api/organisations/collaborators/${$organisation.name}`
		).then((response) => response.json());
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
				<table class="w-full border-2 border-black">
					<thead class="border-b-2 border-black">
						<th>name</th>
						<th>assignee</th>
						<th>due</th>
						<th>status</th>
					</thead>
					<tbody class="text-center divide-y dark:divide-gray-700">
						{#if tasks}
							{#each tasks as task}
								<tr>
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
		<footer class="mt-auto bg-red-300 p-2 rounded-lg">
			<h1>Danger Zone</h1>
			<button class="relative bottom-0 left-0 text-red-500" on:click={remove}>Delete</button>
		</footer>
	{/if}
</main>
