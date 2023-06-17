<script lang="ts">
	import { goto } from '$app/navigation';
	import { app, mail } from '../../../stores';

	const resetPassword = async () => {
		if ($mail) {
			await $app.emailPasswordAuth.sendResetPasswordEmail({ email: $mail });
		}
	};

    const deleteAccount = async () => {
        if ($app.currentUser) {
            $app.deleteUser($app.currentUser);
            goto('/login');
        }
    }

</script>

<h1>Account Settings</h1>

<button on:click={resetPassword} class="bg-blue-500 p-2 text-white">Reset Password</button>
<button on:click={deleteAccount} class="bg-red-500 p-2 text-white">Delete your account</button>
