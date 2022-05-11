<script>

	import { onMount } from 'svelte';
	import Table from 'sveltestrap/src/Table.svelte';
	import Button from 'sveltestrap/src/Button.svelte';

	
	let contacts = [];
	let newContact = {
		name: "",
		phone: "",
		email: ""
	}

	onMount(getContacts);

	async function getContacts(){
		console.log("Fetching contacts....");
		const res = await fetch("https://sos2122-fravaralg.herokuapp.com/api/v1/contacts");
		contacts = await res.json();
		console.log("Received contacts: "+contacts.length);
	}
	async function insertContact(){
		console.log("Inserting contacts...."+JSON.stringify(newContact));
		const res = await fetch("/api/v1/contacts",
					{
						method:"POST",
						body: JSON.stringify(newContact),
						headers: {
							"Content-Type":"application/json"
						}
					}).then(function (res){
						getContacts();
					});
		console.log("Done");

		
		contacts = await res.json();
		console.log("Received contacts: "+contacts.length);
		

	}


</script>


<main>
    {#await contacts}
	loading
		{:then contacts}
		<Table bordered>
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{newContact.name}"></td>
					<td><input bind:value="{newContact.email}"></td>
					<td><input bind:value="{newContact.phone}"></td>
					<td><Button 
						outline 
						color="primary"
						on:click="{insertContact}">Insert
						</Button>
					</td>
				</tr>
				{#each contacts as contact}
				<tr>
					<td><a href="#/contact/{contact.name}">{contact.name}</a></td>
					<td>{contact.email}</td>
					<td>{contact.phone}</td>
				</tr>
				{/each}
			</tbody>
		</Table>
	{/await}
</main>