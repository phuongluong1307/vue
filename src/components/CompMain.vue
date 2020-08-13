<template>
    <Fragment>
        <Header></Header>
        <ModalLogin ref="ModalLogin" v-if="auth_token == false"></ModalLogin>
        <ListStore ref="ListStore" v-else></ListStore>
        <Fragment v-if="statusBranch">
            <Content ref="Content"></Content>
            <ExtendBar ref="ExtendBar"></ExtendBar>
            <CompOrder ref="CompOrder"></CompOrder>
            <!-- <Print ref="Print"></Print> -->
            <!-- <Print80 ref="Print80"></Print80> -->
            <ListProduct ref="ListProduct"></ListProduct>
            <Loading ref="Loading" v-show="loading"></Loading>
            <div class="mask_main" v-show="mask"></div>
            <LoadingModal ref="LoadingModal" v-show="loadingModal"></LoadingModal>
            <ListUser ref="ListUser"></ListUser>
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
import ListProduct from './Product/ListProduct';
import ModalLogin from './ModalLogin';
import Loading from './Loading';
import LoadingModal from './LoadingModal';
import ListUser from './ListUser';
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
        ModalLogin,
        Loading,
        LoadingModal,
        ListUser
    },
    name: 'CompMain',
    data: function(){
        return {
            open_menu_bar: false,
            open_print: false,
            auth_token: false,
            statusBranch: false,
            mask: false,
            loadingModal: false,
            loading: false
        }
    },
    created: function(){
        let vm = this;
        if(localStorage.getItem('auth_token')){
            vm.auth_token = localStorage.getItem('auth_token');
        };
        if(localStorage.getItem('nameBranch') != "" && vm.auth_token){
            vm.statusBranch = true;
        }
    },
    methods: {

    },
    watch: {
        
    }
}
</script>

<style>

</style>