<template></template>

<script>
export default {
    name: 'index',
    data() {
        return {
            kind: ''
        };
    },
    created() {
        this.kind = this.$route.query.kind;
        this.$router.push({
            path: '/user/selectResult',
            query: {
                kind: this.kind
            }
        });
    }
};
</script>
