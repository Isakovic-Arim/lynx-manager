<script lang="ts">
	import { app } from "../../../stores";

    let otherUsers: unknown;
    
    const find = async () => {
        otherUsers = await fetch('http://localhost:8000/api/users');
        console.log(otherUsers);
    }
</script>

<header><h1>Organisations</h1></header>

<main class="grid place-items-center">
    <!-- {#if otherUsers !== undefined}
        {#each otherUsers as user}
            <li>{user!.email}</li>
        {/each}
    {:else}
        <p>No organisations yet.</p>
    {/if} -->
    <button class="bg-gray-500 text-white border-2 p-2 rounded-md hover:bg-white hover:text-black" on:click={find}>Find collaboratos</button>
</main>
