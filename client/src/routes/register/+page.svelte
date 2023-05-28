<script lang="ts">
	import '../../style.css';
	import {
		useForm,
        validators,
        required,
        minLength,
        maxLength,
        email
	} from 'svelte-use-form';
    import * as Realm from 'realm-web';

	const form = useForm();

	let visible: boolean = false;
	function changeVisibility() {
		visible = !visible;
	}

    const register = async () => {
        const app = new Realm.App({id: import.meta.env.VITE_APP_ID});
        const {email, password} = $form.values;
        if (email && password) {
            await app.emailPasswordAuth.registerUser({email, password});
        }
    }
</script>

<a class="absolute inset-2 w-fit h-fit" href="/">&lt; Back</a>
<main class="h-screen grid place-items-center">
	<form use:form class="grid place-items-center">
		<h1 class="text-3xl">Register</h1>
		<input type="email" name="email" use:validators={[required, email]} class="m-5 p-2 rounded-md bg-gray-200" placeholder="E-Mail" />
		<input
			type={visible ? 'text' : 'password'}
            name="password"
            use:validators={[required, minLength(6), maxLength(250)]}
			class="m-5 p-2 rounded-md bg-gray-200"
			placeholder="Password"
		/>
		<input type="checkbox" on:click={changeVisibility} />
		<button type="submit" on:click|preventDefault={register} class="mb-6">Sign up</button>

		<p class="text-gray-400 text-sm">Registered user?</p>
		<a class="text-sm" href="/login">Login</a>
	</form>
</main>
