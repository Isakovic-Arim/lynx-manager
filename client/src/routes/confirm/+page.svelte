<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let msg = 'We are currently confirming you E-mail address...';

	onMount(async () => {
		const token = $page.url.searchParams.get('token');
		const tokenId = $page.url.searchParams.get('tokenId');
		if (token && tokenId) {
			const body = { token: token, tokenId: tokenId };
			console.log(JSON.stringify(body));
			const {success} = await fetch('http://localhost:8000/api/auth/confirm', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			}).then(response => response.json());
			if (success) {
				msg = 'You are good to go';
			} else {
				msg = 'Something went wrong';
			}
		} else {
			goto('/register');
		}
	});
</script>

<p>{msg}</p>
