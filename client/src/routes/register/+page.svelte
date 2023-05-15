<script lang="ts">
	import '../../style.css';
    let visible: boolean = false;
    function changeVisibility() {
        visible = !visible;
    }
</script>

<a class='absolute inset-2 w-fit h-fit' href='/'>&lt; Back</a>
<div class="h-screen grid place-items-center">
    <form class="grid place-items-center">
        <h1 class="text-3xl">Register</h1>
        <input type="text" class='m-5 p-2 rounded-md bg-gray-200' placeholder="Username">
        <input type="email" class='m-5 p-2 rounded-md bg-gray-200' placeholder="E-Mail">
        <input type={visible ? "text" : "password"} class='m-5 p-2 rounded-md bg-gray-200' placeholder="Password">
        <input type="checkbox" on:click={changeVisibility}>
        <button type="submit" class='mb-6'>Sign up</button>
        <p class="text-gray-400 text-sm">Registered user?</p>
        <a class="text-sm" href="/login">Login</a>
    </form>
</div>
