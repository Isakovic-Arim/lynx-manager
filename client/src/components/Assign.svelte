<script lang="ts">
	import { onMount } from 'svelte';
    import {organisation} from '../stores';
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

<div>
	<h1>Assign</h1>
	<form class="grid border-2 w-96 h-96 p-3" use:form>
		<input
			id="name"
			name="name"
			type="text"
			use:validators={[required]}
			placeholder="task"
			class="p-2 w-32 h-10 rounded-md bg-gray-200"
		/>
		<p>due</p>
		<input id="due" name="due" type="datetime-local" class="bg-slate-300 w-40 h-10 p-2 rounded-md" />
		{#if participants}
			<p>assign to</p>
			<select
				id="assignee"
				name="assignee"
				bind:value={assignTo}
				class="bg-slate-300 w-full h-10 p-2 rounded-md"
			>
				{#each participants as participant}
					<option value={participant.email}>{participant.email}</option>
				{/each}
			</select>
		{/if}
		<button on:click|preventDefault={assign} type="submit" class="block bg-slate-200 px-2 py-1 rounded-md"
			>Assign</button
		>
	</form>
</div>
