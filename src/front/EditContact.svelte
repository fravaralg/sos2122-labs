<script>
    export let params = {};
    import { pop } from "svelte-spa-router";
    import { Button } from "sveltestrap";
</script>
<main>
    This is the view of Contact {params.contactName};
    <Button outline color="secundary" on:click{pop}>Back</Button>
</main>