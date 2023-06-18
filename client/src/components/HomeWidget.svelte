<script>
	import { onMount, onDestroy } from 'svelte';

	let time = new Date();
	const weekdays = ['Sun', 'Mon', 'Tue', 'We', 'Thu', 'Fr', 'Sat'];

	const intervalId = setInterval(() => {
		time = new Date();
	}, 1000);

	onMount(() => {
		return () => clearInterval(intervalId);
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<div class="grid place-items-center w-full h-1/2">
	<p class="text-gray-500 text-center text-lg mb-10">
		{`${time.getHours()}:${
			time.getMinutes().toString().length === 1 ? '0' + time.getMinutes() : time.getMinutes()
		} PM, 
        ${weekdays[time.getDay()]}, ${
			time.toLocaleString('default', { month: 'short' }) + ' ' + time.getDate()
		}, ${time.getFullYear()}`}
	</p>
</div>
