<template></template>

<script>
export default {
    name: 'index',
    data() {
        return {
            goods: ''
        };
    },
    created() {
        this.goods = this.$route.query.goods;
        this.$router.push({
            path: '/user/consultantDesc',
            query: {
                goods: this.goods
            }
        });
    }
};
</script>
