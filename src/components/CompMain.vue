<template>
    <Fragment>
        <Header></Header>
        <Content ref="Content"></Content>
        <ExtendBar ref="ExtendBar"></ExtendBar>
        <CompOrder ref="CompOrder"></CompOrder>
        <!-- <Print ref="Print"></Print> -->
        <Print80 ref="Print80"></Print80>
        <ListStore ref="ListStore"></ListStore>
    </Fragment>
</template>

<script>
import Header from './CompHeader';
import Content from './CompContent';
import { Fragment } from 'vue-fragment';
import ExtendBar from './ExtendBar';
import CompOrder from './CompOrder';
import Print from './Print/Print';
import Print80 from './Print/Print80';
import ListStore from './ListStore';
export default {
    components: {
        Header,
        Content,
        Fragment,
        ExtendBar,
        CompOrder,
        Print,
        Print80,
        ListStore
    },
    name: 'CompMain',
    data: function(){
        return {
            open_menu_bar: false,
            open_print: false
        }
    }
}
</script>

<style>

</style>