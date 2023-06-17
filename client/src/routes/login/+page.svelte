<script lang="ts">
	import '../../style.css';
	import { goto } from '$app/navigation';
	import { useForm, validators, required, email } from 'svelte-use-form';
	import { id, mail, app } from '../../stores';
	import * as Realm from 'realm-web';

	const form = useForm();

	let errorMsg: string;

	const login = async () => {
		const { email, password } = $form.values;
		if (email && password) {
			try {
				const credentials = Realm.Credentials.emailPassword(email, password);
				const user = await $app.logIn(credentials);
				$id = user.id;
				$mail = user.profile.email;
				goto(`/${user.id}`);
			} catch (e) {
				if (typeof e === 'object') {
					errorMsg = (e as Error).message;
				}
				const startIndex = errorMsg.lastIndexOf(':') + 1;
				errorMsg = errorMsg.substring(startIndex).trim();
			}
		}
	};
</script>

<a class="absolute inset-2 w-fit h-fit" href="/">&lt; Back</a>
<div class="h-screen grid place-items-center">
	<form use:form class="grid place-items-center" on:submit={login}>
		<h1 class="text-3xl">Login</h1>
		<input
			type="email"
			name="email"
			use:validators={[required, email]}
			class="m-5 p-2 rounded-md bg-gray-200"
			placeholder="E-Mail"
		/>
		<input
			type="password"
			name="password"
			use:validators={[required]}
			class="m-5 p-2 rounded-md bg-gray-200"
			placeholder="Password"
		/>
        {#if errorMsg}
			<div class="p-2 rounded-md bg-red-300 mt-4">
				{errorMsg}
			</div>
		{/if}
		<button type="submit" class="my-6 hover:bg-gray-200 px-2 py-1 rounded-md" on:click|preventDefault={login}>Login</button>
		<p class="text-gray-400 text-sm">Not a user?</p>
		<a class="text-sm" href="/register">Register</a>
	</form>
</div>
