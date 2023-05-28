<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		const token = $page.url.searchParams.get('token');
		const tokenId = $page.url.searchParams.get('tokenId');
		if (token && tokenId) {
			const body = { token: token, tokenId: tokenId };
			console.log(JSON.stringify(body));
			const result = await fetch('http://localhost:8000/confirm', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			}).then(response => response.json());
			console.log(result.success);
		} else {
			goto('/register');
		}
	});
</script>

<p>We are currently confirming your E-mail address...</p>
