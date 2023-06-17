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
	<nav class="flex flex-col bg-gray-200 h-full w-44 p-2 shadow-md rounded-md">
		<a href={`/${$id}`}>Home</a>
		<a href={`/${$id}/organisations`}>Organisations</a>
        <div class="flex justify-start border-t-2 p-2 border-t-black mt-auto">
            <img src="/account.svg" class="mr-4" alt="account settings" width=20 height=20 />
            <a href={`/${$id}/account`} class="text-sm">Account</a>
        </div>
	</nav>
    <div class="h-full w-full">
        <nav class="flex items-center bg-gray-200 w-full h-8 px-2 shadow-md rounded-md">
            <button on:click={logout}><img src="/logout.svg" alt="logout" width="25" height="30" /></button>
        </nav>
        <div class="p-3">
            <slot />
        </div>
    </div>
</div>
