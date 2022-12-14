<template>
    <router-link :to="transferLink" :transferDto="data">{{ data.reference }}</router-link>
</template>
<script>
export default {
    props: ['data'],
    computed: {
        transferLink() {
            return this.$route.path + '/' + this.data.id;
        }
    }
}
</script>