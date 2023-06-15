<script>
	import '../../style.css';
    import {id, app} from '../../stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    onMount(() => {
        if (!$app.currentUser?.isLoggedIn) {
            goto('/login');
        }
    });

    const logout = async () => {
        await $app.currentUser?.logOut();
        goto('/login');
    }
</script>

<div class="flex h-screen w-full p-2">
	<nav class="bg-gray-200 h-full w-44 p-2 shadow-md rounded-md">
		<a href={`/${$id}`}>Home</a>
		<a href={`/${$id}/organisations`}>Organisations</a>
		<a href={`/${$id}/activity`}>Activity</a>
	</nav>
    <div class="h-full w-full">
        <nav class="bg-gray-200 w-full shadow-md h-8 rounded-md">
            <button on:click={logout}>Logout</button>
        </nav>
        <div class="p-3">
            <slot />
        </div>
    </div>
</div>
