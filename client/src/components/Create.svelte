<script lang="ts">
	import { useForm, validators, required } from 'svelte-use-form';
	import { mail } from '../stores';
	import { createEventDispatcher } from 'svelte';

	let participantMail = '';
	let orgName = '';
	let matchedUsers: any[];
	let selectedUsers: any[] = [];

	const dispatch = createEventDispatcher();

	const find = async () => {
		if (participantMail) {
			matchedUsers = await fetch(`http://localhost:8000/api/users/like/${participantMail}`).then(
				(response) => response.json()
			);
			matchedUsers = matchedUsers.filter((user) => user.email !== $mail);
		}
	};

	const create = async () => {
		await request();
		await fetch('http://localhost:8000/api/organisations/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: orgName,
				owner: $mail,
				collaborators: []
			})
		});
		dispatch('created');
	};

	const request = async () => {
		selectedUsers.map(async (selected) => {
			await fetch('http://localhost:8000/api/notifs/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: selected.id,
					orgName
				})
			});
		});
	};

	const form = useForm();
</script>

<div class="fixed bg-white w-10/12 h-5/6">
	<h1 class="text-3xl font-bold mb-4">New Organisation</h1>
	<form on:submit|preventDefault={create} use:form class="w-full">
		<label for="name" class="block text-gray-700 font-bold mb-2">Project Name:</label>
		<input
			id="name"
			name="name"
			type="text"
			use:validators={[required]}
			bind:value={orgName}
			placeholder="Enter project name"
			class="block w-80 px-3 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
		/>
		<input
			class="w-96 px-3 py-2 rounded-md border-2 my-4 border-gray-300 focus:outline-none focus:border-blue-500"
			placeholder="Search for participants"
			bind:value={participantMail}
			on:input={find}
		/>
		<div class="flex">
			<ul class="w-1/2 border-2 border-black">
				{#if matchedUsers}
					{#each matchedUsers as match}
						<div class="flex justify-between mb-2 rounded-md w-full p-4">
							<p>{match.email}</p>
							<button
								on:click={() => {
									if (!selectedUsers.includes(match)) {
										selectedUsers = [...selectedUsers, match];
									}
								}}
								type="button"
								class="bg-green-400 text-white px-2 py-1 ml-auto rounded-md">+</button
							>
						</div>
					{/each}
				{/if}
			</ul>
			<ul class="border-2 border-black w-1/2 h-80 ml-auto">
				{#each selectedUsers as selected}
					<div class="flex justify-between items-center mb-2 rounded-md w-full p-4">
						<p>{selected.email}</p>
						<button
							on:click={() => {
								selectedUsers = selectedUsers.filter((user) => user.email != selected.email);
							}}
							type="button"
							class="bg-red-400 text-white px-3 py-1 ml-auto rounded-md">-</button
						>
					</div>
				{/each}
			</ul>
		</div>
		<button type="submit" class="w-full bg-gray-200 my-5 p-2 rounded-b-md">Create</button>
	</form>
</div>
