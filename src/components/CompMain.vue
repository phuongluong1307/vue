<template>
    <Fragment>
        <Header></Header>
        <Content></Content>
    </Fragment>
</template>

<script>
import Header from './CompHeader';
import Content from './CompContent';
import { Fragment } from 'vue-fragment'
export default {
    components: {
        Header,
        Content,
        Fragment
    },
    name: 'CompMain'
}
</script>

<style>

</style>