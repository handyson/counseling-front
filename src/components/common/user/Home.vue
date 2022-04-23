<template>
    <div class="content" style="background-color: #fff">
        <v-head></v-head>
        <router-view style="background-color: #F6F6F6"></router-view>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vFooter from './Footer.vue';

    export default {
        components: {
            vHead,
            vFooter
        }
    };
</script>
