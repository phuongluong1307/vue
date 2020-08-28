<template>
    <div class="create_branch">
        <div class="create_branch_box">
            <div class="top">
                <div class="title">{{$parent.editBranch ? "Thay đổi tên chi nhánh" : 'Thêm chi nhánh'}}</div>
            </div>
            <div class="center">
                <div class="form-group">
                    <input type="text" v-model="form.name" name="name" placeholder="Nhập tên cửa hàng">
                </div>
            </div>
            <div class="bottom">
                <button class="bottom_1" @click.stop.prevent="$parent.openCreateBranch = false">Hủy</button>
                <button class="bottom_2" @click.stop.prevent="handlerCreateBranch">Tạo</button>
            </div>
        </div>
        <div class="create_branch_mask"></div>
    </div>
</template>

<script>
export default {
    name: "CreateBranch",
    data: function(){
        return {
            form: {
                name: '',
                id: ''
            },
            debounce: null,
            debounce_1: null
        }
    },
    methods: {
        handlerCreateBranch: function(){
            let vm = this;
            vm.$parent.$parent.loading = true;
            vm.$parent.$parent.mask = true;
            if(vm.$parent.editBranch){
                vm.axios({
                    method: "PUT",
                    url: vm.$root.API_GATE + '/api/branches/' + vm.form.id,
                    headers: {'auth-token': localStorage.getItem('token')},
                    data: vm.form
                }).then(res => {
                    if(res.data.error){

                    }else{
                        vm.$parent.$parent.$refs.LoadingModal.title = "Thay đổi thành công!";
                        clearTimeout(vm.debounce);
                        vm.debounce = setTimeout(function(){
                            vm.$parent.$parent.loadingModal = true;
                            vm.$parent.$parent.loading = false;
                            clearTimeout(vm.debounce_1);
                            vm.debounce_1 = setTimeout(function(){
                                vm.$parent.$parent.loadingModal = false;
                                vm.$parent.$parent.mask = false;
                                vm.$parent.openCreateBranch = false;
                                vm.$parent.loadListBranch();
                            }, 1000);
                        }, 1000);
                    };
                }).catch(err => {
                    console.log(err)
                })
            }else{
                vm.axios({
                    method: "POST",
                    url: vm.$root.API_GATE + '/api/branches/',
                    headers: {'auth-token': localStorage.getItem('token')},
                    data: vm.form
                }).then(res => {
                    if(res.data.error){

                    }else{
                        vm.$parent.$parent.$refs.LoadingModal.title = "Thêm thành công!";
                        clearTimeout(vm.debounce);
                        vm.debounce = setTimeout(function(){
                            vm.$parent.$parent.loadingModal = true;
                            vm.$parent.$parent.loading = false;
                            clearTimeout(vm.debounce_1);
                            vm.debounce_1 = setTimeout(function(){
                                vm.$parent.$parent.loadingModal = false;
                                vm.$parent.$parent.mask = false;
                                vm.$parent.openCreateBranch = false;
                                vm.$parent.loadListBranch();
                            }, 1000);
                        }, 1000);
                    }
                }).catch(err => {
                    console.log(err)
                });
            }
        }
    }
}
</script>

<style>

</style>