<script>
	import '../../style.css';
    import {id} from '../../stores';
	import { onDestroy } from 'svelte';

    let user = '';
    let unsubscribe = id.subscribe((value) => user = id);

    onDestroy(unsubscribe);
</script>

<div class="flex h-screen w-full p-2">
	<nav class="bg-gray-200 h-full w-44 p-2 shadow-md rounded-md">
		<a href={`/${$id}`}>Home</a>
		<a href={`/${$id}/organisations`}>Organisations</a>
		<a href={`/${$id}/activity`}>Activity</a>
	</nav>
    <div class="w-full">
        <nav class="bg-gray-200 w-full shadow-md h-8 rounded-md">
            
        </nav>
        <slot />
    </div>
</div>
