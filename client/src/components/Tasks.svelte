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
	<h1 class="text-lg font-bold mb-4">Assigned Tasks</h1>
	{#if tasks}
		<table class="w-full border rounded-lg overflow-hidden">
			<thead>
				<tr class="bg-gray-200 text-gray-700">
					<th class="py-2 px-4">Organisation</th>
					<th class="py-2 px-4">Task</th>
					<th class="py-2 px-4">Due</th>
					<th class="py-2 px-4">Done</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700">
				{#each tasks as task}
					<tr class="text-center">
						<td class="py-2 px-4">{task.orgName}</td>
						<td class="py-2 px-4">{task.name}</td>
						<td class="py-2 px-4">{task.due}</td>
						<td class="py-2 px-4">
							<input
								type="checkbox"
								class="form-checkbox h-5 w-5 text-blue-500"
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
