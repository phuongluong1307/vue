<template>
    <div class="modal-user" :class="open ? 'open' : ''">
        <div class="form-modal-user" :class="popup ? 'close-popup' : ''">
            <div class="form-modal-header">
                <h3 class="title-edit">{{ titleModal ? 'Edit User' : 'Add User' }}</h3>
            </div>
            <div class="form-modal-body">   
                <form class="form-edit">
                    <div class="form-group">
                        <label for="edit-name" class="control-label">Name</label>
                        <input type="text" v-model="form.name" placeholder="Enter name..." id="edit-name" />
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="edit-username" class="control-label">Username</label>
                        <input type="text" v-model="form.username" placeholder="Enter username..."
                            id="edit-username" />
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="edit-password" class="control-label">Password</label>
                        <input type="password" v-model="form.password" placeholder="Enter password..."
                            id="edit-password" />
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Email</label>
                        <input type="email" v-model="form.email" placeholder="Enter email..." id="edit-email" />
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Role</label>
                        <div class="form-select">
                            <select id="edit-role" v-model="form.role">
                                <option value="" disabled>Please select one</option>
                                <option v-for="item in rolesData" :value="item._id" :key="item._id">{{item.name}}</option>
                            </select>
                            <button @click.stop.prevent="addNewRole()">Create Role</button>
                        </div>
                        <span class="warning-error"></span>
                    </div>
                    <div class="form-group">
                        <label for="edit-page" class="control-label">Page</label>
                        <div class="form-select">
                            <select id="edit-page" v-model="form.default_url">
                                <option value='' disabled>Please select one</option>
                                <option v-for="item in pagesData" :key="item.name" :value="item.name" selected>{{item.name}}</option>
                            </select>
                            <button @click.stop.prevent="addNewPage()">Create Page</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="label-select">
                            <div class="label">
                                <label for="edit-branch" class="control-label">Branch</label>
                            </div>
                        </div>
                        <div class="list_select_branch">
                            <div class="form-branch">
                                <div class="list-checkbox">
                                    <div class="checkbox" v-for="(item, index) in data" :key="index">
                                        <label>{{item.name}}</label>
                                        <input type="checkbox" v-model="listBranch" :name="item.name" :value="item._id">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="warningError != ''" class="text-danger">{{warningError}}</div>
                </form>
            </div>
            <div class="form-modal-footer">
                <div class="form-group form-button">
                    <button class="cancel-edit" @click.stop.prevent="closeModal">Cancel</button>
                    <button :class="titleModal ? 'delete-user' : 'drop-button'" >Delete</button>
                    <button class="submit-edit" @click.stop.prevent="addUser">{{ titleModal ? 'Update' : 'Add'}}</button>
                </div>
            </div>
        </div>
        <div class="mask" @click.stop.prevent="closeModal" style="position: absolute;left:0px;bottom:0px;top:0px;right:0px;z-index: 1;background: rgba(0,0,0,0.4);"></div>
        <addrole ref="addrole" listRoles="listRoles" v-on:clicked-popup='popup = false'></addrole>
        <addpage ref="addpage" v-on:clicked-popup='popup = false'></addpage>
        <!-- <SelectBranch ref="select_branch"></SelectBranch> -->
    </div>  
</template>

<script>
import addrole from './AddRole';
import addpage from './AddPage';
import SelectBranch from './SelectBranch';
export default {
    components: {
        addrole,
        addpage,
        SelectBranch
    },
    name: "modaluser",
    props: ['titleModal'],
    data: function () {
        return {
            open: false,
            form: {
                name: '',
                username: '',
                password: '',
                email: '',
                default_url: '',
                forget_token: '',
                token_exprired: '',
                role: '',
            },
            popup: false,
            rolesData: null,
            pagesData: null,
            warningError: '',
            listBranch: [],
            data: []
        }
    },
    methods: {
        closeModal: function () {
            this.open = false;
            this.warningError = '';
            document.querySelector('body').removeAttribute('style');
        },
        addNewRole: function () {
            this.$refs.addrole.open = true;
            this.popup = true;
            this.$refs.addrole.listPermissions();
        },
        addNewPage: function () {
            this.$refs.addpage.open = true;
            this.popup = true;
        },
        addUser: function () {
            let vm = this;
            let new_form = {
                name: vm.form.name,
                username: vm.form.username,
                password: vm.form.password,
                email: vm.form.email,
                default_url: vm.form.default_url,
                forget_token: '',
                token_exprired: '',
                role_id: vm.form.role,
                list_branch: vm.listBranch
            };
            if (vm.titleModal == '') {
                vm.axios({
                    method: 'POST',
                    url: vm.$root.API_GATE + '/api/users',
                    data: new_form,
                    headers: { "auth-token": localStorage.getItem('token') }
                })
                    .then(res => {
                        vm.closeModal();
                        vm.$parent.loadRecords();
                    }).catch(err => {
                        console.log(err);
                        vm.warningError = err.response.data;
                    })
            } else if (vm.titleModal != '') {
                vm.axios({
                    method: 'PUT',
                    url: vm.$root.API_GATE + '/api/users/' + this.$parent.dataItem.id,
                    data: new_form,
                    headers: { "auth-token": localStorage.getItem('token') }
                })
                .then(res => {
                    vm.closeModal();
                    vm.$parent.loadRecords();
                }).catch(err => {
                    console.log(err.response.data);
                })
            }
        },
        listRoles: async function () {
            let vm = this;
            vm.axios({
                method: 'GET',
                url: vm.$root.API_GATE + '/api/roles',
                headers: { 'auth-token': localStorage.getItem('token') }
            }).then(res => {
                vm.rolesData = res.data.data;
            }).catch(err => {
                console.log(err)
            });
        },
        listPages: async function () {
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/pages',
                headers: { 'auth-token': localStorage.getItem('token') }
            }).then(res => {
                vm.pagesData = res.data.data;
            }).catch(err => {
                console.log(err)
            })
        },
        openSelectBranch: function(){
            let vm = this;
            // this.$refs.select_branch.open = true;
            this.popup = true;
            // this.$refs.select_branch.loadBranches();
        },
        loadBranches: function(){
            let vm = this;
            vm.axios({
                method: "GET",
                url: vm.$root.API_GATE + '/api/branches/',
                headers: {'auth-token': localStorage.getItem('token')}
            }).then(res => {
                if(res.data.error){

                }else{
                    vm.data = res.data.data.docs;
                }
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed: {

    },
    mounted: function () {

    },
    created: function () {
        // this.listRoles();
        // this.listPages();
    }
}
</script>

<style>

</style>