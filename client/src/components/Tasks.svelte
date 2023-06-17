<script lang="ts">
	import { onMount } from 'svelte';
	import { mail } from '../stores';

	let tasks: any;

	onMount(async () => {
		tasks = await fetch(`http://localhost:8000/api/tasks/assignee/${$mail}`).then((response) =>
			response.json()
		);
	});

	const check = async (id: string, done: boolean) => {
		await fetch(`http://localhost:8000/api/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				done
			})
		});
	};
</script>

<div class="w-1/2">
	<h1 class="text-lg font-bold">Assigned Tasks</h1>
	{#if tasks}
		<table class="w-full border-2 border-black">
			<thead>
				<th class="bg-gray-200">organisation</th>
				<th class="bg-gray-200">task</th>
				<th class="bg-gray-200">due</th>
				<th class="bg-gray-200">done</th>
			</thead>
			<tbody class="divide-y dark:divide-gray-700">
				{#each tasks as task}
					<tr class="text-center">
						<td>{task.orgName}</td>
						<td>{task.name}</td>
						<td>{task.due}</td>
						<td>
							<input
								type="checkbox"
								bind:checked={task.done}
								on:change={() => {
									check(task._id, task.done);
								}}
							/>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
