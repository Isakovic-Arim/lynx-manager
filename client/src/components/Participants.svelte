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

<div class="inline-block w-72 h-96 right-0 border-2 border-black ml-auto">
	<div class="flex justify-evenly bg-blue-200 border-b-2 border-black">
		<img src="/crown.svg" alt="owner" width="20" height="20" />
		<p>{$organisation.owner}</p>
	</div>
	{#if isOwner}
		<button on:click={() => (addMore = !addMore)} class="block w-full bg-slate-200 mt-auto"
			>Invite</button
		>
	{/if}
	{#if addMore}
		<input
			class="block w-full border-2 px-2 py-1 mb-4"
			placeholder="Search for participants"
			bind:value={participantMail}
			on:input={find}
		/>
		<div class="grid">
			<ul class="w-full border-2 border-black">
				{#if matchedUsers}
					{#each matchedUsers as match}
						<div class="flex justify-between mb-2 rounded-md w-full">
							<p>{match.email}</p>
							<button
								on:click={() => {
									if (!selectedUsers.includes(match)) {
										selectedUsers = [...selectedUsers, match];
									}
								}}
								type="button"
								class="bg-green-400 text-white px-2 py-1 ml-auto">+</button
							>
						</div>
					{/each}
				{/if}
			</ul>
			<ul class="w-full border-2 border-black ml-auto">
				{#each selectedUsers as selected}
					<div class="flex justify-between items-center mb-2 rounded-md w-full p-2">
						<p>{selected.email}</p>
						<button
							on:click={() => {
								selectedUsers = selectedUsers.filter((user) => user.email != selected.email);
							}}
							type="button"
							class="bg-red-400 text-white px-3 py-1 ml-auto">-</button
						>
					</div>
				{/each}
			</ul>
			<button on:click={inviteParticipants}>Invite Participants</button>
		</div>
	{:else if participants}
		{#each participants as participant}
			<p class="text-center">{participant.email}</p>
		{/each}
	{/if}
</div>
