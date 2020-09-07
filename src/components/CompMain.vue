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
            <ListBranch ref="ListBranch"></ListBranch>
            <Chart ref="Chart"></Chart>
            <div style="display: none;">
                <video ref="video" style="visibility: hidden;"></video>
                <canvas ref="canvas" style="visibility: hidden;"></canvas>
            </div>
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
import ListBranch from './Branch/ListBranch';
import Chart from './Chart/Chart';
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
        ListUser,
        ListBranch,
        Chart
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
            loading: false,
            listBranch: null,
            width: 320,
            height: 0,
            video: null,
            image: ''
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
        streamVideo(){
            let vm = this;
            const socket = vm.$root.socket;
            vm.video = vm.$refs.video;
            let canvas = vm.$refs.canvas;
            let ctx = canvas.getContext('2d');
            let streaming = false;
            navigator.mediaDevices.getUserMedia({video:true, audio: false})
            .then(function(stream){
                vm.video.srcObject = stream;
                vm.video.play();
                // update();
            })
            .catch(function(err){
                console.log(err)
            });
            vm.video.addEventListener('canplay', function(ev){
                if (!streaming) {
                    vm.height = vm.video.videoHeight / (vm.video.videoWidth/vm.width);
                
                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.
                
                    if (isNaN(vm.height)) {
                    vm.height = vm.width / (4/3);
                    }
                
                    vm.video.setAttribute('width', vm.width);
                    vm.video.setAttribute('height', vm.height);
                    canvas.setAttribute('width', vm.width);
                    canvas.setAttribute('height', vm.height);
                    ctx.drawImage(vm.video, 0, 0, vm.width, vm.height);
                    streaming = true;
                }
            }, false);
            function update(){
                ctx.drawImage(vm.video, 0, 0, vm.width, vm.height);
                var image = canvas.toDataURL('image/png');
                setInterval(function(){
                    socket.emit('client sent image', image);
                },1000);
                requestAnimationFrame(update); // wait for the browser to be ready to present another animation fram.       
            }
        },
        takePicture(){
            let vm = this;
            let canvas = vm.$refs.canvas;
            let ctx = canvas.getContext('2d');
            if(vm.width && vm.height){
                canvas.width = vm.width;
                canvas.height = vm.height;
                ctx.drawImage(vm.video, 0, 0, vm.width, vm.height);
                var data = canvas.toDataURL('image/png');
                vm.image = data;
            }
        },
    },
    mounted: function(){
        this.streamVideo(); 
    }
}
</script>

<style>

</style>