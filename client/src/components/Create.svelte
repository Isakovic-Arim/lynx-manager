<script lang="ts">
	import { useForm, validators, required } from 'svelte-use-form';
	import { id } from '../stores';

	let mail = '';
	let orgName = '';
	let matchedUsers: any[];
	let selectedUsers: any[] = [];
	const find = async () => {
		matchedUsers = await fetch(`http://localhost:8000/api/users/like/${mail}`).then((response) =>
			response.json()
		);
	};

	const create = async () => {
		await request();
		console.log($id);
		await fetch('http://localhost:8000/api/organisations/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
            body: JSON.stringify({
                orgName,
                owner: $id,
                collaborators: []
            })
		});
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

<div class="grid place-items-center w-96 h-96 border-2">
	<h1 class="text-3xl font-bold h-5">New Organisation</h1>
	<div class="flex">
		<form on:submit|preventDefault={create} use:form class="bg-white w-80 h-80 grid place-items-center">
			<input
				type="text"
				name="name"
				use:validators={[required]}
				class="m-5 p-2 rounded-md bg-gray-200"
				placeholder="Name"
				bind:value={orgName}
			/>
			<div>
				<input class="px-2 py-1" placeholder="Search for users" bind:value={mail} on:input={find} />
				<!-- <button class="bg-gray-500 text-white border-2 p-2 rounded-md hover:bg-white hover:text-black" on:click|preventDefault={find}>Find collaboratos</button> -->
			</div>
			{#if matchedUsers}
				<ul>
					{#each matchedUsers as match}
						<div class="flex justify-between mb-2 rounded-md w-full p-2 bg-gray-200">
							<p>{match.email}</p>
							<button
								on:click={() => {
									if (!selectedUsers.includes(match)) {
										selectedUsers = [...selectedUsers, match];
									}
								}}
								class="bg-green-400 text-white px-2 py-1 ml-auto">+</button
							>
						</div>
					{/each}
				</ul>
			{/if}
			{#if selectedUsers}
				<ul class="bg-gray-600 border-2 w-full h-full">
					{#each selectedUsers as selected}
						<p class="text-white">{selected.email}</p>
					{/each}
				</ul>
			{/if}
			<div class="flex w-full justify-evenly">
				<button type="submit">Create</button>
			</div>
		</form>
	</div>
</div>
