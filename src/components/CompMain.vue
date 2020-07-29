<template>
    <Fragment>
        <Header></Header>
        <ModalLogin ref="ModalLogin" v-if="auth_token == false"></ModalLogin>
        <Fragment v-else>
            <Content ref="Content"></Content>
            <ExtendBar ref="ExtendBar"></ExtendBar>
            <CompOrder ref="CompOrder"></CompOrder>
            <!-- <Print ref="Print"></Print> -->
            <Print80 ref="Print80"></Print80>
            <ListStore ref="ListStore"></ListStore>
            <ListProduct ref="ListProduct"></ListProduct>
        </Fragment>
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
import ListProduct from './ListProduct';
import ModalLogin from './ModalLogin';
export default {
    components: {
        Header,
        Content,
        Fragment,
        ExtendBar,
        CompOrder,
        Print,
        Print80,
        ListStore,
        ListProduct,
        ModalLogin
    },
    name: 'CompMain',
    data: function(){
        return {
            open_menu_bar: false,
            open_print: false,
            auth_token: false,
        }
    },
    created: function(){
        if(localStorage.getItem('auth_token')){
            this.auth_token = localStorage.getItem('auth_token');
        }
    }
}
</script>

<style>

</style>