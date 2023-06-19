<script lang="ts">
	import { onMount } from 'svelte';
	import { organisation, mail } from '../stores';

	let participants: any[];
	let isOwner: boolean;

	let participantMail: string = '';
	let matchedUsers: any[];
	let selectedUsers: any[] = [];

	onMount(async () => {
		participants = await fetch(
			`http://localhost:8000/api/organisations/collaborators/${$organisation.name}`
		).then((response) => response.json());
		isOwner = $mail === $organisation.owner;
	});

	const find = async () => {
		if (participantMail) {
			matchedUsers = await fetch(`http://localhost:8000/api/users/like/${participantMail}`).then(
				(response) => response.json()
			);
			matchedUsers = matchedUsers.filter((user) => user.email !== $mail);
			matchedUsers = matchedUsers.filter((user) => {
				return !participants.some((participant) => participant.email === user.email);
			});
		}
	};

	let addMore: boolean = false;

	const inviteParticipants = async () => {
		console.log(selectedUsers);
		selectedUsers.map(async (selected) => {
			await fetch('http://localhost:8000/api/notifs/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: selected.id,
					orgName: $organisation.name
				})
			});
		});
		addMore = false;
	};
</script>

<div class="inline-block w-96 h-96 right-0 border-2 border-black ml-auto">
	<div class="flex justify-between items-center bg-blue-200 border-b-2 border-black px-2 py-1">
		<div class="flex items-center">
			<img src="/crown.svg" alt="owner" class="mr-2" width="20" height="20" />
			<p>{$organisation.owner}</p>
		</div>
		{#if isOwner}
			<button
				on:click={() => (addMore = !addMore)}
				class="px-2 py-1 bg-slate-200 text-sm rounded-md"
			>
				{#if addMore}
					Cancel
				{:else}
					Invite
				{/if}
			</button>
		{/if}
	</div>
	{#if addMore}
		<div class="px-2 py-1">
			<input
				class="w-full px-2 py-1 mb-4 border-2 rounded-md"
				placeholder="Search for participants"
				bind:value={participantMail}
				on:input={find}
			/>
			{#if matchedUsers}
				<ul class="mb-4">
					{#each matchedUsers as match}
						<li class="flex justify-between mb-2">
							<p>{match.email}</p>
							<button
								on:click={() => {
									if (!selectedUsers.includes(match)) {
										selectedUsers = [...selectedUsers, match];
									}
								}}
								type="button"
								class="px-2 py-1 text-white bg-green-400 rounded-md"
							>
								+
							</button>
						</li>
					{/each}
				</ul>
			{/if}
			{#if selectedUsers.length > 0}
				<ul class="mb-4">
					{#each selectedUsers as selected}
						<li class="flex justify-between items-center mb-2">
							<p>{selected.email}</p>
							<button
								on:click={() => {
									selectedUsers = selectedUsers.filter((user) => user.email != selected.email);
								}}
								type="button"
								class="px-3 py-1 text-white bg-red-400 rounded-md"
							>
								-
							</button>
						</li>
					{/each}
				</ul>
			{/if}
			<button
				on:click={inviteParticipants}
				class="w-full px-4 py-2 text-white bg-blue-500 rounded-md"
			>
				Invite Participants
			</button>
		</div>
	{:else if participants}
		<div class="px-2 py-1">
			{#each participants as participant}
				<p class="text-center">{participant.email}</p>
			{/each}
		</div>
	{/if}
</div>
