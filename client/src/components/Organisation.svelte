<script lang="ts">
	import { goto } from '$app/navigation';
	import { organisation, orgName } from '../stores';

	export let org: any;
</script>

<button
	class="bg-slate-300 w-full h-32 rounded-lg"
	on:click={() => {
		goto(`organisations/${org.name}`);
		$orgName = org.name;
		$organisation = org;
	}}
>
	<p>{org.name}</p>
	<div class="flex justify-center">
		<img src="/crown.svg" class="mr-2" alt="owner" width="20" height="20" />
		<p>{org.owner}</p>
	</div>
	<div class="flex justify-center">
		<img src="/members.svg" alt="members" width="20" height="20" />
		{org.collaborators.length}
	</div>
</button>
