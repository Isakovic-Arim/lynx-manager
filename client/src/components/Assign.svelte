<script lang="ts">
	import { onMount } from 'svelte';
	import { organisation } from '../stores';
	import { useForm, validators, required } from 'svelte-use-form';

	let participants: any;
	let assignTo: any;

	onMount(async () => {
		participants = await fetch(
			`http://localhost:8000/api/organisations/collaborators/${$organisation.name}`
		).then((response) => response.json());
	});

	const form = useForm();

	const assign = async () => {
		const { name, due, assignee } = $form.values;
		await fetch('http://localhost:8000/api/tasks/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				due,
				assignee,
				orgName: $organisation.name,
				done: false
			})
		});
	};
</script>

<div class="fixed bg-white w-fit h-fit">
	<h1>Assign</h1>
	<form class="w-96" use:form>
		<div class="mb-4">
			<label for="name" class="block text-gray-700 font-bold mb-2">Task:</label>
			<input
				id="name"
				name="name"
				type="text"
				use:validators={[required]}
				placeholder="Enter task"
				class="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
			/>
		</div>
		<div class="mb-4">
			<label for="due" class="block text-gray-700 font-bold mb-2">Due Date:</label>
			<input
				id="due"
				name="due"
				type="datetime-local"
				class="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
			/>
			{#if participants}
				<div class="mb-4">
					<label for="assignee" class="block text-gray-700 font-bold mb-2">Assign To:</label>
					<select
						id="assignee"
						name="assignee"
						bind:value={assignTo}
						class="w-full px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
					>
						{#each participants as participant}
							<option value={participant.email}>{participant.email}</option>
						{/each}
					</select>
				</div>
			{/if}
			<div class="flex justify-center">
				<button
					on:click|preventDefault={assign}
					type="submit"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Assign Task
				</button>
			</div>
		</div>
	</form>
</div>
