<template>
    <div class="list_branch" :class="open ? 'open' : ''">
        <div class="box_branch">
            <div class="card">
                <div class="card-header top">
                    <div class="title">Bảng danh sách chi nhánh</div>
                </div>
                <div class="card-body center">
                    <div class="center_1">
                        <div class="add_branch">
                            <button @click.stop.prevent="handleOpenCreateBranch">Thêm chi nhánh</button>
                        </div>
                        <div class="search_branch">
                            <input type="text" name="search" v-model="keyword" placeholder="Tìm kiếm chi nhánh">
                        </div>
                    </div>
                    <div class="center_2">
                        <table class="table table-bordered">
                            <thead>
                                <tr style="text-align:center;">
                                    <th style="width:40px;">#</th>
                                    <th>Tên chi nhánh</th>
                                    <th style="width:50px;">Xóa</th>
                                    <th style="width:50px;">Sửa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in listBranch" :key="index">
                                    <td style="text-align:center;">{{index + 1}}</td>
                                    <td>{{item.name}}</td>
                                    <td style="text-align:center;"><button class="delete" @click.stop.prevent="handleOpenDeleteBranch(item)"><i class="fal fa-trash-alt"></i></button></td>
                                    <td style="text-align:center;"><button class="edit" @click.stop.prevent="handleEditBranch(item)"><i class="fal fa-edit"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="bottom"></div>
            </div>
        </div>
        <CreateBranch ref="CreateBranch" v-if="openCreateBranch"></CreateBranch>
        <DeleteBranch ref="DeleteBranch" v-if="openDeleteBranch" @deleteBranch="handleDeleteBranch"></DeleteBranch>
    </div>
</template>

<script>
import CreateBranch from './ModalBranch';
import DeleteBranch from './DeleteBranch';
export default {
    components: {
        CreateBranch,
        DeleteBranch
    },
    name: "ListBranch",
    data: function(){
        return {
            open: false,
            listBranch: null,
            openCreateBranch: false,
            editBranch: null,
            openDeleteBranch: false,
            obj: null,
            keyword: ''
        }
    },
    methods: {
        loadListBranch: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/branches',
                headers: {'auth-token': localStorage.getItem('token')},
                params: {
                    keyword: vm.keyword
                }
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.listBranch = res.data.data.docs;
                }
            }).catch(err => {
                console.log(err)
            })
        },
        handleOpenCreateBranch: function(){
            let vm = this;
            vm.editBranch = null;
            vm.openCreateBranch = true;
        },
        handleOpenDeleteBranch: function(item){
            let vm = this;
            vm.openDeleteBranch = true;
            vm.obj = item;
        },
        handleDeleteBranch: function(){
            let vm = this;
            vm.$parent.loading = true;
            vm.$parent.mask = true;
            vm.axios({
                method: "DELETE",
                url: vm.$root.API_GATE + '/api/branches/' + vm.obj._id,
                headers: {'auth-token': localStorage.getItem('token')}
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.$parent.$refs.LoadingModal.title = "Xóa thành công!";
                    clearTimeout(vm.debounce);
                    vm.debounce = setTimeout(function(){
                        vm.$parent.loadingModal = true;
                        vm.$parent.loading = false;
                        clearTimeout(vm.debounce_1);
                        vm.debounce_1 = setTimeout(function(){
                            vm.$parent.loadingModal = false;
                            vm.$parent.mask = false;
                            vm.openDeleteBranch = false;
                            vm.loadListBranch();
                        }, 1000);
                    }, 1000);
                };
            }).catch(err => {
                console.log(err)
            })
        },
        handleEditBranch: function(item){
            let vm = this;
            console.log(item)
            vm.editBranch = item;
            vm.openCreateBranch = true;
            let new_form = {
                name: item.name,
                id: item._id
            };
            vm.$nextTick(function(){
                vm.$refs.CreateBranch.form = new_form;
            })
        }
    },
    created: function(){
        // this.loadListBranch();
    },
    watch: {
        'keyword': {
            deep: true,
            handler: function(newval){
                let vm = this;
                clearTimeout(vm.debounce);
                vm.debounce = setTimeout(function(){
                    vm.loadListBranch();
                },500)
            }
        }
    }
}
</script>

<style>

</style>