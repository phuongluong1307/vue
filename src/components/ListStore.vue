<template>
    <div class="list_store" :class="open ? 'close' : ''">
        <div class="box" v-if="$parent.$refs.ModalLogin">
            <div class="top">
                <h6 class="title">Chọn cửa hàng</h6>
            </div>
            <div class="center">
                <div class="store" v-for="item in $parent.$refs.ModalLogin.listBranch" :key="item.id" @click.stop.prevent="handleSelectBranch(item)">
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
            nameBranch: '',
            debounce: null,
        }
    },
    methods: {
        handleSelectStore: function(){
            let vm = this;
            if(vm.store.name == ''){
                alert('Vui lòng chọn cửa hàng')
            }else{
                vm.open = true;
                vm.nameBranch = vm.store.name;
                localStorage.setItem('nameBranch', vm.nameBranch);
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
        if(localStorage.getItem('nameBranch')){
            vm.open = true;
        }
    },
    watch: {
        'nameBranch': {
            deep: true,
            handler: function(newval){
                let vm = this;
                vm.$parent.$refs.Content.$refs.ContentMenu.nameBranch = newval;
            }
        }
    }
}
</script>

<style>

</style>