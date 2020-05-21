<template>
	<div>
		user:{{username}}
	</div>
</template>

<script>
	export default{
		data:{
			username:''
		},
		created() {
			this.username  = this.$store.state.user.username;
		},
		methods:{
			
		}
	}
</script>

<style>
</style>
