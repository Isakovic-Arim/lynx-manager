import { App } from "realm-web";
import { writable } from "svelte/store";

export const app = writable<Realm.App>(new App({id: import.meta.env.VITE_APP_ID}));
export const id = writable<string>('');
export const mail = writable<string | undefined>('');
export const orgName = writable<string>('');
export const organisation = writable({
    name: '',
    owner: ''
});