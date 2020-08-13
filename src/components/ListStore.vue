<template>
    <div class="list_store" :class="open ? 'close' : ''">
        <div class="box">
            <div class="top">
                <h6 class="title">Chọn cửa hàng</h6>
            </div>
            <div class="center">
                <div class="store" v-for="item in listBranch" :key="item.id" :class="item.name == select ? 'active' : ''" @click.stop.prevent="handleSelectBranch(item)">
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
            listBranch: null,
            select: '',
            nameBranch: '',
            debounce: null,
        }
    },
    methods: {
        handleSelectStore: function(){
            let vm = this;
            if(vm.select == ''){
                alert('Vui lòng chọn cửa hàng')
            }else{
                vm.open = true;
                vm.nameBranch = vm.select;
                localStorage.setItem('nameBranch', vm.nameBranch);
                vm.$parent.statusBranch = true;
            }
        },
        handleSelectBranch: function(item){
            let vm = this;
            vm.select = item.name;
        },
        loadBranch: function(){
            let vm = this;
            let user = JSON.parse(localStorage.getItem('name'));
            let form = {
                id: user.id
            }
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/users/' + form.id,
                headers: {'auth-token': localStorage.getItem('token')},
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.listBranch = res.data.data.list_branch;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    created: function(){
        let vm = this;
        vm.loadBranch();
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