<script lang="ts">
	import { goto } from '$app/navigation';
	import { organisation } from '../stores';

	export let org: any;
</script>

<button
  class="bg-slate-300 w-full h-32 rounded-lg shadow-md flex flex-col justify-center items-center text-center p-4"
  on:click={() => {
    goto(`organisations/${org.name}`);
    $organisation = org;
  }}
>
  <p class="text-xl font-semibold">{org.name}</p>
  <div class="flex items-center mt-2">
    <img src="/crown.svg" class="mr-2" alt="owner" width="20" height="20" />
    <p class="text-sm">{org.owner}</p>
  </div>
  <div class="flex items-center mt-2">
    <img src="/members.svg" class="mr-2" alt="members" width="20" height="20" />
    <p class="text-sm">{org.collaborators.length} {org.collaborators.length === 1 ? 'Member' : 'Members'}</p>
  </div>
</button>

