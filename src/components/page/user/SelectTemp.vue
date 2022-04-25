<template></template>

<script>
export default {
    name: 'index',
    data() {
        return {
            searchkey: ''
        };
    },
    created() {
        this.searchkey = this.$route.query.searchkey;
        this.$router.push({
            path: '/user/selectResult',
            query: {
                searchkey: this.searchkey
            }
        });
    }
};
</script>
