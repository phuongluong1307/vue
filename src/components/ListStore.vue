<template>
    <div class="list_store" :class="open ? 'close' : ''">
        <div class="box">
            <div class="top">
                <h6 class="title">Chọn cửa hàng</h6>
            </div>
            <div class="center">
                <div class="store" v-for="(item,index) in $parent.listBranch" :key="index" :class="store && item.name == store.name ? 'active' : ''" @click.stop.prevent="handleSelectBranch(item)">
                    <p>{{item.name}}</p>
                </div>
            </div>
            <div class="bottom">
                <button @click.stop.prevent="handleSelectStore">Chọn</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ListStore',
    props: ['data'],
    data: function(){
        return {
            open: false,
            active: "",
            store: null,
            debounce: null,
        }
    },
    methods: {
        handleSelectStore: function(){
            let vm = this;
            const socket = vm.$root.socket;
            if(vm.store.name == ''){
                alert('Vui lòng chọn cửa hàng')
            }else{
                vm.open = true;
                localStorage.setItem('branch_id', vm.store._id);
                vm.$parent.statusBranch = true;
            }
        },
        handleSelectBranch: function(item){
            let vm = this;
            vm.store = item;
        }
    },
    created: function(){
        let vm = this;
        if(localStorage.getItem('branch_id')){
            vm.open = true;
        }
    },
    watch: {
        
    }
}
</script>

<style>

</style>