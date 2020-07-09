<template>
    <Fragment>
        <Header></Header>
        <Content ref="Content"></Content>
        <ExtendBar ref="ExtendBar"></ExtendBar>
        <CompOrder ref="CompOrder"></CompOrder>
    </Fragment>
</template>

<script>
import Header from './CompHeader';
import Content from './CompContent';
import { Fragment } from 'vue-fragment';
import ExtendBar from './ExtendBar';
import CompOrder from './CompOrder';
export default {
    components: {
        Header,
        Content,
        Fragment,
        ExtendBar,
        CompOrder
    },
    name: 'CompMain',
    data: function(){
        return {
            open_menu_bar: false
        }
    }
}
</script>

<style>

</style>